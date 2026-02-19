import { Pet } from '@/types';

export const pets: Pet[] = [
  // Dogs
  {
    id: 'pet-001',
    name: { en: 'Max', zh: '麦克斯' },
    species: 'dog',
    breed: { en: 'Golden Retriever', zh: '金毛寻回犬' },
    age: 24,
    size: 'large',
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    ],
    description: {
      en: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He\'s great with kids and other pets.',
      zh: '麦克斯是一只友好且精力充沛的金毛寻回犬，喜欢玩捡球和长距离散步。他与孩子和其他宠物相处得很好。'
    },
    personality: {
      en: 'Friendly, Energetic, Playful, Loyal',
      zh: '友好、精力充沛、爱玩、忠诚'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: 'pet-002',
    name: { en: 'Bella', zh: '贝拉' },
    species: 'dog',
    breed: { en: 'Labrador Retriever', zh: '拉布拉多寻回犬' },
    age: 18,
    size: 'large',
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1579213838058-8a0e16e5b9e3?w=400',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    ],
    description: {
      en: 'Bella is a sweet and gentle Labrador who loves water and swimming. She\'s well-trained and perfect for families.',
      zh: '贝拉是一只温柔甜美的拉布拉多，喜欢水和游泳。她训练有素，非常适合家庭。'
    },
    personality: {
      en: 'Gentle, Smart, Loyal, Water-loving',
      zh: '温柔、聪明、忠诚、爱水'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: 'pet-003',
    name: { en: 'Charlie', zh: '查理' },
    species: 'dog',
    breed: { en: 'Beagle', zh: '比格犬' },
    age: 12,
    size: 'medium',
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
    ],
    description: {
      en: 'Charlie is a curious and affectionate Beagle with an excellent sense of smell. He loves exploring and sniffing around.',
      zh: '查理是一只好奇且充满爱心的比格犬，嗅觉非常灵敏。他喜欢探索和到处闻闻。'
    },
    personality: {
      en: 'Curious, Affectionate, Energetic, Friendly',
      zh: '好奇、亲切、精力充沛、友好'
    },
    vaccinated: true,
    neutered: false,
    available: true,
  },
  {
    id: 'pet-004',
    name: { en: 'Luna', zh: '露娜' },
    species: 'dog',
    breed: { en: 'Husky', zh: '哈士奇' },
    age: 30,
    size: 'large',
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400',
    ],
    description: {
      en: 'Luna is a stunning Husky with beautiful blue eyes. She\'s active and needs an owner who can keep up with her energy.',
      zh: '露娜是一只美丽的哈士奇，有着迷人的蓝眼睛。她很活跃，需要一个能跟上她活力的主人。'
    },
    personality: {
      en: 'Active, Independent, Playful, Talkative',
      zh: '活跃、独立、爱玩、爱说话'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  // Cats
  {
    id: 'pet-005',
    name: { en: 'Whiskers', zh: '威斯克' },
    species: 'cat',
    breed: { en: 'Persian', zh: '波斯猫' },
    age: 36,
    size: 'medium',
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    ],
    description: {
      en: 'Whiskers is a calm and elegant Persian cat who loves to be pampered. He enjoys lounging in sunny spots.',
      zh: '威斯克是一只冷静优雅的波斯猫，喜欢被人宠爱。他喜欢在阳光充足的地方休息。'
    },
    personality: {
      en: 'Calm, Elegant, Affectionate, Quiet',
      zh: '冷静、优雅、亲切、安静'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: 'pet-006',
    name: { en: 'Mittens', zh: '小米' },
    species: 'cat',
    breed: { en: 'Siamese', zh: '暹罗猫' },
    age: 18,
    size: 'medium',
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
    ],
    description: {
      en: 'Mittens is a vocal and social Siamese who loves attention. She\'s very intelligent and can learn tricks.',
      zh: '小米是一只健谈且社交的暹罗猫，喜欢被关注。她非常聪明，可以学习技巧。'
    },
    personality: {
      en: 'Vocal, Social, Intelligent, Curious',
      zh: '健谈、社交、聪明、好奇'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: 'pet-007',
    name: { en: 'Shadow', zh: '影子' },
    species: 'cat',
    breed: { en: 'British Shorthair', zh: '英国短毛猫' },
    age: 24,
    size: 'medium',
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400',
    ],
    description: {
      en: 'Shadow is a chunky and adorable British Shorthair with a round face. He\'s independent but enjoys cuddle sessions.',
      zh: '影子是一只圆润可爱的英国短毛猫，有着圆圆的脸。他独立但喜欢拥抱。'
    },
    personality: {
      en: 'Independent, Calm, Affectionate, Easy-going',
      zh: '独立、冷静、亲切、随和'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: 'pet-008',
    name: { en: 'Ginger', zh: '姜姜' },
    species: 'cat',
    breed: { en: 'Maine Coon', zh: '缅因猫' },
    age: 14,
    size: 'large',
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400',
    ],
    description: {
      en: 'Ginger is a majestic Maine Coon with a fluffy coat. She\'s gentle giants and gets along well with other pets.',
      zh: '姜姜是一只威严的缅因猫，有着蓬松的毛发。她是温柔的巨人，与其他宠物相处得很好。'
    },
    personality: {
      en: 'Gentle, Friendly, Playful, Dog-like',
      zh: '温柔、友好、爱玩、像狗一样'
    },
    vaccinated: true,
    neutered: false,
    available: true,
  },
  // Birds
  {
    id: 'pet-009',
    name: { en: 'Sunny', zh: '阳光' },
    species: 'bird',
    breed: { en: 'Cockatiel', zh: '玄凤鹦鹉' },
    age: 8,
    size: 'small',
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    ],
    description: {
      en: 'Sunny is a cheerful Cockatiel who loves to whistle tunes. He can say a few words and loves head scratches.',
      zh: '阳光是一只快乐的玄凤鹦鹉，喜欢吹口哨。他能说几个词，喜欢被摸头。'
    },
    personality: {
      en: 'Cheerful, Vocal, Affectionate, Curious',
      zh: '快乐、健谈、亲切、好奇'
    },
    vaccinated: true,
    neutered: false,
    available: true,
  },
  {
    id: 'pet-010',
    name: { en: 'Rio', zh: '里奥' },
    species: 'bird',
    breed: { en: 'Parakeet', zh: '虎皮鹦鹉' },
    age: 6,
    size: 'small',
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=400',
    ],
    description: {
      en: 'Rio is a colorful Parakeet with vibrant feathers. She\'s active and loves to fly around her cage.',
      zh: '里奥是一只色彩斑斓的虎皮鹦鹉，羽毛鲜艳。她很活跃，喜欢在笼子里飞来飞去。'
    },
    personality: {
      en: 'Active, Colorful, Social, Playful',
      zh: '活跃、多彩、社交、爱玩'
    },
    vaccinated: true,
    neutered: false,
    available: true,
  },
  // Rabbits
  {
    id: 'pet-011',
    name: { en: 'Cotton', zh: '棉花' },
    species: 'rabbit',
    breed: { en: 'Holland Lop', zh: '荷兰垂耳兔' },
    age: 10,
    size: 'small',
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
    ],
    description: {
      en: 'Cotton is an adorable Holland Lop with floppy ears. She\'s gentle and loves to be held and petted.',
      zh: '棉花是一只可爱的荷兰垂耳兔，有着垂下的耳朵。她很温柔，喜欢被抱和抚摸。'
    },
    personality: {
      en: 'Gentle, Sweet, Calm, Cuddly',
      zh: '温柔、甜美、冷静、爱抱抱'
    },
    vaccinated: true,
    neutered: true,
    available: true,
  },
  // Hamsters
  {
    id: 'pet-012',
    name: { en: 'Peanut', zh: '花生' },
    species: 'hamster',
    breed: { en: 'Syrian Hamster', zh: '叙利亚仓鼠' },
    age: 4,
    size: 'small',
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400',
    ],
    description: {
      en: 'Peanut is a tiny Syrian Hamster with golden fur. He\'s nocturnal and loves running on his wheel at night.',
      zh: '花生是一只金色的叙利亚仓鼠。他是夜行动物，晚上喜欢在轮子上跑步。'
    },
    personality: {
      en: 'Active, Curious, Independent, Cute',
      zh: '活跃、好奇、独立、可爱'
    },
    vaccinated: false,
    neutered: false,
    available: true,
  },
];

export function getPetById(id: string): Pet | undefined {
  return pets.find(pet => pet.id === id);
}

export function getPetsBySpecies(species: Pet['species']): Pet[] {
  return pets.filter(pet => pet.species === species);
}

export function getAvailablePets(): Pet[] {
  return pets.filter(pet => pet.available);
}
