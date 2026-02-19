import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'svc-001',
    name: { en: 'Full Grooming Package', zh: '全套美容护理' },
    category: 'grooming',
    description: {
      en: 'Complete grooming service including bath, haircut, nail trimming, and ear cleaning.',
      zh: '完整美容服务，包括洗澡、剪毛、修剪指甲和清洁耳朵。'
    },
    price: 65,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400',
    features: {
      en: ['Full bath & blow dry', 'Haircut styling', 'Nail trimming', 'Ear cleaning', 'Teeth brushing'],
      zh: ['全套洗澡和吹干', '剪毛造型', '修剪指甲', '清洁耳朵', '刷牙']
    }
  },
  {
    id: 'svc-002',
    name: { en: 'Basic Bath & Brush', zh: '基础洗护' },
    category: 'grooming',
    description: {
      en: 'Essential grooming service with bath, brush, and nail trim.',
      zh: '基础美容服务，包括洗澡、梳理和修剪指甲。'
    },
    price: 35,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    features: {
      en: ['Bath & blow dry', 'Brush out', 'Nail trim', 'Cologne spray'],
      zh: ['洗澡和吹干', '梳理', '修剪指甲', '香水喷雾']
    }
  },
  {
    id: 'svc-003',
    name: { en: 'Luxury Spa Treatment', zh: '豪华水疗' },
    category: 'grooming',
    description: {
      en: 'Premium spa experience with aromatherapy, massage, and premium products.',
      zh: '高级水疗体验，包括芳香疗法、按摩和高端产品。'
    },
    price: 95,
    duration: 180,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    features: {
      en: ['Aromatherapy bath', 'Massage treatment', 'Premium shampoo', 'Deep conditioning', 'Bandana or bow'],
      zh: ['芳香疗法洗澡', '按摩护理', '高端洗发水', '深层护理', '领巾或蝴蝶结']
    }
  },
  {
    id: 'svc-004',
    name: { en: 'Overnight Boarding', zh: '过夜寄养' },
    category: 'boarding',
    description: {
      en: 'Safe and comfortable overnight stay with 24/7 supervision.',
      zh: '安全舒适的过夜住宿，全天候监管。'
    },
    price: 45,
    duration: 1440, // 24 hours
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    features: {
      en: ['Private suite', 'Daily walks', 'Meals included', '24/7 supervision', 'Play time'],
      zh: ['私人套房', '每日散步', '含餐食', '全天候监管', '游戏时间']
    }
  },
  {
    id: 'svc-005',
    name: { en: 'Day Care', zh: '日间托管' },
    category: 'boarding',
    description: {
      en: 'Fun-filled day care with playtime, socialization, and care.',
      zh: '充满乐趣的日间托管，包括游戏、社交和照顾。'
    },
    price: 35,
    duration: 480, // 8 hours
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    features: {
      en: ['Supervised play', 'Social time', 'Nap breaks', 'Treats included', 'Report card'],
      zh: ['监督游戏', '社交时间', '午休', '含零食', '每日报告']
    }
  },
  {
    id: 'svc-006',
    name: { en: 'Wellness Checkup', zh: '健康检查' },
    category: 'veterinary',
    description: {
      en: 'Comprehensive health examination with vaccination updates.',
      zh: '全面的健康检查和疫苗接种更新。'
    },
    price: 75,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c27?w=400',
    features: {
      en: ['Physical exam', 'Vaccination review', 'Parasite check', 'Weight check', 'Health report'],
      zh: ['体格检查', '疫苗接种检查', '寄生虫检查', '体重检查', '健康报告']
    }
  },
  {
    id: 'svc-007',
    name: { en: 'Dental Cleaning', zh: '牙齿清洁' },
    category: 'veterinary',
    description: {
      en: 'Professional dental cleaning under anesthesia for optimal oral health.',
      zh: '麻醉下专业牙齿清洁，确保最佳口腔健康。'
    },
    price: 250,
    duration: 180,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    features: {
      en: ['Full cleaning', 'Polishing', 'X-rays', 'Extraction if needed', 'Follow-up check'],
      zh: ['全面清洁', '抛光', 'X光检查', '必要时拔牙', '后续检查']
    }
  },
  {
    id: 'svc-008',
    name: { en: 'Basic Obedience Training', zh: '基础服从训练' },
    category: 'training',
    description: {
      en: 'Essential obedience training covering sit, stay, come, and leash walking.',
      zh: '基础服从训练，包括坐下、停留、过来和牵绳行走。'
    },
    price: 120,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    features: {
      en: ['Sit & stay commands', 'Come when called', 'Leash walking', 'Basic manners', 'Training tips'],
      zh: ['坐下和停留指令', '呼唤回来', '牵绳行走', '基本礼仪', '训练技巧']
    }
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter(service => service.category === category);
}
