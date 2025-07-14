"use client";

import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
  glutenFree?: boolean;
  containsNuts?: boolean;
}

const menuItems: MenuItem[] = [
  // HOT BEVERAGES
  {
    id: "1",
    name: "Espresso",
    description: "Single shot of premium roasted coffee",
    price: 2500,
    category: "hot-beverages",
  },
  {
    id: "2",
    name: "Double Espresso",
    description: "Double shot of our premium roasted coffee",
    price: 3500,
    category: "hot-beverages",
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "Espresso with steamed milk and silky milk foam",
    price: 4000,
    category: "hot-beverages",
  },
  {
    id: "4",
    name: "Café Latte",
    description: "Espresso with steamed milk and light foam",
    price: 4000,
    category: "hot-beverages",
  },
  {
    id: "5",
    name: "Hot Chocolate",
    description: "Rich chocolate with steamed milk and whipped cream",
    price: 3500,
    category: "hot-beverages",
  },
  {
    id: "6",
    name: "African Tea",
    description: "Strong black tea with herbs and spices",
    price: 2000,
    category: "hot-beverages",
  },

  // COLD BEVERAGES
  {
    id: "7",
    name: "Iced Latte",
    description: "Chilled espresso with cold milk and ice",
    price: 4500,
    category: "cold-beverages",
  },
  {
    id: "8",
    name: "Iced Mocha",
    description: "Chocolate and espresso with cold milk and ice",
    price: 5000,
    category: "cold-beverages",
  },
  {
    id: "9",
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh mint",
    price: 2500,
    category: "cold-beverages",
  },
  {
    id: "10",
    name: "Tropical Smoothie",
    description: "Blend of mango, pineapple, and passion fruit",
    price: 3500,
    category: "cold-beverages",
  },

  // FRESH JUICES
  {
    id: "11",
    name: "Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 2500,
    category: "fresh-juices",
  },
  {
    id: "12",
    name: "Green Detox",
    description: "Blend of apple, cucumber, and spinach",
    price: 3000,
    category: "fresh-juices",
  },
  {
    id: "13",
    name: "Carrot Ginger",
    description: "Fresh carrot juice with a hint of ginger",
    price: 2500,
    category: "fresh-juices",
  },
  {
    id: "14",
    name: "Watermelon Cooler",
    description: "Fresh watermelon juice with mint",
    price: 2500,
    category: "fresh-juices",
  },

  // MOCKTAILS
  {
    id: "15",
    name: "Virgin Mojito",
    description: "Lime, mint, sugar syrup with soda water",
    price: 3500,
    category: "mocktails",
  },
  {
    id: "16",
    name: "Passion Fruit Fizz",
    description: "Passion fruit puree with elderflower and soda",
    price: 4000,
    category: "mocktails",
  },
  {
    id: "17",
    name: "Berry Blast",
    description: "Mixed berries with lime and mint",
    price: 4000,
    category: "mocktails",
  },
  {
    id: "18",
    name: "Coconut Paradise",
    description: "Coconut water with pineapple and lime",
    price: 3500,
    category: "mocktails",
  },

  // SOFT DRINKS
  {
    id: "19",
    name: "Coca-Cola",
    description: "Classic or Zero",
    price: 1000,
    category: "soft-drinks",
  },
  {
    id: "20",
    name: "Fanta",
    description: "Orange or Chapman",
    price: 1000,
    category: "soft-drinks",
  },
  {
    id: "21",
    name: "Sprite",
    description: "Regular or Zero",
    price: 1000,
    category: "soft-drinks",
  },
  {
    id: "22",
    name: "Mineral Water",
    description: "Still or Sparkling",
    price: 800,
    category: "soft-drinks",
  },
];

export default function RestaurantMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "hot-beverages", name: "HOT BEVERAGES" },
    { id: "cold-beverages", name: "COLD BEVERAGES" },
    { id: "fresh-juices", name: "FRESH JUICES" },
    { id: "mocktails", name: "MOCKTAILS" },
    { id: "soft-drinks", name: "SOFT DRINKS" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <main className="min-h-screen w-full">
      {/* Header */}
      <div className="border-b border-gray-200 w-full">
        <div className="py-6 md:py-8 px-4 max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 font-serif tracking-wide">
            Real Obafunso Lounge
          </h1>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600 text-sm md:text-base lg:text-lg font-serif italic mb-2">
              Where Tradition Meets Modern Elegance
            </p>
            <p className="text-gray-600 text-xs md:text-sm lg:text-base font-serif">
              From perfectly crafted coffee to refreshing mocktails and fresh
              juices, discover our curated selection of premium beverages. Each
              drink is thoughtfully prepared to provide the perfect refreshment
              for any time of day.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="sticky top-0 backdrop-blur-sm border-b border-gray-200 z-10 w-full">
        <div className="px-4 py-3 space-y-2.5 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search menu..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded text-sm md:text-base bg-white/80 focus:bg-white transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <div className="overflow-x-auto pb-2 -mb-2">
            <div className="flex space-x-2 min-w-min">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-colors duration-200 
                    ${
                      selectedCategory === category.id
                        ? "bg-gray-900 text-white"
                        : "bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900"
                    } border border-gray-300`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {categories.map((category) => {
            if (category.id === "all") return null;
            const items = groupedItems[category.id];
            if (!items?.length) return null;

            return (
              <section key={category.id} className="menu-section ">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 font-serif tracking-wide">
                  {category.name}
                </h1>
                <div className="space-y-6 md:space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="menu-item w-full">
                      <div className="flex justify-between items-baseline gap-2 md:gap-4">
                        <h2 className="text-lg md:text-xl font-bold font-serif">
                          {item.name}
                        </h2>
                        <div className="hidden md:block border-b border-dotted border-gray-300 flex-grow mx-4"></div>
                        <div className="text-lg md:text-xl font-bold whitespace-nowrap">
                          ₦{item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-1.5 md:mt-2">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
                          {item.description}
                        </p>
                        {(item.vegetarian ||
                          item.spicy ||
                          item.glutenFree ||
                          item.containsNuts ||
                          item.popular) && (
                          <p className="text-gray-500 text-xs md:text-sm italic mt-1 font-sans">
                            {[
                              item.vegetarian && "VEG",
                              item.spicy && "SPICY",
                              item.glutenFree && "GF",
                              item.containsNuts && "NUTS",
                              item.popular && "POPULAR",
                            ]
                              .filter(Boolean)
                              .join(" | ")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <p className="text-gray-600 text-base md:text-lg font-serif">
                No menu items found. Please try a different search.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
