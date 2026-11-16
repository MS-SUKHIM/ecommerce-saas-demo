/* ── Categories ── */
export const categories = [
  { id: 'c1', name: 'ملابس رجالية',   icon: '👔', count: 45, slug: 'mens' },
  { id: 'c2', name: 'ملابس نسائية',   icon: '👗', count: 62, slug: 'womens' },
  { id: 'c3', name: 'أحذية',           icon: '👟', count: 38, slug: 'shoes' },
  { id: 'c4', name: 'حقائب',           icon: '👜', count: 27, slug: 'bags' },
  { id: 'c5', name: 'إلكترونيات',      icon: '📱', count: 54, slug: 'electronics' },
  { id: 'c6', name: 'مستلزمات البيت',  icon: '🏠', count: 33, slug: 'home' },
  { id: 'c7', name: 'عطور',            icon: '🌹', count: 19, slug: 'perfumes' },
  { id: 'c8', name: 'رياضة',           icon: '⚽', count: 28, slug: 'sports' },
];

/* ── Products ── */
export const products = [
  { id: 'p1',  name: 'قميص أوكسفورد كلاسيك',      category: 'c1', price: 189, comparePrice: 250, cost: 70,  stock: 145, status: 'active',       sku: 'SH-OX-001', rating: 4.7, reviews: 89,  img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop', tags: ['رجالي','قطن'] },
  { id: 'p2',  name: 'فستان صيفي بوهيمي',          category: 'c2', price: 245, comparePrice: 320, cost: 90,  stock: 0,   status: 'out_of_stock', sku: 'DR-BH-002', rating: 4.9, reviews: 134, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', tags: ['نسائي','صيفي'] },
  { id: 'p3',  name: 'حذاء رياضي نايك Air',        category: 'c3', price: 420, comparePrice: 520, cost: 180, stock: 32,  status: 'active',       sku: 'SN-NK-003', rating: 4.8, reviews: 212, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', tags: ['رياضي','نايك'] },
  { id: 'p4',  name: 'حقيبة جلد إيطالي فاخرة',    category: 'c4', price: 890, comparePrice: null, cost: 350, stock: 18,  status: 'active',       sku: 'BG-IT-004', rating: 4.6, reviews: 55,  img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', tags: ['جلد','فاخر'] },
  { id: 'p5',  name: 'ساعة ذكية سامسونج Watch 6',  category: 'c5', price: 1350, comparePrice: 1600, cost: 700, stock: 24, status: 'active',       sku: 'WC-SS-005', rating: 4.5, reviews: 178, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', tags: ['ساعة','ذكية'] },
  { id: 'p6',  name: 'مكتبة خشبية عصرية',          category: 'c6', price: 650, comparePrice: 800, cost: 280, stock: 7,   status: 'active',       sku: 'HM-BK-006', rating: 4.4, reviews: 42,  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', tags: ['أثاث','خشب'] },
  { id: 'p7',  name: 'عطر أوود ملكي 100مل',        category: 'c7', price: 580, comparePrice: 720, cost: 200, stock: 56,  status: 'active',       sku: 'PR-OD-007', rating: 4.9, reviews: 267, img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop', tags: ['عطر','أوود'] },
  { id: 'p8',  name: 'كرة قدم أديداس World Cup',   category: 'c8', price: 185, comparePrice: 220, cost: 80,  stock: 93,  status: 'active',       sku: 'SP-FB-008', rating: 4.7, reviews: 95,  img: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&h=400&fit=crop', tags: ['رياضة','كرة'] },
  { id: 'p9',  name: 'بنطلون جينز سليم فيت',       category: 'c1', price: 220, comparePrice: 280, cost: 85,  stock: 0,   status: 'out_of_stock', sku: 'PN-JN-009', rating: 4.3, reviews: 77,  img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', tags: ['رجالي','جينز'] },
  { id: 'p10', name: 'سترة شتوية كاشميرية',        category: 'c2', price: 390, comparePrice: 480, cost: 155, stock: 29,  status: 'active',       sku: 'JK-CS-010', rating: 4.8, reviews: 103, img: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&h=400&fit=crop', tags: ['نسائي','كاشمير'] },
  { id: 'p11', name: 'سماعة بلوتوث Sony WH-1000',  category: 'c5', price: 980, comparePrice: 1200, cost: 500, stock: 15, status: 'active',       sku: 'HP-SN-011', rating: 4.9, reviews: 341, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', tags: ['سماعة','سوني'] },
  { id: 'p12', name: 'حذاء كلاسيك جلد أسود',       category: 'c3', price: 340, comparePrice: null, cost: 145, stock: 44, status: 'active',       sku: 'SH-CL-012', rating: 4.6, reviews: 68,  img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop', tags: ['رسمي','جلد'] },
  { id: 'p13', name: 'طقم مطبخ 12 قطعة ستيل',      category: 'c6', price: 450, comparePrice: 580, cost: 180, stock: 22,  status: 'active',       sku: 'HM-KT-013', rating: 4.5, reviews: 89,  img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', tags: ['مطبخ','ستيل'] },
  { id: 'p14', name: 'قميص بولو بيكيه',             category: 'c1', price: 145, comparePrice: 180, cost: 55,  stock: 67,  status: 'active',       sku: 'PL-BQ-014', rating: 4.4, reviews: 52,  img: 'https://images.unsplash.com/photo-1625910513374-8e8e2e05d59a?w=400&h=400&fit=crop', tags: ['رجالي','بولو'] },
  { id: 'p15', name: 'حقيبة ظهر مدرسية',            category: 'c4', price: 175, comparePrice: 210, cost: 65,  stock: 0,   status: 'out_of_stock', sku: 'BG-BP-015', rating: 4.2, reviews: 134, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', tags: ['حقيبة','مدرسي'] },
  { id: 'p16', name: 'عطر رجالي بلو دو شانيل',     category: 'c7', price: 820, comparePrice: null, cost: 320, stock: 38,  status: 'active',       sku: 'PR-CH-016', rating: 4.8, reviews: 195, img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', tags: ['عطر','شانيل'] },
  { id: 'p17', name: 'لاب توب لينوفو ThinkPad',     category: 'c5', price: 3200, comparePrice: 3800, cost: 2100, stock: 8, status: 'active',       sku: 'LT-LN-017', rating: 4.7, reviews: 88,  img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', tags: ['لاب توب','لينوفو'] },
  { id: 'p18', name: 'جهاز تتبع ياقة كلب',          category: 'c8', price: 95,  comparePrice: 120, cost: 35,  stock: 78,  status: 'draft',        sku: 'SP-TK-018', rating: 4.1, reviews: 23,  img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', tags: ['حيوانات'] },
  { id: 'p19', name: 'حذاء رياضي نسائي أبيض',       category: 'c3', price: 285, comparePrice: 350, cost: 115, stock: 51,  status: 'active',       sku: 'SN-WH-019', rating: 4.6, reviews: 167, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop', tags: ['نسائي','رياضي'] },
  { id: 'p20', name: 'مكيف سبليت 18000 BTU',        category: 'c6', price: 2800, comparePrice: 3200, cost: 1800, stock: 5, status: 'active',       sku: 'HM-AC-020', rating: 4.3, reviews: 61,  img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop', tags: ['مكيف','منزل'] },
];

/* ── Customers ── */
export const customers = [
  { id: 'u1',  name: 'عبدالرحمن الغامدي',  email: 'a.ghamdi@email.com',  phone: '+966501234567', city: 'الرياض',  orders: 12, spent: 8420,  since: '2024-01-15', status: 'active' },
  { id: 'u2',  name: 'سارة المطيري',        email: 's.mutairi@email.com', phone: '+966512345678', city: 'جدة',      orders: 7,  spent: 3150,  since: '2024-03-22', status: 'active' },
  { id: 'u3',  name: 'خالد الشمري',         email: 'k.shamri@email.com',  phone: '+966523456789', city: 'الدمام',   orders: 3,  spent: 1890,  since: '2024-06-10', status: 'active' },
  { id: 'u4',  name: 'نورة العتيبي',        email: 'n.utaibi@email.com',  phone: '+966534567890', city: 'مكة',      orders: 19, spent: 14600, since: '2023-11-05', status: 'vip' },
  { id: 'u5',  name: 'فهد الزهراني',        email: 'f.zahrani@email.com', phone: '+966545678901', city: 'المدينة',  orders: 1,  spent: 220,   since: '2025-02-14', status: 'active' },
  { id: 'u6',  name: 'ريم القحطاني',        email: 'r.qahtani@email.com', phone: '+966556789012', city: 'الرياض',  orders: 5,  spent: 2780,  since: '2024-09-30', status: 'active' },
  { id: 'u7',  name: 'محمد الدوسري',        email: 'm.dosari@email.com',  phone: '+966567890123', city: 'الأحساء', orders: 8,  spent: 5340,  since: '2024-02-18', status: 'active' },
  { id: 'u8',  name: 'لمياء الحربي',        email: 'l.harbi@email.com',   phone: '+966578901234', city: 'تبوك',     orders: 2,  spent: 680,   since: '2025-01-07', status: 'active' },
  { id: 'u9',  name: 'عمر الرشيدي',         email: 'o.rashidi@email.com', phone: '+966589012345', city: 'أبها',     orders: 4,  spent: 1920,  since: '2024-07-19', status: 'inactive' },
  { id: 'u10', name: 'منى السبيعي',         email: 'm.subaie@email.com',  phone: '+966590123456', city: 'جدة',      orders: 11, spent: 7230,  since: '2023-12-01', status: 'vip' },
];

/* ── Orders ── */
export const orders = [
  { id: 'ORD-1023', customer: 'عبدالرحمن الغامدي', customerId: 'u1', items: [{productId:'p1',name:'قميص أوكسفورد',qty:2,price:189},{productId:'p14',name:'قميص بولو',qty:1,price:145}], total: 523, status: 'delivered',   date: '2026-09-01', city: 'الرياض',  payMethod: 'mada', shipping: 'aramex', note: '' },
  { id: 'ORD-1022', customer: 'سارة المطيري',       customerId: 'u2', items: [{productId:'p10',name:'سترة كاشميرية',qty:1,price:390}],                                                   total: 390, status: 'shipped',    date: '2026-09-01', city: 'جدة',      payMethod: 'visa',  shipping: 'smsa',   note: 'سريع' },
  { id: 'ORD-1021', customer: 'نورة العتيبي',       customerId: 'u4', items: [{productId:'p11',name:'سماعة سوني',qty:1,price:980},{productId:'p7',name:'عطر أوود',qty:1,price:580}],    total:1560, status: 'processing', date: '2026-08-31', city: 'مكة',      payMethod: 'apple', shipping: 'dhl',    note: '' },
  { id: 'ORD-1020', customer: 'خالد الشمري',        customerId: 'u3', items: [{productId:'p3',name:'حذاء نايك',qty:1,price:420}],                                                        total: 420, status: 'confirmed',  date: '2026-08-30', city: 'الدمام',   payMethod: 'mada',  shipping: 'aramex', note: '' },
  { id: 'ORD-1019', customer: 'فهد الزهراني',       customerId: 'u5', items: [{productId:'p8',name:'كرة قدم',qty:1,price:185}],                                                          total: 185, status: 'pending',    date: '2026-08-30', city: 'المدينة',  payMethod: 'visa',  shipping: 'smsa',   note: '' },
  { id: 'ORD-1018', customer: 'ريم القحطاني',       customerId: 'u6', items: [{productId:'p4',name:'حقيبة جلد',qty:1,price:890}],                                                        total: 890, status: 'delivered',  date: '2026-08-29', city: 'الرياض',   payMethod: 'mada',  shipping: 'smsa',   note: '' },
  { id: 'ORD-1017', customer: 'محمد الدوسري',       customerId: 'u7', items: [{productId:'p5',name:'ساعة ذكية',qty:1,price:1350}],                                                       total:1350, status: 'cancelled',  date: '2026-08-28', city: 'الأحساء',  payMethod: 'visa',  shipping: 'dhl',    note: 'تم الإلغاء' },
  { id: 'ORD-1016', customer: 'لمياء الحربي',       customerId: 'u8', items: [{productId:'p19',name:'حذاء نسائي',qty:1,price:285},{productId:'p2',name:'فستان بوهيمي',qty:1,price:245}],total: 530, status: 'delivered',  date: '2026-08-27', city: 'تبوك',     payMethod: 'mada',  shipping: 'aramex', note: '' },
  { id: 'ORD-1015', customer: 'منى السبيعي',        customerId: 'u10',items: [{productId:'p16',name:'عطر شانيل',qty:2,price:820}],                                                       total:1640, status: 'delivered',  date: '2026-08-26', city: 'جدة',      payMethod: 'visa',  shipping: 'dhl',    note: '' },
  { id: 'ORD-1014', customer: 'عبدالرحمن الغامدي', customerId: 'u1', items: [{productId:'p17',name:'لاب توب لينوفو',qty:1,price:3200}],                                                  total:3200, status: 'delivered',  date: '2026-08-25', city: 'الرياض',   payMethod: 'mada',  shipping: 'dhl',    note: '' },
  { id: 'ORD-1013', customer: 'نورة العتيبي',       customerId: 'u4', items: [{productId:'p13',name:'طقم مطبخ',qty:1,price:450}],                                                        total: 450, status: 'refunded',   date: '2026-08-24', city: 'مكة',      payMethod: 'apple', shipping: 'smsa',   note: 'بضاعة تالفة' },
  { id: 'ORD-1012', customer: 'عمر الرشيدي',        customerId: 'u9', items: [{productId:'p12',name:'حذاء جلد',qty:1,price:340}],                                                        total: 340, status: 'shipped',    date: '2026-08-24', city: 'أبها',     payMethod: 'visa',  shipping: 'aramex', note: '' },
  { id: 'ORD-1011', customer: 'سارة المطيري',       customerId: 'u2', items: [{productId:'p6',name:'مكتبة خشبية',qty:1,price:650}],                                                      total: 650, status: 'processing', date: '2026-08-23', city: 'جدة',      payMethod: 'mada',  shipping: 'smsa',   note: '' },
  { id: 'ORD-1010', customer: 'خالد الشمري',        customerId: 'u3', items: [{productId:'p20',name:'مكيف',qty:1,price:2800}],                                                            total:2800, status: 'confirmed',  date: '2026-08-22', city: 'الدمام',   payMethod: 'visa',  shipping: 'dhl',    note: '' },
  { id: 'ORD-1009', customer: 'محمد الدوسري',       customerId: 'u7', items: [{productId:'p7',name:'عطر أوود',qty:2,price:580}],                                                         total:1160, status: 'delivered',  date: '2026-08-21', city: 'الأحساء',  payMethod: 'mada',  shipping: 'aramex', note: '' },
];

/* ── Sales chart ── */
export const salesChart = [
  { month: 'يناير', sales: 42000, orders: 310, visitors: 8200 },
  { month: 'فبراير', sales: 58000, orders: 420, visitors: 10500 },
  { month: 'مارس', sales: 51000, orders: 380, visitors: 9800 },
  { month: 'أبريل', sales: 73000, orders: 510, visitors: 13200 },
  { month: 'مايو', sales: 89000, orders: 640, visitors: 16800 },
  { month: 'يونيو', sales: 95000, orders: 710, visitors: 18900 },
  { month: 'يوليو', sales: 112000, orders: 830, visitors: 22000 },
  { month: 'أغسطس', sales: 98000, orders: 750, visitors: 19400 },
  { month: 'سبتمبر', sales: 134000, orders: 920, visitors: 27000 },
];

/* ── Stores (tenants) ── */
export const stores = [
  { id: 's1', name: 'متجر الأناقة', slug: 'elegance', plan: 'pro', status: 'active', owner: 'نورة العتيبي' },
  { id: 's2', name: 'عالم التقنية', slug: 'techworld', plan: 'enterprise', status: 'active', owner: 'محمد الدوسري' },
  { id: 's3', name: 'دكان الرياضة', slug: 'sports', plan: 'basic', status: 'active', owner: 'فهد الزهراني' },
];

/* ── Staff ── */
export const staff = [
  { id: 'st1', name: 'أحمد الرشيدي',   email: 'a.rashidi@elegance.sa', role: 'merchant_staff', permissions: ['products','orders'],  status: 'active',   joinedAt: '2025-01-10' },
  { id: 'st2', name: 'هند البقمي',      email: 'h.baqami@elegance.sa',  role: 'merchant_staff', permissions: ['orders','customers'], status: 'active',   joinedAt: '2025-03-05' },
  { id: 'st3', name: 'يوسف العسيري',   email: 'y.asiri@elegance.sa',   role: 'merchant_staff', permissions: ['products'],          status: 'inactive', joinedAt: '2024-11-22' },
];

/* ── Themes ── */
export const themes = [
  { id: 'th1', name: 'Luxe', arabicName: 'فاخر',   category: 'أزياء',       price: 0,   rating: 4.9, preview: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=250&fit=crop', installed: true },
  { id: 'th2', name: 'Nova', arabicName: 'نوفا',   category: 'إلكترونيات', price: 199, rating: 4.8, preview: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=250&fit=crop', installed: false },
  { id: 'th3', name: 'Bloom', arabicName: 'بلوم',  category: 'جمال',        price: 149, rating: 4.7, preview: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=250&fit=crop', installed: false },
  { id: 'th4', name: 'Metro', arabicName: 'مترو',  category: 'عام',         price: 0,   rating: 4.6, preview: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=250&fit=crop', installed: false },
  { id: 'th5', name: 'Spark', arabicName: 'سبارك', category: 'رياضة',       price: 99,  rating: 4.8, preview: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=250&fit=crop', installed: false },
  { id: 'th6', name: 'Oasis', arabicName: 'واحة',  category: 'غذاء',        price: 129, rating: 4.5, preview: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=250&fit=crop', installed: false },
];

/* ── Apps ── */
export const apps = [
  { id: 'a1', name: 'شحن أرامكس',    category: 'شحن',      icon: '📦', price: 49,  rating: 4.6, installed: true,  desc: 'ربط مباشر مع أرامكس للشحن المحلي والدولي' },
  { id: 'a2', name: 'دفع مدى',       category: 'دفع',      icon: '💳', price: 0,   rating: 4.9, installed: true,  desc: 'بوابة دفع مدى الرسمية لبطاقات البنوك السعودية' },
  { id: 'a3', name: 'تابي تقسيط',    category: 'دفع',      icon: '🔄', price: 0,   rating: 4.7, installed: false, desc: 'اشتري الآن وادفع على 4 دفعات بدون فوائد' },
  { id: 'a4', name: 'واتساب API',    category: 'تسويق',    icon: '💬', price: 79,  rating: 4.5, installed: false, desc: 'إشعارات الطلبات عبر واتساب أوتوماتيكياً' },
  { id: 'a5', name: 'جوجل أناليتكس', category: 'تحليلات', icon: '📊', price: 0,   rating: 4.9, installed: true,  desc: 'تتبع الزوار والتحويلات بتفصيل كامل' },
  { id: 'a6', name: 'تقييمات جوجل',  category: 'تسويق',    icon: '⭐', price: 29,  rating: 4.4, installed: false, desc: 'اجمع تقييمات Google وعرضها في المتجر' },
  { id: 'a7', name: 'DHL شحن دولي',  category: 'شحن',      icon: '🚀', price: 59,  rating: 4.3, installed: false, desc: 'شحن دولي سريع إلى 220 دولة' },
  { id: 'a8', name: 'محاسبة Zoho',   category: 'محاسبة',   icon: '📋', price: 99,  rating: 4.6, installed: false, desc: 'ربط المبيعات مع Zoho Books تلقائياً' },
];

/* ── Billing history ── */
export const billingHistory = [
  { id: 'inv-001', date: '2026-09-01', plan: 'الاحترافية', amount: 299, status: 'paid' },
  { id: 'inv-002', date: '2026-08-01', plan: 'الاحترافية', amount: 299, status: 'paid' },
  { id: 'inv-003', date: '2026-07-01', plan: 'الاحترافية', amount: 299, status: 'paid' },
  { id: 'inv-004', date: '2026-06-01', plan: 'الأساسية',   amount:  99, status: 'paid' },
  { id: 'inv-005', date: '2026-05-01', plan: 'الأساسية',   amount:  99, status: 'paid' },
];

/* ── Reviews ── */
export const reviews = [
  { id: 'r1', productId: 'p1', user: 'عبدالرحمن', rating: 5, comment: 'جودة ممتازة، القماش ناعم جداً وحجمه مظبوط', date: '2026-08-20' },
  { id: 'r2', productId: 'p1', user: 'خالد', rating: 4, comment: 'منتج رائع ولكن الألوان المتاحة قليلة', date: '2026-08-15' },
  { id: 'r3', productId: 'p3', user: 'سارة', rating: 5, comment: 'أفضل حذاء اشتريته، مريح جداً للمشي', date: '2026-09-01' },
  { id: 'r4', productId: 'p7', user: 'نورة', rating: 5, comment: 'رائحة فاخرة ومميزة جداً، العبوة أنيقة', date: '2026-08-28' },
];
