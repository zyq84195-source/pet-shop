import { Product } from '@/types';

export const products: Product[] = [
  // Food
  {
    id: 'prod-001',
    name: { en: 'Premium Dog Food', zh: '优质狗粮' },
    category: 'food',
    price: 49.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400'],
    description: {
      en: 'High-quality dry dog food with real meat as the first ingredient. Rich in protein and essential nutrients.',
      zh: '高品质干狗粮，真正的肉类是第一成分。富含蛋白质和必需营养素。'
    },
    stock: 50,
    rating: 4.8,
    reviews: 234,
    featured: true,
  },
  {
    id: 'prod-002',
    name: { en: 'Gourmet Cat Food', zh: '美味猫粮' },
    category: 'food',
    price: 39.99,
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'],
    description: {
      en: 'Premium wet cat food with tender chunks in savory gravy. No artificial preservatives.',
      zh: '优质湿猫粮，美味肉汁中浸满嫩肉块。无人工防腐剂。'
    },
    stock: 45,
    rating: 4.6,
    reviews: 189,
    featured: true,
  },
  {
    id: 'prod-003',
    name: { en: 'Puppy Growth Formula', zh: '幼犬成长配方' },
    category: 'food',
    price: 54.99,
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
    description: {
      en: 'Specially formulated for growing puppies. Contains DHA for brain development.',
      zh: '专为成长中的幼犬设计。含有DHA促进大脑发育。'
    },
    stock: 30,
    rating: 4.9,
    reviews: 156,
    featured: false,
  },
  {
    id: 'prod-004',
    name: { en: 'Bird Seed Mix', zh: '鸟食混合粮' },
    category: 'food',
    price: 15.99,
    images: ['https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400'],
    description: {
      en: 'Premium blend of seeds for all bird types. Rich in vitamins and minerals.',
      zh: '适合所有鸟类的高级种子混合。富含维生素和矿物质。'
    },
    stock: 100,
    rating: 4.5,
    reviews: 78,
    featured: false,
  },
  // Toys
  {
    id: 'prod-005',
    name: { en: 'Interactive Dog Ball', zh: '互动狗球' },
    category: 'toys',
    price: 19.99,
    images: ['https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400'],
    description: {
      en: 'Smart ball that moves on its own. Perfect for keeping your dog entertained.',
      zh: '自动移动的智能球。让您的狗狗保持娱乐。'
    },
    stock: 60,
    rating: 4.7,
    reviews: 203,
    featured: true,
  },
  {
    id: 'prod-006',
    name: { en: 'Cat Teaser Wand', zh: '猫咪逗猫棒' },
    category: 'toys',
    price: 9.99,
    images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400'],
    description: {
      en: 'Feather wand toy for interactive play. Durable and engaging.',
      zh: '互动羽毛逗猫棒。耐用且有趣。'
    },
    stock: 80,
    rating: 4.4,
    reviews: 167,
    featured: false,
  },
  {
    id: 'prod-007',
    name: { en: 'Chew Bone Set', zh: '磨牙骨套装' },
    category: 'toys',
    price: 24.99,
    originalPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c27?w=400'],
    description: {
      en: 'Set of 3 durable chew bones. Great for dental health and stress relief.',
      zh: '3个耐用磨牙骨套装。有益于牙齿健康和减压。'
    },
    stock: 40,
    rating: 4.6,
    reviews: 145,
    featured: true,
  },
  {
    id: 'prod-008',
    name: { en: 'Plush Squeaky Toys', zh: '毛绒发声玩具' },
    category: 'toys',
    price: 14.99,
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'],
    description: {
      en: 'Soft plush toys with squeakers inside. Perfect for gentle play.',
      zh: '内置发声器的柔软毛绒玩具。适合温和游戏。'
    },
    stock: 55,
    rating: 4.3,
    reviews: 98,
    featured: false,
  },
  // Accessories
  {
    id: 'prod-009',
    name: { en: 'Adjustable Dog Collar', zh: '可调节狗项圈' },
    category: 'accessories',
    price: 12.99,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
    description: {
      en: 'Nylon collar with reflective strips. Adjustable for perfect fit.',
      zh: '带反光条的尼龙项圈。可调节至完美贴合。'
    },
    stock: 70,
    rating: 4.5,
    reviews: 212,
    featured: false,
  },
  {
    id: 'prod-010',
    name: { en: 'Retractable Leash', zh: '伸缩牵引绳' },
    category: 'accessories',
    price: 29.99,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'],
    description: {
      en: '16ft retractable leash with comfortable grip. Suitable for dogs up to 50lbs.',
      zh: '16英尺伸缩牵引绳，握把舒适。适合50磅以下的狗狗。'
    },
    stock: 35,
    rating: 4.6,
    reviews: 189,
    featured: true,
  },
  {
    id: 'prod-011',
    name: { en: 'Cozy Pet Bed', zh: '舒适宠物床' },
    category: 'accessories',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400'],
    description: {
      en: 'Soft and warm pet bed with raised edges. Machine washable.',
      zh: '柔软温暖的宠物床，有高边设计。可机洗。'
    },
    stock: 25,
    rating: 4.8,
    reviews: 276,
    featured: true,
  },
  {
    id: 'prod-012',
    name: { en: 'Cat Scratching Post', zh: '猫抓板' },
    category: 'accessories',
    price: 39.99,
    images: ['https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400'],
    description: {
      en: 'Multi-level scratching post with toys attached. Saves your furniture.',
      zh: '带玩具的多层猫抓板。保护您的家具。'
    },
    stock: 20,
    rating: 4.4,
    reviews: 134,
    featured: false,
  },
  // Health
  {
    id: 'prod-013',
    name: { en: 'Flea & Tick Prevention', zh: '跳蚤蜱虫预防' },
    category: 'health',
    price: 34.99,
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
    description: {
      en: '3-month supply of flea and tick prevention. Waterproof formula.',
      zh: '3个月用量的跳蚤和蜱虫预防剂。防水配方。'
    },
    stock: 45,
    rating: 4.7,
    reviews: 324,
    featured: true,
  },
  {
    id: 'prod-014',
    name: { en: 'Joint Support Supplement', zh: '关节保健补充剂' },
    category: 'health',
    price: 44.99,
    images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'],
    description: {
      en: 'Glucosamine supplement for joint health. Helps with mobility in older pets.',
      zh: '葡萄糖胺关节保健补充剂。帮助老年宠物保持活动能力。'
    },
    stock: 30,
    rating: 4.6,
    reviews: 167,
    featured: false,
  },
  {
    id: 'prod-015',
    name: { en: 'Dental Care Kit', zh: '口腔护理套装' },
    category: 'health',
    price: 18.99,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
    description: {
      en: 'Complete dental kit with toothbrush, toothpaste, and finger brush.',
      zh: '完整口腔护理套装，包含牙刷、牙膏和指套刷。'
    },
    stock: 55,
    rating: 4.3,
    reviews: 89,
    featured: false,
  },
  {
    id: 'prod-016',
    name: { en: 'Vitamins & Minerals', zh: '维生素矿物质' },
    category: 'health',
    price: 24.99,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c27?w=400'],
    description: {
      en: 'Daily multivitamin for overall health. Tasty chewable tablets.',
      zh: '日常多种维生素，促进整体健康。美味的咀嚼片。'
    },
    stock: 60,
    rating: 4.5,
    reviews: 112,
    featured: false,
  },
  // Grooming
  {
    id: 'prod-017',
    name: { en: 'Professional Grooming Kit', zh: '专业美容套装' },
    category: 'grooming',
    price: 59.99,
    originalPrice: 79.99,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400'],
    description: {
      en: 'Complete grooming kit with clippers, scissors, and brushes. For all coat types.',
      zh: '完整美容套装，包含电剪、剪刀和刷子。适合所有毛发类型。'
    },
    stock: 15,
    rating: 4.8,
    reviews: 145,
    featured: true,
  },
  {
    id: 'prod-018',
    name: { en: 'Natural Pet Shampoo', zh: '天然宠物洗发水' },
    category: 'grooming',
    price: 16.99,
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
    description: {
      en: 'Gentle, natural shampoo for sensitive skin. Oatmeal formula.',
      zh: '温和的天然洗发水，适合敏感肌肤。燕麦配方。'
    },
    stock: 40,
    rating: 4.6,
    reviews: 198,
    featured: false,
  },
  {
    id: 'prod-019',
    name: { en: 'Slicker Brush', zh: '针梳' },
    category: 'grooming',
    price: 14.99,
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'],
    description: {
      en: 'Professional slicker brush for removing tangles and loose fur.',
      zh: '专业针梳，用于去除打结和松散的毛发。'
    },
    stock: 65,
    rating: 4.4,
    reviews: 167,
    featured: false,
  },
  {
    id: 'prod-020',
    name: { en: 'Nail Clippers', zh: '指甲剪' },
    category: 'grooming',
    price: 11.99,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
    description: {
      en: 'Safety nail clippers with LED light. Perfect for beginners.',
      zh: '带LED灯的安全指甲剪。适合初学者。'
    },
    stock: 50,
    rating: 4.2,
    reviews: 134,
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}
