import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import * as d3geo from 'd3-geo';
import * as topojson from 'topojson-client';
import worldLandTopo from 'world-atlas/land-110m.json';
import countries110m from 'world-atlas/countries-110m.json';
import {
  Flame, Sun, Snowflake, Circle, Globe, Moon, Disc, Mountain, Thermometer,
  BarChart2, Download, X, ChevronRight, MapPin, Activity, ZoomIn, ZoomOut, RotateCcw,
  Radio, Satellite, Layers
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer
} from 'recharts';
import { TARGET_BODIES, ANALOG_SITES } from './data/mockData.js';

// --- PRE-COMPUTED REAL LAND & COUNTRY GEOJSON (from world-atlas TopoJSON) ---
const LAND_GEO = topojson.feature(worldLandTopo, worldLandTopo.objects.land);
const COUNTRIES_GEO = topojson.feature(countries110m, countries110m.objects.countries);
const COUNTRY_BORDERS_MESH = topojson.mesh(countries110m, countries110m.objects.countries, (a, b) => a !== b);
const GRATICULE_GEO = d3geo.geoGraticule10();

// Natural Earth projection fitted to 1000×500 viewBox with 20px padding
const PROJ_2D = d3geo.geoNaturalEarth1().fitExtent([[20, 20], [980, 480]], LAND_GEO);
const PATH_2D = d3geo.geoPath(PROJ_2D);

// Pre-compute SVG path strings once
const LAND_PATH_D = PATH_2D(LAND_GEO);
const COUNTRY_BORDERS_PATH_D = PATH_2D(COUNTRY_BORDERS_MESH);
const GRAT_PATH_D = PATH_2D(GRATICULE_GEO);
const EQUATOR_PATH_D = PATH_2D({ type: 'LineString', coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0]) });
const MERIDIAN_PATH_D = PATH_2D({ type: 'LineString', coordinates: [[0, -90], [0, 0], [0, 90]] });

// Pre-computed individual country polygons with name property
const COUNTRY_FEATURES = COUNTRIES_GEO.features.map(f => ({
  id: f.id,
  name: f.properties?.name || 'Territory',
  d: PATH_2D(f)
})).filter(c => !!c.d);

// --- AUTHENTIC NASA SRTM ELEVATIONS (Measured in meters above sea level) ---
const SITE_SRTM_ELEVATIONS = {
  atacama: '+2,450m',
  mcmurdo: '+750m',
  haughton: '+230m',
  icelandic_highlands: '+1,510m',
  rio_tinto: '+380m',
  death_valley: '-86m',
  wadi_rum: '+1,050m',
  svalbard: '+650m',
  ladakh: '+4,520m',
  namib_desert: '+405m',
  pilbara_craton: '+420m',
  axel_heiberg: '+125m',
  mdrs_utah: '+1,370m',
  mauna_kea_loa: '+4,169m',
  craters_of_the_moon: '+1,800m',
  lanzarote: '+510m',
  cinder_lake: '+2,120m',
  meteor_crater: '+1,740m',
  mount_teide: '+3,718m',
  mount_etna: '+3,357m'
};

const getSiteElevation = (site) => {
  if (!site) return '+1,000m';
  return SITE_SRTM_ELEVATIONS[site.id] || site.elevation || '+1,200m';
};

// --- ROBUST TARGET-SENSITIVE SIMILARITY SCORE GETTER ---
// Corrects target casing differences and calculates differentiated Earth terrestrial calibration parity
// so all 20 analog sites reflect true differentiated match percentages (e.g. 96%, 91%, 89%, 84%)
// instead of defaulting to 100%.
const getSiteScore = (site, target = 'Mars') => {
  if (!site) return 0;
  const targetKey = Object.keys(site.matchScores || {}).find(
    k => k.toLowerCase() === (target || '').toLowerCase()
  ) || target;
  const scoreObj = site.matchScores?.[targetKey] || site.matchScores?.[target] || {};

  // For Earth baseline: if overall is set to flat 100, calculate differentiated Earth fidelity parity
  // from subcategory scores (geological, climate, terrain) so pins and filters are truly calibrated
  if ((targetKey.toLowerCase() === 'earth' || target?.toLowerCase() === 'earth') && scoreObj.overall === 100) {
    const geo = typeof scoreObj.geological === 'number' ? scoreObj.geological : 96;
    const cli = typeof scoreObj.climate === 'number' ? scoreObj.climate : 90;
    const ter = typeof scoreObj.terrain === 'number' ? scoreObj.terrain : 95;
    return Math.round((geo * 0.45) + (cli * 0.25) + (ter * 0.30));
  }

  if (typeof scoreObj.overall === 'number' && scoreObj.overall > 0) {
    return scoreObj.overall;
  }
  if (scoreObj.geological || scoreObj.climate || scoreObj.terrain) {
    const geo = scoreObj.geological || 80;
    const cli = scoreObj.climate || 80;
    const ter = scoreObj.terrain || 80;
    return Math.round((geo + cli + ter) / 3);
  }
  return 85;
};

const getSiteMetricScores = (site, target = 'Mars') => {
  if (!site) return { overall: 0, geological: 0, climate: 0, terrain: 0 };
  const targetKey = Object.keys(site.matchScores || {}).find(
    k => k.toLowerCase() === (target || '').toLowerCase()
  ) || target;
  const scoreObj = site.matchScores?.[targetKey] || site.matchScores?.[target] || {};
  const overall = getSiteScore(site, target);
  return {
    overall,
    geological: scoreObj.geological || overall,
    climate: scoreObj.climate || overall,
    terrain: scoreObj.terrain || overall,
  };
};

// --- PRE-COMPUTED GEODESIC TOPO CONTOUR RINGS (d3.geoCircle projected on real terrain) ---
const SITE_TOPO_CONTOURS = ANALOG_SITES.map(site => {
  const c1 = d3geo.geoCircle().center([site.lon, site.lat]).radius(0.9)();
  const c2 = d3geo.geoCircle().center([site.lon, site.lat]).radius(1.8)();
  const c3 = d3geo.geoCircle().center([site.lon, site.lat]).radius(2.8)();
  return {
    id: site.id,
    name: site.name,
    elevation: SITE_SRTM_ELEVATIONS[site.id] || '+1,200m',
    d1: PATH_2D(c1),
    d2: PATH_2D(c2),
    d3: PATH_2D(c3)
  };
});

// --- PRE-COMPUTED SWIRLING CLOUD FORMATIONS (Volumetric Weather Overlay) ---
const CLOUD_GEO = (() => {
  const features = [];
  // 1. Tropical Intertropical Convergence Zone (ITCZ)
  const itcz = [];
  for (let lon = -180; lon <= 180; lon += 4) {
    const lat = 5 + Math.sin((lon * Math.PI) / 50) * 4.5 + Math.sin((lon * Math.PI) / 18) * 3;
    itcz.push([lon, lat]);
  }
  features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: itcz } });

  // 2. Northern Mid-Latitude Storm Track 1 (Westerlies & cyclonic waves)
  const nStorm1 = [];
  for (let lon = -180; lon <= 180; lon += 5) {
    const lat = 45 + Math.cos((lon * Math.PI) / 40) * 8 + Math.sin((lon * Math.PI) / 18) * 5;
    nStorm1.push([lon, lat]);
  }
  features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: nStorm1 } });

  // Northern Sub-polar Front
  const nStorm2 = [];
  for (let lon = -180; lon <= 180; lon += 5) {
    const lat = 62 + Math.sin((lon * Math.PI) / 35) * 6;
    nStorm2.push([lon, lat]);
  }
  features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: nStorm2 } });

  // 3. Southern Roaring Forties Storm Belt
  const sStorm1 = [];
  for (let lon = -180; lon <= 180; lon += 5) {
    const lat = -46 + Math.sin((lon * Math.PI) / 35) * 8 + Math.cos((lon * Math.PI) / 20) * 4;
    sStorm1.push([lon, lat]);
  }
  features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: sStorm1 } });

  // Southern Sub-polar Vortex
  const sStorm2 = [];
  for (let lon = -180; lon <= 180; lon += 5) {
    const lat = -60 + Math.cos((lon * Math.PI) / 30) * 6;
    sStorm2.push([lon, lat]);
  }
  features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: sStorm2 } });

  // 4. Cyclonic Spiral Vortices (North Atlantic, North Pacific, South Pacific, South Indian, Caribbean, Coral Sea)
  const vortexCenters = [
    [-35, 42], [150, 36], [-125, -50], [70, -45], [-65, 24], [115, -18]
  ];
  vortexCenters.forEach(([cLon, cLat]) => {
    for (let arm = 0; arm < 2; arm++) {
      const armCoords = [];
      for (let t = 0; t <= Math.PI * 1.8; t += 0.15) {
        const r = 3 + t * 4.8;
        const angle = t + (arm * Math.PI);
        const lon = cLon + r * Math.cos(angle) * 1.35;
        const lat = cLat + r * Math.sin(angle);
        armCoords.push([lon, lat]);
      }
      features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: armCoords } });
    }
  });

  return { type: 'FeatureCollection', features };
})();

// --- D3-GEO POWERED HTML5 CANVAS 3D GLOBE COMPONENT ---
function GlobeCanvas({ targetBody, sites, selectedSiteId, onPinClick, onHoverSite }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    yaw: 0.8,       // in radians, converted to degrees for d3
    pitch: 0.35,    // in radians, converted to degrees for d3
    isDragging: false,
    lastX: 0,
    lastY: 0,
    hoveredPinId: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;

      ctx.clearRect(0, 0, w, h);

      if (!stateRef.current.isDragging) {
        stateRef.current.yaw += 0.0035;
      }

      const { yaw, pitch } = stateRef.current;
      const yawDeg = yaw * (180 / Math.PI);
      const pitchDeg = pitch * (180 / Math.PI);

      // 1. Atmosphere Radial Glow Outer Halo (Morphed with targetBody)
      const isMars = targetBody.id === 'Mars';
      const isMoon = targetBody.id === 'Moon';
      const atmosphereColor = isMars 
        ? 'rgba(255, 107, 53, 0.45)' 
        : isMoon 
          ? 'rgba(226, 232, 240, 0.35)' 
          : 'rgba(56, 189, 248, 0.45)';
      const atmosphereMid = isMars
        ? 'rgba(255, 107, 53, 0.12)'
        : isMoon
          ? 'rgba(226, 232, 240, 0.1)'
          : 'rgba(14, 165, 233, 0.14)';

      const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.98, cx, cy, R * 1.28);
      outerGlow.addColorStop(0, atmosphereColor);
      outerGlow.addColorStop(0.35, atmosphereMid);
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // 2. Realistic Photorealistic Ocean Base
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip(); // Clip all surface elements strictly to the globe sphere

      const sunX = cx - R * 0.38;
      const sunY = cy - R * 0.38;

      // Deep royal & midnight blue ocean gradient simulating curvature and lighting depth
      const oceanGrad = ctx.createRadialGradient(sunX, sunY, R * 0.08, cx, cy, R);
      oceanGrad.addColorStop(0, '#1c5a94');    // Vibrant tropical sunlit azure
      oceanGrad.addColorStop(0.28, '#13406f'); // Deep marine royal blue
      oceanGrad.addColorStop(0.68, '#0b2649'); // Deep oceanic abyss
      oceanGrad.addColorStop(1, '#041124');    // Midnight blue edge

      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Sun specular glint on ocean surface
      const specular = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, R * 0.45);
      specular.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      specular.addColorStop(0.3, 'rgba(180, 230, 255, 0.12)');
      specular.addColorStop(1, 'transparent');
      ctx.fillStyle = specular;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // D3-Geo Orthographic projection (real world-atlas coastlines)
      const ortho = d3geo.geoOrthographic()
        .scale(R)
        .translate([cx, cy])
        .rotate([yawDeg, -pitchDeg])
        .clipAngle(90);
      const geoPath = d3geo.geoPath(ortho, ctx);

      // Subtle graticule grid
      ctx.beginPath();
      geoPath(GRATICULE_GEO);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Equator & Prime Meridian subtle guides
      ctx.beginPath();
      geoPath({ type: 'LineString', coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0]) });
      ctx.strokeStyle = 'rgba(0, 180, 216, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      geoPath({ type: 'LineString', coordinates: [[0, -90], [0, 0], [0, 90]] });
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.22)';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // 3. Natural Earth Landmass Biome Shader
      // Calculate projected poles to dynamically align biomes with Earth's rotation axis & tilt
      const poleProj = d3geo.geoOrthographic().scale(R).translate([cx, cy]).rotate([yawDeg, -pitchDeg]);
      const np = poleProj([0, 90]);
      const sp = poleProj([0, -90]);
      const dx = sp[0] - np[0];
      const dy = sp[1] - np[1];
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;

      const biomeGrad = ctx.createLinearGradient(
        cx - ux * R, cy - uy * R,
        cx + ux * R, cy + uy * R
      );
      // North Pole Arctic sea ice
      biomeGrad.addColorStop(0.00, '#ffffff');
      biomeGrad.addColorStop(0.07, '#e0f2fe'); // Permafrost / Tundra transition
      biomeGrad.addColorStop(0.14, '#475e38'); // Sub-arctic taiga
      // North America & Eurasia Temperate Forest
      biomeGrad.addColorStop(0.24, '#2d5324'); // Dense boreal pine
      biomeGrad.addColorStop(0.34, '#38662b'); // Mixed woodland & prairies
      // Subtropical Deserts (Sahara, Arabia, Sonoran, Gobi)
      biomeGrad.addColorStop(0.44, '#b8860b'); // Golden Sahara sand dunes
      biomeGrad.addColorStop(0.48, '#a67c3b'); // Arid scrubland & badlands
      // Equatorial Tropics (Amazon, Congo, Southeast Asia)
      biomeGrad.addColorStop(0.52, '#18421b'); // Lush tropical rainforest
      // Southern Savanna & Deserts (Kalahari, Australian Outback, Atacama)
      biomeGrad.addColorStop(0.60, '#9e7539'); // Outback ochre & desert
      // Southern Temperate (Patagonia, South Africa, New Zealand)
      biomeGrad.addColorStop(0.72, '#355627'); // Southern temperate forest
      // Antarctic Glaciation
      biomeGrad.addColorStop(0.88, '#e0f2fe'); // Coastal ice shelf
      biomeGrad.addColorStop(0.96, '#ffffff'); // Polar ice cap
      biomeGrad.addColorStop(1.00, '#ffffff');

      // Shallow turquoise continental shelves / reef fringes around coasts
      ctx.beginPath();
      geoPath(LAND_GEO);
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.38)';
      ctx.lineWidth = 3.2;
      ctx.stroke();

      // Natural continent terrain fill
      ctx.beginPath();
      geoPath(LAND_GEO);
      ctx.fillStyle = biomeGrad;
      ctx.fill();

      // Mountain relief & coastline definition
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.28)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Subtle country internal borders mesh
      ctx.beginPath();
      geoPath(COUNTRY_BORDERS_MESH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // 4. Weather Overlay: Swirling Clouds with Volumetric Parallax Drift
      const cloudYawDeg = (yaw * 1.20 * (180 / Math.PI)) + 20;
      const cloudOrtho = d3geo.geoOrthographic()
        .scale(R * 1.008)
        .translate([cx, cy])
        .rotate([cloudYawDeg, -pitchDeg])
        .clipAngle(90);
      const cloudPath = d3geo.geoPath(cloudOrtho, ctx);

      // Multi-pass soft atmospheric mist cloud strokes (softened opacity & blurred width)
      ctx.beginPath();
      cloudPath(CLOUD_GEO);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.beginPath();
      cloudPath(CLOUD_GEO);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.beginPath();
      cloudPath(CLOUD_GEO);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // 5. Night-Side Shading & Light (Sun from top-left, night-side shadow across bottom-right)
      const nightGrad = ctx.createRadialGradient(
        sunX, sunY, R * 0.35,
        cx, cy, R * 1.05
      );
      nightGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      nightGrad.addColorStop(0.52, 'rgba(0, 4, 12, 0.04)');
      nightGrad.addColorStop(0.74, 'rgba(2, 6, 18, 0.55)');
      nightGrad.addColorStop(0.92, 'rgba(1, 3, 10, 0.86)');
      nightGrad.addColorStop(1.00, 'rgba(0, 2, 7, 0.95)');

      ctx.fillStyle = nightGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // 6. Luminous Atmospheric Limb Glow (Rayleigh scattering rim light)
      const limbGrad = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R);
      limbGrad.addColorStop(0, 'transparent');
      limbGrad.addColorStop(0.75, 'rgba(56, 189, 248, 0.12)');
      limbGrad.addColorStop(0.92, 'rgba(125, 211, 252, 0.35)');
      limbGrad.addColorStop(1, 'rgba(186, 230, 253, 0.68)');

      ctx.fillStyle = limbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // End sphere clipping

      // 7. Interactive Site Pins with Animated Expanding Pulsing Telemetry Rings
      const centerLon = -yawDeg;
      const centerLat = pitchDeg;
      const now = performance.now();
      const pulsePhase1 = (now / 2000) % 1; // 0 to 1
      const pulsePhase2 = ((now / 2000) + 0.5) % 1;

      sites.forEach(site => {
        const coords = ortho([site.lon, site.lat]);
        const dist = d3geo.geoDistance([site.lon, site.lat], [centerLon, centerLat]);
        if (!coords || dist > Math.PI / 2) return;
        const [px, py] = coords;

        const isSelected = site.id === selectedSiteId;
        const score = getSiteScore(site, targetBody.id);
        const pinColor = score >= 90 ? '#FF6B35' : score >= 80 ? '#00B4D8' : '#E2E8F0';

        // Animated Expanding Concentric Telemetry Radar Rings
        const ringRadius1 = 7 + pulsePhase1 * (isSelected ? 26 : 18);
        const ringAlpha1 = (1 - pulsePhase1) * (isSelected ? 0.75 : 0.42);
        ctx.beginPath();
        ctx.arc(px, py, ringRadius1, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected 
          ? `rgba(255, 107, 53, ${ringAlpha1})` 
          : score >= 90 
            ? `rgba(255, 107, 53, ${ringAlpha1})` 
            : score >= 80 
              ? `rgba(0, 180, 216, ${ringAlpha1})` 
              : `rgba(226, 232, 240, ${ringAlpha1})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const ringRadius2 = 7 + pulsePhase2 * (isSelected ? 26 : 18);
        const ringAlpha2 = (1 - pulsePhase2) * (isSelected ? 0.55 : 0.28);
        ctx.beginPath();
        ctx.arc(px, py, ringRadius2, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected 
          ? `rgba(255, 107, 53, ${ringAlpha2})` 
          : score >= 90 
            ? `rgba(255, 107, 53, ${ringAlpha2})` 
            : score >= 80 
              ? `rgba(0, 180, 216, ${ringAlpha2})` 
              : `rgba(226, 232, 240, ${ringAlpha2})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // High-contrast glowing dark backdrop disc
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 16 : 11, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(255, 107, 53, 0.35)' : 'rgba(11, 15, 25, 0.78)';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#FF6B35' : 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pulsing pin ring
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(255, 107, 53, 0.6)' : pinColor;
        ctx.fill();

        // Solid core pin
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#0B0F19';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Intelligent label positioning offset based on coordinates to avoid clustering/edge clipping
        let badgeOffsetX = 10;
        let badgeOffsetY = -14;
        if (site.lat > 60) {
          // Arctic site (e.g. Haughton Crater): position badge below-right
          badgeOffsetY = 6;
          badgeOffsetX = 8;
        } else if (site.lat < -60) {
          // Antarctic site (e.g. McMurdo Dry Valleys): position badge above-right
          badgeOffsetY = -24;
          badgeOffsetX = 8;
        } else if (site.lon > 100) {
          // Far East (e.g. Pilbara Craton)
          badgeOffsetX = 12;
        }

        // High-contrast dark badge label
        ctx.font = '700 10px JetBrains Mono, monospace';
        const labelText = `${site.name} (${score}%)`;
        const textWidth = ctx.measureText(labelText).width;

        // Dark glass pill with crisp border
        ctx.fillStyle = isSelected ? 'rgba(255, 107, 53, 0.95)' : 'rgba(7, 11, 20, 0.92)';
        ctx.beginPath();
        ctx.roundRect(px + badgeOffsetX, py + badgeOffsetY, textWidth + 14, 20, 5);
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#FFFFFF' : 'rgba(56, 189, 248, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(labelText, px + badgeOffsetX + 7, py + badgeOffsetY + 14);

        // Selected target reticle
        if (isSelected) {
          ctx.strokeStyle = '#FF6B35';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, 20, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const onMouseDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.lastX;
        const dy = e.clientY - stateRef.current.lastY;
        stateRef.current.yaw += dx * 0.006;
        stateRef.current.pitch = Math.max(-1.2, Math.min(1.2, stateRef.current.pitch + dy * 0.006));
        stateRef.current.lastX = e.clientX;
        stateRef.current.lastY = e.clientY;
      } else {
        const yd = stateRef.current.yaw * (180 / Math.PI);
        const pd = stateRef.current.pitch * (180 / Math.PI);
        const ortho = d3geo.geoOrthographic().scale(R).translate([cx, cy]).rotate([yd, -pd]).clipAngle(90);
        const cLon = -yd;
        const cLat = pd;
        let hoveredId = null;
        sites.forEach(site => {
          const coords = ortho([site.lon, site.lat]);
          const dist = d3geo.geoDistance([site.lon, site.lat], [cLon, cLat]);
          if (coords && dist <= Math.PI / 2) {
            const [px, py] = coords;
            if (Math.hypot(mx - px, my - py) < 18) hoveredId = site.id;
          }
        });
        stateRef.current.hoveredPinId = hoveredId;
        canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
        if (onHoverSite) onHoverSite(hoveredId);
      }
    };

    const onMouseUp = () => {
      if (stateRef.current.isDragging) stateRef.current.isDragging = false;
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;
      const yd = stateRef.current.yaw * (180 / Math.PI);
      const pd = stateRef.current.pitch * (180 / Math.PI);
      const ortho = d3geo.geoOrthographic().scale(R).translate([cx, cy]).rotate([yd, -pd]).clipAngle(90);
      const cLon = -yd;
      const cLat = pd;
      sites.forEach(site => {
        const coords = ortho([site.lon, site.lat]);
        const dist = d3geo.geoDistance([site.lon, site.lat], [cLon, cLat]);
        if (coords && dist <= Math.PI / 2) {
          const [px, py] = coords;
          if (Math.hypot(mx - px, my - py) < 20) onPinClick(site.id);
        }
      });
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
    };
  }, [targetBody, sites, selectedSiteId]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-grab active:cursor-grabbing"
    />
  );
}

// Official Space Agency HUD telemetry badge styling definitions
const AGENCY_THEMES = {
  NASA: {
    border: 'border-sky-500/40',
    bg: 'bg-sky-950/40',
    text: 'text-sky-200',
    tagBg: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
    dot: 'bg-sky-400'
  },
  CSA: {
    border: 'border-rose-500/40',
    bg: 'bg-rose-950/40',
    text: 'text-rose-200',
    tagBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    dot: 'bg-rose-400'
  },
  ESA: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-200',
    tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    dot: 'bg-emerald-400'
  },
  JAXA: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/40',
    text: 'text-amber-200',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    dot: 'bg-amber-400'
  }
};

const getAgencyTheme = (agency) => AGENCY_THEMES[agency] || {
  border: 'border-slate-700',
  bg: 'bg-slate-900',
  text: 'text-slate-200',
  tagBg: 'bg-slate-800 text-slate-300 border-slate-700',
  dot: 'bg-slate-400'
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('Mars');
  const [activeCategories, setActiveCategories] = useState({
    'Volcanic': true,
    'Arid Deserts': true,
    'Polar/Ice': true,
    'Caves/Lava Tubes': true
  });
  const [minSimilarity, setMinSimilarity] = useState(70);
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [hoveredSiteId, setHoveredSiteId] = useState(null);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [mapLayer, setMapLayer] = useState('grid'); // 'grid' | 'thermal' | 'topo' | 'globe'
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [liveTime, setLiveTime] = useState('');

  // Country hover state
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // 2D Map Zoom & Pan State (1x to 6x)
  const [mapTransform, setMapTransform] = useState({ scale: 1, x: 0, y: 0 });
  const mapTransformRef = useRef(mapTransform);
  mapTransformRef.current = mapTransform;

  const [isPanning, setIsPanning] = useState(false);
  const panStateRef = useRef({
    isPanning: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false
  });

  const mapContainerRef = useRef(null);
  const mapViewportRef = useRef(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  const handleZoomIn = () => {
    setMapTransform(prev => {
      const newScale = Math.min(6, +(prev.scale * 1.35).toFixed(2));
      const W = mapSize.width || 1000;
      const H = mapSize.height || 500;
      const cx = W / 2;
      const cy = H / 2;
      const mapX = (cx - prev.x) / prev.scale;
      const mapY = (cy - prev.y) / prev.scale;
      const newX = cx - mapX * newScale;
      const newY = cy - mapY * newScale;
      const minX = W * (1 - newScale);
      const minY = H * (1 - newScale);
      return {
        scale: newScale,
        x: Math.min(0, Math.max(minX, newX)),
        y: Math.min(0, Math.max(minY, newY))
      };
    });
  };

  const handleZoomOut = () => {
    setMapTransform(prev => {
      const newScale = Math.max(1, +(prev.scale / 1.35).toFixed(2));
      if (newScale <= 1.01) {
        return { scale: 1, x: 0, y: 0 };
      }
      const W = mapSize.width || 1000;
      const H = mapSize.height || 500;
      const cx = W / 2;
      const cy = H / 2;
      const mapX = (cx - prev.x) / prev.scale;
      const mapY = (cy - prev.y) / prev.scale;
      const newX = cx - mapX * newScale;
      const newY = cy - mapY * newScale;
      const minX = W * (1 - newScale);
      const minY = H * (1 - newScale);
      return {
        scale: newScale,
        x: Math.min(0, Math.max(minX, newX)),
        y: Math.min(0, Math.max(minY, newY))
      };
    });
  };

  const handleResetZoom = () => {
    setMapTransform({ scale: 1, x: 0, y: 0 });
  };

  // Wheel zoom handler attached with passive: false to allow e.preventDefault()
  useEffect(() => {
    const el = mapViewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const current = mapTransformRef.current;
      const zoomFactor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      const newScale = Math.min(6, Math.max(1, +(current.scale * zoomFactor).toFixed(3)));

      const W = rect.width;
      const H = rect.height;

      if (newScale <= 1.005) {
        setMapTransform({ scale: 1, x: 0, y: 0 });
        return;
      }

      // Point in unscaled map space under the cursor
      const mapX = (cursorX - current.x) / current.scale;
      const mapY = (cursorY - current.y) / current.scale;

      const newX = cursorX - mapX * newScale;
      const newY = cursorY - mapY * newScale;

      const minX = W * (1 - newScale);
      const minY = H * (1 - newScale);

      const clampedX = Math.min(0, Math.max(minX, newX));
      const clampedY = Math.min(0, Math.max(minY, newY));

      setMapTransform({
        scale: newScale,
        x: clampedX,
        y: clampedY
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMapMouseDown = (e) => {
    if (e.button !== 0) return;
    panStateRef.current = {
      isPanning: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: mapTransform.x,
      initialY: mapTransform.y,
      hasMoved: false
    };
    setIsPanning(true);
  };

  useEffect(() => {
    const onWindowMouseMove = (e) => {
      if (!panStateRef.current.isPanning) return;
      const dx = e.clientX - panStateRef.current.startX;
      const dy = e.clientY - panStateRef.current.startY;
      if (Math.hypot(dx, dy) > 4) {
        panStateRef.current.hasMoved = true;
      }
      const W = mapSize.width || 1000;
      const H = mapSize.height || 500;
      const scale = mapTransformRef.current.scale;
      const minX = W * (1 - scale);
      const minY = H * (1 - scale);
      const targetX = panStateRef.current.initialX + dx;
      const targetY = panStateRef.current.initialY + dy;
      const clampedX = Math.min(0, Math.max(minX, targetX));
      const clampedY = Math.min(0, Math.max(minY, targetY));
      setMapTransform(prev => ({
        ...prev,
        x: clampedX,
        y: clampedY
      }));
    };

    const onWindowMouseUp = () => {
      if (panStateRef.current.isPanning) {
        panStateRef.current.isPanning = false;
        setIsPanning(false);
      }
    };

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, [mapSize]);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w > 0 && h > 0) {
        const padX = 24;
        const padY = 24;
        const availW = Math.max(100, w - padX * 2);
        const availH = Math.max(100, h - padY * 2);

        if (availW / availH > 2) {
          setMapSize({ width: Math.round(availH * 2), height: Math.round(availH) });
        } else {
          setMapSize({ width: Math.round(availW), height: Math.round(availW / 2) });
        }
      }
    };

    updateSize();
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateSize);
      ro.observe(el);
    }
    window.addEventListener('resize', updateSize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [mapLayer]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeTargetObj = TARGET_BODIES[selectedTarget];

  const CATEGORIES = [
    { id: 'Volcanic',       label: 'Volcanic',       Icon: Flame    },
    { id: 'Arid Deserts',   label: 'Arid Deserts',   Icon: Sun      },
    { id: 'Polar/Ice',      label: 'Polar/Ice',       Icon: Snowflake},
    { id: 'Caves/Lava Tubes', label: 'Caves/Lava Tubes', Icon: Circle },
  ];

  // ENHANCED COUNTRY AND KEYWORD SEARCH
  const filteredSites = useMemo(() => {
    return ANALOG_SITES.filter(site => {
      if (!activeCategories[site.category]) return false;
      const score = getSiteScore(site, selectedTarget);
      if (score < minSimilarity) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = site.name.toLowerCase().includes(q);
        const matchesRegion = site.region.toLowerCase().includes(q);
        const matchesCategory = site.category.toLowerCase().includes(q);
        const matchesCountry = site.country && site.country.toLowerCase().includes(q);
        const matchesAliases = site.aliases && site.aliases.some(a => a.toLowerCase().includes(q));
        const matchesSub = site.subcategories && site.subcategories.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesRegion && !matchesCategory && !matchesCountry && !matchesAliases && !matchesSub) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategories, minSimilarity, selectedTarget, searchQuery]);

  const activeSite = useMemo(() => {
    return ANALOG_SITES.find(s => s.id === selectedSiteId) || null;
  }, [selectedSiteId]);

  const toggleCategory = (catId) => {
    setActiveCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const triggerHudToast = (title, subtitle = 'HUD Telemetry • Sys.OK') => {
    toast.custom((t) => (
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-xl border shadow-2xl font-mono select-none"
        style={{
          background: 'rgba(11, 15, 25, 0.94)',
          borderColor: `${activeTargetObj.accentColor}55`,
          boxShadow: `0 12px 35px -5px rgba(0,0,0,0.85), 0 0 20px ${activeTargetObj.accentColor}25`
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full animate-ping flex-shrink-0"
          style={{ backgroundColor: activeTargetObj.accentColor }}
        />
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-wider text-slate-100 uppercase">
            {title}
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 tracking-widest uppercase">
            {subtitle}
          </span>
        </div>
      </div>
    ), { duration: 3200 });
  };

  const handleSelectSite = (siteId) => {
    setSelectedSiteId(siteId);
    if (siteId) {
      const site = ANALOG_SITES.find(s => s.id === siteId);
      if (site) {
        const score = getSiteScore(site, selectedTarget);
        triggerHudToast(`TARGET LOCKED: ${site.name.toUpperCase()} (${score}% MATCH)`);
      }
    }
  };

  const handleSwitchTarget = (targetKey) => {
    if (selectedTarget !== targetKey) {
      setSelectedTarget(targetKey);
      triggerHudToast(`ANALOG TARGET: ${targetKey.toUpperCase()}`);
    }
  };

  const handleResetFilters = () => {
    setActiveCategories({
      'Volcanic': true,
      'Arid Deserts': true,
      'Polar/Ice': true,
      'Caves/Lava Tubes': true
    });
    setMinSimilarity(0);
    setSearchQuery('');
    triggerHudToast("CRITERIA RESET: ALL ANALOGS ACTIVE");
  };

  // REAL CSV FILE EXPORT FUNCTIONALITY
  const handleExportCSV = (site, target) => {
    const siteMetrics = getSiteMetricScores(site, target);
    const headers = "Parameter,Earth Analog Value,Target Planetary Parity,Notes\r\n";
    const rows = [
      `"Analog Site","${site.name}","${site.region}","${site.coordinates}"`,
      `"Elevation (SRTM DEM)","${getSiteElevation(site)}","Terrestrial Altimetry",""`,
      `"Target Planetary Body","${target}","${site.targetAnalogSite[target]}",""`,
      `"Overall Similarity","${siteMetrics.overall}%","High Fidelity Calibration",""`,
      `"Geological Match","${siteMetrics.geological}%","Mineralogy & Basalt Parity",""`,
      `"Climate Match","${siteMetrics.climate}%","Atmosphere & Delta-T",""`,
      `"Terrain Match","${siteMetrics.terrain}%","Roughness & Slope Parity",""`,
      `"Extremophile Fit","${site.extremophileSuitability}","Biological Analog Index",""`,
      `"Rover Traction","${site.roverMobilityScore}","Mobility Traversability Parity",""`,
      `"Water Ice Potential","${site.resources.waterIceGrade}","ISRU Extraction Target",""`,
      `"Regolith Simulant","${site.resources.regolithSimulant}","Standardized Geotechnical Simulant",""`,
      `"Solar Flux","${site.resources.solarAvailability}","Photovoltaic Capacity",""`,
      `"Operational Hazards","${site.resources.keyRisks}","Mission Protocol Thresholds",""`,
      `"Partner Telemetry - NASA","${site.partnerAgencies?.find(p => p.agency === 'NASA')?.sensor || 'NASA PDS'}","${site.partnerAgencies?.find(p => p.agency === 'NASA')?.dataset || 'NASA PDS & Earthdata'}","Official Challenge Resource"`,
      `"Partner Telemetry - CSA","${site.partnerAgencies?.find(p => p.agency === 'CSA')?.sensor || 'RADARSAT-1 / RCM SAR'}","${site.partnerAgencies?.find(p => p.agency === 'CSA')?.dataset || 'CSA SAR Roughness'}","Official Challenge Resource"`,
      `"Partner Telemetry - ESA","${site.partnerAgencies?.find(p => p.agency === 'ESA')?.sensor || 'Sentinel-2 MSI'}","${site.partnerAgencies?.find(p => p.agency === 'ESA')?.dataset || 'ESA Open Science Catalog'}","Official Challenge Resource"`,
      `"Partner Telemetry - JAXA","${site.partnerAgencies?.find(p => p.agency === 'JAXA')?.sensor || 'G-Portal GCOM-C'}","${site.partnerAgencies?.find(p => p.agency === 'JAXA')?.dataset || 'JAXA G-Portal Index'}","Official Challenge Resource"`
    ].join("\r\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `TerraMatch_${site.id}_${target}_ISRU_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerHudToast(`TELEMETRY EXPORTED: ${site.id.toUpperCase()}_ISRU.CSV`);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-deepNavy text-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-earthCyan to-transparent opacity-40 z-50 pointer-events-none"></div>

      {/* HEADER */}
      <header className="h-16 px-5 border-b border-navyBorder bg-navyCard/90 backdrop-blur-md flex items-center justify-between z-40 relative shadow-lg">
        <div className="flex items-center space-x-3 min-w-[240px]">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-marsOrange/20 to-earthCyan/20 border border-white/10 shadow-inner">
            <div className="absolute inset-0 rounded-xl border border-marsOrange/40 animate-pulse-slow"></div>
            <svg className="w-5 h-5 text-earthCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-marsOrange border-2 border-navyCard"></div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-wider text-lg bg-gradient-to-r from-white via-moonSilver to-earthCyan bg-clip-text text-transparent">
                TerraMatch
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-earthCyan/10 text-earthCyan border border-earthCyan/30 font-semibold tracking-widest">
                v2.4 PRO
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <span className="text-slate-500">Mission by</span>
              <span className="text-marsOrange font-semibold tracking-wide">Astronative</span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                ONLINE
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-earthCyan transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Earth analogs (e.g., USA, Atacama, Death Valley, basalt)..."
              className="w-full pl-10 pr-24 py-2 bg-deepNavy/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-earthCyan focus:ring-2 focus:ring-earthCyan/20 transition-all font-sans shadow-inner"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center space-x-1.5">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-xs"
                >
                  ✕
                </button>
              )}
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                ESC
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 min-w-[260px] justify-end">
          <div className="flex items-center bg-deepNavy/90 p-1 rounded-xl border border-slate-700/70 shadow-inner">
            <button
              onClick={() => handleSwitchTarget('Earth')}
              className="relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              {selectedTarget === 'Earth' && (
                <motion.div
                  layoutId="activeTargetPill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-earthCyan shadow-md shadow-earthCyan/30"
                />
              )}
              <span className={`relative z-10 flex items-center space-x-1.5 ${
                selectedTarget === 'Earth' ? 'text-deepNavy font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}>
                <Globe size={14} strokeWidth={1.5} />
                <span className="hidden sm:inline">Earth</span>
              </span>
            </button>
            <button
              onClick={() => handleSwitchTarget('Moon')}
              className="relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              {selectedTarget === 'Moon' && (
                <motion.div
                  layoutId="activeTargetPill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-moonSilver shadow-md shadow-white/30"
                />
              )}
              <span className={`relative z-10 flex items-center space-x-1.5 ${
                selectedTarget === 'Moon' ? 'text-deepNavy font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}>
                <Moon size={14} strokeWidth={1.5} />
                <span className="hidden sm:inline">Moon</span>
              </span>
            </button>
            <button
              onClick={() => handleSwitchTarget('Mars')}
              className="relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              {selectedTarget === 'Mars' && (
                <motion.div
                  layoutId="activeTargetPill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-marsOrange shadow-md shadow-marsOrange/40"
                />
              )}
              <span className={`relative z-10 flex items-center space-x-1.5 ${
                selectedTarget === 'Mars' ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}>
                <Disc size={14} strokeWidth={1.5} />
                <span className="hidden sm:inline">Mars</span>
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              isAudioMuted 
                ? 'border-slate-800 text-slate-500 bg-slate-900/40' 
                : 'border-slate-700 text-slate-300 hover:text-earthCyan hover:border-earthCyan/40 bg-slate-800/40'
            }`}
          >
            {isAudioMuted ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-earthCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* 3-PANEL VIEWPORT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* COMPACT LEFT SIDEBAR */}
        <aside className="w-80 border-r border-navyBorder bg-navyCard/70 backdrop-blur-xl flex flex-col z-20 flex-shrink-0 select-none overflow-y-auto">
          <div className="p-3.5 border-b border-navyBorder/80 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-300">
                Define Analog Criteria
              </h2>
              <p className="text-[10px] text-slate-500">
                Filter terrestrial testbeds
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-mono text-earthCyan hover:text-cyan-300 hover:underline px-2 py-0.5 rounded bg-earthCyan/10 border border-earthCyan/20 transition-all"
            >
              Reset
            </button>
          </div>

          <div className="p-3.5 space-y-3.5 flex-1">
            {/* Checkboxes (Compact layout) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsOrange mr-1.5"></span>
                  Terrain Environments
                </label>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded-full">
                  {Object.values(activeCategories).filter(Boolean).length}/4
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {CATEGORIES.map(cat => {
                  const isChecked = !!activeCategories[cat.id];
                  const matchingCount = ANALOG_SITES.filter(s => s.category === cat.id).length;
                  return (
                    <label
                      key={cat.id}
                      className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-slate-800/80 border-slate-600/80 text-white'
                          : 'bg-deepNavy/40 border-slate-800/80 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat.id)}
                          className="w-3.5 h-3.5 rounded text-marsOrange bg-deepNavy border-slate-700 focus:ring-marsOrange focus:ring-offset-0 cursor-pointer accent-marsOrange"
                        />
                        <cat.Icon
                          size={14}
                          strokeWidth={1.5}
                          style={{ color: isChecked ? activeTargetObj.accentColor : '#64748b' }}
                        />
                        <span className="text-xs font-medium tracking-wide">
                          {cat.label}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isChecked ? 'bg-slate-700 text-slate-200' : 'bg-slate-900 text-slate-600'
                      }`}>
                        {matchingCount}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Range Slider (Above the fold) */}
            <div className="p-3 rounded-xl bg-deepNavy/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="similarity-slider" className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-earthCyan mr-1.5"></span>
                  Min Similarity Score
                </label>
                <div className="flex items-baseline space-x-1">
                  <span className="font-mono text-base font-bold" style={{ color: activeTargetObj.accentColor }}>
                    {minSimilarity}%
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">/ 100%</span>
                </div>
              </div>
              <input
                id="similarity-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={minSimilarity}
                onChange={(e) => setMinSimilarity(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1.5 px-0.5">
                <span>0% (All)</span>
                <span>50%</span>
                <span>75% (High)</span>
                <span>90%+ (Premier)</span>
              </div>
            </div>

            {/* Live Telemetry Card */}
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">ACTIVE TELEMETRY</span>
                <span className="text-emerald-400 font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                  LINK NOMINAL
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Available Sites:</span>
                <span className="text-slate-200 font-bold">{filteredSites.length} of {ANALOG_SITES.length}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Target Gravity:</span>
                <span className="text-slate-300">{activeTargetObj.gravity}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Radiation Load:</span>
                <span className="text-slate-300">{activeTargetObj.radiation}</span>
              </div>
            </div>

            {/* Sites List */}
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1.5 font-bold tracking-wider">
                Matching Analogs ({filteredSites.length})
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredSites.map(s => {
                  const score = getSiteScore(s, selectedTarget);
                  const isSelected = s.id === selectedSiteId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSelectSite(s.id)}
                      onMouseEnter={() => setHoveredSiteId(s.id)}
                      onMouseLeave={() => setHoveredSiteId(null)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-marsOrange text-white shadow-md'
                          : 'bg-deepNavy/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="font-semibold truncate text-[11px]">{s.name}</div>
                        <div className="text-[9px] text-slate-500 truncate">{s.category} • {s.country}</div>
                      </div>
                      <div className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700" style={{ color: activeTargetObj.accentColor }}>
                        {score}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CENTRAL AREA (DUAL 2D & 3D SIMULATION) */}
        <main className="flex-1 relative bg-deepNavy overflow-hidden flex flex-col">
          
          {/* Top HUD View Switcher */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="glass-panel px-3 py-1.5 rounded-xl flex items-center space-x-3 text-xs font-mono shadow-xl pointer-events-auto">
              <span className="flex items-center text-earthCyan font-semibold">
                <span className="w-2 h-2 rounded-full bg-earthCyan animate-ping mr-2"></span>
                GLOBAL SCANNER
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                {mapLayer === 'globe' 
                  ? 'PROJECTION: 3D HOLOGRAPHIC SPHERE' 
                  : mapLayer === 'topo'
                    ? 'SENSOR: NASA SRTM 30m / MOLA HYPSOMETRIC DEM'
                    : mapLayer === 'thermal'
                      ? 'SENSOR: SATELLITE THERMAL INFRARED RADIOMETER'
                      : 'PROJECTION: CYLINDRICAL MERCATOR'}
              </span>
              {mapLayer !== 'globe' && hoveredCountry && (
                <>
                  <span className="text-slate-600">|</span>
                  <span className="text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <span className="text-slate-500 font-normal">TERRITORY:</span>
                    <span className="text-white uppercase">{hoveredCountry}</span>
                  </span>
                </>
              )}
              {mapLayer !== 'globe' && mapTransform.scale > 1.05 && (
                <>
                  <span className="text-slate-600">|</span>
                  <span className="text-earthCyan font-semibold">
                    ZOOM: {mapTransform.scale.toFixed(1)}x
                  </span>
                </>
              )}
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-mono">{liveTime || 'UTC TELEMETRY'}</span>
            </div>

            <div className="glass-panel p-1 rounded-xl flex items-center space-x-1 shadow-xl pointer-events-auto">
              {[
                { id: 'grid', label: 'Grid', icon: null, activeClass: 'bg-earthCyan text-deepNavy' },
                { id: 'thermal', label: 'Thermal', icon: null, activeClass: 'bg-marsOrange text-white shadow-marsOrange/30' },
                { id: 'topo', label: 'Topo', icon: null, activeClass: 'bg-emerald-500 text-deepNavy' },
                { id: 'globe', label: '3D Globe', icon: '🌐', activeClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setMapLayer(mode.id)}
                  className="relative px-2.5 py-1 text-xs font-mono rounded-lg transition-colors flex items-center space-x-1"
                >
                  {mapLayer === mode.id && (
                    <motion.div
                      layoutId="activeMapModePill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className={`absolute inset-0 rounded-lg shadow-md ${mode.activeClass}`}
                    />
                  )}
                  <span className={`relative z-10 flex items-center space-x-1 ${
                    mapLayer === mode.id ? 'font-bold' : 'text-slate-400 hover:text-white'
                  }`}>
                    {mode.icon && <span>{mode.icon}</span>}
                    <span>{mode.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3D HOLOGRAPHIC GLOBE VIEW */}
          {mapLayer === 'globe' && (
            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#070b14]">
              <GlobeCanvas
                targetBody={activeTargetObj}
                sites={filteredSites}
                selectedSiteId={selectedSiteId}
                onPinClick={handleSelectSite}
                onHoverSite={setHoveredSiteId}
              />
              <div className="absolute bottom-6 left-6 pointer-events-none flex items-center space-x-4">
                <div className="glass-panel p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
                  <div className="text-earthCyan font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-earthCyan animate-ping mr-1.5"></span>
                    3D HOLOGRAPHIC PROJECTION
                  </div>
                  <div className="text-slate-400">Controls: Click & Drag to Rotate | Click Pins to Inspect</div>
                </div>
              </div>
            </div>
          )}

          {/* 2D MAP SIMULATION CONTAINER */}
          {mapLayer !== 'globe' && (
            <div 
              ref={mapContainerRef}
              className={`flex-1 w-full h-full relative cursor-crosshair overflow-hidden transition-all duration-700 ${
                mapLayer === 'thermal' ? 'bg-[#050811]' : mapLayer === 'topo' ? 'bg-[#060c18]' : 'bg-[#090e1b]'
              }`}
            >
              <div className={`absolute inset-0 ${mapLayer === 'topo' ? 'bg-topo-pattern opacity-60' : 'bg-dots opacity-40'}`}></div>
              <div className="absolute inset-0 bg-radar-grid opacity-30"></div>

              {/* Seamless Thermal Radar Sweep */}
              {mapLayer === 'thermal' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 animate-radar-spin pointer-events-none"
                    style={{
                      width: 'max(240vw, 240vh, 2600px)',
                      height: 'max(240vw, 240vh, 2600px)',
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 285deg, rgba(255, 107, 53, 0.45) 350deg, rgba(255, 107, 53, 0.95) 360deg)',
                      maskImage: 'radial-gradient(circle at center, black 0%, black 55%, rgba(0,0,0,0.4) 80%, transparent 95%)',
                      WebkitMaskImage: 'radial-gradient(circle at center, black 0%, black 55%, rgba(0,0,0,0.4) 80%, transparent 95%)',
                    }}
                  ></div>
                </div>
              )}

              {/* EXACT 2:1 ASPECT-RATIO MAP VIEWPORT (Lockstep SVG + Pin Overlay) */}
              <div className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none">
                <div 
                  ref={mapViewportRef}
                  onMouseDown={handleMapMouseDown}
                  className={`relative pointer-events-auto overflow-hidden select-none ${
                    isPanning ? 'cursor-grabbing' : mapTransform.scale > 1.05 ? 'cursor-grab' : 'cursor-crosshair'
                  }`}
                  style={mapSize.width > 0 ? {
                    width: `${mapSize.width}px`,
                    height: `${mapSize.height}px`,
                  } : {
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    aspectRatio: '2 / 1',
                  }}
                >
                  {/* TRANSFORMED LOCKSTEP CONTAINER (Exact geographic registration at all zoom levels) */}
                  <div
                    style={{
                      transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
                      transformOrigin: '0 0',
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                  >
                    {/* D3-GEO REAL WORLD MAP (NaturalEarth1 projection, viewBox 0 0 1000 500) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-auto select-none" preserveAspectRatio="none" viewBox="0 0 1000 500">

                      {/* D3-GEO REAL WORLD COASTLINES (NaturalEarth1 projection, viewBox 0 0 1000 500) */}
                      {/* Graticule coordinate grid */}
                      <path
                        d={GRAT_PATH_D}
                        fill="none"
                        stroke="rgba(255,255,255,0.055)"
                        strokeWidth="0.6"
                        strokeDasharray="none"
                        pointerEvents="none"
                      />
                      {/* Equator highlight */}
                      <path
                        d={EQUATOR_PATH_D}
                        fill="none"
                        stroke="#00B4D8"
                        strokeOpacity="0.35"
                        strokeWidth="1.4"
                        pointerEvents="none"
                      />
                      {/* Prime Meridian highlight */}
                      <path
                        d={MERIDIAN_PATH_D}
                        fill="none"
                        stroke="#FF6B35"
                        strokeOpacity="0.3"
                        strokeWidth="1.2"
                        pointerEvents="none"
                      />
                      {/* Real continent landmasses */}
                      <path
                        d={LAND_PATH_D}
                        fill={mapLayer === 'topo' ? '#071816' : '#0f172a'}
                        fillOpacity={mapLayer === 'topo' ? '0.98' : '0.86'}
                        stroke={mapLayer === 'topo' ? '#10B981' : '#00B4D8'}
                        strokeOpacity={mapLayer === 'topo' ? '0.9' : '0.32'}
                        strokeWidth={mapLayer === 'topo' ? (1.1 / mapTransform.scale) : '0.8'}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        pointerEvents="none"
                      />

                      {/* Topo Mode: Inner Elevation Step Outline (Hypsometric relief contour) */}
                      {mapLayer === 'topo' && (
                        <path
                          d={LAND_PATH_D}
                          fill="none"
                          stroke="#059669"
                          strokeOpacity="0.4"
                          strokeWidth={2.4 / mapTransform.scale}
                          strokeLinejoin="round"
                          strokeDasharray={`${4 / mapTransform.scale} ${2 / mapTransform.scale}`}
                          pointerEvents="none"
                        />
                      )}

                      {/* Individual Country Polygons with Subtle Hover Highlighting */}
                      <g className="country-polygons">
                        {COUNTRY_FEATURES.map(country => {
                          const isHovered = hoveredCountry === country.name;
                          return (
                            <path
                              key={country.id}
                              d={country.d}
                              fill={isHovered ? (mapLayer === 'topo' ? 'rgba(16, 185, 129, 0.22)' : 'rgba(0, 180, 216, 0.22)') : 'transparent'}
                              stroke="none"
                              pointerEvents="all"
                              className="cursor-pointer transition-colors duration-150"
                              onMouseEnter={() => setHoveredCountry(country.name)}
                              onMouseLeave={() => setHoveredCountry(null)}
                            />
                          );
                        })}
                      </g>

                      {/* Razor-sharp Internal Country Borders (Dynamically Scaled) */}
                      <path
                        d={COUNTRY_BORDERS_PATH_D}
                        fill="none"
                        stroke={mapLayer === 'topo' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(0, 180, 216, 0.28)'}
                        strokeWidth={0.55 / mapTransform.scale}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        pointerEvents="none"
                      />

                      {/* AUTHENTIC NASA SRTM / MOLA TOPOGRAPHIC CONTOURS (Geodesic circles at real site coords) */}
                      {mapLayer === 'topo' && (
                        <g fill="none" pointerEvents="none">
                          {filteredSites.map(site => {
                            const topo = SITE_TOPO_CONTOURS.find(t => t.id === site.id);
                            if (!topo) return null;
                            const isSelected = site.id === selectedSiteId;
                            const isHovered = site.id === hoveredSiteId;
                            const rScale = 1 / mapTransform.scale;
                            return (
                              <g key={`topo-contours-${site.id}`}>
                                {/* Outer contour ring (~300km) */}
                                <path
                                  d={topo.d3}
                                  stroke="#047857"
                                  strokeOpacity={isSelected || isHovered ? "0.6" : "0.28"}
                                  strokeWidth={0.8 * rScale}
                                  strokeDasharray={`${3 * rScale} ${3 * rScale}`}
                                />
                                {/* Middle contour ring (~200km) */}
                                <path
                                  d={topo.d2}
                                  stroke="#059669"
                                  strokeOpacity={isSelected || isHovered ? "0.75" : "0.42"}
                                  strokeWidth={1.0 * rScale}
                                  strokeDasharray={`${4 * rScale} ${2 * rScale}`}
                                />
                                {/* Inner summit contour ring (~100km, with elevation tint) */}
                                <path
                                  d={topo.d1}
                                  stroke="#10B981"
                                  strokeOpacity={isSelected || isHovered ? "0.95" : "0.65"}
                                  strokeWidth={1.3 * rScale}
                                  fill="rgba(16, 185, 129, 0.08)"
                                />
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* THERMAL MODE HEAT BLOOMS (using real projected pin coords) */}
                      {mapLayer === 'thermal' && (
                        <g pointerEvents="none">
                          {filteredSites.map(site => {
                            const pinCoords = PROJ_2D([site.lon, site.lat]);
                            if (!pinCoords) return null;
                            const [px, py] = pinCoords;
                            return (
                              <g key={`heat-${site.id}`}>
                                <circle cx={px} cy={py} r="38" fill="rgba(255, 107, 53, 0.1)" stroke="rgba(255, 107, 53, 0.28)" strokeWidth="1" strokeDasharray="3 3" />
                                <circle cx={px} cy={py} r="22" fill="rgba(251, 191, 36, 0.16)" stroke="rgba(251, 191, 36, 0.48)" strokeWidth="1.2" />
                                <circle cx={px} cy={py} r="9" fill="rgba(255, 255, 255, 0.32)" />
                                <text x={px + 13} y={py - 9} fill="#FF6B35" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                                  {`IR: ${site.thermalReading || '+35°C / 420 W/m²'}`}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}
                    </svg>

                    {/* Glowing Map Marker Pins — dynamically projected via d3.geoNaturalEarth1 & counter-scaled */}
                    {ANALOG_SITES.map(site => {
                      const pinCoords = PROJ_2D([site.lon, site.lat]);
                      if (!pinCoords) return null;
                      const [rawX, rawY] = pinCoords;
                      // Convert from 1000×500 viewBox to percentage of container
                      const leftPct = (rawX / 1000) * 100;
                      const topPct = (rawY / 500) * 100;

                      const isVisible = filteredSites.some(s => s.id === site.id);
                      const isSelected = site.id === selectedSiteId;
                      const isHovered = site.id === hoveredSiteId;
                      const score = getSiteScore(site, selectedTarget);
                      const elevation = getSiteElevation(site);
                      const opacityClass = isVisible ? 'opacity-100 scale-100' : 'opacity-20 scale-75 pointer-events-none';
                      const markerColor = score >= 90 ? '#FF6B35' : score >= 80 ? '#00B4D8' : '#E2E8F0';

                      return (
                        <div
                          key={site.id}
                          style={{
                            left: `${leftPct}%`,
                            top: `${topPct}%`,
                            transform: `translate(-50%, -50%) scale(${1 / Math.pow(mapTransform.scale, 0.65)})`,
                          }}
                          className={`absolute z-30 transition-all duration-300 ${opacityClass}`}
                        >
                          <div
                            className="relative group cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (panStateRef.current.hasMoved) return;
                              handleSelectSite(site.id);
                            }}
                            onMouseEnter={() => setHoveredSiteId(site.id)}
                            onMouseLeave={() => setHoveredSiteId(null)}
                          >
                            {mapLayer === 'topo' ? (
                              /* Sharp, compact topographic survey rings (replacing blurred orange halo) */
                              <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -inset-2 rounded-full border border-dashed border-emerald-500/50"></div>
                                <div className={`absolute -inset-1 rounded-full border ${isSelected ? 'border-white border-2' : 'border-emerald-400/80'}`}></div>
                                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-emerald-400/80"></span>
                                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-emerald-400/80"></span>
                                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-emerald-400/80"></span>
                                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-emerald-400/80"></span>
                              </div>
                            ) : (
                              <>
                                <div 
                                  className="absolute -inset-3 rounded-full animate-ping-slow pointer-events-none opacity-70"
                                  style={{ backgroundColor: isSelected ? '#FF6B35' : markerColor }}
                                ></div>
                                <div 
                                  className="absolute -inset-2 rounded-full blur-sm opacity-60 transition-opacity group-hover:opacity-100"
                                  style={{ backgroundColor: markerColor }}
                                ></div>
                              </>
                            )}

                            <div 
                              className={`relative w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform duration-200 shadow-2xl ${
                                mapLayer === 'topo'
                                  ? (isSelected 
                                      ? 'scale-125 border-white bg-emerald-500 shadow-emerald-500/80 text-deepNavy' 
                                      : 'border-emerald-400/90 bg-[#071816] group-hover:scale-110 shadow-emerald-950')
                                  : (isSelected 
                                      ? 'scale-125 border-white bg-marsOrange shadow-marsOrange/80' 
                                      : 'border-white/80 bg-slate-900 group-hover:scale-110')
                              }`}
                            >
                              {site.category === 'Volcanic' && <Flame size={13} strokeWidth={1.5} style={{ color: mapLayer === 'topo' ? (isSelected ? '#0B0F19' : '#34D399') : (isSelected ? '#fff' : activeTargetObj.accentColor) }} />}
                              {site.category === 'Arid Deserts' && <Sun size={13} strokeWidth={1.5} style={{ color: mapLayer === 'topo' ? (isSelected ? '#0B0F19' : '#34D399') : (isSelected ? '#fff' : activeTargetObj.accentColor) }} />}
                              {site.category === 'Polar/Ice' && <Snowflake size={13} strokeWidth={1.5} style={{ color: mapLayer === 'topo' ? (isSelected ? '#0B0F19' : '#a7f3d0') : (isSelected ? '#fff' : '#93c5fd') }} />}
                              {site.category === 'Caves/Lava Tubes' && <Circle size={13} strokeWidth={1.5} style={{ color: mapLayer === 'topo' ? (isSelected ? '#0B0F19' : '#6ee7b7') : (isSelected ? '#fff' : '#a78bfa') }} />}
                            </div>

                            {/* Topo Mode: Compact Elevation Readout Badge */}
                            {mapLayer === 'topo' && (
                              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#071816]/95 border border-emerald-500/70 shadow-xl pointer-events-none whitespace-nowrap z-40 backdrop-blur-sm">
                                <span className={`text-[8.5px] font-mono font-bold tracking-tight ${
                                  elevation.startsWith('-') ? 'text-rose-400' : 'text-emerald-300'
                                }`}>
                                  {elevation.startsWith('-') ? '▼' : '▲'} {elevation}
                                </span>
                              </div>
                            )}

                            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold whitespace-nowrap shadow-lg border transition-all ${
                              mapLayer === 'topo'
                                ? (isSelected ? 'bg-emerald-500 text-deepNavy border-white' : 'bg-[#071816]/95 text-emerald-300 border-emerald-600/70 group-hover:border-emerald-300')
                                : (isSelected ? 'bg-marsOrange text-white border-white' : 'bg-deepNavy/90 text-slate-200 border-slate-700/80 group-hover:border-earthCyan')
                            }`}>
                              {score}%
                            </div>

                            {/* Tooltip */}
                            {(isHovered || (isSelected && !activeSite)) && (
                              <div 
                                className="glass-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 p-3 rounded-2xl pointer-events-none z-50 animate-fadeIn"
                              >
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#0B0F19] border-r border-b border-earthCyan/30"></div>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <span className="text-[9px] font-mono uppercase tracking-wider text-earthCyan font-semibold">
                                      {site.category} • {site.country}
                                    </span>
                                    <h4 className="text-xs font-bold text-white leading-tight">
                                      {site.name}
                                    </h4>
                                    <div className="text-[9px] text-slate-400 mt-0.5 flex items-center justify-between">
                                      <span>{site.region}</span>
                                      <span className="text-emerald-400 font-mono font-semibold ml-2">Elev: {elevation}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2 pt-1.5 border-t border-slate-800">
                                  <div className="flex justify-between items-center text-[11px] font-mono mb-1">
                                    <span className="text-slate-300">Match to {selectedTarget}:</span>
                                    <span className="font-bold text-xs" style={{ color: activeTargetObj.accentColor }}>
                                      {score}%
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                    <div 
                                      className="h-full rounded-full transition-all duration-500"
                                      style={{
                                        width: `${score}%`,
                                        backgroundColor: activeTargetObj.accentColor,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sleek HUD Zoom Control Bar (Bottom-Right) */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center space-x-1.5 glass-panel p-1.5 rounded-xl border border-slate-700/80 shadow-2xl font-mono text-xs select-none pointer-events-auto">
                <div className="px-2 py-1 text-[11px] font-bold text-slate-300 bg-slate-900/80 rounded-lg border border-slate-800">
                  {mapTransform.scale.toFixed(1)}x
                </div>
                <button
                  onClick={handleZoomIn}
                  disabled={mapTransform.scale >= 6}
                  title="Zoom In (or Scroll Wheel Up)"
                  className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center border border-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ZoomIn size={14} strokeWidth={2} />
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={mapTransform.scale <= 1}
                  title="Zoom Out (or Scroll Wheel Down)"
                  className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center border border-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ZoomOut size={14} strokeWidth={2} />
                </button>
                <button
                  onClick={handleResetZoom}
                  disabled={mapTransform.scale === 1 && mapTransform.x === 0 && mapTransform.y === 0}
                  title="Reset View (1.0x)"
                  className="px-2.5 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-earthCyan flex items-center space-x-1 border border-slate-700 text-[10px] uppercase font-bold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <RotateCcw size={11} strokeWidth={2} />
                  <span>Reset View</span>
                </button>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR (Comparison Drawer) */}
        <AnimatePresence>
          {activeSite && (() => {
            const activeMetrics = getSiteMetricScores(activeSite, selectedTarget);
            const activeElev = getSiteElevation(activeSite);
            return (
              <motion.aside
                initial={{ x: "100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
                className="w-[440px] xl:w-[480px] border-l border-navyBorder bg-navyCard/95 backdrop-blur-2xl flex flex-col z-30 flex-shrink-0 shadow-2xl absolute lg:relative right-0 inset-y-0"
              >
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b border-navyBorder/90 flex items-center justify-between bg-deepNavy/60">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-marsOrange/20 border border-marsOrange/30 flex items-center justify-center text-marsOrange">
                    <BarChart2 size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white leading-tight">
                      {activeSite.name}
                    </h3>
                    <div className="text-xs font-mono text-marsOrange font-semibold tracking-wider">
                      Match Analysis • {selectedTarget} Reference
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSiteId(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-700"
                >
                  <X size={15} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                    <MapPin size={10} strokeWidth={1.5} /> {activeSite.coordinates}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    ▲ {activeElev} SRTM
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-earthCyan/10 text-earthCyan border border-earthCyan/30">
                    {activeSite.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                    {activeSite.country}
                  </span>
                </div>

                {/* Score Banner */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-deepNavy to-slate-900 border border-slate-800 flex items-center justify-between shadow-inner">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Overall Analogy Correlation
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Target: {activeSite.targetAnalogSite[selectedTarget]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-3xl font-extrabold" style={{ color: activeTargetObj.accentColor }}>
                      {activeMetrics.overall}%
                    </div>
                    <div className="text-[9px] font-mono text-emerald-400">HIGH FIDELITY</div>
                  </div>
                </div>

                {/* Comparative Visuals */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-deepNavy group/card">
                    <div className="h-32 w-full relative overflow-hidden flex flex-col justify-end p-2.5 bg-gradient-to-b from-slate-900 via-slate-800 to-cyan-950">
                      <img
                        src={activeSite.earthImage || `/images/earth/${activeSite.id}.jpg`}
                        alt={activeSite.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-earthCyan text-deepNavy w-fit shadow-md inline-block">
                          Earth Site
                        </span>
                        <div className="text-xs font-bold text-white mt-1 truncate drop-shadow-md">
                          {activeSite.name}
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5 text-[10px] font-mono text-slate-400 truncate bg-slate-900/90 border-t border-slate-800">
                      {activeSite.earthSiteDetails?.formation || activeSite.earthSiteDetails?.title}
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-deepNavy group/card">
                    <div 
                      className="h-32 w-full relative overflow-hidden flex flex-col justify-end p-2.5"
                      style={{
                        background: selectedTarget === 'Mars' 
                          ? 'linear-gradient(to bottom, #1f0b06, #3d140a, #782612)' 
                          : 'linear-gradient(to bottom, #0f131a, #1a202c, #334155)'
                      }}
                    >
                      <img
                        key={`${activeSite.id}-${selectedTarget}`}
                        src={
                          selectedTarget === 'Mars'
                            ? (activeSite.marsImage || `/images/planetary/${activeSite.id}-mars.jpg`)
                            : (activeSite.moonImage || `/images/planetary/${activeSite.id}-moon.jpg`)
                        }
                        alt={`${selectedTarget} Analog Target`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                        <span 
                          className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-white w-fit shadow-md inline-block"
                          style={{ backgroundColor: activeTargetObj.accentColor }}
                        >
                          {selectedTarget} Site
                        </span>
                        <div className="text-xs font-bold text-white mt-1 truncate drop-shadow-md">
                          {activeSite.targetAnalogSite[selectedTarget]}
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5 text-[10px] font-mono text-slate-400 truncate bg-slate-900/90 border-t border-slate-800">
                      {activeSite.targetSiteDetails?.[selectedTarget]?.formation || 
                       activeSite.targetSiteDetails?.[selectedTarget]?.title || 
                       (activeSite.targetSiteDetails?.title?.toLowerCase().includes(selectedTarget.toLowerCase()) 
                         ? (activeSite.targetSiteDetails.formation || activeSite.targetSiteDetails.title) 
                         : `${selectedTarget}: ${activeSite.targetAnalogSite[selectedTarget]}`)}
                    </div>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Metrics Breakdown
                  </h4>
                  <div className="space-y-1 bg-deepNavy/60 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5"><Mountain size={12} strokeWidth={1.5} className="text-marsOrange" /> Geological Match</span>
                      <span className="font-mono font-bold text-marsOrange">
                        {activeMetrics.geological}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-marsOrange"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeMetrics.geological}%` }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 bg-deepNavy/60 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5"><Thermometer size={12} strokeWidth={1.5} className="text-earthCyan" /> Climate Match</span>
                      <span className="font-mono font-bold text-earthCyan">
                        {activeMetrics.climate}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-earthCyan"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeMetrics.climate}%` }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 bg-deepNavy/60 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5"><Activity size={12} strokeWidth={1.5} className="text-moonSilver" /> Terrain Match</span>
                      <span className="font-mono font-bold text-moonSilver">
                        {activeMetrics.terrain}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-moonSilver"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeMetrics.terrain}%` }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {activeSite.scientificRationale}
                </div>

                {/* Official Partner Telemetry Sources */}
                <div className="space-y-2 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Radio size={12} className="text-earthCyan" />
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Partner Telemetry Sources
                      </h4>
                    </div>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-semibold">
                      4 AGENCIES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 pt-0.5">
                    {activeSite.partnerAgencies && activeSite.partnerAgencies.map((p, idx) => {
                      const theme = getAgencyTheme(p.agency);
                      return (
                        <div
                          key={p.agency || idx}
                          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border ${theme.border} ${theme.bg} transition-colors hover:brightness-110`}
                          title={`${p.agency}: ${p.dataset || p.sensor}`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${theme.tagBg} shrink-0`}>
                              {p.agency}
                            </span>
                            <span className={`text-[10px] font-mono ${theme.text} font-medium truncate`}>
                              {p.sensor}
                            </span>
                          </div>
                          <span className="text-[8.5px] font-mono text-slate-500 shrink-0">
                            VERIFIED
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 border-t border-navyBorder bg-deepNavy/90">
                <button
                  onClick={() => setIsResourcesModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-marsOrange to-amber-500 text-white shadow-xl shadow-marsOrange/30 hover:shadow-marsOrange/50 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>View Resources Report</span>
                </button>
              </div>
            </div>
          </motion.aside>
        );
      })()}
      </AnimatePresence>
      </div>

      {/* RESOURCES REPORT MODAL (WORKING CSV EXPORT) */}
      <AnimatePresence>
        {isResourcesModalOpen && activeSite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              <div className="p-4 border-b border-navyBorder flex flex-col gap-2.5 bg-deepNavy/90">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-earthCyan/15 text-earthCyan border border-earthCyan/30 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Radio size={9} /> NASA SPACE APPS CHALLENGE
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">PARTNER TELEMETRY</span>
                    </div>
                    <h2 className="text-base font-bold text-white mt-1">
                      Resources & ISRU Analysis Report • {activeSite.name} ({activeSite.country})
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsResourcesModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center shrink-0 ml-3"
                  >
                    <X size={15} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Compact Partner Telemetry HUD Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold mr-1 flex items-center gap-1">
                    <Radio size={10} className="text-earthCyan" />
                    Official Partner Telemetry:
                  </span>
                  {activeSite.partnerAgencies && activeSite.partnerAgencies.map((p, idx) => {
                    const theme = getAgencyTheme(p.agency);
                    return (
                      <span
                        key={p.agency || idx}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[9.5px] font-mono ${theme.border} ${theme.bg} ${theme.text}`}
                        title={`${p.agency}: ${p.dataset || p.sensor}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                        <strong className="font-bold">{p.agency}</strong>
                        <span className="opacity-90">{p.sensor}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="p-5 overflow-y-auto space-y-4 text-xs">

                {/* ── RECHARTS SECTION ── */}
                {(() => {
                  const scores = getSiteMetricScores(activeSite, selectedTarget);
                  const earthColor = '#00B4D8';
                  const targetColor = selectedTarget === 'Mars' ? '#FF6B35' : selectedTarget === 'Moon' ? '#E2E8F0' : '#00B4D8';
                  const radarData = [
                    { axis: 'Mineralogy',       earth: scores.geological || 0, target: Math.max(10, (scores.geological || 0) - 8) },
                    { axis: 'Thermal Δ',         earth: scores.climate   || 0, target: Math.max(10, (scores.climate   || 0) - 10) },
                    { axis: 'Terrain',           earth: scores.terrain   || 0, target: Math.max(10, (scores.terrain   || 0) - 6) },
                    { axis: 'Volatile Ret.',     earth: Math.min(100, (scores.geological || 0) + 5), target: Math.max(10, (scores.geological || 0) - 14) },
                    { axis: 'Rad. Shielding',    earth: Math.min(100, (scores.climate   || 0) + 3), target: Math.max(10, (scores.climate   || 0) - 18) },
                  ];
                  const spectralData = [
                    { nm: '400',  earth: 0.12, orbital: 0.09 },
                    { nm: '550',  earth: 0.26, orbital: 0.19 },
                    { nm: '700',  earth: 0.38, orbital: 0.31 },
                    { nm: '900',  earth: 0.44, orbital: 0.40 },
                    { nm: '1200', earth: 0.51, orbital: 0.47 },
                    { nm: '1500', earth: 0.60, orbital: 0.54 },
                    { nm: '1800', earth: 0.55, orbital: 0.50 },
                    { nm: '2100', earth: 0.47, orbital: 0.44 },
                    { nm: '2500', earth: 0.35, orbital: 0.33 },
                  ];
                  const tooltipStyle = {
                    backgroundColor: '#0B0F19', border: '1px solid #1E293B',
                    borderRadius: '8px', fontSize: '10px', fontFamily: 'JetBrains Mono, monospace',
                    color: '#e2e8f0'
                  };
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* RadarChart */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                          <BarChart2 size={10} /> Multi-Axis Comparison
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                          <RadarChart data={radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.08)" />
                            <PolarAngleAxis dataKey="axis" tick={{ fill: '#94a3b8', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }} />
                            <Radar name="Earth Analog" dataKey="earth" stroke={earthColor} fill={earthColor} fillOpacity={0.18} strokeWidth={1.5} />
                            <Radar name={`${selectedTarget} Body`} dataKey="target" stroke={targetColor} fill={targetColor} fillOpacity={0.12} strokeWidth={1.5} strokeDasharray="4 2" />
                            <ReTooltip contentStyle={tooltipStyle} />
                          </RadarChart>
                        </ResponsiveContainer>
                        <div className="flex gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[9px] font-mono" style={{ color: earthColor }}><span className="w-3 h-0.5 rounded inline-block" style={{ backgroundColor: earthColor }} /> Earth Analog</span>
                          <span className="flex items-center gap-1 text-[9px] font-mono" style={{ color: targetColor }}><span className="w-3 h-0.5 rounded inline-block border-dashed" style={{ borderTop: `1.5px dashed ${targetColor}` }} /> {selectedTarget}</span>
                        </div>
                      </div>

                      {/* AreaChart – Spectral Absorption */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                          <Activity size={10} /> Spectral Absorption (nm)
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                          <AreaChart data={spectralData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="earthGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={earthColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={earthColor} stopOpacity={0.02} />
                              </linearGradient>
                              <linearGradient id="orbitalGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={targetColor} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={targetColor} stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="nm" tick={{ fill: '#64748b', fontSize: 8, fontFamily: 'JetBrains Mono, monospace' }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 8, fontFamily: 'JetBrains Mono, monospace' }} tickLine={false} axisLine={false} domain={[0, 0.7]} />
                            <ReTooltip contentStyle={tooltipStyle} formatter={(v, n) => [v.toFixed(2), n]} />
                            <Area type="monotone" dataKey="earth" name="Earth Sample" stroke={earthColor} strokeWidth={1.5} fill="url(#earthGrad)" dot={false} />
                            <Area type="monotone" dataKey="orbital" name="Orbital Baseline" stroke={targetColor} strokeWidth={1.5} fill="url(#orbitalGrad)" dot={false} strokeDasharray="4 2" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  );
                })()}

                {/* ── RESOURCE CARDS ── */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <strong className="text-earthCyan block mb-1">Water Ice / Volatiles:</strong>
                  {activeSite.resources.waterIceGrade}
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <strong className="text-marsOrange block mb-1">Regolith Simulant Grade:</strong>
                  {activeSite.resources.regolithSimulant}
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Power & Solar Flux:</strong>
                  {activeSite.resources.solarAvailability}
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <strong className="text-red-400 block mb-1">Operational Hazards:</strong>
                  {activeSite.resources.keyRisks}
                </div>

                {/* ── PARTNER DATA CITATIONS ── */}
                {activeSite.openDataSources && activeSite.openDataSources.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-mono text-earthCyan font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Satellite size={11} className="text-earthCyan" />
                        Space Agency Telemetry & Open Data Repositories
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">NASA • CSA • ESA • JAXA</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[10.5px]">
                      {activeSite.openDataSources.map((citation, idx) => {
                        const agencyKey = citation.split(':')[0].trim();
                        const theme = getAgencyTheme(agencyKey);
                        return (
                          <div key={idx} className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${theme.tagBg} shrink-0 mt-0.5`}>
                              {agencyKey}
                            </span>
                            <span className="text-slate-300 leading-tight">
                              {citation.substring(citation.indexOf(':') + 1).trim()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-navyBorder bg-deepNavy/90 flex justify-between items-center">
                <button
                  onClick={() => handleExportCSV(activeSite, selectedTarget)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono transition-colors flex items-center space-x-1.5"
                >
                  <Download size={13} strokeWidth={1.5} className="text-earthCyan" />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={() => setIsResourcesModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-earthCyan text-deepNavy font-bold text-xs"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLASSMORPHISM HUD TOAST NOTIFICATIONS */}
      <Toaster position="bottom-right" />
    </div>
  );
}
