# TerraMatch • Space Exploration Platform Prototype
**Mission by Team Astronative**

TerraMatch is a high-quality, interactive Single Page Application (SPA) designed for space exploration researchers and mission planners to discover, evaluate, and benchmark terrestrial Earth analogs against extraterrestrial planetary targets (Mars, Moon, and Earth baseline).

---

## 🚀 Live Instant Preview

You can test and interact with the application immediately by opening `index.html` directly in your browser:

- **Direct File**: Open `c:\Users\Owner\Desktop\space\index.html` in Chrome, Edge, Brave, or Firefox.
- **Or Double-Click**: Double-click `index.html` in File Explorer.

No build step or local web server is strictly required to run the prototype—all interactive state, map simulations, sound synthesizers, and glassmorphism styling run out-of-the-box!

---

## 🎨 Visual Identity & Theme (Dark Mode)

- **Background**: Deep Dark Navy (`#0B0F19`) with radial atmospheric glows.
- **Accents**:
  - Mars Orange (`#FF6B35`)
  - Moon Silver (`#E2E8F0`)
  - Earth Cyan (`#00B4D8`)
- **Typography**: Clean Sans-serif (`Inter`, system UI font) and scientific monospace (`JetBrains Mono`).
- **Feel**: Scientific, futuristic HUD, accessible for planetary science researchers and analog testbed teams.

---

## 🖥️ UI Layout (Full-Viewport 3-Panel Architecture)

### A. Header (Top Navigation)
- **Brand & Logo**: "TerraMatch" with dual-orbit planetary icon, mission tag "Astronative", live telemetry indicator, and system status badge.
- **Global Search**: Search Earth analogs by keyword, location, or geological feature (e.g., `Atacama`, `Death Valley`, `Haughton`, `basalt`, `ice`). Includes real-time matching and one-click clear.
- **Target Planetary Switcher**: Instant toggle buttons for **Earth 🌍**, **Moon 🌕**, and **Mars 🔴**. Switching targets dynamically recalculates analog match percentages, metrics, and planetary comparison sites.
- **Telemetry HUD**: Audio SFX toggle using an integrated Web Audio API synthesizer for tactile sci-fi sound effects.

### B. Left Sidebar (Filter Panel)
- **Title**: "Define Analog Criteria".
- **Environmental Criteria Checkboxes**:
  - 🌋 `Volcanic` (Shield volcanoes, basaltic lava flows, pyroclastic beds)
  - 🏜️ `Arid Deserts` (Hyper-arid dunes, salt flats, extreme evaporation)
  - ❄️ `Polar/Ice` (Permafrost, glacial moraines, cold desert conditions)
  - 🕳️ `Caves/Lava Tubes` (Subsurface shelter, basaltic conduits, basalt caves)
- **Minimum Similarity Score Range Slider**: Styled `<input type="range">` with dynamic numeric readout and live map pin filtering.
- **Active Telemetry Card**: Live target gravity, atmospheric composition, radiation loads, and quick list of matching sites.

### C. Main Central Area (Dual 2D & 3D Interactive Simulation)
- Large container simulating orbital satellite cartography with coordinate grid, latitude/longitude markings, dot matrix background, and HUD compass.
- **Layer & View Switcher**: 
  - `Grid`: Crisp cartographic lines, coordinate graticules, and clean continent outlines.
  - `Thermal`: Seamless 360° rotating radar sweep (`conic-gradient`) with zero clipping edges, paired with vivid infrared thermal heat blooms and isotherms around active pins.
  - `Topo`: Unmistakable topographic elevation contour rings/lines and high-contrast cyan/emerald terrain relief grids across continents.
  - `3D Globe` 🌐: Interactive HTML5 Canvas 3D Holographic Globe using pure spherical projection math (zero network dependencies), auto-rotating with mouse drag rotation, front-facing interactive pins, and atmospheric glow.
- **Glowing, Pulsing Marker Pins**: 6 scientifically realistic Earth analog test sites:
  1. **Haughton Crater** (Devon Island, Nunavut, Arctic Canada)
  2. **Atacama Desert / Yungay** (Antofagasta Region, Northern Chile)
  3. **Mauna Loa & HI-SEAS** (Hawaii, USA - Pacific Ocean)
  4. **Death Valley & Badwater Basin** (Mojave Desert, California, USA)
  5. **Thrihnukagigur Lava Field** (Reykjanes Peninsula, Iceland)
  6. **McMurdo Dry Valleys** (Victoria Land, Antarctica)
- **Hover State**: Glassmorphism tooltip showing Earth Location Name, Category, Country, Coordinates, and dynamic "% Match to Mars/Moon" progress bar.
- **Click State**: Pin selection reticle animation and smooth drawer reveal of Right Sidebar.

### D. Right Sidebar (Comparison & Data Panel)
- Hidden by default; slides in smoothly from the right with a cubic-bezier transition upon marker selection.
- **Header**: Location Name + "Match Analysis", coordinates, and "Close" (✕) button.
- **Visuals**: Side-by-side comparative imagery cards representing the "Earth Site" vs the "Mars/Moon Site" with elevation profiles and sensor resolutions.
- **Metrics**: 3 animated progress bars:
  - 🪨 **Geological Match** (e.g., 94%)
  - 🌡️ **Climate Match** (e.g., 86%)
  - 🏔️ **Terrain Match** (e.g., 93%)
- **Scientific Rationale**: Contextual briefing on NASA/ESA mission utility and extremophile biosignatures.
- **Action Button**: Glowing "View Resources Report" button launching a detailed ISRU Modal.

---

## 🛠️ Project Structure

```
space/
├── index.html                 # Standalone, turnkey interactive prototype (open directly in browser)
├── package.json               # NPM configuration & dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS design system config
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Project overview & documentation
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Core interactive SPA component
    ├── index.css              # Custom styles, range slider, glassmorphism
    └── data/
        └── mockData.js        # Detailed planetary & analog scientific datasets
```
