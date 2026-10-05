// Single source of truth for the page copy. Sourced from kinh-nghiem-*.md / du-an-ca-nhan.md.

export const PROFILE = {
  name: 'Nguyen Van Phu',
  role: 'Backend Developer',
  company: 'Magenest',
  location: 'Ha Noi, Vietnam',
  email: 'phu0908204@gmail.com',
  github: 'https://github.com/phuphu0981',
  linkedin: 'https://www.linkedin.com/in/nguyen-phu-5514a8412/',
  zalo: '0976914076',
  stack: ['Magento 2', 'Laravel', 'Go', 'WordPress', 'GraphQL', 'Kafka', 'Docker'],
};

// About slide rows, newest first; `vi` overrides apply when Vietnamese is on (see loc in lang.js)
export const TIMELINE = [
  { label: 'Now', title: 'Backend Developer', place: 'Magenest', period: '11/2025 —', vi: { label: 'Hiện tại' } },
  { label: 'Before', title: 'Laravel Developer', place: 'HQ Group · CoreSys', period: '2025', vi: { label: 'Trước đó' } },
  { label: 'Study', title: 'B.Sc. Information Technology', place: 'UTT · GPA 3.6 / 4.0', period: '2022 —', vi: { label: 'Học vấn', title: 'Cử nhân Công nghệ Thông tin' } },
];

// Oldest first: the Experience helix climbs from the bottom milestone to the top one.
// metrics: [value, suffix, label]; counted up when the milestone comes into view
export const EXPERIENCE = [
  {
    company: 'UTT', role: 'B.Sc. Information Technology', period: '2022 —',
    line: 'University of Transport Technology — GPA 3.6 / 4.0 with excellent merit scholarships.',
    metrics: [[3.6, '', 'GPA / 4.0'], [3, '', 'merit scholarships']],
    vi: {
      role: 'Cử nhân Công nghệ Thông tin',
      line: 'Đại học Công nghệ Giao thông Vận tải — GPA 3.6 / 4.0, học bổng khuyến khích loại Xuất sắc.',
      metrics: [[3.6, '', 'GPA / 4.0'], [3, '', 'kỳ học bổng']],
    },
  },
  {
    company: 'CoreSys', role: 'Backend Developer — Laravel', period: '01/2025',
    line: 'Corporate web portal, Cloudinary media pipeline and admin dashboards.',
    metrics: [],
    vi: { line: 'Website doanh nghiệp, xử lý media qua Cloudinary và dashboard quản trị.' },
  },
  {
    company: 'HQ Group', role: 'Backend Developer — Laravel', period: '02/2025 — 10/2025',
    line: 'Internal KPI, payroll and inventory systems.',
    metrics: [[100, '%', 'weekly reports automated'], [80, '%', 'less manual payroll work']],
    vi: {
      line: 'Hệ thống nội bộ: KPI, tính lương và quản lý kho.',
      metrics: [[100, '%', 'báo cáo tuần tự động'], [80, '%', 'giảm thao tác tính lương']],
    },
  },
  {
    company: 'Magenest', role: 'Backend Developer', period: '11/2025 — Now',
    line: 'Magento 2 commerce, headless WordPress and Go services for clients and in-house products.',
    metrics: [[7, '', 'projects'], [3, '', 'platforms']],
    vi: {
      period: '11/2025 — nay',
      line: 'Thương mại điện tử Magento 2, WordPress headless và dịch vụ Go cho khách hàng và sản phẩm nội bộ.',
      metrics: [[7, '', 'dự án'], [3, '', 'nền tảng']],
    },
  },
];

// [group, items]; group names are translated through UI.skillGroups
export const SKILLS = [
  ['Commerce', ['Magento 2', 'Adobe Commerce', 'PWA Studio', 'Plugins & observers', 'Queues & indexers']],
  ['Backend', ['PHP 8.4', 'Laravel 11', 'Go', 'Python · FastAPI', 'REST · GraphQL']],
  ['Data', ['MySQL', 'PostgreSQL', 'Redis', 'Kafka', 'OpenSearch']],
  ['Ops & Quality', ['Docker', 'Nginx · Linux', 'GitLab CI', 'SonarQube', 'phpstan · PHPCS']],
];

// UI copy. Rich lines are [text, emphasis] pairs so they can carry <em>/<b> without JSX here
export const UI = {
  en: {
    currently: 'Currently', basedIn: 'Based in', location: 'Ha Noi, Vietnam',
    nav: { work: 'Work', about: 'About', experience: 'Experience', contact: 'Contact' },
    talk: 'Let’s talk', closeArchive: 'Close archive', explore: 'Explore Works',
    title: ['Backend', 'Developer'],
    quote: [['Backend developer shipping '], ['Magento 2, headless WordPress and Go', true], [' systems for real stores — clean modules, measured performance.']],
    about: 'About',
    statement: [[['I build the backend']], [['of commerce — '], ['quiet,', true]], [['fast', true], [' and well documented.']]],
    work: 'Selected work', caseDetails: 'Case details', architecture: 'Architecture',
    experience: 'Experience',
    capabilities: 'Capabilities', capsTitle: [['Tools I reach for '], ['first.', true]],
    skillGroups: ['Commerce', 'Backend', 'Data', 'Ops & Quality'],
    lab: 'Lab — side projects',
    archive: 'Archive', projects: 'projects',
    archiveSub: 'Client work, extensions and experiments — in one curved, draggable wall.',
    openArchive: 'Open the archive',
    contact: 'Contact', backToTop: 'Back to top ↑',
    visitLive: 'Visit live', close: 'Close',
  },
  vi: {
    currently: 'Hiện tại', basedIn: 'Sống tại', location: 'Hà Nội, Việt Nam',
    nav: { work: 'Dự án', about: 'Giới thiệu', experience: 'Kinh nghiệm', contact: 'Liên hệ' },
    talk: 'Trò chuyện', closeArchive: 'Đóng kho', explore: 'Xem dự án',
    title: ['Lập trình', 'Backend'],
    quote: [['Backend cho '], ['Magento 2, WordPress và Go', true], [' — module gọn, hiệu năng đo được.']],
    about: 'Giới thiệu',
    statement: [[['Tôi xây phần backend']], [['cho thương mại — '], ['gọn,', true]], [['nhanh', true], [' và có tài liệu rõ ràng.']]],
    work: 'Dự án tiêu biểu', caseDetails: 'Xem chi tiết', architecture: 'Kiến trúc',
    experience: 'Kinh nghiệm',
    capabilities: 'Năng lực', capsTitle: [['Công cụ tôi '], ['ưu tiên.', true]],
    skillGroups: ['Thương mại', 'Backend', 'Dữ liệu', 'Vận hành & Chất lượng'],
    lab: 'Lab — dự án cá nhân',
    archive: 'Kho dự án', projects: 'dự án',
    archiveSub: 'Dự án khách hàng, extension và thử nghiệm — trên một bức tường cong, kéo được.',
    openArchive: 'Mở kho dự án',
    contact: 'Liên hệ', backToTop: 'Lên đầu trang ↑',
    visitLive: 'Xem trực tiếp', close: 'Đóng',
  },
};

// img: cover art slug in public/works/<img>-{400,640,1200}.webp
export const PROJECTS = [
  {
    title: 'Oroca B2B Commerce', featured: true, flow: ['Next.js storefront', 'GraphQL', 'Magento 2.4.8', 'MySQL queues', 'Indexers'], year: 2026, kind: 'Magenest · Magento 2', img: 'obsidian-flow',
    summary: 'Headless B2B/B2C store on Magento 2.4.8 with company accounts, vouchers and GraphQL storefront.',
    points: [
      'Clinic Setup lead module: REST + GraphQL, file upload, admin grid, email notifications.',
      'VAT / e-invoice address API on GraphQL with ACL-guarded editing.',
      'Product label indexing moved to queues with condition caching and preloading.',
      'Stock & quantity rules for bundle, grouped and configurable products; back-in-stock alerts.',
      'Vietnamese URL-key transliteration with collision detection and 301 migrations; PDF invoice rework.',
    ],
    stack: ['Magento 2.4.8', 'PHP 8.4', 'GraphQL', 'MySQL queues', 'dompdf'],
    vi: {
      kind: 'Magenest · Magento 2',
      summary: "Cửa hàng B2B/B2C headless trên Magento 2.4.8, có tài khoản doanh nghiệp, voucher và storefront GraphQL.",
      points: [
        "Module Clinic Setup thu lead: REST + GraphQL, upload file, admin grid, email thông báo.",
        "API địa chỉ VAT / hóa đơn điện tử trên GraphQL, quyền sửa giới hạn bằng ACL.",
        "Chuyển index nhãn sản phẩm sang queue, cache và nạp trước điều kiện.",
        "Quy tắc tồn kho và số lượng cho bundle, grouped, configurable; báo khi có hàng.",
        "Chuyển tự URL key tiếng Việt, phát hiện trùng, migrate redirect 301; làm lại PDF hóa đơn.",
      ],
    },
  },
  {
    title: 'AI Bought Together', featured: true, flow: ['Storefront events', 'Observers', 'CSV feed', 'AI engine', 'Recommendations'], year: 2026, kind: 'Magenest · AI Commerce', img: 'neon-mirage',
    summary: '“Frequently bought together” recommendations powered by an external AI engine.',
    points: [
      'Session, add-to-cart and order tracking feeding a CSV dataset for the AI endpoint.',
      'Recommendations with popularity fallback and live stock snapshot.',
      'Cron full-sync, status monitor and retries; queue topic with dead-letter manager and alerting.',
      'Admin pin / blacklist controls; strict typing throughout.',
    ],
    stack: ['Magento 2', 'Cron', 'Message queue', 'AI API'],
    vi: {
      kind: 'Magenest · AI Commerce',
      summary: "Gợi ý “thường mua cùng” chạy bằng AI engine bên ngoài.",
      points: [
        "Theo dõi session, thêm giỏ và đơn hàng để tạo bộ dữ liệu CSV cho AI endpoint.",
        "Gợi ý có phương án dự phòng theo độ phổ biến và ảnh chụp tồn kho trực tiếp.",
        "Cron đồng bộ toàn phần, giám sát trạng thái và retry; queue topic có dead-letter và cảnh báo.",
        "Admin ghim / chặn sản phẩm; strict typing toàn bộ.",
      ],
    },
  },
  {
    title: 'VietMap Service', year: 2026, kind: 'Magenest · Extension', img: 'lunar-echo',
    summary: 'Distance & geocoding service for Magento with switchable Vietmap / Goong providers.',
    points: [
      'Service contract bound to a composite that picks the provider from config (strategy via DI).',
      'Vietmap v4 autocomplete, search, reverse, place and route APIs.',
      'Encrypted API keys, live map preview in admin, dedicated log channel, vi_VN translations.',
    ],
    stack: ['Magento 2', 'DI / Strategy', 'Vietmap', 'Goong', 'RequireJS'],
    vi: {
      kind: 'Magenest · Extension',
      summary: "Dịch vụ tính khoảng cách và geocoding cho Magento, chuyển đổi được giữa Vietmap / Goong.",
      points: [
        "Service contract gắn với composite chọn provider theo cấu hình (strategy qua DI).",
        "Các API Vietmap v4: autocomplete, search, reverse, place và route.",
        "API key mã hóa, xem trước bản đồ trong admin, kênh log riêng, bản dịch vi_VN.",
      ],
    },
  },
  {
    title: 'Extension Upgrades', year: 2026, kind: 'Magenest · Extensions', img: 'crystal-dawn',
    summary: 'Abandoned Cart, Gift Card Plus and Popup brought to Magento 2.4.8-p4 / PHP 8.4.',
    points: [
      'Replaced the deprecated Mandrill SDK with Mailchimp Transactional and new click tracking.',
      'Refactored admin rule tabs, email/SMS chains, unsubscribe and guest capture flows.',
      'Fixed admin form validation; released new module versions.',
    ],
    stack: ['Magento 2.4.8', 'PHP 8.4', 'Mailchimp Transactional'],
    vi: {
      kind: 'Magenest · Extensions',
      summary: "Nâng Abandoned Cart, Gift Card Plus và Popup lên Magento 2.4.8-p4 / PHP 8.4.",
      points: [
        "Thay SDK Mandrill đã ngừng hỗ trợ bằng Mailchimp Transactional, thêm tracking click.",
        "Refactor tab rule trong admin, chuỗi email/SMS, hủy đăng ký và thu thập khách vãng lai.",
        "Sửa validate form admin; phát hành phiên bản module mới.",
      ],
    },
  },
  {
    title: 'Fulbright Page Builder', featured: true, flow: ['Editors', 'WordPress + ACF', 'WPGraphQL', 'Page Builder', 'Next.js'], year: 2026, kind: 'Magenest · Headless WordPress', img: 'glass-reverie',
    summary: 'University website: WordPress as a GraphQL CMS behind a Next.js frontend and page builder.',
    points: [
      'Page Builder backend: revisions, slug validation & locks, rate limiting, token-revoked session logout.',
      'Translation API with per-language slugs and lazy creation of translated pages.',
      'GraphQL for courses, majors, people and events; donor form mutation.',
      'CI gates on the MR diff: WPCS, SonarQube, Gitleaks.',
    ],
    stack: ['WordPress', 'WPGraphQL', 'ACF Pro', 'Polylang', 'Next.js'],
    vi: {
      kind: 'Magenest · Headless WordPress',
      summary: "Website đại học: WordPress làm CMS GraphQL phía sau frontend Next.js và page builder.",
      points: [
        "Backend Page Builder: revision, validate và khóa slug, giới hạn tần suất, đăng xuất khi token bị thu hồi.",
        "Translation API với slug theo từng ngôn ngữ, tạo trang dịch khi cần.",
        "GraphQL cho khóa học, ngành, nhân sự và sự kiện; mutation form quyên góp.",
        "CI kiểm tra trên diff của MR: WPCS, SonarQube, Gitleaks.",
      ],
    },
  },
  {
    title: 'Search Service', featured: true, flow: ['Supply service', 'Kafka', 'Go consumer', 'OpenSearch', 'Search API'], year: 2026, kind: 'Magenest · Go microservice', img: 'silent-orbit',
    summary: 'Search for a supplier & package platform: Kafka events indexed into OpenSearch.',
    points: [
      'Kafka consumer indexing entitlements into OpenSearch 2.19 with explicit mappings.',
      'Search & suggest REST API, admin reindex.',
      'CLI for status, reindex and DLQ retry; unit + integration tests in GitLab CI.',
    ],
    stack: ['Go', 'GoFr', 'Kafka', 'OpenSearch', 'PostgreSQL'],
    vi: {
      kind: 'Magenest · Go microservice',
      summary: "Tìm kiếm cho nền tảng nhà cung cấp & gói dịch vụ: sự kiện Kafka được index vào OpenSearch.",
      points: [
        "Kafka consumer index entitlement vào OpenSearch 2.19 với mapping tường minh.",
        "REST API search & suggest, reindex từ admin.",
        "CLI xem trạng thái, reindex, retry DLQ; unit + integration test trên GitLab CI.",
      ],
    },
  },
  {
    title: 'SM Markets PWA', year: 2026, kind: 'Magenest · Adobe Commerce', img: 'prism-haze',
    summary: 'Grocery commerce on Adobe Commerce 2.4.7 with a PWA Studio storefront.',
    points: [
      'Got the legacy PWA running against local backends: protocol-aware UPWARD proxy and GraphQL errors.',
      'Documented ~200 legacy modules (logic, tables, external APIs, config) for onboarding.',
    ],
    stack: ['Adobe Commerce', 'PWA Studio', 'UPWARD', 'React'],
    vi: {
      kind: 'Magenest · Adobe Commerce',
      summary: "Thương mại bán lẻ thực phẩm trên Adobe Commerce 2.4.7 với storefront PWA Studio.",
      points: [
        "Chạy được PWA cũ với backend local: proxy UPWARD theo giao thức, xử lý lỗi GraphQL.",
        "Viết tài liệu cho ~200 module cũ (logic, bảng, API ngoài, cấu hình) để onboard.",
      ],
    },
  },
  {
    title: 'Preme', link: 'https://kerrax.com', year: 2026, kind: 'Personal · Full stack', img: 'radiant-void',
    summary: 'Reseller shop for digital & AI accounts with multi-provider catalog and crypto wallet.',
    points: [
      'Provider catalog with pricing guard: auto-disables items when cost ≥ price.',
      'Wallet top-up via Binance Pay USDT; orders, admin panel, accounting reports.',
      'Self-hosted: Docker, Nginx, Cloudflare tunnel, systemd, backup / restore runbooks.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'Redis', 'Next.js 16', 'Tailwind 4'],
    vi: {
      kind: 'Cá nhân · Full stack',
      summary: "Shop bán lại tài khoản số & AI, catalog nhiều nhà cung cấp và ví crypto.",
      points: [
        "Catalog nhà cung cấp có chốt giá: tự ẩn sản phẩm khi giá vốn ≥ giá bán.",
        "Nạp ví qua Binance Pay USDT; đơn hàng, trang admin, báo cáo kế toán.",
        "Tự vận hành: Docker, Nginx, Cloudflare tunnel, systemd, runbook backup / restore.",
      ],
    },
  },
  {
    title: 'E-Learning LMS', year: 2026, kind: 'Personal · Laravel + AI', img: 'aurora-fold',
    link: 'https://e-learningg.click/',
    summary: 'Learning platform built as a modular monolith with Python AI workers.',
    points: [
      '7 decoupled modules with a route loader that discovers module folders.',
      'Audio pipeline: Whisper STT, translation and TTS over Redis queues; HLS multi-language tracks.',
      'LLM quiz generation (local Ollama, cloud fallback) with a self-healing JSON parser.',
      '2FA with recovery codes, reCAPTCHA v3, PayOS payments with signed webhooks.',
    ],
    stack: ['Laravel 11', 'PHP 8.4', 'Redis', 'Python', 'Ollama'],
    vi: {
      kind: 'Cá nhân · Laravel + AI',
      summary: "Nền tảng học trực tuyến kiến trúc modular monolith cùng AI worker Python.",
      points: [
        "7 module tách biệt, route loader tự quét thư mục module.",
        "Pipeline âm thanh: Whisper STT, dịch và TTS qua Redis queue; HLS nhiều ngôn ngữ.",
        "Sinh quiz bằng LLM (Ollama local, dự phòng cloud) với parser JSON tự sửa lỗi.",
        "2FA có mã khôi phục, reCAPTCHA v3, thanh toán PayOS với webhook có chữ ký.",
      ],
    },
  },
  {
    title: 'Opaline Gazette', year: 2026, kind: 'Personal · Go GraphQL', img: 'eternal-glow',
    summary: 'Headless news platform with RSS ingestion and SEO at scale.',
    points: [
      'gqlgen GraphQL with DataLoader, Uber FX, GORM on PostgreSQL JSONB.',
      'Sitemap index for 50k+ URLs and JSON-LD; RSS crawler with HTML sanitising.',
      'PRD, architecture and 11 operator guides written alongside the code.',
    ],
    stack: ['Go', 'gqlgen', 'PostgreSQL', 'Redis', 'Next.js'],
    vi: {
      kind: 'Cá nhân · Go GraphQL',
      summary: "Nền tảng tin tức headless, thu thập RSS và SEO quy mô lớn.",
      points: [
        "gqlgen GraphQL với DataLoader, Uber FX, GORM trên PostgreSQL JSONB.",
        "Sitemap index cho 50k+ URL và JSON-LD; crawler RSS có lọc HTML.",
        "PRD, kiến trúc và 11 hướng dẫn vận hành viết song song với code.",
      ],
    },
  },
  {
    title: 'learnCode', year: 2026, kind: 'Personal · Online judge', img: 'echo-bloom',
    summary: 'LeetCode-style practice site with sandboxed code execution.',
    points: [
      'Judge0 sandbox for submissions, Monaco editor on the frontend.',
      'JWT + OTP 2FA + Google OAuth2; HTMX admin.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'Judge0', 'Next.js'],
    vi: {
      kind: 'Cá nhân · Online judge',
      summary: "Trang luyện code kiểu LeetCode, chạy code trong sandbox.",
      points: [
        "Sandbox Judge0 chấm bài, Monaco editor ở frontend.",
        "JWT + OTP 2FA + Google OAuth2; admin bằng HTMX.",
      ],
    },
  },
  {
    title: 'OpenDox', link: 'https://opendox.vercel.app/', year: 2026, kind: 'Personal · Document SaaS', img: 'solar-veil',
    summary: 'Document translation with OCR, plus a browser-only PDF toolkit.',
    points: [
      'FastAPI with jobs, quotas, locking and billing modules; PaddleOCR + PDF/DOCX pipeline.',
      'Static Next.js client using pdf.js and pdf-lib, VietQR pricing.',
    ],
    stack: ['Python', 'FastAPI', 'PaddleOCR', 'Next.js'],
    vi: {
      kind: 'Cá nhân · Document SaaS',
      summary: "Dịch tài liệu có OCR, kèm bộ công cụ PDF chạy ngay trên trình duyệt.",
      points: [
        "FastAPI với các module job, quota, khóa và thanh toán; pipeline PaddleOCR + PDF/DOCX.",
        "Client Next.js tĩnh dùng pdf.js và pdf-lib, thanh toán VietQR.",
      ],
    },
  },
  {
    title: 'HQ Group Systems', year: 2025, kind: 'HQ Group · Laravel', img: 'velvet-flux',
    summary: 'Internal KPI, payroll and inventory systems.',
    points: [
      'ClickUp API sync and KPI dashboard: 100% of weekly reports automated.',
      'Real-time payroll with affiliate revenue share: 80% less manual work.',
      'In-Out-Balance inventory synced across warehouse and branches.',
    ],
    stack: ['Laravel', 'MySQL', 'ClickUp API'],
    vi: {
      kind: 'HQ Group · Laravel',
      summary: "Hệ thống nội bộ: KPI, tính lương và kho.",
      points: [
        "Đồng bộ ClickUp API và dashboard KPI: tự động 100% báo cáo tuần.",
        "Tính lương real-time kèm chia doanh thu affiliate: giảm 80% thao tác thủ công.",
        "Kho Nhập–Xuất–Tồn đồng bộ giữa kho tổng và chi nhánh.",
      ],
    },
  },
  {
    title: 'News Crawler', year: 2026, kind: 'Personal · Python', img: 'shadow-tide',
    link: 'https://crawvnnews.onrender.com',
    summary: 'Headline aggregator for Vietnamese and German news outlets.',
    points: ['Scrapers for VnExpress, DanTri, VietNamNet and Süddeutsche Zeitung; deployed on Render.'],
    stack: ['Python', 'BeautifulSoup', 'Docker'],
    vi: {
      kind: 'Cá nhân · Python',
      summary: "Tổng hợp tiêu đề từ báo Việt Nam và Đức.",
      points: [
        "Crawler cho VnExpress, Dân Trí, VietNamNet và Süddeutsche Zeitung; deploy trên Render.",
      ],
    },
  },
  {
    title: 'CodeBaseGo', year: 2026, kind: 'Personal · Go template', img: 'celestial-drift',
    link: 'https://code-base-go-eight.vercel.app',
    summary: 'Reusable modular Go backend with automatic module discovery.',
    points: ['Google Wire DI, gqlgen, JWT, goose migrations; documented request lifecycle.'],
    stack: ['Go', 'Gin', 'Wire', 'gqlgen'],
    vi: {
      kind: 'Cá nhân · Go template',
      summary: "Backend Go module hóa, tái sử dụng, tự phát hiện module.",
      points: [
        "Google Wire DI, gqlgen, JWT, migration goose; có tài liệu vòng đời request.",
      ],
    },
  },
].map((p) => ({ ...p, src: (w) => `/works/${p.img}-${w}.webp` }));
