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
    line: 'University of Transport Technology. GPA 3.6 / 4.0, with a top-grade scholarship in three semesters.',
    metrics: [[3.6, '', 'GPA / 4.0'], [3, '', 'scholarship semesters']],
    vi: {
      role: 'Cử nhân Công nghệ Thông tin',
      line: 'Đại học Công nghệ Giao thông Vận tải. GPA 3.6 / 4.0, ba kỳ nhận học bổng loại Xuất sắc.',
      metrics: [[3.6, '', 'GPA / 4.0'], [3, '', 'kỳ nhận học bổng']],
    },
  },
  {
    company: 'CoreSys', role: 'Backend Developer — Laravel', period: '01/2025',
    line: 'Built the company website in Laravel, with images stored on Cloudinary, automatic emails and a page for editing content.',
    metrics: [],
    vi: { line: 'Làm website công ty bằng Laravel: ảnh lưu trên Cloudinary, email gửi tự động và trang quản lý nội dung.' },
  },
  {
    company: 'HQ Group', role: 'Backend Developer — Laravel', period: '02/2025 — 10/2025',
    line: 'Built internal tools for reports, payroll and stock, so the team spent less time on manual work.',
    metrics: [[100, '%', 'weekly reports automated'], [80, '%', 'less manual payroll work']],
    vi: {
      line: 'Làm các công cụ nội bộ cho báo cáo, tính lương và kho hàng, giúp mọi người bớt làm tay.',
      metrics: [[100, '%', 'báo cáo tuần tự động'], [80, '%', 'bớt việc tính lương']],
    },
  },
  {
    company: 'Magenest', role: 'Backend Developer', period: '11/2025 — Now',
    line: 'Work on client projects in Magento 2, WordPress and Go: new features, version upgrades and speed fixes.',
    metrics: [[7, '', 'projects'], [3, '', 'platforms']],
    vi: {
      period: '11/2025 — nay',
      line: 'Làm dự án cho khách hàng trên Magento 2, WordPress và Go: thêm tính năng, nâng cấp phiên bản và cải thiện tốc độ.',
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
    talk: 'Let’s talk', closeArchive: 'Close', explore: 'View projects',
    title: ['Backend', 'Developer'],
    quote: [['Backend developer for online stores and websites, mainly with '], ['Magento 2, WordPress and Go', true], ['.']],
    about: 'About',
    statement: [[['Focus on code that']], [['is easy to read,', true]], [['runs fast and has notes.']]],
    work: 'Selected work', caseDetails: 'Details', architecture: 'How it works',
    experience: 'Experience',
    capabilities: 'Skills', capsTitle: [['Tools in '], ['daily use.', true]],
    skillGroups: ['Commerce', 'Backend', 'Data', 'Ops & Quality'],
    lab: 'Side projects',
    archive: 'All projects', projects: 'projects',
    archiveSub: 'Client work and side projects. Drag to look around.',
    openArchive: 'See all projects',
    contact: 'Contact', backToTop: 'Back to top ↑',
    visitLive: 'Visit site', close: 'Close',
  },
  vi: {
    currently: 'Hiện tại', basedIn: 'Sống tại', location: 'Hà Nội, Việt Nam',
    nav: { work: 'Dự án', about: 'Giới thiệu', experience: 'Kinh nghiệm', contact: 'Liên hệ' },
    talk: 'Liên hệ', closeArchive: 'Đóng', explore: 'Xem dự án',
    title: ['Lập trình', 'Backend'],
    quote: [['Lập trình viên backend cho web bán hàng và website, chủ yếu với '], ['Magento 2, WordPress và Go', true], ['.']],
    about: 'Giới thiệu',
    statement: [[['Ưu tiên code']], [['dễ đọc,', true]], [['chạy nhanh và có ghi chú.']]],
    work: 'Dự án tiêu biểu', caseDetails: 'Chi tiết', architecture: 'Cách hoạt động',
    experience: 'Kinh nghiệm',
    capabilities: 'Kỹ năng', capsTitle: [['Công cụ '], ['dùng hằng ngày.', true]],
    skillGroups: ['Thương mại điện tử', 'Backend', 'Dữ liệu', 'Vận hành & Chất lượng'],
    lab: 'Dự án cá nhân',
    archive: 'Tất cả dự án', projects: 'dự án',
    archiveSub: 'Dự án cho khách hàng và dự án cá nhân. Kéo để xem.',
    openArchive: 'Xem tất cả dự án',
    contact: 'Liên hệ', backToTop: 'Lên đầu trang ↑',
    visitLive: 'Xem trang', close: 'Đóng',
  },
};

// img: cover art slug in public/works/<img>-{400,640,1200}.webp
export const PROJECTS = [
  {
    title: 'Oroca B2B Commerce', featured: true, flow: ['Headless storefront', 'GraphQL', 'Magento 2.4.8', 'MySQL queues', 'Indexers'], year: 2026, kind: 'Magenest · Magento 2', img: 'obsidian-flow',
    summary: 'An online store on Magento 2.4.8 that sells to both businesses and regular customers.',
    points: [
      'Built a sign-up form for clinics: the request is saved, shown in admin and sent by email.',
      'Let company buyers save VAT invoice details and reuse them at checkout.',
      'Made product labels update faster by moving the work to a background queue.',
      'Stopped customers from ordering more than what is in stock, and added “notify me when back”.',
      'Turned Vietnamese product names into clean URLs and kept old links working with redirects.',
      'Redid the PDF invoice layout.',
    ],
    stack: ['Magento 2.4.8', 'PHP 8.4', 'GraphQL', 'MySQL queues', 'dompdf'],
    vi: {
      summary: 'Web bán hàng trên Magento 2.4.8, bán cho cả doanh nghiệp lẫn khách lẻ.',
      points: [
        'Làm form đăng ký cho phòng khám: lưu yêu cầu, hiện trong admin và gửi email báo.',
        'Cho khách doanh nghiệp lưu thông tin xuất hóa đơn VAT và dùng lại khi thanh toán.',
        'Cập nhật nhãn sản phẩm nhanh hơn bằng cách đưa việc nặng chạy ngầm qua queue.',
        'Không cho đặt quá số hàng còn trong kho, thêm nút “báo khi có hàng”.',
        'Đổi tên sản phẩm tiếng Việt thành URL không dấu, link cũ vẫn chuyển đúng trang mới.',
        'Làm lại mẫu PDF hóa đơn.',
      ],
    },
  },
  {
    title: 'AI Bought Together', featured: true, flow: ['Storefront events', 'Observers', 'CSV feed', 'AI engine', 'Recommendations'], year: 2026, kind: 'Magenest · AI Commerce', img: 'neon-mirage',
    summary: 'A Magento module that suggests “frequently bought together” products using AI.',
    points: [
      'Collected cart and order data and sent it to the AI service as a CSV file.',
      'When the AI has no answer yet, show best sellers instead, and only items in stock.',
      'Scheduled syncs that check their own status and retry when something fails.',
      'Let admins pin or hide specific suggestions.',
    ],
    stack: ['Magento 2', 'Cron', 'Message queue', 'AI API'],
    vi: {
      summary: 'Module Magento gợi ý sản phẩm “thường được mua cùng” bằng AI.',
      points: [
        'Thu thập dữ liệu giỏ hàng, đơn hàng rồi gửi cho dịch vụ AI dưới dạng file CSV.',
        'Khi AI chưa có kết quả thì hiện sản phẩm bán chạy, và chỉ gợi ý hàng còn trong kho.',
        'Đồng bộ theo lịch, tự kiểm tra trạng thái và tự chạy lại khi lỗi.',
        'Cho admin ghim hoặc ẩn từng gợi ý.',
      ],
    },
  },
  {
    title: 'VietMap Service', year: 2026, kind: 'Magenest · Extension', img: 'lunar-echo',
    summary: 'A Magento module for Vietnamese maps: find addresses and measure distances.',
    points: [
      'Works with both Vietmap and Goong; switch between them in settings.',
      'Address search, autocomplete and route distance with the Vietmap API.',
      'API keys are stored encrypted, and admins can preview the map before saving.',
    ],
    stack: ['Magento 2', 'DI / Strategy', 'Vietmap', 'Goong', 'RequireJS'],
    vi: {
      summary: 'Module bản đồ Việt Nam cho Magento: tìm địa chỉ và tính khoảng cách.',
      points: [
        'Dùng được cả Vietmap và Goong, đổi qua lại trong phần cài đặt.',
        'Tìm địa chỉ, gợi ý khi gõ và tính quãng đường bằng API Vietmap.',
        'API key được mã hóa, admin xem trước bản đồ trước khi lưu.',
      ],
    },
  },
  {
    title: 'Extension Upgrades', year: 2026, kind: 'Magenest · Extensions', img: 'crystal-dawn',
    summary: 'Updated three Magento extensions (Abandoned Cart, Gift Card Plus, Popup) to Magento 2.4.8 and PHP 8.4.',
    points: [
      'Replaced an old email library that was no longer supported with Mailchimp.',
      'Cleaned up the reminder email and SMS settings for abandoned carts.',
      'Fixed form bugs in admin and released new versions.',
    ],
    stack: ['Magento 2.4.8', 'PHP 8.4', 'Mailchimp Transactional'],
    vi: {
      summary: 'Nâng cấp ba extension Magento (Abandoned Cart, Gift Card Plus, Popup) lên Magento 2.4.8 và PHP 8.4.',
      points: [
        'Thay thư viện gửi email cũ đã ngừng hỗ trợ bằng Mailchimp.',
        'Sắp xếp lại phần cài đặt email, SMS nhắc khách quay lại giỏ hàng.',
        'Sửa lỗi form trong admin và phát hành bản mới.',
      ],
    },
  },
  {
    title: 'Fulbright Page Builder', featured: true, flow: ['Editors', 'WordPress + ACF', 'WPGraphQL', 'Page Builder', 'Next.js'], year: 2026, kind: 'Magenest · Headless WordPress', img: 'glass-reverie',
    summary: 'Website for Fulbright University Vietnam. Editors use WordPress, and the site itself is built with Next.js.',
    points: [
      'Built the backend for a page builder: version history, locked page URLs and safe logout.',
      'Made it easy to create Vietnamese and English versions of each page.',
      'Added data for courses, majors, people, events and the donation form.',
      'Fixed code issues flagged by the review tools in CI.',
    ],
    stack: ['WordPress', 'WPGraphQL', 'ACF Pro', 'Polylang', 'Next.js'],
    vi: {
      summary: 'Website Đại học Fulbright Việt Nam. Biên tập viên dùng WordPress, còn giao diện làm bằng Next.js.',
      points: [
        'Làm backend cho trình dựng trang: lưu lịch sử chỉnh sửa, khóa đường dẫn trang, đăng xuất an toàn.',
        'Giúp tạo bản tiếng Việt và tiếng Anh cho từng trang dễ hơn.',
        'Thêm dữ liệu khóa học, ngành, giảng viên, sự kiện và form quyên góp.',
        'Sửa các lỗi code mà công cụ kiểm tra trong CI báo.',
      ],
    },
  },
  {
    title: 'Search Service', featured: true, flow: ['Upstream service', 'Kafka', 'Go consumer', 'OpenSearch', 'Search API'], year: 2026, kind: 'Magenest · Go microservice', img: 'silent-orbit',
    summary: 'A search service in Go for the ACE platform.',
    points: [
      'Listens for data changes through Kafka and keeps the search index up to date.',
      'Search API with keyword suggestions, plus a button for admins to rebuild the index.',
      'A small command-line tool to check status and resend failed messages.',
      'Covered by tests that run on every push.',
    ],
    stack: ['Go', 'GoFr', 'Kafka', 'OpenSearch', 'PostgreSQL'],
    vi: {
      summary: 'Dịch vụ tìm kiếm viết bằng Go cho nền tảng ACE.',
      points: [
        'Nhận thay đổi dữ liệu qua Kafka và cập nhật chỉ mục tìm kiếm ngay.',
        'API tìm kiếm có gợi ý từ khóa, admin có thể dựng lại chỉ mục khi cần.',
        'Công cụ dòng lệnh nhỏ để xem trạng thái và gửi lại tin nhắn bị lỗi.',
        'Có test chạy tự động mỗi lần đẩy code.',
      ],
    },
  },
  {
    title: 'SM Markets PWA', year: 2026, kind: 'Magenest · Adobe Commerce', img: 'prism-haze',
    summary: 'A large grocery store in the Philippines on Adobe Commerce, with around 110 custom modules.',
    points: [
      'Got the old storefront running on a local machine so the team could work on it.',
      'Wrote short notes for about 200 old modules so new people can learn the project faster.',
    ],
    stack: ['Adobe Commerce', 'PWA Studio', 'UPWARD', 'React'],
    vi: {
      summary: 'Siêu thị online lớn ở Philippines chạy Adobe Commerce, khoảng 110 module riêng.',
      points: [
        'Dựng được giao diện cũ chạy trên máy local để cả team làm việc.',
        'Viết ghi chú ngắn cho khoảng 200 module cũ, giúp người mới nắm dự án nhanh hơn.',
      ],
    },
  },
  {
    title: 'Preme', link: 'https://kerrax.com', year: 2026, kind: 'Personal · Full stack', img: 'radiant-void',
    summary: 'A personal project: a shop selling digital and AI accounts, built from backend to server.',
    points: [
      'Pulls products from several suppliers and hides any item that would sell at a loss.',
      'Customers top up their wallet with USDT through Binance Pay.',
      'Admin pages for orders and simple accounting reports.',
      'Runs on a self-managed server, with backup and restore steps written down.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'Redis', 'Next.js 16', 'Tailwind 4'],
    vi: {
      kind: 'Cá nhân · Full stack',
      summary: 'Dự án cá nhân: shop bán tài khoản số và tài khoản AI, làm trọn từ backend đến server.',
      points: [
        'Lấy sản phẩm từ nhiều nhà cung cấp, tự ẩn món nào bán ra sẽ bị lỗ.',
        'Khách nạp tiền vào ví bằng USDT qua Binance Pay.',
        'Trang admin quản lý đơn hàng và báo cáo thu chi đơn giản.',
        'Chạy trên server riêng, có ghi lại các bước sao lưu và khôi phục.',
      ],
    },
  },
  {
    title: 'E-Learning LMS', year: 2026, kind: 'Personal · Laravel + AI', img: 'aurora-fold',
    link: 'https://e-learningg.click/',
    summary: 'An online course site where AI dubs lessons and writes quizzes.',
    points: [
      'Split the code into 7 parts so each feature stays separate.',
      'AI turns lesson audio into text, translates it and reads it back in English, French or Vietnamese.',
      'AI writes quizzes from the subtitles, running locally with a cloud backup.',
      'Two-step login, spam protection and payments through PayOS.',
    ],
    stack: ['Laravel 11', 'PHP 8.4', 'Redis', 'Python', 'Ollama'],
    vi: {
      kind: 'Cá nhân · Laravel + AI',
      summary: 'Trang học online, có AI lồng tiếng cho bài giảng và tự ra câu hỏi.',
      points: [
        'Chia code thành 7 phần, mỗi tính năng nằm riêng một chỗ.',
        'AI chuyển lời giảng thành chữ, dịch rồi đọc lại bằng tiếng Anh, Pháp hoặc Việt.',
        'AI soạn câu hỏi trắc nghiệm từ phụ đề, chạy trên máy và có cloud dự phòng.',
        'Đăng nhập hai bước, chống spam và thanh toán qua PayOS.',
      ],
    },
  },
  {
    title: 'Opaline Gazette', year: 2026, kind: 'Personal · Go GraphQL', img: 'eternal-glow',
    summary: 'A news site that collects articles from RSS feeds and is set up for Google search.',
    points: [
      'Go backend with a GraphQL API that loads data in batches to stay fast.',
      'Sitemap for more than 50,000 pages, so search engines can find every article.',
      'Wrote the plan and 11 how-to guides while building it.',
    ],
    stack: ['Go', 'gqlgen', 'PostgreSQL', 'Redis', 'Next.js'],
    vi: {
      kind: 'Cá nhân · Go GraphQL',
      summary: 'Trang tin tức tự lấy bài từ RSS, làm sẵn cho Google tìm thấy.',
      points: [
        'Backend Go với API GraphQL, gom truy vấn theo lô để chạy nhanh.',
        'Sitemap cho hơn 50.000 trang để công cụ tìm kiếm thấy được mọi bài viết.',
        'Viết kế hoạch và 11 bài hướng dẫn trong lúc làm.',
      ],
    },
  },
  {
    title: 'learnCode', year: 2026, kind: 'Personal · Online judge', img: 'echo-bloom',
    summary: 'A LeetCode-style site to practice coding problems.',
    points: [
      'Submitted code runs in a safe sandbox and is graded right away.',
      'Code editor in the browser, login with Google and two-step verification.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'Judge0', 'Next.js'],
    vi: {
      kind: 'Cá nhân · Online judge',
      summary: 'Trang luyện giải bài code giống LeetCode.',
      points: [
        'Code của người dùng chạy trong môi trường cách ly và được chấm ngay.',
        'Viết code ngay trên trình duyệt, đăng nhập bằng Google và xác thực hai bước.',
      ],
    },
  },
  {
    title: 'OpenDox', link: 'https://opendox.vercel.app/', year: 2026, kind: 'Personal · Document SaaS', img: 'solar-veil',
    summary: 'Translate documents, even scanned ones, and edit PDFs right in the browser.',
    points: [
      'Reads text from scanned pages and keeps the PDF or Word layout.',
      'PDF tools run in the browser, so files never leave the user’s computer.',
      'Pay by bank QR code.',
    ],
    stack: ['Python', 'FastAPI', 'PaddleOCR', 'Next.js'],
    vi: {
      kind: 'Cá nhân · Document SaaS',
      summary: 'Dịch tài liệu, kể cả bản scan, và chỉnh PDF ngay trên trình duyệt.',
      points: [
        'Đọc chữ từ bản scan, giữ nguyên bố cục file PDF hoặc Word.',
        'Công cụ PDF chạy trên trình duyệt nên file không rời khỏi máy người dùng.',
        'Thanh toán bằng mã QR ngân hàng.',
      ],
    },
  },
  {
    title: 'HQ Group Systems', year: 2025, kind: 'HQ Group · Laravel', img: 'velvet-flux',
    summary: 'Internal tools for reports, payroll and stock.',
    points: [
      'Pulled tasks from ClickUp into a KPI dashboard, so weekly reports write themselves.',
      'Salary and affiliate bonuses are calculated automatically, with 80% less manual work.',
      'Stock in the main warehouse and branches stays in sync.',
    ],
    stack: ['Laravel', 'MySQL', 'ClickUp API'],
    vi: {
      summary: 'Công cụ nội bộ cho báo cáo, tính lương và kho hàng.',
      points: [
        'Lấy task từ ClickUp lên bảng KPI, báo cáo tuần không phải làm tay nữa.',
        'Lương và thưởng affiliate được tính tự động, bớt 80% việc thủ công.',
        'Hàng ở kho tổng và các chi nhánh luôn khớp nhau.',
      ],
    },
  },
  {
    title: 'News Crawler', year: 2026, kind: 'Personal · Python', img: 'shadow-tide',
    link: 'https://crawvnnews.onrender.com',
    summary: 'Collects headlines from Vietnamese and German news sites in one place.',
    points: ['Reads VnExpress, Dân Trí, VietNamNet and Süddeutsche Zeitung.'],
    stack: ['Python', 'BeautifulSoup', 'Docker'],
    vi: {
      kind: 'Cá nhân · Python',
      summary: 'Gom tin từ báo Việt Nam và báo Đức về một chỗ.',
      points: ['Lấy tin từ VnExpress, Dân Trí, VietNamNet và Süddeutsche Zeitung.'],
    },
  },
  {
    title: 'CodeBaseGo', year: 2026, kind: 'Personal · Go template', img: 'celestial-drift',
    link: 'https://code-base-go-eight.vercel.app',
    summary: 'A reusable Go starter project for new backends.',
    points: ['Add a new module with one command, and the docs explain how each request is handled.'],
    stack: ['Go', 'Gin', 'Wire', 'gqlgen'],
    vi: {
      kind: 'Cá nhân · Go template',
      summary: 'Dự án khung Go, dùng lại để dựng nhanh backend mới.',
      points: ['Thêm module mới chỉ bằng một lệnh, có tài liệu giải thích cách xử lý từng request.'],
    },
  },
].map((p) => ({ ...p, src: (w) => `/works/${p.img}-${w}.webp` }));
