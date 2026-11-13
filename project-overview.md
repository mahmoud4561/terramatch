# دليل الهيكلية البرمجية والتحليل التقني الشامل لمشروع TerraMatch
**منصة استكشاف النظائر الكوكبية | إعداد فريق Astronative**

---

## 1. هيكلية ملفات المشروع المخصصة (Project File Structure)

تم استبعاد جميع المجلدات المؤقتة والاعتماديات (`node_modules/`, `.git/`, ملفات الحزم المقفلة). تقتصر الملفات المصدرية المخصصة للمشروع على الملفات التالية، مع بيان الدور الدقيق لكل ملف:

| مسار الملف (File Path) | النوع (Type) | الدور الوظيفي الدقيق في المشروع (Exact Role) |
| :--- | :--- | :--- |
| **`index.html`** | HTML / SPA Shell | الملف الرئيسي والنموذج الأولي المتكامل (Standalone SPA Prototype). يحتوي على الهيكل الدلالي للواجهة، وتضمين React 18 و Tailwind CDN و Babel، ومحرك التوليد الصوتي الرقمي (`SoundEngine`) عبر Web Audio API، ومحاكاة الخريطة الفضائية التفاعلية مع اللوحات الثلاث بالكامل. |
| **`src/App.jsx`** | React Component (JSX) | المكون الجذري المنظم للواجهة التفاعلية. يدير جميع الحالات البرمجية (`useState`, `useMemo`, `useEffect`) بما يشمل: البحث اللحظي، شريط التمرير لنسب التطابق، مربعات تصفية البيئات، تبديل الأجرام الكوكبية (Mars/Moon/Earth)، وتزامن انزلاق اللوحة الجانبية والنافذة المنبثقة. |
| **`src/data/mockData.js`** | JavaScript (Data Module) | قاعدة البيانات العلمية التجريبية (Scientific Mock Data). تتضمن بيانات الأجرام الكوكبية الثلاثة (المريخ، القمر، الأرض) وبيانات 6 مواقع نظائر أرضية واقعية (مثل Haughton Crater، صحراء Atacama، فوهة Mauna Loa...) مع الإحداثيات، والأطياف، ودرجات التطابق الثلاثية، ومواصفات الموارد (ISRU). |
| **`src/index.css`** | CSS Stylesheet | ورقة الأنماط التخصيصية؛ تتضمن توجيهات Tailwind الأساسية، ونظام تخصيص شريط التمرير (`input[type=range]`)، وتأثيرات الواجهات الزجاجية (`glass-panel`, `glass-tooltip`)، ونقاط وشبكات الرادار الفضائية (`bg-radar-grid`, `bg-dots`, `bg-topo`). |
| **`src/main.jsx`** | React Entry Point | نقطة انطلاق تطبيق React القياسي؛ تقوم بربط المكون الرئيسي `<App />` بنواة الـ DOM عبر `ReactDOM.createRoot`. |
| **`tailwind.config.js`** | Tailwind Configuration | ضبط نظام التصميم وتوسيع الألوان لتشمل ألوان الهوية الداكنة: الكحلي العميق (`#0B0F19`)، والبرتقالي المريخي (`#FF6B35`)، والفضي القمري (`#E2E8F0`)، والسماوي الأرضي (`#00B4D8`)، بالإضافة إلى رسوم الحركة ومعدلات النبض ومسح الرادار. |
| **`vite.config.js`** | Build Tool Config | ملف إعداد أداة التطوير والبناء السريع Vite مع إضافة React الرسمية (`@vitejs/plugin-react`). |
| **`postcss.config.js`** | PostCSS Config | تكوين معالجة الأنماط وربط إضافات Tailwind CSS و Autoprefixer لضمان التوافقية العالية. |
| **`package.json`** | NPM Manifest | وثيقة المشروع المعيارية التي تصف المشروع وتحدد حزم التشغيل وأوامر البناء (`dev`, `build`, `preview`). |
| **`README.md`** | Documentation | التوثيق التقني الشامل للمشروع، ومواصفات تجربة المستخدم (UI/UX)، ودليل التشغيل المباشر للمتصفح. |

---

## 2. بنية واجهة المستخدم ومكونات HTML (HTML Architecture & UI Components)

تعتمد الواجهة على تصميم متكامل يملأ كامل نافذة العرض (**Full-Viewport 3-Panel Layout**) وفق المعايير الفضائية والعلمية الدقيقة:

### الهيكل العظمي لملف HTML (Clean HTML Skeleton)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TerraMatch • Astronative</title>
  <!-- Google Fonts: Inter & JetBrains Mono -->
  <!-- Tailwind CSS CDN with Custom Theme Config -->
  <!-- React 18, ReactDOM, & Babel Standalone CDN Scripts -->
  <!-- Custom CSS: Range Slider, Glassmorphism, Radar Grid -->
</head>
<body class="bg-deepNavy text-slate-100 font-sans antialiased overflow-hidden select-none">
  
  <div id="root">
    <!-- React Component Tree (TerraMatchApp) -->
    
    <!-- Top HUD Scanline Glow -->
    <div class="hud-scanline"></div>

    <!-- PANEL A: HEADER (Top Navigation) -->
    <header>
      <!-- Left: Logo & Astronative Team Brand + Live Telemetry Badge -->
      <!-- Center: Wide Search Bar with Shortcut Badge -->
      <!-- Right: Target Body Selector (Earth 🌍 / Moon 🌕 / Mars 🔴) + Audio SFX Toggle -->
    </header>

    <!-- 3-PANEL VIEWPORT CONTAINER -->
    <div class="main-viewport">
      
      <!-- PANEL B: LEFT SIDEBAR (Filter Panel) -->
      <aside class="left-sidebar">
        <!-- Title: "Define Analog Criteria" & Reset Action -->
        <!-- Environmental Checkboxes (Volcanic, Arid, Polar/Ice, Caves) -->
        <!-- Custom Range Slider: Minimum Similarity Score (0-100%) -->
        <!-- Live Target Environmental Telemetry Card -->
        <!-- Filtered Sites Mini-List -->
      </aside>

      <!-- PANEL C: MAIN CENTRAL AREA (Interactive Map & 3D Globe Simulation) -->
      <main class="map-simulation-container">
        <!-- Top Map HUD (Live UTC Clock, Layer Switcher: Grid / Thermal / Topo / 3D Globe) -->
        <!-- View 1: 3D Holographic Interactive Canvas Globe (Spherical Projection, Wireframe, Rotating Pins) -->
        <!-- View 2: Detailed 2D Vector World Map (Cylindrical Mercator SVG with Real Coastlines) -->
        <!-- Thermal Mode: Seamless 360° Radar Sweep with Isothermal Heat Blooms around Active Pins -->
        <!-- Topo Mode: Topographic Elevation Contours & Mountain Range Hypsometric Badges -->
        <!-- Dynamic Glowing & Pulsing Marker Pins (Absolute Positions) -->
        <!-- Glassmorphism Hover Tooltips with % Match & Mini Progress Bars -->
        <!-- HUD Compass, Reticle & Range Indicators -->
      </main>

      <!-- PANEL D: RIGHT SIDEBAR (Comparison & Data Panel) -->
      <aside class="right-sidebar-sliding-drawer">
        <!-- Drawer Header with Location Name & Close Button (X) -->
        <!-- Metadata Chips: Coordinates & Category -->
        <!-- Side-by-Side Comparative Cards: Earth Site vs. Planetary Target Site -->
        <!-- Tri-Axial Animated Progress Bars: Geological, Climate, Terrain Match -->
        <!-- Mission Utility Rationale & Biosignature Brief -->
        <!-- Action Button: "View Resources Report" -->
      </aside>

    </div>

    <!-- RESOURCES REPORT MODAL (Expedition Deep Dive) -->
    <div class="modal-backdrop">
      <!-- Modal Header: Confidentiality & Target Reference -->
      <!-- ISRU Analysis: Water Ice, Regolith Simulant, Solar Flux, Operational Hazards -->
      <!-- Comparative Mineralogy & Spectral Band Table -->
      <!-- Action Controls: Export CSV & Close -->
    </div>

  </div>

</body>
</html>
```

### تفصيل المكونات الرئيسية:
1. **الترويسة العلوية (Header)**:
   - **الجانب الأيسر**: شعار المنصة TerraMatch مع مدار كوكبي متحرك، وبيان فريق التطوير Astronative، ومؤشر أخضر نابض لبيان الاتصال المباشر بقمر التيليماتري.
   - **الوسط**: شريط بحث ممتد وعريض بمدخل نصي ناعم يسمح بالبحث اللحظي باسم الموقع أو النطاق الجغرافي أو الميزات التضاريسية مع زر سريع لمسح البحث ومفتاح الاختصار `ESC`.
   - **الجانب الأيمن**: أزرار التبديل الثلاثية السريعة للأجرام الكوكبية (`Earth 🌍`, `Moon 🌕`, `Mars 🔴`)، بالإضافة إلى زر التحكم في تفعيل أو كتم المؤثرات الصوتية الفضائية التفاعلية (`SoundEngine`).
2. **اللوحة الجانبية اليسرى (Filter Panel - Left Sidebar)**:
   - قسم **"Define Analog Criteria"** مع زر الاستعادة الفورية (`Reset`).
   - مربعات الاختيار البيئية الأربعة المزودة بأيقونات وحزم ألوان متخصصة وعدادات للمواقع التابعة لكل تصنيف:
     - 🌋 **البركانية (Volcanic)**: تدفقات البازلت وتكوينات الصهارة.
     - 🏜️ **الصحاري القاحلة (Arid Deserts)**: الكثبان شديدة الجفاف والمسطحات الملحية.
     - ❄️ **الجليد والقطب (Polar/Ice)**: الأراضي دائمة التجمد والوديان الجافة الشديدة البرودة.
     - 🕳️ **الكهوف وأنابيب الحمم (Caves/Lava Tubes)**: التجاويف التحت-سطحية المقاومة للإشعاع.
   - **شريط التمرير المخصص للمطابقة**: عنصر تحكم `<input type="range">` بنطاق (0-100%) ومقبض متوهج لعرض النسبة بدقة لحظية.
   - **بطاقة القياسات البيئية الحية (Active Telemetry)**: تعرض معايير الجاذبية، الغلاف الجوي، وحمل الإشعاع للجرم المختار.
3. **المنطقة المركزية الرئيسية (Map Simulation - Central Area)**:
   - حاوية فضائية تحاكي شاشات مراكز التحكم بالأقمار الصناعية مع خلفيات نقطية متكررة وشبكات إحداثية لخطوط الطول والعرض.
   - أدوات تحكم بنمط العرض الخرائطي: **Grid** (كارتوغرافي)، **Thermal** (رادار حراري بماسح ضوئي دوراني)، **Topo** (تضاريسي طبوغرافي).
   - دبابيس المواقع المتوهجة والنابضة في مواقع جغرافية حقيقية بنسب مئوية مطلقة.
   - نوافذ التلميح الزجاجية الطافية (Glassmorphism Tooltips) عند مرور المؤشر.
4. **اللوحة الجانبية اليمنى (Comparison & Data Panel - Right Sidebar)**:
   - درج جانبي منزلق بسلاسة (`translate-x-0` / `translate-x-full`) مرتبط بنقر الدبابيس.
   - بطاقتان بصريتان متجاورتان للمقارنة المباشرة: **موقع الأرض (Earth Site)** في مواجهة **موقع الجرم المستهدف (Mars/Moon Target Site)** مع بيانات المستشعرات والارتفاع.
   - ثلاثة أشرطة تقدم متحركة بالألوان المحددة للهوية البصرية:
     - **Geological Match** (التطابق الجيولوجي - برتقالي مريخي).
     - **Climate Match** (التطابق المناخي - سماوي أرضي).
     - **Terrain Match** (تطابق التضاريس والخشونة - فضي قمري).
   - زر الإجراء البارز في الأسفل **"View Resources Report"** مع تدرج متوهج.
5. **النافذة المنبثقة الشاملة (Resources Report Modal)**:
   - تقرير استكشافي علمي سري ومفصل حول إمكانيات استغلال الموارد الموقعية (ISRU: In-Situ Resource Utilization) وخيارات تصدير البيانات إلى ملف CSV.

---

## 3. بيئة المحاكاة والمنطق التفاعلي (3D Scene & Interactive Logic)

على الرغم من كون المشروع واجهة مستخدم ثنائية/شبه ثلاثية الأبعاد بدون الاعتماد على محركات ثقيلة خارجية مثل Three.js لضمان السرعة الفائقة والعمل المستقل الفوري، إلا أنه يوظف تقنيات المحاكاة الهندسية الفضائية التالية:

### أ. تمثيل الخريطة الفضائية والطبقات (Spatial Environment & Viewport Layering)
- **الكرة الأرضية الهولوجرافية ثلاثية الأبعاد (3D Holographic Globe Canvas)**: محاكاة كروية تفاعلية ثلاثية الأبعاد مبنية بالكامل بحسابات الإسقاط الكروي في HTML5 Canvas (`GlobeCanvas`) بدون أي مكتبات أو صور خارجية:
  - تحويل إحداثيات خطوط الطول والعرض الحقيقية إلى فضاء ثلاثي الأبعاد ديكارتي $X, Y, Z$.
  - مصفوفة الدوران التفاعلي لمحوري السمت والانحدار (Yaw & Pitch) مع دوران تلقائي سلس عند عدم السحب.
  - حلقات شبكية ثلاثية الأبعاد (Parallels & Meridians) ممتدة على سطح الكرة.
  - رسم القارات العالمية على سطح الكرة المتحركة وتظليلها بأسلوب هولوجرافي مستقبلي.
  - دبابيس تفاعلية ثلاثية الأبعاد تظهر بنبض متوهج على النصف المواجه للكاميرا ($z > 0$)، وتتفاعل مع تحريك الفأرة والنقر لفتح درج المقارنة.
- **خريطة العالم المتجهية فائقة الدقة (Accurate Vector World Map SVG)**: خريطة متجهات عالمية دقيقة بإسقاط إسطواني معتمد (Equirectangular / Mercator Projection)، تتضمن الخطوط الساحلية والتضاريس الحقيقية لكافة القارات (أمريكا الشمالية والجنوبية، أوروبا، إفريقيا، آسيا، أستراليا، والقارة القطبية الجنوبية) بتعبئة ليلية داكنة (`#0f172a`) وحدود سماوية ناعمة (`#00B4D8`) مع مطابقة تامة للإحداثيات الحقيقية للدبابيس الستة.
- **طبقات الرؤية المتمايزة كلياً (Distinct Viewport Modes)**:
  - نمط **Grid**: يركز على الشبكة الكارتوغرافية الدقيقة مع علامات الإحداثيات المدارية لخطوط العرض (Arctic, Tropic, Equator, Antarctic).
  - نمط **Thermal**: يفعل محاكاة المسح الراداري بزاوية 360 درجة مستمرة مع قرص دائري متدرج مخروطياً (`conic-gradient`) وقناع تلاشٍ إشعاعي (`radial-gradient mask`) يمنع أي قطع، مع إبراز مناطق انبعاث حراري ملونة (Thermal Heat Blooms) حول الدبابيس النشطة.
  - نمط **Topo**: يبرز دوائر الارتفاع التضاريسية وسلاسل الجبال الرئيسية (الأنديز، الروكي، الهيمالايا، الألب) مع شارات الارتفاع الرقمية (`▲ +4,205m`, `▼ -86m BADWATER`).
  - نمط **3D Globe**: ينقل الواجهة إلى الفضاء ثلاثي الأبعاد مع هالة إشعاعية متوافقة مع لون الجرم المستهدف (مريخ، قمر، أرض).

### ب. الإضاءة والتوهجات النيونية (Lighting & Reactive Glow Physics)
- استخدام ظلال التوهج الديناميكية (`box-shadow` و `drop-shadow`) المربوطة بالجرم المختار:
  - عند اختيار **Mars**: يتحول التركيز الإشعاعي إلى اللون البرتقالي المريخي `#FF6B35` بتوهج `rgba(255, 107, 53, 0.4)`.
  - عند اختيار **Moon**: يتحول التوهج إلى الفضي القمري `#E2E8F0`.
  - عند اختيار **Earth**: يتحول التوهج إلى السماوي الأرضي `#00B4D8`.
- دبابيس المواقع تحاط بحلقات نبض مستمرة (`animate-ping-slow`) مع هالات تركيز تشتد عند تحريك مؤشر الفأرة فوقها.

### ج. الكائنات التفاعلية وحلقات الاستهداف (Interactive Objects & Target Reticles)
- **تحديد المواقع**: تثبيت كل دبوس بنسب موضعية دقيقة (`xPercent`, `yPercent`) تتجاوب بمرونة مع مقاسات الشاشات المختلفة.
- **حلقة التصويب الدورانية (Mechanical Reticle)**: عند النقر على أي موقع على الخريطة، تنبثق حلقة تصويب ميكانيكية متقطعة تدور باستمرار حول الدبوس لتمثيل قفل الإحداثيات بالقمر الصناعي (Orbital Target Lock).
- **التلميح الزجاجي العائم (Glassmorphism Tooltip)**: يظهر بسلاسة فوق الدبوس مباشرة مع خلفية مصفاة بنسبة بلور عالية (`backdrop-blur-20px`) وتدرج لوني يبرز نسبة المطابقة الإجمالية.

### د. محرك التوليد الصوتي الرقمي (Synthesizer Sound Engine - Web Audio API)
- تم بناء فئة برمجية مخصصة `SoundEngine` تعمل كلياً على جانب العميل (Client-Side) باستخدام واجهة المتصفح البرمجية `AudioContext` بدون الحاجة لأي ملفات صوتية خارجية:
  - **صوت النقر (`playClick`)**: توليد موجة جيبية بتردد يبدأ من 800Hz وينحدر لوغاريتمياً إلى 400Hz خلال 60 ميلي ثانية لإعطاء إحساس الأزرار الميكانيكية الفضائية.
  - **صوت القفل والاستهداف (`playSelect`)**: توليد موجة مثلثة بتردد يصعد من 520Hz إلى 980Hz خلال 120 ميلي ثانية لإعطاء نغمة تأكيد اختيار الهدف في الرادار.
  - زر تحكم سريع لكتم وتفعيل المؤثرات في الترويسة.

### هـ. منطق إدارة الحالة التفاعلية (State Management Logic)
- استخدام خطافات React القياسية:
  - `minSimilarity`: يفلتر المواقع فورياً ويخفي أو يقلل عتامة الدبابيس التي تقل نسبتها عن القيمة المحددة.
  - `activeCategories`: مصفوفة منطقية لتفعيل وتعطيل التصنيفات الأربعة.
  - `selectedTarget`: يغير كامل مرجعية الحسابات والنسب والصور المقارنة فورياً بين المريخ والقمر والأرض.
  - `searchQuery`: مطابقة متزامنة للنصوص المدخلة.
  - `selectedSiteId`: يتحكم في إظهار وسحب لوحة التحليل الجانبية لليمين أو اليسار وتفعيل حلقة الاستهداف.

---

## 4. رحلة المستخدم بالتفصيل خطوة بخطوة (User Journey)

### الخطوة 1: الهبوط على المنصة والاستكشاف الأولي (Landing & First Impression)
- تفتح الصفحة مباشرة بملء الشاشة مع خلفية كحلية عميقة تمنح شعور شاشات غرف عمليات وكالات الفضاء (NASA / ESA).
- يرى المستخدم في الأعلى شريط الترويسة الأنيق باسم **TerraMatch** وفريق **Astronative**، مع وميض المؤشر الأخضر الذي يعلن أن الاتصال المداري في وضع التشغيل (ONLINE).
- يلاحظ المستخدم في المنتصف الخريطة الكارتوغرافية مع دبابيس مضيئة تنبض في مواقع متفرقة (كندا، تشيلي، هاواي، كاليفورنيا، آيسلندا، القارة القطبية الجنوبية).

### الخطوة 2: تحديد الجرم الفضائي المستهدف (Target Planetary Selection)
- في أقصى يمين الترويسة، يمكن للمستخدم النقر بين الأجرام الثلاثة: **Earth 🌍** أو **Moon 🌕** أو **Mars 🔴**.
- بمجرد النقر (مع صدور نغمة رادارية خفيفة)، تتغير الهوية اللونية للمنصة فورياً، ويتم تحديث نسب التطابق لجميع المواقع لتناسب خصائص الجرم المختار، وتتغير معايير الجاذبية والغلاف الجوي في لوحة التيليماتري.

### الخطوة 3: تصفية المعايير والبحث المخصص (Filtering & Defining Criteria)
- ينتقل انتباه المستخدم إلى اللوحة الجانبية اليسرى:
  - يمكنه إلغاء أو تفعيل أي من البيئات (البركانية، الصحاري، الجليد، الكهوف) عبر مربعات الاختيار التفاعلية.
  - يقوم بسحب شريط التمرير **Minimum Similarity Score**: مع زيادة النسبة (مثلاً إلى 85%)، يلاحظ المستخدم فوراً تلاشي الدبابيس الضعيفة وبقاء المواقع الاستثنائية المطابقة فقط على الخريطة مع تحديث عداد المواقع المتبقية.
  - يمكنه استخدام شريط البحث العلوي وكتابة "Atacama" أو "Crater" لمشاهدة التصفية الفورية.

### الخطوة 4: التفاعل مع الخريطة والتبديل بين الطبقات (Map Exploration)
- يقوم المستخدم بالتبديل بين أنماط الخريطة العلوية:
  - النقر على **Thermal**: تنشط شاشة الرادار الدوارة ذات التوهج الحراري.
  - النقر على **Topo**: تظهر التدرجات التضاريسية والارتفاعية.
- عند تمرير الفأرة (Hover) فوق أي دبوس مشع، تنبثق نافذة زجاجية عائمة (Glassmorphism Tooltip) تكشف اسم الموقع، ونطاقه الجغرافي، وشريط تقدم ملون يوضح نسبة التطابق الكلي مع الجرم المستهدف (مثلاً: Atacama Desert - 96% Match to Mars).

### الخطوة 5: اختيار موقع وفتح لوحة التحليل المقارن (Deep-Dive Analysis)
- ينقر المستخدم على أحد الدبابيس (مثلاً: **Haughton Crater** أو **Atacama Desert**).
- يصدر صوت قفل الإحداثيات (`Select Chime`)، وتظهر حلقة استهداف ميكانيكية تدور حول الموقع على الخريطة.
- تنزلق اللوحة الجانبية اليمنى بنعومة فائقة من حافة الشاشة كاشفةً التحليل المقارن الشامل:
  - بطاقة مرئية لموقع الأرض (Earth Site) في مواجهة بطاقة الموقع الكوكبي المقابل (Jezero Crater على المريخ).
  - الأشرطة البيانية المتحركة الثلاثة: التطابق الجيولوجي (Geological Match)، التطابق المناخي (Climate Match)، وتطابق التضاريس والخشونة (Terrain Match).
  - ملخص الأهمية العلمية، وتوافق الكائنات الدقيقة المتطرفة (Extremophiles)، ومعدل تماسك تربة الموقع لمركبات الروفر.

### الخطوة 6: استعراض التقرير العلمي التفصيلي للموارد (Resources & ISRU Report)
- ينقر المستخدم على الزر البرتقالي المتوهج في أسفل اللوحة: **"View Resources Report"**.
- تنبثق نافذة زجاجية كبيرة ومركزية تعرض:
  - إمكانية استخراج الجليد المائي والغازات المتطايرة (Water Ice / Volatiles Grade).
  - جودة مماثلات الريجوليث (Regolith Simulant Grade) مقارنةً بمعايير ناسا.
  - معدلات الطاقة الشمسية وظروف الشحن الكهروضوئي.
  - المخاطر التشغيلية والبيئية لفريق الرواد والمركبات الآلية.
  - جدول تفصيلي للمقارنة المعدنية والطيفية (Mineralogy & Spectral Absorption).
  - إمكانية الضغط على زر تصدير البيانات إلى ملف نصي بصيغة CSV (`Export CSV`).
- ينقر المستخدم على زر الإغلاق للعودة بسلاسة إلى الخريطة التفاعلية واستكمال استكشاف بقية النظائر الكوكبية.
