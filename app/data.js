// Single source of truth for the page copy. Sourced from kinh-nghiem-*.md / du-an-ca-nhan.md.

export const PROFILE = {
  name: 'Nguyen Van Phu',
  role: 'Backend Developer',
  company: 'Magenest',
  location: 'Ha Noi, Vietnam',
  email: 'phu0908204@gmail.com',
  github: 'https://github.com/phuphu0981',
  summary:
    'Backend developer building Magento 2 commerce, headless WordPress and Go services. I like clean module boundaries, measurable performance and writing the docs next to the code.',
  stack: ['Magento 2', 'Laravel', 'Go', 'WordPress', 'GraphQL', 'Kafka', 'Docker'],
};

export const EXPERIENCE = [
  {
    company: 'Magenest',
    role: 'Backend Developer — Magento 2 / WordPress / Go',
    period: '11/2025 — Present',
    points: [
      'B2B/B2C Magento 2.4.8 stores: GraphQL & REST APIs, message queues, indexer tuning, checkout stock rules.',
      'AI commerce add-ons: purchase tracking, recommendation feeds, cron + queue sync with dead-letter and alerts.',
      'Upgraded in-house extensions to Magento 2.4.8 / PHP 8.4; built a Vietmap/Goong map service module.',
      'Headless WordPress Page Builder backend (WPGraphQL) and a Kafka → OpenSearch search service in Go.',
    ],
  },
  {
    company: 'HQ Group',
    role: 'Backend Developer — Intern / Junior (Laravel)',
    period: '02/2025 — 10/2025',
    points: [
      'ClickUp API → KPI dashboard: automated 100% of weekly progress reports.',
      'Real-time payroll (fixed wage + affiliate share): cut manual work by 80%.',
      'Inventory In-Out-Balance with transactional SKU integrity across branches.',
    ],
  },
  {
    company: 'CoreSys',
    role: 'Backend Developer — PHP / Laravel',
    period: '01/2025',
    points: ['Corporate web portal on MVC, Cloudinary media pipeline, transactional mailers and admin dashboards.'],
  },
];

export const EDUCATION = {
  school: 'University of Transport Technology (UTT)',
  degree: 'B.Sc. Information Technology',
  period: '2022 — Present',
  note: 'GPA 3.6 / 4.0 · Excellent merit scholarships (3 semesters)',
};

export const SKILLS = [
  ['Commerce', ['Magento 2 / Adobe Commerce', 'PWA Studio', 'Plugins · Observers · Service contracts', 'Queues · Cron · Indexers']],
  ['Backend', ['PHP 8.4 · Laravel 11', 'Go · Gin · GoFr', 'Python · FastAPI', 'REST · GraphQL']],
  ['Data', ['MySQL', 'PostgreSQL', 'Redis', 'Kafka · OpenSearch']],
  ['Ops & Quality', ['Docker · Nginx · Linux', 'GitLab CI', 'SonarQube · PHPCS · phpstan', 'VPS deploy · Cloudflare tunnel']],
];

// img: cover art slug in public/works/<img>-{400,640,1200}.webp
export const PROJECTS = [
  {
    title: 'Oroca B2B Commerce', year: 2026, kind: 'Magenest · Magento 2', img: 'obsidian-flow',
    summary: 'Headless B2B/B2C store on Magento 2.4.8 with company accounts, vouchers and GraphQL storefront.',
    points: [
      'Clinic Setup lead module: REST + GraphQL, file upload, admin grid, email notifications.',
      'VAT / e-invoice address API on GraphQL with ACL-guarded editing.',
      'Product label indexing moved to queues with condition caching and preloading.',
      'Stock & quantity rules for bundle, grouped and configurable products; back-in-stock alerts.',
      'Vietnamese URL-key transliteration with collision detection and 301 migrations; PDF invoice rework.',
    ],
    stack: ['Magento 2.4.8', 'PHP 8.4', 'GraphQL', 'MySQL queues', 'dompdf'],
  },
  {
    title: 'AI Bought Together', year: 2026, kind: 'Magenest · AI Commerce', img: 'neon-mirage',
    summary: '“Frequently bought together” recommendations powered by an external AI engine.',
    points: [
      'Session, add-to-cart and order tracking feeding a CSV dataset for the AI endpoint.',
      'Recommendations with popularity fallback and live stock snapshot.',
      'Cron full-sync, status monitor and retries; queue topic with dead-letter manager and alerting.',
      'Admin pin / blacklist controls; strict typing throughout.',
    ],
    stack: ['Magento 2', 'Cron', 'Message queue', 'AI API'],
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
  },
  {
    title: 'Fulbright Page Builder', year: 2026, kind: 'Magenest · Headless WordPress', img: 'glass-reverie',
    summary: 'University website: WordPress as a GraphQL CMS behind a Next.js frontend and page builder.',
    points: [
      'Page Builder backend: revisions, slug validation & locks, rate limiting, token-revoked session logout.',
      'Translation API with per-language slugs and lazy creation of translated pages.',
      'GraphQL for courses, majors, people and events; donor form mutation.',
      'CI gates on the MR diff: WPCS, SonarQube, Gitleaks.',
    ],
    stack: ['WordPress', 'WPGraphQL', 'ACF Pro', 'Polylang', 'Next.js'],
  },
  {
    title: 'Search Service', year: 2026, kind: 'Magenest · Go microservice', img: 'silent-orbit',
    summary: 'Search for a supplier & package platform: Kafka events indexed into OpenSearch.',
    points: [
      'Kafka consumer indexing entitlements into OpenSearch 2.19 with explicit mappings.',
      'Search & suggest REST API, admin reindex.',
      'CLI for status, reindex and DLQ retry; unit + integration tests in GitLab CI.',
    ],
    stack: ['Go', 'GoFr', 'Kafka', 'OpenSearch', 'PostgreSQL'],
  },
  {
    title: 'SM Markets PWA', year: 2026, kind: 'Magenest · Adobe Commerce', img: 'prism-haze',
    summary: 'Grocery commerce on Adobe Commerce 2.4.7 with a PWA Studio storefront.',
    points: [
      'Got the legacy PWA running against local backends: protocol-aware UPWARD proxy and GraphQL errors.',
      'Documented ~200 legacy modules (logic, tables, external APIs, config) for onboarding.',
    ],
    stack: ['Adobe Commerce', 'PWA Studio', 'UPWARD', 'React'],
  },
  {
    title: 'Preme', year: 2026, kind: 'Personal · Full stack', img: 'radiant-void',
    summary: 'Reseller shop for digital & AI accounts with multi-provider catalog and crypto wallet.',
    points: [
      'Provider catalog with pricing guard: auto-disables items when cost ≥ price.',
      'Wallet top-up via Binance Pay USDT; orders, admin panel, accounting reports.',
      'Self-hosted: Docker, Nginx, Cloudflare tunnel, systemd, backup / restore runbooks.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'Redis', 'Next.js 16', 'Tailwind 4'],
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
  },
  {
    title: 'learnCode', year: 2026, kind: 'Personal · Online judge', img: 'echo-bloom',
    summary: 'LeetCode-style practice site with sandboxed code execution.',
    points: [
      'Judge0 sandbox for submissions, Monaco editor on the frontend.',
      'JWT + OTP 2FA + Google OAuth2; HTMX admin.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'Judge0', 'Next.js'],
  },
  {
    title: 'OpenDox', year: 2026, kind: 'Personal · Document SaaS', img: 'solar-veil',
    summary: 'Document translation with OCR, plus a browser-only PDF toolkit.',
    points: [
      'FastAPI with jobs, quotas, locking and billing modules; PaddleOCR + PDF/DOCX pipeline.',
      'Static Next.js client using pdf.js and pdf-lib, VietQR pricing.',
    ],
    stack: ['Python', 'FastAPI', 'PaddleOCR', 'Next.js'],
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
  },
  {
    title: 'News Crawler', year: 2026, kind: 'Personal · Python', img: 'shadow-tide',
    link: 'https://crawvnnews.onrender.com',
    summary: 'Headline aggregator for Vietnamese and German news outlets.',
    points: ['Scrapers for VnExpress, DanTri, VietNamNet and Süddeutsche Zeitung; deployed on Render.'],
    stack: ['Python', 'BeautifulSoup', 'Docker'],
  },
  {
    title: 'CodeBaseGo', year: 2026, kind: 'Personal · Go template', img: 'celestial-drift',
    link: 'https://code-base-go-eight.vercel.app',
    summary: 'Reusable modular Go backend with automatic module discovery.',
    points: ['Google Wire DI, gqlgen, JWT, goose migrations; documented request lifecycle.'],
    stack: ['Go', 'Gin', 'Wire', 'gqlgen'],
  },
].map((p) => ({ ...p, src: (w) => `/works/${p.img}-${w}.webp` }));
