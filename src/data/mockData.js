export const TARGET_BODIES = {
  "Mars": {
    "id": "Mars",
    "name": "Mars (Ares Prime)",
    "symbol": "🔴",
    "accentColor": "#FF6B35",
    "glowColor": "rgba(255, 107, 53, 0.35)",
    "primarySite": "Jezero Crater & Jezero Delta",
    "atmosphere": "0.006 atm (95.3% CO2)",
    "gravity": "3.72 m/s² (0.38g)",
    "tempRange": "-125°C to +20°C",
    "radiation": "240-300 mSv/yr",
    "description": "Primary target for bio-signature detection, regolith drilling, and long-duration rover endurance testing."
  },
  "Moon": {
    "id": "Moon",
    "name": "Moon (Luna Artemis)",
    "symbol": "🌕",
    "accentColor": "#E2E8F0",
    "glowColor": "rgba(226, 232, 240, 0.35)",
    "primarySite": "Shackleton Crater & South Pole-Aitken",
    "atmosphere": "Hard Vacuum (<10⁻¹² torr)",
    "gravity": "1.62 m/s² (0.166g)",
    "tempRange": "-246°C to +121°C",
    "radiation": "380-450 mSv/yr",
    "description": "Lunar Gateway and Artemis basecamp analog. Evaluates volatile ice cold traps, basaltic lava tube shelters, and abrasive regolith wear."
  },
  "Earth": {
    "id": "Earth",
    "name": "Earth (Orbital Baseline)",
    "symbol": "🌍",
    "accentColor": "#00B4D8",
    "glowColor": "rgba(0, 180, 216, 0.35)",
    "primarySite": "Global Terrestrial Geosphere",
    "atmosphere": "1.00 atm (78% N2, 21% O2)",
    "gravity": "9.81 m/s² (1.0g)",
    "tempRange": "-89°C to +56°C",
    "radiation": "2.4 mSv/yr (Surface)",
    "description": "Terrestrial reference standard against which all extraterrestrial analog deviations and biosignature models are calibrated."
  }
};

export const ANALOG_SITES = [
  {
    "id": "atacama",
    "name": "Atacama Desert (Yungay)",
    "country": "Chile",
    "aliases": [
      "Chile",
      "CL",
      "South America",
      "Antofagasta",
      "Yungay",
      "Andes",
      "Atacama"
    ],
    "region": "Antofagasta Region, Northern Chile",
    "coordinates": "24°05′ S, 69°55′ W",
    "lat": -24.08,
    "lon": -69.91,
    "category": "Arid Deserts",
    "subcategories": [
      "Hyper-Arid Core",
      "Salt Polygons",
      "Perchlorate Soil"
    ],
    "thermalReading": "+39°C / 480 W/m²",
    "xPercent": 30.6,
    "yPercent": 63.4,
    "matchScores": {
      "Mars": {
        "overall": 96,
        "geological": 97,
        "climate": 98,
        "terrain": 93
      },
      "Moon": {
        "overall": 72,
        "geological": 79,
        "climate": 46,
        "terrain": 76
      },
      "Earth": {
        "overall": 100,
        "geological": 99,
        "climate": 95,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Gale Crater & Mount Sharp Sulfate Unit",
      "Moon": "Oceanus Procellarum Desiccated Regolith",
      "Earth": "Hyper-Arid Evaporite Benchmark"
    },
    "earthSiteDetails": {
      "title": "Yungay Hyper-Arid Nitrates & Halite Crust",
      "formation": "Cenozoic Playa & Anhydrite Evaporite Pavements",
      "mineralogy": "Halite, Anhydrite, Gypsum, Sodium Chlorates, Perchlorates",
      "spectralBand": "SRTM DEM 30m & AVIRIS-NG Hyperspectral 0.4–2.5 µm",
      "sensorResolution": "0.15 m/px Drone RGB/TIR"
    },
    "targetSiteDetails": {
      "title": "Mars: Gale Crater Lacustrine Sulfate Succession",
      "formation": "Hesperian Lacustrine Evaporation & Eolian Dunes",
      "mineralogy": "Magnesium Sulfates, Hematite, Calcium Perchlorates",
      "spectralBand": "CRISM Target HRL000040FF & THEMIS Thermal IR Band 9",
      "elevation": "-4,450 m (Gale Floor)",
      "Mars": {
        "title": "Mars: Gale Crater Lacustrine Sulfate Succession",
        "formation": "Hesperian Lacustrine Evaporation & Eolian Dunes",
        "mineralogy": "Magnesium Sulfates, Hematite, Calcium Perchlorates",
        "spectralBand": "CRISM Target HRL000040FF & THEMIS Thermal IR Band 9",
        "elevation": "-4,450 m (Gale Floor)",
        "image": "/images/planetary/atacama-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Oceanus Procellarum Desiccated Regolith",
        "formation": "Imbrian Flood Basalt Regolith & Desiccated Dust Plain",
        "mineralogy": "Anorthite, Ilmenite, Glassy Agglutinates, Pyroxene",
        "spectralBand": "LOLA Roughness & LROC High-Resolution Imagery",
        "elevation": "-2,100 m",
        "image": "/images/planetary/atacama-moon.jpg"
      }
    },
    "scientificRationale": "Widely verified by NASA Ames and ESA as Earth’s closest organic-decay and hyper-aridity analog for Mars. Extreme soil perchlorate levels match Curiosity SAM and Phoenix WCL findings. Earth limitations: 1.0g gravity versus Mars 0.38g, thick atmospheric convective cooling, and shielding against galactic cosmic rays by Earth’s magnetosphere.",
    "extremophileSuitability": "98% (Chroococcidiopsis inside Halite Cracks)",
    "radiationAnalogy": "95% (Extreme High-Altitude Solar UV-B/C Exposure)",
    "roverMobilityScore": "94% (Hardened Salt Polygon Traction & Loose Silt)",
    "resources": {
      "waterIceGrade": "Grade D (Deliquescent Salts & Hydrated Minerals, <1.8% moisture)",
      "regolithSimulant": "ATACAMA-PAL-2 (Parity: 97.2% to MMS-1)",
      "solarAvailability": "345 cloudless days/yr (Peak PV 12.8 kWh/m²/day)",
      "keyRisks": "Severe diurnal delta-T (36°C swing), aggressive salt corrosion on metallic wheel actuators"
    },
    "earthImage": "/images/earth/atacama.jpg",
    "marsImage": "/images/planetary/atacama-mars.jpg",
    "moonImage": "/images/planetary/atacama-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/atacama-mars.jpg",
      "Moon": "/images/planetary/atacama-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM Target HRL000040FF, THEMIS Band 9) & NASA Earthdata Worldview",
      "CSA: CSA RADARSAT-1 / RCM (C-Band SAR Surface Roughness & Subsurface Penetration)",
      "ESA: ESA Copernicus Sentinel-2 MSI (NDVI < 0.02) & ESA Open Science Catalog",
      "JAXA: JAXA G-Portal (GCOM-C SGLI & GPM Hyper-Aridity Precipitation Calibration)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO CRISM & THEMIS TIR",
        "dataset": "NASA PDS & Earthdata Worldview"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA SAR Terrain Roughness"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C & GPM",
        "dataset": "JAXA Hyper-Aridity Benchmark"
      }
    ]
  },
  {
    "id": "mcmurdo",
    "name": "McMurdo Dry Valleys",
    "country": "Antarctica",
    "aliases": [
      "Antarctica",
      "AQ",
      "South Pole",
      "Victoria Land",
      "Taylor Valley",
      "Wright Valley",
      "McMurdo"
    ],
    "region": "Victoria Land, Antarctica",
    "coordinates": "77°28′ S, 162°31′ E",
    "lat": -77.47,
    "lon": 162.52,
    "category": "Polar/Ice",
    "subcategories": [
      "Hyper-Arid Cold Desert",
      "Katabatic Wind Corridor",
      "Ground Ice Permafrost"
    ],
    "thermalReading": "-36°C / 125 W/m²",
    "xPercent": 95.1,
    "yPercent": 93,
    "matchScores": {
      "Mars": {
        "overall": 95,
        "geological": 94,
        "climate": 99,
        "terrain": 92
      },
      "Moon": {
        "overall": 81,
        "geological": 86,
        "climate": 64,
        "terrain": 84
      },
      "Earth": {
        "overall": 100,
        "geological": 98,
        "climate": 96,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Phoenix Lander Vastitas Borealis Polygon Plains",
      "Moon": "Hermite Crater Cryogenic Traps",
      "Earth": "Cryospheric Polar Hyper-Arid Baseline"
    },
    "earthSiteDetails": {
      "title": "Beacon Sandstone & Subsurface Cryo-Permafrost",
      "formation": "Katabatic-Scoured Moraines with Subsurface Dry Permafrost",
      "mineralogy": "Quartz Arenite, Gypsum Crusts, Halite Efflorescence, Dry Ice Sinter",
      "spectralBand": "CryoSat-2 SARIn & Landsat-8 Band 10 TIR",
      "sensorResolution": "0.05 m/px Polar UAV Photogrammetry"
    },
    "targetSiteDetails": {
      "title": "Mars: Vastitas Borealis Thermal Contraction Tundra",
      "formation": "Subsurface Regolith Ground Ice Patterned Ground",
      "mineralogy": "Basaltic Sand, Phyllosilicates, Water-Ice Matrix",
      "spectralBand": "MOLA Topography, HiRISE ESP_013894_2485, CRISM Hyperspectral",
      "elevation": "-4,120 m",
      "Mars": {
        "title": "Mars: Vastitas Borealis Thermal Contraction Tundra",
        "formation": "Subsurface Regolith Ground Ice Patterned Ground",
        "mineralogy": "Basaltic Sand, Phyllosilicates, Water-Ice Matrix",
        "spectralBand": "MOLA Topography, HiRISE ESP_013894_2485, CRISM Hyperspectral",
        "elevation": "-4,120 m",
        "image": "/images/planetary/mcmurdo-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Hermite Crater Cryogenic Traps",
        "formation": "Permanently Shadowed Cryogenic Trap with Cold Permafrost Regolith",
        "mineralogy": "Anorthositic Regolith, Hydrogen Ice Traps, Troilite",
        "spectralBand": "LEND Neutron Detector & Diviner Thermal Radiometer",
        "elevation": "-3,850 m",
        "image": "/images/planetary/mcmurdo-moon.jpg"
      }
    },
    "scientificRationale": "Katabatic winds reaching 320 km/h strip all snow, exposing cold-dry permafrost and polygon cracking that precisely mirror Phoenix lander sites on Mars. Earth limitations: 1.0g gravity accelerates sediment settling, 1 bar air pressure prevents ice sublimation directly into vacuum, and terrestrial ozone absorbs ionizing cosmic rays.",
    "extremophileSuitability": "97% (Cryptoendolithic Fungi & Nematodes in Porous Sandstone)",
    "radiationAnalogy": "91% (Antarctic Polar UV Enhancement)",
    "roverMobilityScore": "92% (Cryoturbated Patterned Ground Navigation)",
    "resources": {
      "waterIceGrade": "Grade A+ (Subsurface Massive Cryogenic Ice <8cm Depth, 88% purity)",
      "regolithSimulant": "MCM-ICE-01 (Parity: 96.5% to Phoenix Soil)",
      "solarAvailability": "24h Polar Summer Sunlight / 0h Winter Polar Night",
      "keyRisks": "Sub-zero mechanical embrittlement, extreme katabatic gusts (>280 km/h)"
    },
    "earthImage": "/images/earth/mcmurdo.jpg",
    "marsImage": "/images/planetary/mcmurdo-mars.jpg",
    "moonImage": "/images/planetary/mcmurdo-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/mcmurdo-mars.jpg",
      "Moon": "/images/planetary/mcmurdo-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA Earthdata Worldview & MRO HiRISE (Permafrost Patterned Ground Analogs)",
      "CSA: CSA RADARSAT-1 / RCM (Antarctic Ice Sheet Roughness & Taylor Valley SAR)",
      "ESA: ESA Copernicus Sentinel-2 & CryoSat-2 (ESA Open Science Catalog)",
      "JAXA: JAXA G-Portal (AMSR2 / GCOM-W Snow Cover & Thermal Radiometer Indices)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA Earthdata",
        "sensor": "MRO HiRISE & LRO LOLA",
        "dataset": "NASA PDS Cryosphere Baselines"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Ice Sheet & Permafrost SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 & CryoSat-2",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "AMSR2 / GCOM-W Cryosphere",
        "dataset": "JAXA Snow & Moisture Telemetry"
      }
    ]
  },
  {
    "id": "haughton",
    "name": "Haughton Crater (Devon Island)",
    "country": "Canada",
    "aliases": [
      "Canada",
      "CA",
      "Canadian Arctic",
      "Nunavut",
      "Devon Island",
      "Haughton-Mars Project"
    ],
    "region": "Devon Island, Nunavut, Canada",
    "coordinates": "75°23′ N, 89°41′ W",
    "lat": 75.38,
    "lon": -89.68,
    "category": "Polar/Ice",
    "subcategories": [
      "Impact Crater",
      "Shocked Dolomite",
      "Hydrothermal Paleosystem"
    ],
    "thermalReading": "-28°C / 158 W/m²",
    "xPercent": 25.1,
    "yPercent": 8.1,
    "matchScores": {
      "Mars": {
        "overall": 94,
        "geological": 96,
        "climate": 90,
        "terrain": 95
      },
      "Moon": {
        "overall": 87,
        "geological": 92,
        "climate": 66,
        "terrain": 90
      },
      "Earth": {
        "overall": 100,
        "geological": 98,
        "climate": 94,
        "terrain": 98
      }
    },
    "targetAnalogSite": {
      "Mars": "Jezero Crater & Gale Impact Rim Breccias",
      "Moon": "Schrödinger Basin Impact Melt Sheets",
      "Earth": "High Arctic Impact Permafrost Baseline"
    },
    "earthSiteDetails": {
      "title": "Devon Island 23-km Impact Structure",
      "formation": "39 Ma Meteoritic Shatter Cones, Impact Breccia & Permafrost",
      "mineralogy": "Shocked Dolomite, Impact Glass, Anhydrite, Hydrothermal Clays",
      "spectralBand": "Airborne LiDAR, RADARSAT-2 Polarimetric SAR",
      "sensorResolution": "0.12 m/px Orthomosaic"
    },
    "targetSiteDetails": {
      "title": "Mars: Jezero Crater Impact Rim & Fan Complex",
      "formation": "Noachian Impact Crater with Hydrothermal Alteration & River Inflow",
      "mineralogy": "Mg-Carbonates, Fe/Mg Smectites, Impact Melts",
      "spectralBand": "CRISM Targeted Scans, HiRISE Stereo Topography, MOLA DEM",
      "elevation": "-2,500 m",
      "Mars": {
        "title": "Mars: Jezero Crater Impact Rim & Fan Complex",
        "formation": "Noachian Impact Crater with Hydrothermal Alteration & River Inflow",
        "mineralogy": "Mg-Carbonates, Fe/Mg Smectites, Impact Melts",
        "spectralBand": "CRISM Targeted Scans, HiRISE Stereo Topography, MOLA DEM",
        "elevation": "-2,500 m",
        "image": "/images/planetary/haughton-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Schrödinger Basin Impact Melt Sheets",
        "formation": "Complex Impact Melt Breccia & Peak Ring Uplift",
        "mineralogy": "Anorthositic Impact Melt, Shocked Norite, Pyroxene",
        "spectralBand": "LROC NAC Stereo DEM & Kaguya Multiband Imager",
        "elevation": "-1,500 m",
        "image": "/images/planetary/haughton-moon.jpg"
      }
    },
    "scientificRationale": "Operational base of NASA Haughton-Mars Project (HMP) and CSA. Features hydrothermally altered impact breccias identical to ancient Noachian crater rims in a barren, frost-shattered polar desert. Earth limitations: Terrestrial atmospheric density (101.3 kPa), Earth surface gravity (1.0g), and summer precipitation cycles.",
    "extremophileSuitability": "94% (Endolithic Cyanobacteria in Shocked Dolomite)",
    "radiationAnalogy": "82% (High Arctic Snow Albedo & Low Sun Elevation)",
    "roverMobilityScore": "95% (Boulder Fields, Gully Traverses & Shatter Cone Outcrops)",
    "resources": {
      "waterIceGrade": "Grade A (Pristine Permafrost Ground Ice, 78% purity)",
      "regolithSimulant": "HMP-Devon-Breccia (Parity: 95.4% to Jezero MMS-1)",
      "solarAvailability": "24h Polar Summer / Seasonal Dark Period",
      "keyRisks": "Extreme logistical isolation, cryoturbation mud pits during short thaws"
    },
    "earthImage": "/images/earth/haughton.jpg",
    "marsImage": "/images/planetary/haughton-mars.jpg",
    "moonImage": "/images/planetary/haughton-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/haughton-mars.jpg",
      "Moon": "/images/planetary/haughton-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS (MRO HiRISE, THEMIS & LRO LOLA Impact Crater Topography)",
      "CSA: CSA RADARSAT-1 / RCM (Devon Island Permafrost & Impact Breccia SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (High-Latitude Arctic Surface Reflectance)",
      "JAXA: JAXA G-Portal (GCOM-C Snow Cover & Arctic Precipitation Indices)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO HiRISE & LRO LOLA",
        "dataset": "NASA PDS Crater Geomorphology"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Devon Island SAR Roughness"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog #ARC-71"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C Snow & Precip",
        "dataset": "JAXA G-Portal Arctic Validation"
      }
    ]
  },
  {
    "id": "icelandic_highlands",
    "name": "Icelandic Highlands (Askja / Holuhraun)",
    "country": "Iceland",
    "aliases": [
      "Iceland",
      "IS",
      "Askja",
      "Holuhraun",
      "Dyngjufjoll",
      "Odadahraun",
      "Vatnajokull"
    ],
    "region": "Highlands of Iceland, Northeast District",
    "coordinates": "64°58′ N, 19°01′ W",
    "lat": 64.96,
    "lon": -19.02,
    "category": "Volcanic",
    "subcategories": [
      "Basaltic Tephra",
      "Glaciovolcanic Sandur",
      "Palagonite Tuff"
    ],
    "thermalReading": "+4°C / 275 W/m²",
    "xPercent": 44.7,
    "yPercent": 13.9,
    "matchScores": {
      "Mars": {
        "overall": 92,
        "geological": 97,
        "climate": 84,
        "terrain": 93
      },
      "Moon": {
        "overall": 85,
        "geological": 91,
        "climate": 60,
        "terrain": 89
      },
      "Earth": {
        "overall": 100,
        "geological": 96,
        "climate": 87,
        "terrain": 95
      }
    },
    "targetAnalogSite": {
      "Mars": "Cerberus Fossae & Elysium Planitia Basalts",
      "Moon": "Mare Nubium Young Eruptive Centers",
      "Earth": "Glaciovolcanic Rifting Standard"
    },
    "earthSiteDetails": {
      "title": "Holuhraun 2014 Basalt Flow & Askja Caldera",
      "formation": "Recent Subaerial Fissure Basalts & Glassy Ash Plains",
      "mineralogy": "Tholeiitic Basalt, Sideromelane Glass, Palagonite, Olivine, Augite",
      "spectralBand": "Sentinel-2 VNIR-SWIR & Airborne Hyperspectral Eagle/Hawk",
      "sensorResolution": "0.25 m/px DEM from TanDEM-X"
    },
    "targetSiteDetails": {
      "title": "Mars: Elysium Planitia Flood Basalts",
      "formation": "Amazonian Volcanic Plain Interacting with Ground Ice",
      "mineralogy": "Glassy Low-Silica Tholeiite, Pyroxene, Iron Oxides",
      "spectralBand": "THEMIS Night TIR, HiRISE PSP_007802_1835, MOLA Altimetry",
      "elevation": "-1,850 m",
      "Mars": {
        "title": "Mars: Elysium Planitia Flood Basalts",
        "formation": "Amazonian Volcanic Plain Interacting with Ground Ice",
        "mineralogy": "Glassy Low-Silica Tholeiite, Pyroxene, Iron Oxides",
        "spectralBand": "THEMIS Night TIR, HiRISE PSP_007802_1835, MOLA Altimetry",
        "elevation": "-1,850 m",
        "image": "/images/planetary/icelandic_highlands-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Mare Nubium Young Eruptive Centers",
        "formation": "Young Basaltic Volcanic Plain & Pyroclastic Mantling",
        "mineralogy": "Low-Ti Basalt, Glass Beads, Olivine-Rich Agglutinates",
        "spectralBand": "Clementine UV/VIS & LROC Narrow Angle Camera",
        "elevation": "-1,650 m",
        "image": "/images/planetary/icelandic_highlands-moon.jpg"
      }
    },
    "scientificRationale": "Used by Apollo astronauts for lunar geology and now by NASA/ESA for Mars rover test campaigns (SAND-E). Basaltic compositions, palagonite tephra, and subglacial volcanic mounds closely mimic Elysium and Gusev crater volcanics. Earth limitations: Abundant atmospheric moisture, 1g gravity fluid dynamics, and vegetation border proximity.",
    "extremophileSuitability": "88% (Pioneer Chemolithoautotrophs on Fresh Basalts)",
    "radiationAnalogy": "76% (High-Latitude Cloud Albedo)",
    "roverMobilityScore": "91% (Abrasive Glassy Tephra Dunes & Jagged Aa Lava Traverses)",
    "resources": {
      "waterIceGrade": "Grade B (Glacial Outwash Channels & Buried Glacier Ice)",
      "regolithSimulant": "ISLAND-BASALT-2 (Parity: 94.6% to Martian Regolith MMS-2)",
      "solarAvailability": "Moderate with frequent cloud cover and high summer daylengths",
      "keyRisks": "Flash glacial outburst floods (jökulhlaup), abrasive volcanic ash intrusion into bearings"
    },
    "earthImage": "/images/earth/icelandic_highlands.jpg",
    "marsImage": "/images/planetary/icelandic_highlands-mars.jpg",
    "moonImage": "/images/planetary/icelandic_highlands-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/icelandic_highlands-mars.jpg",
      "Moon": "/images/planetary/icelandic_highlands-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM Palagonite Spectra) & NASA Earthdata Worldview (THEMIS TIR)",
      "CSA: CSA RADARSAT-1 / RCM (Askja/Holuhraun Basalt Lava Flow SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (Volcanic Ash & Fresh Basalt Absorption)",
      "JAXA: JAXA G-Portal (ALOS PALSAR-2 Interferometry & GCOM-C Surface Thermal)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO CRISM & THEMIS TIR",
        "dataset": "NASA PDS Volcanic Basalt Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Basalt Roughness Mapping"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog (SAND-E)"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR-2 & GCOM-C",
        "dataset": "JAXA Volcano InSAR Telemetry"
      }
    ]
  },
  {
    "id": "rio_tinto",
    "name": "Rio Tinto",
    "country": "Spain",
    "aliases": [
      "Spain",
      "ES",
      "Iberian Peninsula",
      "Andalusia",
      "Huelva",
      "Iberian Pyrite Belt"
    ],
    "region": "Andalusia, Southwestern Spain",
    "coordinates": "37°42′ N, 6°33′ W",
    "lat": 37.7,
    "lon": -6.55,
    "category": "Arid Deserts",
    "subcategories": [
      "Acid Mine Drainage",
      "Iron Sulfate System",
      "Jarosite Geochemistry"
    ],
    "thermalReading": "+29°C / 395 W/m²",
    "xPercent": 48.2,
    "yPercent": 29.1,
    "matchScores": {
      "Mars": {
        "overall": 93,
        "geological": 99,
        "climate": 72,
        "terrain": 88
      },
      "Moon": {
        "overall": 65,
        "geological": 72,
        "climate": 42,
        "terrain": 68
      },
      "Earth": {
        "overall": 100,
        "geological": 97,
        "climate": 89,
        "terrain": 92
      }
    },
    "targetAnalogSite": {
      "Mars": "Meridiani Planum Jarosite & Hematite Spherules",
      "Moon": "Oceanus Procellarum Ilmenite Pavements",
      "Earth": "Hyper-Acidic Iron-Sulfate Bio-Repository"
    },
    "earthSiteDetails": {
      "title": "Iberian Pyrite Belt Gossan & Ferruginous Stream",
      "formation": "Deep Subsurface Chemolithoautotrophic Pyrite Bio-Oxidation",
      "mineralogy": "Jarosite, Goethite, Hematite, Copiapite, Schwertmannite",
      "spectralBand": "Airborne HySpex 400-2500nm & In-situ Raman Spectroscopy",
      "sensorResolution": "0.10 m/px UAV Spectral Mapping"
    },
    "targetSiteDetails": {
      "title": "Mars: Meridiani Planum Burns Formation",
      "formation": "Acidic Ground-Water Evaporite System with Diagenetic Spherules",
      "mineralogy": "Jarosite, Grey Hematite Blueberries, Hydrated Sulfates",
      "spectralBand": "CRISM Sulfate Bands, Opportunity Mössbauer & Mini-TES",
      "elevation": "-1,420 m",
      "Mars": {
        "title": "Mars: Meridiani Planum Burns Formation",
        "formation": "Acidic Ground-Water Evaporite System with Diagenetic Spherules",
        "mineralogy": "Jarosite, Grey Hematite Blueberries, Hydrated Sulfates",
        "spectralBand": "CRISM Sulfate Bands, Opportunity Mössbauer & Mini-TES",
        "elevation": "-1,420 m",
        "image": "/images/planetary/rio_tinto-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Oceanus Procellarum Ilmenite Pavements",
        "formation": "High-Titanium Basalt Regolith with Sulfide Enrichment",
        "mineralogy": "High-Ti Ilmenite (FeTiO3), Troilite, Anorthosite",
        "spectralBand": "LOLA Slope Maps & Lunar Prospector Gamma-Ray",
        "elevation": "-2,300 m",
        "image": "/images/planetary/rio_tinto-moon.jpg"
      }
    },
    "scientificRationale": "Primary terrestrial geochemical analog for the Opportunity rover’s discovery of jarosite and hematite spherules at Meridiani Planum. Demonstrates how chemolithotrophs thrive in hyper-acidic (pH ~2), iron/sulfur-saturated conditions without sunlight. Earth limitations: Wet Mediterranean climate cycle, biological competition from plants, 1g gravitational fluid dynamics.",
    "extremophileSuitability": "99% (Acidithiobacillus ferrooxidans & Acidiphilium)",
    "radiationAnalogy": "74% (Mid-Latitude Solar Insolation)",
    "roverMobilityScore": "86% (Clay Slurry Banks & Crusted Gossan Terraces)",
    "resources": {
      "waterIceGrade": "Grade E (Heavy-Metal Acidic Aqueous Brines only, pH 1.8–2.3)",
      "regolithSimulant": "RIO-JAROSITE-1 (Parity: 98.1% to Meridiani Sulfate Soil)",
      "solarAvailability": "High Southern European sunshine (>300 days/yr)",
      "keyRisks": "Hyper-corrosive acid mud (pH < 2.0) dissolving rover seals and wire harnesses"
    },
    "earthImage": "/images/earth/rio_tinto.jpg",
    "marsImage": "/images/planetary/rio_tinto-mars.jpg",
    "moonImage": "/images/planetary/rio_tinto-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/rio_tinto-mars.jpg",
      "Moon": "/images/planetary/rio_tinto-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM Jarosite & Hematite Spectral Baselines) & NASA Earthdata",
      "CSA: CSA RADARSAT-1 / RCM (Iberian Pyrite Belt Geomorphology & Drainage SAR)",
      "ESA: ESA Copernicus Sentinel-2 (Ferric Oxide & Gossan Mineral Mapping)",
      "JAXA: JAXA G-Portal (GCOM-C Hydrological Runoff & Vegetation Index Calibration)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO CRISM Jarosite Spectra",
        "dataset": "NASA PDS Acid-Sulfate Repository"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Hydro-Geomorphology SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI Iron Oxide",
        "dataset": "ESA Open Science Catalog #ES-09"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C & GPM Hydrology",
        "dataset": "JAXA Vegetation Stress Telemetry"
      }
    ]
  },
  {
    "id": "death_valley",
    "name": "Death Valley / Mojave Desert",
    "country": "USA",
    "aliases": [
      "USA",
      "United States",
      "America",
      "US",
      "California",
      "CA",
      "Badwater",
      "Mojave"
    ],
    "region": "California, USA (Great Basin / Mojave)",
    "coordinates": "36°30′ N, 117°05′ W",
    "lat": 36.5,
    "lon": -117.08,
    "category": "Arid Deserts",
    "subcategories": [
      "Hyper-Thermal Playa",
      "Alluvial Fans",
      "Basaltic Volcanic Fields"
    ],
    "thermalReading": "+51°C / 545 W/m²",
    "xPercent": 17.5,
    "yPercent": 29.7,
    "matchScores": {
      "Mars": {
        "overall": 88,
        "geological": 91,
        "climate": 81,
        "terrain": 93
      },
      "Moon": {
        "overall": 74,
        "geological": 82,
        "climate": 53,
        "terrain": 78
      },
      "Earth": {
        "overall": 100,
        "geological": 95,
        "climate": 91,
        "terrain": 94
      }
    },
    "targetAnalogSite": {
      "Mars": "Eberswalde Inverted River Delta & Gale Alluvial Fans",
      "Moon": "Deslandres Basin Desiccated Floor",
      "Earth": "Extensional Graben Evaporite Baseline"
    },
    "earthSiteDetails": {
      "title": "Badwater Salt Polygons & Ubehebe Craters",
      "formation": "Pleistocene Lake Manly Evaporation & Maar Hydrovolcanism",
      "mineralogy": "Halite, Borates, Anhydrite, Basaltic Lapilli, Carbonates",
      "spectralBand": "AVIRIS Classic & Master Thermal Airborne Sensor",
      "sensorResolution": "0.20 m/px Orthomosaic"
    },
    "targetSiteDetails": {
      "title": "Mars: Gale Crater Peace Vallis Alluvial Fan",
      "formation": "Hesperian High-Energy Fluvial Wash & Gravel Conglomerates",
      "mineralogy": "Basaltic Sand, Saponite Clay, Feldspars, Sulfates",
      "spectralBand": "HiRISE Digital Terrain Models, ChemCam LIBS Spectra, MOLA Topography",
      "elevation": "-4,400 m",
      "Mars": {
        "title": "Mars: Gale Crater Peace Vallis Alluvial Fan",
        "formation": "Hesperian High-Energy Fluvial Wash & Gravel Conglomerates",
        "mineralogy": "Basaltic Sand, Saponite Clay, Feldspars, Sulfates",
        "spectralBand": "HiRISE Digital Terrain Models, ChemCam LIBS Spectra, MOLA Topography",
        "elevation": "-4,400 m",
        "image": "/images/planetary/death_valley-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Deslandres Basin Desiccated Floor",
        "formation": "Pre-Imbrian Degraded Crater Floor with Eolian Regolith",
        "mineralogy": "Brecciated Anorthosite, Shocked Feldspar, Impact Glass",
        "spectralBand": "LROC WAC Global Mosaic & Kaguya Terrain Camera",
        "elevation": "-1,100 m",
        "image": "/images/planetary/death_valley-moon.jpg"
      }
    },
    "scientificRationale": "Extensively utilized by NASA JPL engineers to test Curiosity and Perseverance rover mobility, autonomous hazard avoidance, and slip estimation over steep gravel slopes and salt crusts. Earth limitations: Dense Earth atmosphere driving severe convective heat transfer, 1.0g load bearing on wheels, and rainstorm events.",
    "extremophileSuitability": "87% (Endolithic Halophiles & Hypolithic Algae)",
    "radiationAnalogy": "85% (High Desert Direct Insolation)",
    "roverMobilityScore": "96% (High-Slope Sand Dunes, Deep Alluvial Gravel & Crust Fractures)",
    "resources": {
      "waterIceGrade": "Grade E (Deep Subsurface Hypersaline Brines only)",
      "regolithSimulant": "MOJAVE-MMS-Sim (Parity: 92.8% to Martian Basaltic Drift)",
      "solarAvailability": "Exceptional (>12.0 kWh/m²/day peak irradiance)",
      "keyRisks": "Extreme thermal dissipation limits for battery electronics (>52°C ambient)"
    },
    "earthImage": "/images/earth/death_valley.jpg",
    "marsImage": "/images/planetary/death_valley-mars.jpg",
    "moonImage": "/images/planetary/death_valley-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/death_valley-mars.jpg",
      "Moon": "/images/planetary/death_valley-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA Earthdata / Worldview & MRO THEMIS (Badwater Salt Flat Thermal Inertia)",
      "CSA: CSA RADARSAT-1 / RCM (Playa Salt Polygon Micro-Topography SAR)",
      "ESA: ESA Copernicus Sentinel-2 (Hyper-Arid Evaporite Basin Reflectance)",
      "JAXA: JAXA G-Portal (GCOM-C Surface Radiance & GPM Zero-Precipitation Benchmarks)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA Earthdata",
        "sensor": "THEMIS TIR & Worldview",
        "dataset": "NASA Thermal Inertia Registry"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Salt Crust Micro-Topography"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C & GPM",
        "dataset": "JAXA Aridity & Heat Index"
      }
    ]
  },
  {
    "id": "wadi_rum",
    "name": "Wadi Rum",
    "country": "Jordan",
    "aliases": [
      "Jordan",
      "JO",
      "Middle East",
      "Valley of the Moon",
      "Aqaba",
      "Arabian Desert"
    ],
    "region": "Aqaba Governorate, Southern Jordan",
    "coordinates": "29°34′ N, 35°25′ E",
    "lat": 29.57,
    "lon": 35.42,
    "category": "Arid Deserts",
    "subcategories": [
      "Ferruginous Sandstone",
      "Yardangs & Canyons",
      "Eolian Sand Sheets"
    ],
    "thermalReading": "+41°C / 495 W/m²",
    "xPercent": 59.8,
    "yPercent": 33.6,
    "matchScores": {
      "Mars": {
        "overall": 91,
        "geological": 94,
        "climate": 86,
        "terrain": 94
      },
      "Moon": {
        "overall": 71,
        "geological": 77,
        "climate": 45,
        "terrain": 75
      },
      "Earth": {
        "overall": 100,
        "geological": 96,
        "climate": 92,
        "terrain": 95
      }
    },
    "targetAnalogSite": {
      "Mars": "Valles Marineris Chasmata & Candor Mensa",
      "Moon": "Rima Hadley Escarpment Sand Sheets",
      "Earth": "Arid Quartz-Arenite Cuesta Benchmark"
    },
    "earthSiteDetails": {
      "title": "Disi & Umm Ishrin Sandstone Formations",
      "formation": "Cambrian Fluvial Quartz-Arenite with Iron-Oxide Coatings",
      "mineralogy": "Quartz, Hematite/Goethite Varnish, Kaolinite, Heavy Minerals",
      "spectralBand": "ASTER VNIR/SWIR & Sentinel-2 Band 8A Iron Oxide Index",
      "sensorResolution": "0.30 m/px Spaceborne Imagery"
    },
    "targetSiteDetails": {
      "title": "Mars: Candor Chasma Layered Sediments",
      "formation": "Massive Sulfate and Iron Oxide Layered Deposits within Graben",
      "mineralogy": "Crystalline Hematite, Polyhydrated Sulfates, Basalt Sand",
      "spectralBand": "CRISM Targeted Observations & HiRISE Color Imagery (ESP_018241_1740)",
      "elevation": "-3,200 m",
      "Mars": {
        "title": "Mars: Candor Chasma Layered Sediments",
        "formation": "Massive Sulfate and Iron Oxide Layered Deposits within Graben",
        "mineralogy": "Crystalline Hematite, Polyhydrated Sulfates, Basalt Sand",
        "spectralBand": "CRISM Targeted Observations & HiRISE Color Imagery (ESP_018241_1740)",
        "elevation": "-3,200 m",
        "image": "/images/planetary/wadi_rum-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Rima Hadley Escarpment Sand Sheets",
        "formation": "Hadley Rille Fault Scarp & Fine Regolith Avalanche Slopes",
        "mineralogy": "Agglutinate-Rich Mare Basalt Regolith, Micro-Breccia",
        "spectralBand": "Apollo 15 Metric Camera & LROC Photometry",
        "elevation": "-1,800 m",
        "image": "/images/planetary/wadi_rum-moon.jpg"
      }
    },
    "scientificRationale": "Known as \"The Valley of the Moon\", its soaring red sandstone massifs, eolian bedforms, and iron-oxide patinas provide the premiere visual, structural, and eolian rover-traversing analog for canyon systems on Mars like Valles Marineris. Earth limitations: Earth atmospheric pressure, precipitation erosion channels, and 1g gravity slope angles.",
    "extremophileSuitability": "84% (Cyanobacterial Endoliths in Sandstone Pores)",
    "radiationAnalogy": "88% (High UV Arid Plateaus)",
    "roverMobilityScore": "94% (Soft Eolian Sand Trapping & Talus Slope Traverses)",
    "resources": {
      "waterIceGrade": "Grade E (Dry Sand System, <0.4% hygroscopic moisture)",
      "regolithSimulant": "RUM-RED-1 (Parity: 93.9% to Martian Eolian Dust)",
      "solarAvailability": "High desert direct-normal irradiance (>320 days/yr)",
      "keyRisks": "Severe wheel entrapment in unconsolidated windblown drifts, sand infiltration"
    },
    "earthImage": "/images/earth/wadi_rum.jpg",
    "marsImage": "/images/planetary/wadi_rum-mars.jpg",
    "moonImage": "/images/planetary/wadi_rum-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/wadi_rum-mars.jpg",
      "Moon": "/images/planetary/wadi_rum-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (HiRISE Sand Dune Slipfaces & CRISM Iron Oxide Coatings)",
      "CSA: CSA RADARSAT-1 / RCM (Aeolian Sand Sheet Subsurface Penetration SAR)",
      "ESA: ESA Copernicus Sentinel-2 (Red Sandstone Spectrometry & Mineralogy)",
      "JAXA: JAXA G-Portal (GCOM-C Aerosol Optical Depth & Hyper-Arid Vegetation Zeroes)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO HiRISE & CRISM",
        "dataset": "NASA PDS Mars Dune Field Parity"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Subsurface Aeolian SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C & SGLI",
        "dataset": "JAXA Aerosol & Desert Telemetry"
      }
    ]
  },
  {
    "id": "svalbard",
    "name": "Svalbard (AMASE Site)",
    "country": "Norway",
    "aliases": [
      "Norway",
      "NO",
      "Arctic",
      "Spitsbergen",
      "AMASE",
      "Bockfjorden",
      "Longyearbyen"
    ],
    "region": "Spitsbergen, Svalbard Archipelago, Norway",
    "coordinates": "78°13′ N, 15°38′ E",
    "lat": 78.22,
    "lon": 15.63,
    "category": "Polar/Ice",
    "subcategories": [
      "Subglacial Carbonates",
      "Ultramafic Xenoliths",
      "Polygonal Tundra"
    ],
    "thermalReading": "-22°C / 185 W/m²",
    "xPercent": 54.3,
    "yPercent": 6.5,
    "matchScores": {
      "Mars": {
        "overall": 93,
        "geological": 97,
        "climate": 91,
        "terrain": 91
      },
      "Moon": {
        "overall": 80,
        "geological": 85,
        "climate": 60,
        "terrain": 83
      },
      "Earth": {
        "overall": 100,
        "geological": 97,
        "climate": 93,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Nili Fossae Carbonates & Jezero Olivine Plains",
      "Moon": "South Pole Shackleton Rim Permafrost",
      "Earth": "High Arctic Permafrost Igneous Baseline"
    },
    "earthSiteDetails": {
      "title": "Bockfjorden Volcanic Complex Carbonate Blebs",
      "formation": "Quaternary Basalt Eruptions through Permafrost with Mantle Xenoliths",
      "mineralogy": "Magnesite, Siderite, Forsteritic Olivine, Mantle Spinel, Permafrost",
      "spectralBand": "EnMAP Hyperspectral & Airborne TIR Sensors",
      "sensorResolution": "0.10 m/px Cryo-UAV Photogrammetry"
    },
    "targetSiteDetails": {
      "title": "Mars: Nili Fossae Olivine-Carbonate Region",
      "formation": "Noachian Crust Hydrothermally Altered in Cold Neutral-Alkaline Water",
      "mineralogy": "Fe/Mg Smectite Clays, Magnesite, Olivine-Rich Basalts",
      "spectralBand": "CRISM Hyperspectral Data Cube (HRL0000285A) & OMEGA NIR",
      "elevation": "-800 m",
      "Mars": {
        "title": "Mars: Nili Fossae Olivine-Carbonate Region",
        "formation": "Noachian Crust Hydrothermally Altered in Cold Neutral-Alkaline Water",
        "mineralogy": "Fe/Mg Smectite Clays, Magnesite, Olivine-Rich Basalts",
        "spectralBand": "CRISM Hyperspectral Data Cube (HRL0000285A) & OMEGA NIR",
        "elevation": "-800 m",
        "image": "/images/planetary/svalbard-mars.jpg"
      },
      "Moon": {
        "title": "Moon: South Pole Shackleton Rim Permafrost",
        "formation": "Lunar South Pole Permanently Shadowed Cold Trap Rim",
        "mineralogy": "Cryogenic Anorthosite Regolith, Subsurface Hydrogen Sinks",
        "spectralBand": "LOLA Polar Elevation (0.5m/px) & Mini-RF Radar",
        "elevation": "+1,200 m (Shackleton Rim)",
        "image": "/images/planetary/svalbard-moon.jpg"
      }
    },
    "scientificRationale": "Core testing grounds of the Arctic Mars Analog Svalbard Expedition (AMASE). The unique carbonate deposits in the Bockfjorden volcanic complex form inside cold permafrost, mimicking the mysterious ALH84001 martian meteorite carbonate globules and Nili Fossae outcrops. Earth limitations: 1.0g gravity, ocean maritime buffering, oxygenated atmosphere.",
    "extremophileSuitability": "95% (Psychrophilic Methanogens & Cryo-Lichen)",
    "radiationAnalogy": "83% (High Arctic Ozone Depletion & Low Solar Elevation)",
    "roverMobilityScore": "89% (Glacial Moraine Scree & Wet Clay Patterned Ground)",
    "resources": {
      "waterIceGrade": "Grade A (Perennial Glacier Cores & Frozen Subsurface Permafrost)",
      "regolithSimulant": "SVAL-AMASE-01 (Parity: 96.0% to Nili Fossae Carbonate Regolith)",
      "solarAvailability": "24h Polar Summer Day / 24h Dark Winter Polar Night",
      "keyRisks": "Arctic gale whiteouts, permafrost solifluction lobes compromising lander legs"
    },
    "earthImage": "/images/earth/svalbard.jpg",
    "marsImage": "/images/planetary/svalbard-mars.jpg",
    "moonImage": "/images/planetary/svalbard-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/svalbard-mars.jpg",
      "Moon": "/images/planetary/svalbard-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM Carbonate Xenoliths & HiRISE Permafrost Networks)",
      "CSA: CSA RADARSAT-1 / RCM (Bockfjorden Basalt & Glacial Terrain SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 & ESA Open Science Catalog (AMASE Expedition Ground Truth)",
      "JAXA: JAXA G-Portal (AMSR2 Cryosphere & Snow Fraction Telemetry)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO CRISM & HiRISE",
        "dataset": "NASA PDS AMASE Mars Analogs"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Glacial Basalt Roughness"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 & Open Sci Cat",
        "dataset": "ESA AMASE Expedition Datasets"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "AMSR2 Cryosphere",
        "dataset": "JAXA Snow Fraction Telemetry"
      }
    ]
  },
  {
    "id": "ladakh",
    "name": "Ladakh (High-Altitude Cold Desert)",
    "country": "India",
    "aliases": [
      "India",
      "IN",
      "Himalayas",
      "Tibetan Plateau",
      "Tso Kar",
      "Puga Valley",
      "Leh"
    ],
    "region": "Ladakh Union Territory, Northwest Himalayas, India",
    "coordinates": "34°09′ N, 77°35′ E",
    "lat": 34.15,
    "lon": 77.58,
    "category": "Polar/Ice",
    "subcategories": [
      "High-Altitude Cold Desert",
      "Permafrost Saline Lakes",
      "High UV Flux"
    ],
    "thermalReading": "-14°C / 210 W/m²",
    "xPercent": 71.5,
    "yPercent": 31,
    "matchScores": {
      "Mars": {
        "overall": 94,
        "geological": 95,
        "climate": 96,
        "terrain": 92
      },
      "Moon": {
        "overall": 82,
        "geological": 86,
        "climate": 65,
        "terrain": 85
      },
      "Earth": {
        "overall": 100,
        "geological": 97,
        "climate": 95,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Planum Boreum High-Altitude Margins & Elysium Permafrost",
      "Moon": "Lunar South Pole Cold Regolith Highlands",
      "Earth": "Alpine Cold-Desert Permafrost Standard"
    },
    "earthSiteDetails": {
      "title": "Tso Kar Basin & Puga Geothermal Valley",
      "formation": "Quaternary Glaciolacustrine Sediments at 4,500 m Altitude",
      "mineralogy": "Borax, Thenardite, Mirabilite, Permafrost Silt, Basalt Detritus",
      "spectralBand": "ISRO AVIRIS-NG & Cartosat-3 Stereo DEM",
      "sensorResolution": "0.28 m/px Orthomosaic"
    },
    "targetSiteDetails": {
      "title": "Mars: North Polar Erg & Margin Sediments",
      "formation": "Cryogenic Sand Sheets Intercalated with Hydrated Salts",
      "mineralogy": "Sulfates, Halides, Basaltic Sand, Carbon Dioxide Frost Sinks",
      "spectralBand": "MOLA Topography, HiRISE ESP_016723_2650, CRISM 1.0–2.5 µm",
      "elevation": "+3,500 m (Volcanic Plateau)",
      "Mars": {
        "title": "Mars: North Polar Erg & Margin Sediments",
        "formation": "Cryogenic Sand Sheets Intercalated with Hydrated Salts",
        "mineralogy": "Sulfates, Halides, Basaltic Sand, Carbon Dioxide Frost Sinks",
        "spectralBand": "MOLA Topography, HiRISE ESP_016723_2650, CRISM 1.0–2.5 µm",
        "elevation": "+3,500 m (Volcanic Plateau)",
        "image": "/images/planetary/ladakh-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Lunar South Pole Cold Regolith Highlands",
        "formation": "Anorthositic Regolith Highlands at Cryogenic Temperatures",
        "mineralogy": "Pure Anorthosite (Plagioclase), Agglutinates, Pyroxene",
        "spectralBand": "Diviner TIR Thermal Maps & LROC Polar NAC Mosaic",
        "elevation": "+2,400 m",
        "image": "/images/planetary/ladakh-moon.jpg"
      }
    },
    "scientificRationale": "Priority Pick selected by space research teams for its unique combination of extreme UV radiation, hypobaric thin atmosphere (altitude >4,500m), freezing desert temperatures, and hypersaline borate playas mirroring Mars highland permafrost. Earth limitations: 1.0g gravity, high cosmic ray deflection from Earth magnetic field, and seasonal monsoon margins.",
    "extremophileSuitability": "96% (UV-Resistant Polyextremophiles & Halophiles in Tso Kar)",
    "radiationAnalogy": "94% (Exceptional High-Altitude UV-B/C Flux due to 4.5km elevation)",
    "roverMobilityScore": "91% (High-Altitude Loose Scree, Salt Crusts & Cryoturbated Ground)",
    "resources": {
      "waterIceGrade": "Grade B+ (Subsurface Glacier Ice & High-Altitude Permafrost Core)",
      "regolithSimulant": "LADAKH-MARS-1 (Parity: 95.7% to Martian High-Altitude Soil)",
      "solarAvailability": "High direct insolation with >300 clear cloudless days per year",
      "keyRisks": "Hypobaric thin air affecting cooling fans, extreme sub-zero night plunges (-35°C)"
    },
    "earthImage": "/images/earth/ladakh.jpg",
    "marsImage": "/images/planetary/ladakh-mars.jpg",
    "moonImage": "/images/planetary/ladakh-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/ladakh-mars.jpg",
      "Moon": "/images/planetary/ladakh-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA Earthdata / Worldview & MRO THEMIS (High-Altitude Permafrost Thermal Modeling)",
      "CSA: CSA RADARSAT-1 / RCM (Himalayan Regolith & Glacio-Fluvial SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (High-Altitude Desert Scree & Mineral Spectrometry)",
      "JAXA: JAXA G-Portal (GCOM-W AMSR2 Soil Moisture & Cryospheric Index)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA Earthdata",
        "sensor": "MRO THEMIS & PDS",
        "dataset": "NASA High-Altitude Cold Baselines"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Glacio-Fluvial Regolith SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-W AMSR2",
        "dataset": "JAXA Cryospheric Soil Moisture"
      }
    ]
  },
  {
    "id": "namib_desert",
    "name": "Namib Desert (Gobabeb)",
    "country": "Namibia",
    "aliases": [
      "Namibia",
      "NA",
      "Southern Africa",
      "Sossusvlei",
      "Gobabeb",
      "Skeleton Coast"
    ],
    "region": "Erongo & Hardap Regions, Western Namibia",
    "coordinates": "24°45′ S, 15°17′ E",
    "lat": -24.75,
    "lon": 15.28,
    "category": "Arid Deserts",
    "subcategories": [
      "Linear Megadunes",
      "Yardang Fields",
      "Hyper-Arid Gravel Reg"
    ],
    "thermalReading": "+37°C / 460 W/m²",
    "xPercent": 54.2,
    "yPercent": 63.8,
    "matchScores": {
      "Mars": {
        "overall": 93,
        "geological": 92,
        "climate": 94,
        "terrain": 96
      },
      "Moon": {
        "overall": 73,
        "geological": 78,
        "climate": 47,
        "terrain": 79
      },
      "Earth": {
        "overall": 100,
        "geological": 96,
        "climate": 93,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Olympia Undae & Bagnold Dune Fields in Gale Crater",
      "Moon": "Mare Insularum Fine Regolith Seas",
      "Earth": "Hyper-Arid Coastal Erg Benchmark"
    },
    "earthSiteDetails": {
      "title": "Sossusvlei Linear Megadunes & Kuiseb Yardangs",
      "formation": "Oldest Desert on Earth (55 Ma) with Quartz-Magnetite Eolian Dynamics",
      "mineralogy": "Quartz Sand with Heavy Hematite/Magnetite Coatings, Calcrete, Gypsum",
      "spectralBand": "Sentinel-2 SWIR & TanDEM-X Digital Elevation Model",
      "sensorResolution": "0.20 m/px Satellite SAR/Optical Fusion"
    },
    "targetSiteDetails": {
      "title": "Mars: Bagnold Dunes (Gale Crater Interior)",
      "formation": "Active Eolian Dune Field with Complex Slipface Saltation",
      "mineralogy": "Olivine-rich Basaltic Sand, Magnetite, Augite, Hematite",
      "spectralBand": "HiRISE Dynamic Monitoring (ESP_045431_1755), CRISM Eolian Indices",
      "elevation": "-4,480 m",
      "Mars": {
        "title": "Mars: Bagnold Dunes (Gale Crater Interior)",
        "formation": "Active Eolian Dune Field with Complex Slipface Saltation",
        "mineralogy": "Olivine-rich Basaltic Sand, Magnetite, Augite, Hematite",
        "spectralBand": "HiRISE Dynamic Monitoring (ESP_045431_1755), CRISM Eolian Indices",
        "elevation": "-4,480 m",
        "image": "/images/planetary/namib_desert-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Mare Insularum Fine Regolith Seas",
        "formation": "Low-Albedo Mature Regolith with Extensive Impact Brecciation",
        "mineralogy": "Nanophase Metallic Iron (npFe0), Agglutinates, Ilmenite",
        "spectralBand": "Kaguya Spectral Profiler & LROC Photometric Models",
        "elevation": "-1,900 m",
        "image": "/images/planetary/namib_desert-moon.jpg"
      }
    },
    "scientificRationale": "Priority Pick for studying large-scale planetary eolian dunes and slipfaces. The hyper-arid mega-dunes and yardangs are direct morphological twins to the active Bagnold Dunes studied by Curiosity in Gale Crater. Earth limitations: 1.0g gravity influences saltation grain trajectory, and marine fog intrusions from the Benguela current add moisture.",
    "extremophileSuitability": "91% (Hypolithic Cyanobacteria under Quartz Pebbles)",
    "radiationAnalogy": "92% (High Equatorial Arid UV Exposure)",
    "roverMobilityScore": "97% (Extreme Rover Wheel Sinkage, Slump Hazards & Sand Grouser Testing)",
    "resources": {
      "waterIceGrade": "Grade E (Advective Fog Deposition only, <0.2% soil moisture)",
      "regolithSimulant": "NAMIB-DUNE-MMS (Parity: 94.8% to Martian Eolian Sands)",
      "solarAvailability": "Extremely high (>330 sunny days/yr, 11.2 kWh/m²/day)",
      "keyRisks": "Severe rover wheel slippage and immobilization on 34° dune slipfaces"
    },
    "earthImage": "/images/earth/namib_desert.jpg",
    "marsImage": "/images/planetary/namib_desert-mars.jpg",
    "moonImage": "/images/planetary/namib_desert-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/namib_desert-mars.jpg",
      "Moon": "/images/planetary/namib_desert-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA Earthdata / Worldview & MRO HiRISE (Linear Sand Dunes & Salt Pan Analogs)",
      "CSA: CSA RADARSAT-1 / RCM (Hyper-Arid Dune SAR Backscatter & Subsurface Moisture Inversion)",
      "ESA: ESA Copernicus Sentinel-2 (Desert Quartz & Iron Oxide Mineral Index)",
      "JAXA: JAXA G-Portal (GCOM-C SGLI & GPM Zero-Precipitation Verification)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA Earthdata",
        "sensor": "MRO HiRISE & Worldview",
        "dataset": "NASA Linear Dune Morphometry"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Hyper-Arid Dune SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C SGLI & GPM",
        "dataset": "JAXA Zero-Precipitation Index"
      }
    ]
  },
  {
    "id": "pilbara_craton",
    "name": "Pilbara Craton (Strelley Pool)",
    "country": "Australia",
    "aliases": [
      "Australia",
      "AU",
      "Western Australia",
      "WA",
      "Strelley Pool",
      "North Pole Dome",
      "Dresser"
    ],
    "region": "Pilbara Region, Western Australia",
    "coordinates": "21°18′ S, 119°00′ E",
    "lat": -21.3,
    "lon": 119,
    "category": "Volcanic",
    "subcategories": [
      "Archean Stromatolites",
      "Hydrothermal Cherts",
      "Banded Iron Formations"
    ],
    "thermalReading": "+44°C / 510 W/m²",
    "xPercent": 83.1,
    "yPercent": 61.8,
    "matchScores": {
      "Mars": {
        "overall": 95,
        "geological": 98,
        "climate": 89,
        "terrain": 93
      },
      "Moon": {
        "overall": 76,
        "geological": 83,
        "climate": 50,
        "terrain": 78
      },
      "Earth": {
        "overall": 100,
        "geological": 99,
        "climate": 91,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Jezero Crater & Columbia Hills (Gusev) Hydrothermal Silica",
      "Moon": "Crisium Basin Ancient Basalt Bedrock",
      "Earth": "Archean Paleo-Biosphere Standard"
    },
    "earthSiteDetails": {
      "title": "Strelley Pool Formation & Dresser Chert",
      "formation": "3.48 Ga Archean Hydrothermal Caldera with Fossilized Stromatolites",
      "mineralogy": "Microcrystalline Quartz Chert, Barite, Pyrite, Goethite, Hematite",
      "spectralBand": "ASTER Mineral Mapping & Airborne TIMS Thermal Imaging",
      "sensorResolution": "0.15 m/px High-Res Orthophoto"
    },
    "targetSiteDetails": {
      "title": "Mars: Columbia Hills (Home Plate) & Jezero Margin",
      "formation": "Noachian Fumarolic / Hydrothermal Silica Sinter Deposits",
      "mineralogy": "Opalline Silica, Hematite, Smectite Clays, Siderite",
      "spectralBand": "CRISM Target Scans & Spirit Mini-TES / Pancam Spectra",
      "elevation": "-1,900 m",
      "Mars": {
        "title": "Mars: Columbia Hills (Home Plate) & Jezero Margin",
        "formation": "Noachian Fumarolic / Hydrothermal Silica Sinter Deposits",
        "mineralogy": "Opalline Silica, Hematite, Smectite Clays, Siderite",
        "spectralBand": "CRISM Target Scans & Spirit Mini-TES / Pancam Spectra",
        "elevation": "-1,900 m",
        "image": "/images/planetary/pilbara_craton-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Crisium Basin Ancient Basalt Bedrock",
        "formation": "Multi-Ring Impact Basin Floor with Primitive Flood Basalt",
        "mineralogy": "Very Low-Titanium (VLT) Basalt, Olivine, Pigeonite",
        "spectralBand": "LOLA Topography & Moon Mineralogy Mapper (M3)",
        "elevation": "-3,600 m",
        "image": "/images/planetary/pilbara_craton-moon.jpg"
      }
    },
    "scientificRationale": "Priority Pick visited and endorsed by NASA and ESA leadership (Perseverance and ExoMars science teams). Preserves Earth’s oldest direct evidence of life (3.48 Ga stromatolites) within volcanic hydrothermal cherts, providing the absolute gold standard for recognizing ancient biosignatures in Jezero Crater. Earth limitations: 1.0g gravity, oxidative atmosphere weathering.",
    "extremophileSuitability": "94% (Archean Fossil Biosignatures & Rock-Varnish Microbes)",
    "radiationAnalogy": "90% (Intense Continental Australian Arid UV Index)",
    "roverMobilityScore": "93% (Rugged Silcrete Mesas, Ironstone Scree & Dry Washbeds)",
    "resources": {
      "waterIceGrade": "Grade E (Hydrated Iron Oxides and Silica Hydroxyls only)",
      "regolithSimulant": "PILBARA-ARCH-1 (Parity: 97.8% to Noachian Hydrothermal Crust)",
      "solarAvailability": "Consistently high (>320 cloud-free days/yr)",
      "keyRisks": "Extreme summer heat (>48°C), razor-sharp chert flints puncturing rover wheels"
    },
    "earthImage": "/images/earth/pilbara_craton.jpg",
    "marsImage": "/images/planetary/pilbara_craton-mars.jpg",
    "moonImage": "/images/planetary/pilbara_craton-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/pilbara_craton-mars.jpg",
      "Moon": "/images/planetary/pilbara_craton-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM Archean Chert & Hydrothermal Silicate Analogs)",
      "CSA: CSA RADARSAT-1 / RCM (Bedrock Structure & Silicified Ridge SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (Banded Iron Formation & Hydrothermal Alteration)",
      "JAXA: JAXA G-Portal (GCOM-C Vegetation Aridity & ALOS PALSAR Structural Textures)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO CRISM & Earthdata",
        "dataset": "NASA Archean Biosignature Parity"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Bedrock Structure SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog (Pilbara)"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR & GCOM-C",
        "dataset": "JAXA Structural Geological Radar"
      }
    ]
  },
  {
    "id": "axel_heiberg",
    "name": "Axel Heiberg Island (Lost Hammer Spring)",
    "country": "Canada",
    "aliases": [
      "Canada",
      "CA",
      "Canadian Arctic",
      "Nunavut",
      "Lost Hammer",
      "Sverdrup Basin"
    ],
    "region": "Qikiqtaaluk Region, Nunavut, Canada",
    "coordinates": "79°25′ N, 90°45′ W",
    "lat": 79.42,
    "lon": -90.75,
    "category": "Polar/Ice",
    "subcategories": [
      "Subzero Hypersaline Springs",
      "Methane Seeps",
      "Permafrost Salt Diapirs"
    ],
    "thermalReading": "-31°C / 138 W/m²",
    "xPercent": 24.8,
    "yPercent": 5.9,
    "matchScores": {
      "Mars": {
        "overall": 94,
        "geological": 96,
        "climate": 97,
        "terrain": 90
      },
      "Moon": {
        "overall": 78,
        "geological": 83,
        "climate": 61,
        "terrain": 82
      },
      "Earth": {
        "overall": 100,
        "geological": 98,
        "climate": 95,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Recurring Slope Lineae (RSL) & Hale Crater Saline Brines",
      "Moon": "Peary Crater Polar Shaded Traps",
      "Earth": "Cryogenic Hypersaline Discharge Baseline"
    },
    "earthSiteDetails": {
      "title": "Lost Hammer Perennial Cryo-Spring Structure",
      "formation": "Perennial Subzero (-5°C) Hypersaline Discharge from Permafrost (600m deep)",
      "mineralogy": "Halite, Thenardite, Mirabilite, Calcite, Travertines, Methane Clathrate",
      "spectralBand": "Airborne Hyperspectral & Synthetic Aperture Radar C-Band",
      "sensorResolution": "0.10 m/px Cryo-Drone Mapping"
    },
    "targetSiteDetails": {
      "title": "Mars: Hale Crater Central Peak & RSL Slopes",
      "formation": "Subsurface Pressurized Brines Discharging on Permafrost Slopes",
      "mineralogy": "Hydrated Magnesium/Sodium Perchlorates, Chlorides, Sulfates",
      "spectralBand": "HiRISE Time-Series Imagery & CRISM Hydrated Salt Bands",
      "elevation": "-2,100 m",
      "Mars": {
        "title": "Mars: Hale Crater Central Peak & RSL Slopes",
        "formation": "Subsurface Pressurized Brines Discharging on Permafrost Slopes",
        "mineralogy": "Hydrated Magnesium/Sodium Perchlorates, Chlorides, Sulfates",
        "spectralBand": "HiRISE Time-Series Imagery & CRISM Hydrated Salt Bands",
        "elevation": "-2,100 m",
        "image": "/images/planetary/axel_heiberg-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Peary Crater Polar Shaded Traps",
        "formation": "Deep Lunar North Pole Cold Trap with Volatile Ice Sinks",
        "mineralogy": "Anorthositic Regolith, Bound Hydroxyls, Troilite Trace",
        "spectralBand": "Mini-SAR Polar Ice Signatures & LROC NAC Stereo",
        "elevation": "-2,800 m",
        "image": "/images/planetary/axel_heiberg-moon.jpg"
      }
    },
    "scientificRationale": "The coldest, most saline perennial spring known on Earth (remains liquid at -5°C with 24% salt concentration while emitting methane). Models how subsurface liquid aquifers and RSL seeps operate on frozen Mars today. Earth limitations: 1.0g gravity head pressure, Earth oxygen atmosphere, seasonal Arctic light variations.",
    "extremophileSuitability": "98% (Anaerobic Halophilic Cryophiles Living on Methane)",
    "radiationAnalogy": "81% (High-Latitude Snow Albedo Effect)",
    "roverMobilityScore": "88% (Salt Tufa Cones, Ice Mounds & Slippery Saturated Cryo-Mud)",
    "resources": {
      "waterIceGrade": "Grade B (Subsurface Cryogenic Brines, requires desalinization)",
      "regolithSimulant": "AXEL-HAMMER-SAL (Parity: 96.1% to Martian RSL Brine Regolith)",
      "solarAvailability": "24h Polar Summer / Extended Polar Night Darkness",
      "keyRisks": "Salt crystallization jamming mechanical joints, severe subzero permafrost freezing"
    },
    "earthImage": "/images/earth/axel_heiberg.jpg",
    "marsImage": "/images/planetary/axel_heiberg-mars.jpg",
    "moonImage": "/images/planetary/axel_heiberg-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/axel_heiberg-mars.jpg",
      "Moon": "/images/planetary/axel_heiberg-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA Earthdata / Worldview & MRO HiRISE (Perennial Cryogenic Brine Spring Analogs)",
      "CSA: CSA RADARSAT-1 / RCM (High-Arctic Permafrost & Cryogenic Salt Mound SAR)",
      "ESA: ESA Copernicus Sentinel-2 & ESA Open Science Catalog (Polar Brine Vent Spectral Baselines)",
      "JAXA: JAXA G-Portal (AMSR2 Snow Ice Equivalence & GCOM-W Indices)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA Earthdata",
        "sensor": "MRO HiRISE & Worldview",
        "dataset": "NASA Cryogenic Brine Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Arctic Salt Mound SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 & Open Sci Cat",
        "dataset": "ESA Polar Vent Spectrometry"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "AMSR2 / GCOM-W",
        "dataset": "JAXA Cryosphere Snow-Ice Index"
      }
    ]
  },
  {
    "id": "mdrs_utah",
    "name": "Mars Desert Research Station (MDRS)",
    "country": "USA",
    "aliases": [
      "USA",
      "United States",
      "America",
      "US",
      "Utah",
      "Hanksville",
      "San Rafael Swell",
      "MDRS"
    ],
    "region": "San Rafael Swell, Utah, USA",
    "coordinates": "38°24′ N, 110°47′ W",
    "lat": 38.41,
    "lon": -110.79,
    "category": "Arid Deserts",
    "subcategories": [
      "Mancos Shale",
      "Morrison Formation",
      "Inverted Paleochannels"
    ],
    "thermalReading": "+31°C / 420 W/m²",
    "xPercent": 19.2,
    "yPercent": 28.7,
    "matchScores": {
      "Mars": {
        "overall": 91,
        "geological": 93,
        "climate": 83,
        "terrain": 95
      },
      "Moon": {
        "overall": 72,
        "geological": 78,
        "climate": 48,
        "terrain": 76
      },
      "Earth": {
        "overall": 100,
        "geological": 96,
        "climate": 90,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Sinus Meridiani & Jezero Inverted River Channels",
      "Moon": "Mare Nubium Regolith Plains",
      "Earth": "Continental Mesozoic Mudstone Standard"
    },
    "earthSiteDetails": {
      "title": "San Rafael Swell Inverted River Channels & Badlands",
      "formation": "Jurassic Morrison & Cretaceous Dakota Sandstone Inverted Beds",
      "mineralogy": "Smectite, Illite, Gypsum, Goethite, Quartz Sandstone, Jarosite",
      "spectralBand": "USGS 3DEP High-Resolution LiDAR & Landsat-9 OLI",
      "sensorResolution": "0.10 m/px UAV Field Photogrammetry"
    },
    "targetSiteDetails": {
      "title": "Mars: Eberswalde & Jezero Inverted Paleochannels",
      "formation": "Exhumed River Meanders Cemented by Iron and Silica",
      "mineralogy": "Fe/Mg Smectites, Hydrated Silicates, Hematite-Coated Quartz",
      "spectralBand": "HiRISE Stereo Anaglyphs & CRISM Targeted Mineral Cubes",
      "elevation": "-2,450 m",
      "Mars": {
        "title": "Mars: Eberswalde & Jezero Inverted Paleochannels",
        "formation": "Exhumed River Meanders Cemented by Iron and Silica",
        "mineralogy": "Fe/Mg Smectites, Hydrated Silicates, Hematite-Coated Quartz",
        "spectralBand": "HiRISE Stereo Anaglyphs & CRISM Targeted Mineral Cubes",
        "elevation": "-2,450 m",
        "image": "/images/planetary/mdrs_utah-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Mare Nubium Regolith Plains",
        "formation": "Basaltic Mare Plain with Subsurface Regolith Compaction",
        "mineralogy": "Intermediate-Ti Basalt, Glassy Agglutinates, Plagioclase",
        "spectralBand": "LROC NAC High-Sun Albedo & LOLA Roughness Profiles",
        "elevation": "-1,750 m",
        "image": "/images/planetary/mdrs_utah-moon.jpg"
      }
    },
    "scientificRationale": "World-famous crew analog facility operated by The Mars Society. Houses realistic habitat, pressurized rover trials, and EVA space suit simulations amidst inverted fluvial paleochannels and bentonite clay badlands identical to Jezero Delta deposits. Earth limitations: 1.0g gravity suit fatigue, terrestrial atmospheric pressure, sparse desert vegetation.",
    "extremophileSuitability": "86% (Endolithic Microbes in Gypsum Veins)",
    "radiationAnalogy": "80% (Colorado Plateau Moderate UV Flux)",
    "roverMobilityScore": "96% (Inverted Channel Ridge Traverses & Sticky Swelling Bentonite Clay)",
    "resources": {
      "waterIceGrade": "Grade E (Hydrated Smectite Clays and Gypsum Veins only)",
      "regolithSimulant": "MDRS-UTAH-1 (Parity: 93.5% to Martian Sedimentary Claystone)",
      "solarAvailability": "High desert sunshine (>300 clear days/yr)",
      "keyRisks": "Bentonite clay hydration causing complete tire entrapment when wet (\"gumbo mud\")"
    },
    "earthImage": "/images/earth/mdrs_utah.jpg",
    "marsImage": "/images/planetary/mdrs_utah-mars.jpg",
    "moonImage": "/images/planetary/mdrs_utah-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/mdrs_utah-mars.jpg",
      "Moon": "/images/planetary/mdrs_utah-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM Smectite Clays & HiRISE Inverted River Channels)",
      "CSA: CSA RADARSAT-1 / RCM (Mancos Shale & Sandstone Caprock SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (Mesozoic Clay & Sulfate Stratigraphy)",
      "JAXA: JAXA G-Portal (GCOM-C Surface Moisture & Vegetation Scarcity Validation)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS",
        "sensor": "MRO CRISM & HiRISE",
        "dataset": "NASA PDS Inverted Channel Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Caprock SAR Roughness"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C Moisture",
        "dataset": "JAXA Vegetation Scarcity Index"
      }
    ]
  },
  {
    "id": "mauna_kea_loa",
    "name": "Mauna Kea / Mauna Loa (HI-SEAS)",
    "country": "USA",
    "aliases": [
      "USA",
      "United States",
      "America",
      "US",
      "Hawaii",
      "HI-SEAS",
      "Mauna Kea",
      "Mauna Loa"
    ],
    "region": "Big Island of Hawaii, USA (Pacific Ocean)",
    "coordinates": "19°49′ N, 155°28′ W",
    "lat": 19.82,
    "lon": -155.47,
    "category": "Volcanic",
    "subcategories": [
      "Tholeiitic Basalt",
      "Pahoehoe & Aa Flows",
      "Lunar Mare Analogy"
    ],
    "thermalReading": "+18°C / 315 W/m²",
    "xPercent": 6.8,
    "yPercent": 39,
    "matchScores": {
      "Mars": {
        "overall": 87,
        "geological": 94,
        "climate": 70,
        "terrain": 92
      },
      "Moon": {
        "overall": 94,
        "geological": 97,
        "climate": 62,
        "terrain": 96
      },
      "Earth": {
        "overall": 100,
        "geological": 98,
        "climate": 88,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Tharsis Montes Shield Volcano Slopes",
      "Moon": "Mare Tranquillitatis & Oceanus Procellarum Basalts",
      "Earth": "Oceanic Hotspot Tholeiite Benchmark"
    },
    "earthSiteDetails": {
      "title": "Mauna Kea Sub-Alpine Tephra & Mauna Loa Lava Field",
      "formation": "Pristine Shield Volcano Tholeiite Basalts & Cinder Cones",
      "mineralogy": "Plagioclase, Pyroxene (Augite), Forsteritic Olivine, Ilmenite, Glass",
      "spectralBand": "Airborne AVIRIS & USGS High-Resolution LiDAR",
      "sensorResolution": "0.08 m/px UAV Topography"
    },
    "targetSiteDetails": {
      "title": "Moon: Mare Tranquillitatis High-Ti Basalts",
      "formation": "Imbrian-Period Flood Basalt Plains Filling Impact Basin",
      "mineralogy": "Anorthite, Pigeonite, High-Titanium Ilmenite (FeTiO3), Troilite",
      "spectralBand": "LROC NAC Stereo (0.5 m/px), LOLA Topography, Kaguya Spectral Profiler",
      "elevation": "-2,100 m",
      "Mars": {
        "title": "Mars: Tharsis Montes Shield Volcano Slopes",
        "formation": "Amazonian Massive Basaltic Shield Volcano Flank Flows",
        "mineralogy": "Low-Silica Tholeiitic Basalt, Pyroxene, Olivine Phenocrysts",
        "spectralBand": "THEMIS Thermal IR & MOLA Topographic Profiles",
        "elevation": "+8,500 m",
        "image": "/images/planetary/mauna_kea_loa-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Mare Tranquillitatis High-Ti Basalts",
        "formation": "Imbrian-Period Flood Basalt Plains Filling Impact Basin",
        "mineralogy": "Anorthite, Pigeonite, High-Titanium Ilmenite (FeTiO3), Troilite",
        "spectralBand": "LROC NAC Stereo (0.5 m/px), LOLA Topography, Kaguya Spectral Profiler",
        "elevation": "-2,100 m",
        "image": "/images/planetary/mauna_kea_loa-moon.jpg"
      }
    },
    "scientificRationale": "Long-standing site for Apollo astronaut training and NASA HI-SEAS habitat simulations. Hawaii’s unweathered basalt flows and cinder cones provide the standard chemical, mechanical, and geotechnical benchmark for lunar mare regolith. Earth limitations: 1.0g gravity vs Moon 0.166g, atmospheric oxygen and moisture causing rapid olivine weathering.",
    "extremophileSuitability": "82% (Chemolithotrophs in Pristine Subsurface Basalt)",
    "radiationAnalogy": "72% (Atmospheric Shielding with Moderate Altitude UV)",
    "roverMobilityScore": "95% (Abrasive Glassy Aa Lava, Cinder Slopes & Pahoehoe Crusts)",
    "resources": {
      "waterIceGrade": "Grade C (Condensation in Deep Cold Lava Tube Traps)",
      "regolithSimulant": "JSC-1A / NU-LHT (Parity: 96.2% to Apollo 11 Mare Basalts)",
      "solarAvailability": "High solar insolation above cloud inversion layer (>3,000m)",
      "keyRisks": "Razor-sharp basaltic glass slicing rover tires, collapse of fragile lava crusts"
    },
    "earthImage": "/images/earth/mauna_kea_loa.jpg",
    "marsImage": "/images/planetary/mauna_kea_loa-mars.jpg",
    "moonImage": "/images/planetary/mauna_kea_loa-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/mauna_kea_loa-mars.jpg",
      "Moon": "/images/planetary/mauna_kea_loa-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS LRO (Diviner Thermal & LOLA Basaltic Roughness) & NASA Earthdata",
      "CSA: CSA RADARSAT-1 / RCM (Pahoehoe vs Aa Basalt Lava Texture SAR)",
      "ESA: ESA Copernicus Sentinel-2 (Fresh Tholeiitic Basalt Spectrometry)",
      "JAXA: JAXA G-Portal (ALOS PALSAR-2 Volcanic Subsurface & GCOM-C)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA LRO Diviner",
        "sensor": "LRO Diviner & LOLA",
        "dataset": "NASA Lunar Basalt Thermal Inertia"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Basalt Flow Texture SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR-2 & GCOM-C",
        "dataset": "JAXA Volcanic Terrain Radar"
      }
    ]
  },
  {
    "id": "craters_of_the_moon",
    "name": "Craters of the Moon",
    "country": "USA",
    "aliases": [
      "USA",
      "United States",
      "America",
      "US",
      "Idaho",
      "Snake River Plain",
      "Great Rift"
    ],
    "region": "Snake River Plain, Idaho, USA",
    "coordinates": "43°25′ N, 113°31′ W",
    "lat": 43.42,
    "lon": -113.52,
    "category": "Caves/Lava Tubes",
    "subcategories": [
      "Lava Tube Networks",
      "Spatter Cones",
      "Flood Basalts"
    ],
    "thermalReading": "+15°C / 290 W/m²",
    "xPercent": 18.5,
    "yPercent": 25.9,
    "matchScores": {
      "Mars": {
        "overall": 85,
        "geological": 91,
        "climate": 68,
        "terrain": 92
      },
      "Moon": {
        "overall": 93,
        "geological": 96,
        "climate": 59,
        "terrain": 95
      },
      "Earth": {
        "overall": 100,
        "geological": 97,
        "climate": 86,
        "terrain": 95
      }
    },
    "targetAnalogSite": {
      "Mars": "Pavonis Mons Lava Tubes & Sinuous Rilles",
      "Moon": "Marius Hills & Rima Hyginus Volcanic Rilles",
      "Earth": "Continental Fissure Basalt Standard"
    },
    "earthSiteDetails": {
      "title": "Great Rift Monogenetic Craters & Drained Tubes",
      "formation": "Holocene (15–2 ka) Fissure Basaltic Eruptions & Cave Systems",
      "mineralogy": "Ferrobasalt, Sideromelane Glass, Plagioclase, Cristobalite",
      "spectralBand": "Terrestrial LiDAR Scanner & Airborne FLIR TIR",
      "sensorResolution": "0.05 m/px 3D Cave Point Cloud"
    },
    "targetSiteDetails": {
      "title": "Moon: Marius Hills Lava Tube Skylight",
      "formation": "Ancient Imbrian Volcanic Rille with Roof Collapse (Skylight)",
      "mineralogy": "Low-Viscosity Mare Basalt, Glassy Agglutinates",
      "spectralBand": "LROC NAC High-Resolution Images (0.5 m/px), SELENE/Kaguya Terrain Camera",
      "elevation": "-45 m (Inside Tube Floor)",
      "Mars": {
        "title": "Mars: Pavonis Mons Lava Tubes & Sinuous Rilles",
        "formation": "Sinuous Volcanic Collapse Rilles & Unroofed Subsurface Tubes",
        "mineralogy": "Vesicular Basalt, Glassy Sideromelane, Iron Oxides",
        "spectralBand": "HiRISE DTMs & CRISM Hyperspectral Observations",
        "elevation": "+4,200 m",
        "image": "/images/planetary/craters_of_the_moon-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Marius Hills Lava Tube Skylight",
        "formation": "Ancient Imbrian Volcanic Rille with Roof Collapse (Skylight)",
        "mineralogy": "Low-Viscosity Mare Basalt, Glassy Agglutinates",
        "spectralBand": "LROC NAC High-Resolution Images (0.5 m/px), SELENE/Kaguya Terrain Camera",
        "elevation": "-45 m (Inside Tube Floor)",
        "image": "/images/planetary/craters_of_the_moon-moon.jpg"
      }
    },
    "scientificRationale": "Used by Apollo astronauts (including Alan Shepard and Edgar Mitchell) for lunar field training and currently by NASA FINESSE/SUBMERGE teams. Drained lava tube conduits mirror candidate lunar subsurface habitats protected from radiation and micrometeorites. Earth limitations: 1.0g gravity roof collapse dynamics vs Moon 0.166g, atmospheric air inside caves.",
    "extremophileSuitability": "88% (Cave Biofilms & Actinobacteria on Basalt Speleothems)",
    "radiationAnalogy": "96% (Subterranean Complete Cosmic Ray Analogy Inside Lava Tubes)",
    "roverMobilityScore": "92% (High-Roughness Jagged Blocky Lava Traverses & Tube Entrances)",
    "resources": {
      "waterIceGrade": "Grade B (Perennial Cave Ice Formations in Subsurface Shadows)",
      "regolithSimulant": "ID-BASALT-04 (Parity: 94.7% to Lunar Mare Simulant MLS-1)",
      "solarAvailability": "Surface PV High / 0% Inside Subterranean Lava Tubes",
      "keyRisks": "Total RF communication loss in underground tubes, treacherous roof collapses"
    },
    "earthImage": "/images/earth/craters_of_the_moon.jpg",
    "marsImage": "/images/planetary/craters_of_the_moon-mars.jpg",
    "moonImage": "/images/planetary/craters_of_the_moon-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/craters_of_the_moon-mars.jpg",
      "Moon": "/images/planetary/craters_of_the_moon-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS LRO (Mini-RF Radar & LROC Lunar Pit / Skylight Analogs)",
      "CSA: CSA RADARSAT-1 / RCM (Lava Flow Collapse & Collapsed Pit SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 & ESA Open Science Catalog (Basaltic Crust Mapping)",
      "JAXA: JAXA G-Portal (ALOS PALSAR-2 Cavity Detection & Surface Structure)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA LRO Mini-RF",
        "sensor": "LRO Mini-RF & LROC",
        "dataset": "NASA Lunar Pit / Skylight Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Lava Tube Collapse SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR-2 Cavity",
        "dataset": "JAXA Subsurface Cavity Radar"
      }
    ]
  },
  {
    "id": "lanzarote",
    "name": "Lanzarote (Timanfaya & Corona Tube)",
    "country": "Spain",
    "aliases": [
      "Spain",
      "ES",
      "Canary Islands",
      "Timanfaya",
      "Cueva de los Verdes",
      "Corona"
    ],
    "region": "Canary Islands, Spain (Atlantic Ocean)",
    "coordinates": "29°00′ N, 13°45′ W",
    "lat": 29,
    "lon": -13.75,
    "category": "Caves/Lava Tubes",
    "subcategories": [
      "Giant Lava Tubes",
      "Oceanic Basalt Shield",
      "Planetary Biosphere Void"
    ],
    "thermalReading": "+26°C / 365 W/m²",
    "xPercent": 46.2,
    "yPercent": 33.9,
    "matchScores": {
      "Mars": {
        "overall": 89,
        "geological": 95,
        "climate": 71,
        "terrain": 94
      },
      "Moon": {
        "overall": 96,
        "geological": 98,
        "climate": 64,
        "terrain": 97
      },
      "Earth": {
        "overall": 100,
        "geological": 98,
        "climate": 89,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Olympus Mons Flank Tube Skylights",
      "Moon": "Marius Hills & Philolaus Crater Lava Tubes",
      "Earth": "Oceanic Intraplate Basaltic Tube Benchmark"
    },
    "earthSiteDetails": {
      "title": "Corona Volcanic Tube & Timanfaya 1730 Eruption Bed",
      "formation": "Subaerial Basalt Eruptions Forming 7.6-km Drained Corona Tube",
      "mineralogy": "Alkali Basalt, Tholeiite, Anorthosite Xenoliths, Olivine Aggregates",
      "spectralBand": "ESA PANGEA Underground 3D LiDAR & Sentinel-2 MSI",
      "sensorResolution": "2mm Volumetric Subterranean Scan"
    },
    "targetSiteDetails": {
      "title": "Moon: Marius Hills Volcanic Hole (Skylight)",
      "formation": "Pre-Imbrian Sinuous Rille Collapse Cavity (>65m Diameter)",
      "mineralogy": "Mare Basalt, Ilmenite, Shock-Metamorphosed Agglutinates",
      "spectralBand": "LROC NAC Stereopairs, Kaguya Lunar Radar Sounder (LRS), LOLA DEM",
      "elevation": "-70 m below lunar surface",
      "Mars": {
        "title": "Mars: Olympus Mons Flank Tube Skylights",
        "formation": "Colossal Shield Volcano Lava Tube Skylight Collapse Entrances",
        "mineralogy": "Pristine Basalt, Glassy Crusts, Secondary Carbonate Films",
        "spectralBand": "HiRISE High-Resolution Imaging (ESP_014238_1985)",
        "elevation": "+6,100 m",
        "image": "/images/planetary/lanzarote-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Marius Hills Volcanic Hole (Skylight)",
        "formation": "Pre-Imbrian Sinuous Rille Collapse Cavity (>65m Diameter)",
        "mineralogy": "Mare Basalt, Ilmenite, Shock-Metamorphosed Agglutinates",
        "spectralBand": "LROC NAC Stereopairs, Kaguya Lunar Radar Sounder (LRS), LOLA DEM",
        "elevation": "-70 m below lunar surface",
        "image": "/images/planetary/lanzarote-moon.jpg"
      }
    },
    "scientificRationale": "Priority Pick and official training base for ESA PANGÈA astronaut field geology courses. The massive Corona Lava Tube (up to 30m wide) and unweathered Timanfaya basalt beds represent the premier European lunar surface and underground shelter analog on Earth. Earth limitations: 1.0g gravity limits stable cave vault spans, Atlantic maritime humidity.",
    "extremophileSuitability": "92% (Endemic Chemolithotrophic Microbes in Total Darkness)",
    "radiationAnalogy": "98% (Zero Cosmic/Solar Radiation Inside Lava Tube Subsurface Chambers)",
    "roverMobilityScore": "94% (Rappelling Drone Operations & Ultra-Abrasive Volcanic Tephra)",
    "resources": {
      "waterIceGrade": "Grade C (Cool Cave Trap Condensation, Low Salinity)",
      "regolithSimulant": "LANZ-PANGEA-LHT (Parity: 97.4% to Apollo 15 Regolith)",
      "solarAvailability": "High year-round Atlantic island solar irradiance (>300 days/yr)",
      "keyRisks": "Vertical drop-offs at tube skylights (>25m), severe radio signal absorption underground"
    },
    "earthImage": "/images/earth/lanzarote.jpg",
    "marsImage": "/images/planetary/lanzarote-mars.jpg",
    "moonImage": "/images/planetary/lanzarote-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/lanzarote-mars.jpg",
      "Moon": "/images/planetary/lanzarote-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS LRO (Diviner Thermal Inertia & LROC Lunar Mare Rille Analogs)",
      "CSA: CSA RADARSAT-1 / RCM (Corona Lava Tube Roof Thickness SAR)",
      "ESA: ESA Copernicus Sentinel-2 & ESA Open Science Catalog (PANGAEA Campaign Basalt)",
      "JAXA: JAXA G-Portal (ALOS PALSAR-2 & GCOM-C Arid Volcanic Vegetation Index)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA LRO Diviner",
        "sensor": "LRO Diviner & LROC",
        "dataset": "NASA Lunar Rille Thermal Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Lava Tube Overburden SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 & PANGAEA",
        "dataset": "ESA Open Science Catalog (PANGAEA)"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR-2 & GCOM-C",
        "dataset": "JAXA Volcanic Vegetation Radar"
      }
    ]
  },
  {
    "id": "cinder_lake",
    "name": "Cinder Lake Crater Field",
    "country": "USA",
    "aliases": [
      "USA",
      "United States",
      "America",
      "US",
      "Arizona",
      "AZ",
      "Flagstaff",
      "Sunset Crater",
      "USGS"
    ],
    "region": "Flagstaff, Arizona, USA",
    "coordinates": "35°20′ N, 111°30′ W",
    "lat": 35.33,
    "lon": -111.5,
    "category": "Volcanic",
    "subcategories": [
      "Artificial Blast Crater Field",
      "Basaltic Cinder Blanket",
      "Apollo Training Site"
    ],
    "thermalReading": "+24°C / 355 W/m²",
    "xPercent": 19,
    "yPercent": 30.4,
    "matchScores": {
      "Mars": {
        "overall": 82,
        "geological": 87,
        "climate": 66,
        "terrain": 94
      },
      "Moon": {
        "overall": 94,
        "geological": 96,
        "climate": 62,
        "terrain": 98
      },
      "Earth": {
        "overall": 100,
        "geological": 95,
        "climate": 88,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Gusev Crater Secondary Impact Fields",
      "Moon": "Fra Mauro (Apollo 14) & Apollo 11 Ejecta Plains",
      "Earth": "Controlled Explosive Crater Benchmark"
    },
    "earthSiteDetails": {
      "title": "USGS Astrogeology 1967 Dynamite Crater Field",
      "formation": "Artificially Blasted to Exactly Match Apollo 11 Landing Site Morphology",
      "mineralogy": "Basaltic Lapilli, Sunset Crater Ash, Pyroxene, Magnetite, Glass",
      "spectralBand": "USGS 3DEP LiDAR & Airborne Multispectral Scanners",
      "sensorResolution": "0.08 m/px Orthomosaic"
    },
    "targetSiteDetails": {
      "title": "Moon: Fra Mauro Highlands Formation",
      "formation": "Imbrium Basin Impact Ejecta Blanket and Overlapping Secondary Craters",
      "mineralogy": "Impact Melt Breccias, Anorthosite Clasts, Glassy Agglutinates",
      "spectralBand": "LROC NAC High-Sun Albedo Scans & LOLA Slope Roughness Maps",
      "elevation": "-1,200 m",
      "Mars": {
        "title": "Mars: Gusev Crater Secondary Impact Fields",
        "formation": "Noachian Impact Floor Covered by Basaltic Cinder Blankets",
        "mineralogy": "Olivine Basalt, Magnetite, Windblown Basaltic Ash",
        "spectralBand": "Spirit Rover Pancam / Mini-TES & HiRISE Stereo",
        "elevation": "-1,950 m",
        "image": "/images/planetary/cinder_lake-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Fra Mauro Highlands Formation",
        "formation": "Imbrium Basin Impact Ejecta Blanket and Overlapping Secondary Craters",
        "mineralogy": "Impact Melt Breccias, Anorthosite Clasts, Glassy Agglutinates",
        "spectralBand": "LROC NAC High-Sun Albedo Scans & LOLA Slope Roughness Maps",
        "elevation": "-1,200 m",
        "image": "/images/planetary/cinder_lake-moon.jpg"
      }
    },
    "scientificRationale": "The exact historical site blasted with dynamite by USGS Astrogeology in 1967 to recreate a 1:1 replica of the Apollo 11 lunar crater field for rover and spacesuit testing. Matches the crater frequency-size distribution of the Moon. Earth limitations: Atmospheric air drag, 1.0g gravity rover dynamics, and surrounding pine forest ecosystem.",
    "extremophileSuitability": "76% (Low-Density Microbial Colonization of Basalt Cinders)",
    "radiationAnalogy": "78% (High-Plateau 2,100m UV Solar Flux)",
    "roverMobilityScore": "98% (High-Wheel-Sinkage Cinder Slopes, Crater Rims & Boulders)",
    "resources": {
      "waterIceGrade": "Grade E (Dry Volcanic Ash Matrix)",
      "regolithSimulant": "FBL-LUNAR-SIM (Parity: 95.8% to Apollo 14 Regolith)",
      "solarAvailability": "High Arizona sunshine (>290 clear days/yr)",
      "keyRisks": "Severe wheel slip in loose basalt cinders (exceeding 30% rover slip)"
    },
    "earthImage": "/images/earth/cinder_lake.jpg",
    "marsImage": "/images/planetary/cinder_lake-mars.jpg",
    "moonImage": "/images/planetary/cinder_lake-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/cinder_lake-mars.jpg",
      "Moon": "/images/planetary/cinder_lake-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS LRO (LOLA Topography & Apollo Lunar Simulant Field Baselines)",
      "CSA: CSA RADARSAT-1 / RCM (Explosive Crater Geometry & Basaltic Cinder SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (Volcanic Tephra & Iron Slag Reflectance)",
      "JAXA: JAXA G-Portal (GCOM-C Thermal Inertia & Vegetation Masking)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA LRO LOLA",
        "sensor": "LRO LOLA & Apollo Simulants",
        "dataset": "NASA Apollo Lunar Crater Field"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Cinder Crater Geometry SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "GCOM-C Thermal Inertia",
        "dataset": "JAXA Aridity & Tephra Index"
      }
    ]
  },
  {
    "id": "meteor_crater",
    "name": "Meteor Crater (Barringer)",
    "country": "USA",
    "aliases": [
      "USA",
      "United States",
      "America",
      "US",
      "Arizona",
      "AZ",
      "Barringer Crater",
      "Winslow"
    ],
    "region": "Coconino County, Arizona, USA",
    "coordinates": "35°01′ N, 111°01′ W",
    "lat": 35.03,
    "lon": -111.02,
    "category": "Arid Deserts",
    "subcategories": [
      "Simple Impact Crater",
      "Inverted Stratigraphy",
      "Shock Metamorphism"
    ],
    "thermalReading": "+33°C / 430 W/m²",
    "xPercent": 19.2,
    "yPercent": 30.5,
    "matchScores": {
      "Mars": {
        "overall": 86,
        "geological": 92,
        "climate": 74,
        "terrain": 95
      },
      "Moon": {
        "overall": 93,
        "geological": 97,
        "climate": 58,
        "terrain": 96
      },
      "Earth": {
        "overall": 100,
        "geological": 96,
        "climate": 89,
        "terrain": 97
      }
    },
    "targetAnalogSite": {
      "Mars": "Victoria Crater (Meridiani) & Endurance Crater",
      "Moon": "Cone Crater (Fra Mauro, Apollo 14) & Moltke Crater",
      "Earth": "Simple Hypervelocity Impact Standard"
    },
    "earthSiteDetails": {
      "title": "Barringer 1.2-km Meteorite Impact Crater",
      "formation": "50 ka Nickel-Iron Meteorite Impact with Inverted Ejecta Rim",
      "mineralogy": "Coesite, Stishovite (Shocked Quartz), Kamacite/Taenite, Coconino Sandstone",
      "spectralBand": "Airborne LiDAR Elevation & Thermal Hyperspectral Imagery",
      "sensorResolution": "0.05 m/px Drone 3D Mesh"
    },
    "targetSiteDetails": {
      "title": "Moon: Cone Crater (Apollo 14 Fra Mauro Site)",
      "formation": "Simple Bowl-Shaped Impact Crater Punching Through Regolith to Bedrock",
      "mineralogy": "Anorthositic Impact Breccia, Impact Glasses, Shock-Crushed Quartz Twins",
      "spectralBand": "LROC NAC Low-Sun Shadows, LOLA Altimetry, Kaguya Multiband Imager",
      "elevation": "-1,450 m",
      "Mars": {
        "title": "Mars: Victoria Crater (Meridiani) & Endurance Crater",
        "formation": "Sulfate Bedrock Impact Excavation with Exposed Layering",
        "mineralogy": "Sulfates, Hematite Spherules, Shocked Silicates",
        "spectralBand": "Opportunity Rover Microscopic Imager & HiRISE DTM",
        "elevation": "-1,400 m",
        "image": "/images/planetary/meteor_crater-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Cone Crater (Apollo 14 Fra Mauro Site)",
        "formation": "Simple Bowl-Shaped Impact Crater Punching Through Regolith to Bedrock",
        "mineralogy": "Anorthositic Impact Breccia, Impact Glasses, Shock-Crushed Quartz Twins",
        "spectralBand": "LROC NAC Low-Sun Shadows, LOLA Altimetry, Kaguya Multiband Imager",
        "elevation": "-1,450 m",
        "image": "/images/planetary/meteor_crater-moon.jpg"
      }
    },
    "scientificRationale": "The best-preserved simple impact crater on Earth. Primary field site where Gene Shoemaker trained the Apollo astronauts in impact crater mechanics and overturned flap stratigraphy, directly preparing Alan Shepard for Cone Crater on the Moon. Earth limitations: Atmospheric deceleration of meteor, 1.0g gravity collapse, desert eolian infilling.",
    "extremophileSuitability": "80% (Subterranean Shocked Rock Fungi)",
    "radiationAnalogy": "82% (Arid Colorado Plateau Direct Insolation)",
    "roverMobilityScore": "95% (Crater Rim Overturned Flaps, 35° Scree Slopes & Mega-Ejecta Blocks)",
    "resources": {
      "waterIceGrade": "Grade E (Arid Impact Structure with Deep Saturated Aquifer >100m)",
      "regolithSimulant": "METEOR-BRECCIA-1 (Parity: 96.6% to Lunar Highland Ejecta)",
      "solarAvailability": "High year-round desert sunshine (>310 days/yr)",
      "keyRisks": "Catastrophic slope rollover on 38° interior talus slopes, falling boulders"
    },
    "earthImage": "/images/earth/meteor_crater.jpg",
    "marsImage": "/images/planetary/meteor_crater-mars.jpg",
    "moonImage": "/images/planetary/meteor_crater-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/meteor_crater-mars.jpg",
      "Moon": "/images/planetary/meteor_crater-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS LRO (LOLA Rim Elevation & LROC Ejecta Blanket Roughness)",
      "CSA: CSA RADARSAT-1 / RCM (Shocked Sandstone & Impact Ejecta SAR Backscatter)",
      "ESA: ESA Copernicus Sentinel-2 (Impact Ejecta Mineralogy & Shock Quartz Reflectance)",
      "JAXA: JAXA G-Portal (GCOM-C Aridity & ALOS Structural Geology Telemetry)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA LRO LOLA",
        "sensor": "LRO LOLA & LROC Ejecta",
        "dataset": "NASA PDS Impact Crater Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Shocked Ejecta SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS & GCOM-C",
        "dataset": "JAXA Impact Structure Telemetry"
      }
    ]
  },
  {
    "id": "mount_teide",
    "name": "Mount Teide (Las Cañadas)",
    "country": "Spain",
    "aliases": [
      "Spain",
      "ES",
      "Canary Islands",
      "Tenerife",
      "Cañadas",
      "Teide Observatory"
    ],
    "region": "Tenerife, Canary Islands, Spain",
    "coordinates": "28°16′ N, 16°38′ W",
    "lat": 28.27,
    "lon": -16.64,
    "category": "Caves/Lava Tubes",
    "subcategories": [
      "Stratovolcano Caldera",
      "Obsidian & Phonolite Flows",
      "High-Altitude Volcanic Regolith"
    ],
    "thermalReading": "+12°C / 295 W/m²",
    "xPercent": 45.4,
    "yPercent": 34.3,
    "matchScores": {
      "Mars": {
        "overall": 87,
        "geological": 92,
        "climate": 75,
        "terrain": 93
      },
      "Moon": {
        "overall": 92,
        "geological": 95,
        "climate": 65,
        "terrain": 94
      },
      "Earth": {
        "overall": 100,
        "geological": 97,
        "climate": 88,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Arsia Mons Summit Caldera & Lava Slopes",
      "Moon": "Aristarchus Plateau & Gruithuisen Domes (Silicic Volcanism)",
      "Earth": "Alkaline Oceanic Stratovolcano Benchmark"
    },
    "earthSiteDetails": {
      "title": "Las Cañadas High-Altitude Caldera Basin (2,400m)",
      "formation": "Massive Caldera Collapse, Phonolitic / Basaltic Tephra & Pumice Dunes",
      "mineralogy": "Phonolite, Obsidian, Anorthoclase, Augite, Basaltic Lapilli, Zeolites",
      "spectralBand": "Airborne HySpex Sensor & Sentinel-2 MSI Bands",
      "sensorResolution": "0.12 m/px Digital Surface Model"
    },
    "targetSiteDetails": {
      "title": "Moon: Gruithuisen Domes (Non-Mare Silicic Domes)",
      "formation": "Rare Lunar Silicic / Evolved Magmatism Forming High-Albedo Domes",
      "mineralogy": "Silica-rich Rhyolite/Dacite Equivalent, Feldspar, Low Iron/Titanium",
      "spectralBand": "LROC NAC High-Res Photometry, Diviner Lunar Radiometer TIR, Kaguya MI",
      "elevation": "+1,800 m above Mare Imbrium",
      "Mars": {
        "title": "Mars: Arsia Mons Summit Caldera & Lava Slopes",
        "formation": "Evolved Alkaline Volcanic Caldera & High-Altitude Lava Beds",
        "mineralogy": "Trachybasalt, Phonolite Equiv., Pyroxene, Hematite Coatings",
        "spectralBand": "CRISM Targeted Scans & THEMIS Daytime IR",
        "elevation": "+9,200 m",
        "image": "/images/planetary/mount_teide-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Gruithuisen Domes (Non-Mare Silicic Domes)",
        "formation": "Rare Lunar Silicic / Evolved Magmatism Forming High-Albedo Domes",
        "mineralogy": "Silica-rich Rhyolite/Dacite Equivalent, Feldspar, Low Iron/Titanium",
        "spectralBand": "LROC NAC High-Res Photometry, Diviner Lunar Radiometer TIR, Kaguya MI",
        "elevation": "+1,800 m above Mare Imbrium",
        "image": "/images/planetary/mount_teide-moon.jpg"
      }
    },
    "scientificRationale": "Tested by ESA for ExoMars and Lunar rover instrument validation. The Las Cañadas caldera at 2,400 m elevation provides thin air, intense UV, and evolved phonolitic/silicic volcanic lavas matching the Moon’s mysterious non-mare volcanic domes (Gruithuisen Domes, target of NASA’s Lunar Vulkan payload). Earth limitations: 1.0g gravity, cloud layer below caldera, atmospheric oxygen.",
    "extremophileSuitability": "87% (Volcanic Fumarole Extremophiles & Endoliths)",
    "radiationAnalogy": "91% (High-Altitude 2,400m UV Solar Flux above Maritime Inversion)",
    "roverMobilityScore": "93% (Extremely Loose Pumice Sands, Sharp Obsidian Flakes & Blocky Lava)",
    "resources": {
      "waterIceGrade": "Grade C (High-Altitude Snowpack & Perennial Ice in Cueva del Hielo)",
      "regolithSimulant": "TEIDE-VOLC-PUM (Parity: 95.2% to Lunar Silicic Dome Simulant)",
      "solarAvailability": "High persistent sunshine above cloud sea (>330 days/yr)",
      "keyRisks": "Abrasive razor-sharp volcanic glass (obsidian) slicing rubber/polyurethane seals"
    },
    "earthImage": "/images/earth/mount_teide.jpg",
    "marsImage": "/images/planetary/mount_teide-mars.jpg",
    "moonImage": "/images/planetary/mount_teide-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/mount_teide-mars.jpg",
      "Moon": "/images/planetary/mount_teide-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS LRO (Diviner Thermal IR & MRO CRISM Phonolite/Basalt Spectra)",
      "CSA: CSA RADARSAT-1 / RCM (Volcanic Caldera & Obsidian Flow SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 & ESA Open Science Catalog (Caldera Floor Minerals)",
      "JAXA: JAXA G-Portal (ALOS PALSAR-2 InSAR Ground Deformation & GCOM-C)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS / LRO",
        "sensor": "LRO Diviner & MRO CRISM",
        "dataset": "NASA Planetary Caldera Models"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Caldera Obsidian SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 MSI",
        "dataset": "ESA Open Science Catalog"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR-2 InSAR",
        "dataset": "JAXA Caldera Deformation Radar"
      }
    ]
  },
  {
    "id": "mount_etna",
    "name": "Mount Etna",
    "country": "Italy",
    "aliases": [
      "Italy",
      "IT",
      "Sicily",
      "Catania",
      "Etna",
      "DLR ROBEX",
      "Valle del Bove"
    ],
    "region": "Catania, Sicily, Italy",
    "coordinates": "37°45′ N, 14°59′ E",
    "lat": 37.75,
    "lon": 14.99,
    "category": "Volcanic",
    "subcategories": [
      "Active Basaltic Stratovolcano",
      "Tephra Slopes",
      "Robotic Rover Testbed"
    ],
    "thermalReading": "+19°C / 320 W/m²",
    "xPercent": 54.2,
    "yPercent": 29,
    "matchScores": {
      "Mars": {
        "overall": 86,
        "geological": 93,
        "climate": 71,
        "terrain": 94
      },
      "Moon": {
        "overall": 93,
        "geological": 96,
        "climate": 63,
        "terrain": 96
      },
      "Earth": {
        "overall": 100,
        "geological": 97,
        "climate": 87,
        "terrain": 96
      }
    },
    "targetAnalogSite": {
      "Mars": "Hesperia Planum Volcanic Ridges",
      "Moon": "Aristarchus Pyroclastic Ash Deposits & Mare Serenitatis",
      "Earth": "Active Continental Basaltic Volcano Standard"
    },
    "earthSiteDetails": {
      "title": "Torre del Filosofo & Valle del Bove Slopes (2,600m–3,300m)",
      "formation": "Continuous Historical & Recent Basaltic Eruptions and Tephra Blankets",
      "mineralogy": "Trachybasalt, Porphyritic Plagioclase, Titanaugite, Olivine, Pyroclastic Ash",
      "spectralBand": "Airborne Hyperspectral Sensor (AHS) & COSMO-SkyMed SAR",
      "sensorResolution": "0.10 m/px UAV Point Cloud"
    },
    "targetSiteDetails": {
      "title": "Moon: Aristarchus Regional Dark Pyroclastic Deposit",
      "formation": "Deep Lunar Magma Eruptions Producing Glassy Black Ash Sheets",
      "mineralogy": "Fe-rich Pyroclastic Glass, Ilmenite, Basaltic Agglutinates",
      "spectralBand": "LROC NAC High-Resolution Scans, Clementine UV/VIS, LOLA Roughness",
      "elevation": "-1,100 m",
      "Mars": {
        "title": "Mars: Hesperia Planum Volcanic Ridges",
        "formation": "Hesperian Wrinkle-Ridged Basalt Plain & Pyroclastic Ash Deposits",
        "mineralogy": "Augite, Plagioclase, Glassy Tephra, Magnetite",
        "spectralBand": "MOLA Altimetry & OMEGA Near-IR Spectrometry",
        "elevation": "+1,100 m",
        "image": "/images/planetary/mount_etna-mars.jpg"
      },
      "Moon": {
        "title": "Moon: Aristarchus Regional Dark Pyroclastic Deposit",
        "formation": "Deep Lunar Magma Eruptions Producing Glassy Black Ash Sheets",
        "mineralogy": "Fe-rich Pyroclastic Glass, Ilmenite, Basaltic Agglutinates",
        "spectralBand": "LROC NAC High-Resolution Scans, Clementine UV/VIS, LOLA Roughness",
        "elevation": "-1,100 m",
        "image": "/images/planetary/mount_etna-moon.jpg"
      }
    },
    "scientificRationale": "Official European testing location for the DLR/ESA ROBEX and ARCHES space robotics campaigns. Autonomous lunar rover fleets, seismometers, and drill payloads were deployed directly on Etna’s barren tephra slopes to simulate robotic surface missions on the Moon. Earth limitations: 1.0g gravity, Earth volcanic gas emissions (SO2/H2O), and periodic active eruption hazards.",
    "extremophileSuitability": "85% (Microbes in High-Temperature Volcanic Fumaroles)",
    "radiationAnalogy": "83% (High-Altitude Mediterranean Solar Flux)",
    "roverMobilityScore": "96% (Deep Unconsolidated Pyroclastic Ash, Steep Slopes & Basalt Bombs)",
    "resources": {
      "waterIceGrade": "Grade C (Winter-Spring Snowpack & Lava Tube Ice Pockets)",
      "regolithSimulant": "ETNA-LUNAR-TEPHRA (Parity: 96.8% to Lunar Dark Pyroclastic Glass)",
      "solarAvailability": "High Mediterranean sunshine above the treeline (>280 days/yr)",
      "keyRisks": "Active volcanic degassing, hot ash expulsion, heavy rover wheel sinkage"
    },
    "earthImage": "/images/earth/mount_etna.jpg",
    "marsImage": "/images/planetary/mount_etna-mars.jpg",
    "moonImage": "/images/planetary/mount_etna-moon.jpg",
    "targetImages": {
      "Mars": "/images/planetary/mount_etna-mars.jpg",
      "Moon": "/images/planetary/mount_etna-moon.jpg"
    },
    "openDataSources": [
      "NASA: NASA PDS MRO (CRISM & THEMIS Active Volcanic Mineral Parity)",
      "CSA: CSA RADARSAT-1 / RCM (Sub-Meter Basalt Scree & Lava Tube Skylight SAR Roughness)",
      "ESA: ESA Copernicus Sentinel-2 (ROBEX Analog Campaign Ground Truth & Gas Flux)",
      "JAXA: JAXA G-Portal (ALOS PALSAR-2 Volcanic Roughness & GCOM-C Thermal)"
    ],
    "partnerAgencies": [
      {
        "agency": "NASA",
        "badge": "NASA PDS / MRO",
        "sensor": "MRO CRISM & THEMIS",
        "dataset": "NASA Volcanic Mineral Parity"
      },
      {
        "agency": "CSA",
        "badge": "CSA RADARSAT",
        "sensor": "RADARSAT-1 / RCM SAR",
        "dataset": "CSA Sub-Meter Basalt Scree SAR"
      },
      {
        "agency": "ESA",
        "badge": "ESA Copernicus",
        "sensor": "Sentinel-2 & ROBEX",
        "dataset": "ESA Open Science Catalog (ROBEX)"
      },
      {
        "agency": "JAXA",
        "badge": "JAXA G-Portal",
        "sensor": "ALOS PALSAR-2 & GCOM-C",
        "dataset": "JAXA Volcanic Surface Radar"
      }
    ]
  }
];
