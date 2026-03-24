// ============================================================
// Menu Data Service — All items from physical Thahrav Cafe menu
// ============================================================
import { Injectable } from '@angular/core';

export interface MenuItem {
  id: string;
  name: string;
  nameHindi?: string;
  price: number;
  category: MenuCategory;
  description: string;
  image: string;
  tag?: string; // 'bestseller' | 'spicy' | 'new'
}

export type MenuCategory = 'drinks' | 'breakfast' | 'maggi' | 'sandwich' | 'pasta';

export interface MenuCategoryInfo {
  id: MenuCategory;
  label: string;
  icon: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategoryInfo[] = [
  { id: 'drinks',    label: 'Drinks',     icon: 'local_cafe',    description: 'Handcrafted teas & coffees' },
  { id: 'breakfast', label: 'Breakfast',  icon: 'breakfast_dining', description: 'Made-fresh Indian breakfast' },
  { id: 'maggi',     label: 'Maggi',      icon: 'ramen_dining',  description: 'Comfort in a bowl' },
  { id: 'sandwich',  label: 'Sandwich',   icon: 'lunch_dining',  description: 'Grilled to perfection' },
  { id: 'pasta',     label: 'Pasta',      icon: 'restaurant',    description: 'Velvety, warm, satisfying' },
];

export const MENU_ITEMS: MenuItem[] = [
  // === Drinks ===
  {
    id: 'lemon-chai',
    name: 'Lemon Chai',
    price: 15,
    category: 'drinks',
    description: 'A zesty blend of tea and fresh lemon — light and refreshing.',
    image: '/assets/images/lemon-chai.webp',
  },
  {
    id: 'chai',
    name: 'Chai',
    price: 20,
    category: 'drinks',
    description: 'Our classic milk tea — simple, warm, comforting.',
    image: '/assets/images/chai.webp',
    tag: 'bestseller',
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    price: 25,
    category: 'drinks',
    description: 'Spiced tea brewed with ginger, cardamom, and freshly ground spices.',
    image: '/assets/images/masala-chai.webp',
    tag: 'bestseller',
  },
  {
    id: 'kullhad-chai',
    name: 'Kullhad Chai',
    price: 30,
    category: 'drinks',
    description: 'Traditional clay-cup chai — earthy aroma, authentic taste.',
    image: '/assets/images/kullhad-chai.webp',
    tag: 'bestseller',
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 40,
    category: 'drinks',
    description: 'Freshly brewed hot coffee — bold and smooth.',
    image: '/assets/images/coffee.webp',
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    price: 60,
    category: 'drinks',
    description: 'Chilled blended coffee with a hint of sweetness.',
    image: '/assets/images/cold-coffee.webp',
  },

  // === Breakfast ===
  {
    id: 'besan-chila',
    name: 'Besan Chila',
    price: 29,
    category: 'breakfast',
    description: 'Crispy chickpea flour pancakes — a protein-rich morning classic.',
    image: '/assets/images/besan-chila.webp',
  },
  {
    id: 'poha',
    name: 'Poha',
    price: 39,
    category: 'breakfast',
    description: 'Flattened rice with mustard, curry leaves, and peanuts.',
    image: '/assets/images/poha.webp',
    tag: 'bestseller',
  },
  {
    id: 'uttapam',
    name: 'Uttapam',
    price: 49,
    category: 'breakfast',
    description: 'Thick rice pancake topped with onion, tomato, and green chilli.',
    image: '/assets/images/uttapam.webp',
  },
  {
    id: 'upma',
    name: 'Upma',
    price: 49,
    category: 'breakfast',
    description: 'Semolina cooked with vegetables and fragrant tempering.',
    image: '/assets/images/upma.webp',
  },
  {
    id: 'aloo-paratha',
    name: 'Aloo Paratha',
    price: 39,
    category: 'breakfast',
    description: 'Whole wheat flatbread stuffed with spiced potato filling.',
    image: '/assets/images/aloo-paratha.webp',
    tag: 'bestseller',
  },
  {
    id: 'aloo-pyaaz-paratha',
    name: 'Aloo Pyaaz Paratha',
    price: 49,
    category: 'breakfast',
    description: 'Double-filled paratha with potato and caramelised onion.',
    image: '/assets/images/aloo-pyaaz-paratha.webp',
  },

  // === Maggi ===
  {
    id: 'plain-maggi',
    name: 'Plain Maggi',
    price: 49,
    category: 'maggi',
    description: 'Classic Maggi noodles — the original comfort food.',
    image: '/assets/images/plain-maggi.webp',
  },
  {
    id: 'veg-maggi',
    name: 'Veg Maggi',
    price: 59,
    category: 'maggi',
    description: 'Maggi noodles tossed with fresh seasonal vegetables.',
    image: '/assets/images/veg-maggi.webp',
    tag: 'bestseller',
  },
  {
    id: 'cheese-maggi',
    name: 'Cheese Maggi',
    price: 69,
    category: 'maggi',
    description: 'Maggi noodles topped with generous melted cheese.',
    image: '/assets/images/cheese-maggi.webp',
    tag: 'bestseller',
  },

  // === Sandwich ===
  {
    id: 'veg-sandwich',
    name: 'Veg Sandwich',
    price: 79,
    category: 'sandwich',
    description: 'Fresh vegetables between toasted bread with chutney and cheese.',
    image: '/assets/images/veg-sandwich.webp',
  },
  {
    id: 'cheese-sandwich',
    name: 'Cheese Sandwich',
    price: 89,
    category: 'sandwich',
    description: 'Grilled sandwich loaded with melted cheese — crispy outside, gooey inside.',
    image: '/assets/images/cheese-sandwich.webp',
    tag: 'bestseller',
  },

  // === Pasta ===
  {
    id: 'veg-pasta',
    name: 'Veg Pasta',
    price: 49,
    category: 'pasta',
    description: 'Pasta in classic red sauce with seasonal vegetables.',
    image: '/assets/images/veg-pasta.webp',
  },
  {
    id: 'white-sauce-pasta',
    name: 'White Sauce Pasta',
    price: 69,
    category: 'pasta',
    description: 'Creamy béchamel pasta with Italian herbs — rich and indulgent.',
    image: '/assets/images/white-sauce-pasta.webp',
    tag: 'bestseller',
  },
];

@Injectable({ providedIn: 'root' })
export class MenuService {
  getAll(): MenuItem[] {
    return MENU_ITEMS;
  }

  getByCategory(category: MenuCategory): MenuItem[] {
    return MENU_ITEMS.filter(item => item.category === category);
  }

  getById(id: string): MenuItem | undefined {
    return MENU_ITEMS.find(item => item.id === id);
  }

  getCategories(): MenuCategoryInfo[] {
    return MENU_CATEGORIES;
  }

  getFeatured(): MenuItem[] {
    return MENU_ITEMS.filter(item => item.tag === 'bestseller').slice(0, 6);
  }
}
