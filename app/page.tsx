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
  // SOUPS
  {
    id: "1",
    name: "Minestrone Soup",
    description:
      "Traditional Italian vegetable soup with beans, pasta, and fresh herbs in rich tomato broth",
    price: 8.99,
    category: "soups",
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: "2",
    name: "Tuscan Bean Soup",
    description:
      "Creamy white bean soup with pancetta, rosemary, and parmesan cheese",
    price: 9.99,
    category: "soups",
  },
  {
    id: "3",
    name: "Seafood Bisque",
    description:
      "Rich and creamy soup made with fresh seafood, cream, and aromatic herbs",
    price: 12.99,
    category: "soups",
  },

  // SALADS
  {
    id: "4",
    name: "Caprese Salad",
    description:
      "Fresh mozzarella, ripe tomatoes, and basil drizzled with balsamic glaze and extra virgin olive oil",
    price: 11.99,
    category: "salads",
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: "5",
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, parmesan cheese, croutons, and our house-made Caesar dressing",
    price: 10.99,
    category: "salads",
  },
  {
    id: "6",
    name: "Arugula & Prosciutto",
    description:
      "Fresh arugula, thinly sliced prosciutto, shaved parmesan, and lemon vinaigrette",
    price: 13.99,
    category: "salads",
  },

  // ANTIPASTI (APPETIZERS)
  {
    id: "7",
    name: "Bruschetta",
    description:
      "Toasted artisan bread topped with diced tomatoes, fresh basil, garlic, and extra virgin olive oil",
    price: 8.99,
    category: "antipasti",
    vegetarian: true,
    popular: true,
  },
  {
    id: "8",
    name: "Calamari Fritti",
    description:
      "Crispy fried squid served with marinara sauce and lemon wedges",
    price: 12.99,
    category: "antipasti",
  },
  {
    id: "9",
    name: "Spinach Artichoke Dip",
    description:
      "Creamy dip with spinach, artichokes, and melted cheese served with toasted bread",
    price: 10.99,
    category: "antipasti",
    vegetarian: true,
  },
  {
    id: "10",
    name: "Burrata Caprese",
    description:
      "Fresh burrata cheese with heirloom tomatoes, basil, and aged balsamic reduction",
    price: 14.99,
    category: "antipasti",
    vegetarian: true,
    popular: true,
  },

  // PASTA
  {
    id: "11",
    name: "Spaghetti Carbonara",
    description:
      "Classic pasta with eggs, pecorino cheese, pancetta, and freshly ground black pepper",
    price: 16.99,
    category: "pasta",
  },
  {
    id: "12",
    name: "Fettuccine Alfredo",
    description:
      "Fettuccine in rich parmesan cream sauce with butter and fresh herbs",
    price: 15.99,
    category: "pasta",
    vegetarian: true,
  },
  {
    id: "13",
    name: "Penne Arrabbiata",
    description:
      "Spicy tomato sauce with garlic, red chili peppers, and fresh basil",
    price: 14.99,
    category: "pasta",
    spicy: true,
    vegetarian: true,
  },
  {
    id: "14",
    name: "Lobster Ravioli",
    description:
      "House-made ravioli filled with fresh lobster and ricotta cheese in a light cream sauce",
    price: 24.99,
    category: "pasta",
    popular: true,
  },
  {
    id: "15",
    name: "Truffle Mushroom Risotto",
    description:
      "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan cheese",
    price: 18.99,
    category: "pasta",
    vegetarian: true,
  },

  // MAIN COURSES
  {
    id: "16",
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon with seasonal vegetables, herb-roasted potatoes, and lemon butter sauce",
    price: 24.99,
    category: "main-courses",
    popular: true,
    glutenFree: true,
  },
  {
    id: "17",
    name: "Beef Tenderloin",
    description:
      "8oz tenderloin with garlic mashed potatoes, asparagus, and red wine reduction",
    price: 32.99,
    category: "main-courses",
    glutenFree: true,
  },
  {
    id: "18",
    name: "Chicken Marsala",
    description:
      "Pan-seared chicken breast in marsala wine sauce with mushrooms and creamy polenta",
    price: 22.99,
    category: "main-courses",
  },
  {
    id: "19",
    name: "Veal Saltimbocca",
    description:
      "Veal scaloppini wrapped with prosciutto and sage, served with roasted vegetables",
    price: 28.99,
    category: "main-courses",
  },
  {
    id: "20",
    name: "Vegetarian Lasagna",
    description:
      "Layers of pasta, fresh vegetables, ricotta, and mozzarella cheese in marinara sauce",
    price: 18.99,
    category: "main-courses",
    vegetarian: true,
  },

  // PIZZA
  {
    id: "21",
    name: "Margherita",
    description:
      "Fresh mozzarella, tomato sauce, and basil on our signature thin crust",
    price: 14.99,
    category: "pizza",
    vegetarian: true,
  },
  {
    id: "22",
    name: "Quattro Formaggi",
    description:
      "Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta",
    price: 16.99,
    category: "pizza",
    vegetarian: true,
  },
  {
    id: "23",
    name: "Prosciutto e Funghi",
    description: "Prosciutto, wild mushrooms, mozzarella, and truffle oil",
    price: 18.99,
    category: "pizza",
  },
  {
    id: "24",
    name: "Diavola",
    description: "Spicy salami, mozzarella, red onions, and chili peppers",
    price: 17.99,
    category: "pizza",
    spicy: true,
  },

  // SIDES
  {
    id: "25",
    name: "Garlic Mashed Potatoes",
    description: "Creamy mashed potatoes with roasted garlic and butter",
    price: 6.99,
    category: "sides",
    vegetarian: true,
  },
  {
    id: "26",
    name: "Roasted Brussels Sprouts",
    description:
      "Crispy roasted Brussels sprouts with pancetta and balsamic glaze",
    price: 7.99,
    category: "sides",
  },
  {
    id: "27",
    name: "Truffle Fries",
    description:
      "Crispy fries tossed with truffle oil, parmesan, and fresh herbs",
    price: 8.99,
    category: "sides",
    vegetarian: true,
  },

  // DESSERTS
  {
    id: "28",
    name: "Tiramisu",
    description:
      "Classic Italian dessert with coffee-soaked ladyfingers, mascarpone cream, and cocoa powder",
    price: 8.99,
    category: "desserts",
    popular: true,
  },
  {
    id: "29",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with molten center, served with vanilla bean ice cream",
    price: 9.99,
    category: "desserts",
  },
  {
    id: "30",
    name: "New York Cheesecake",
    description: "Creamy cheesecake with berry compote and fresh whipped cream",
    price: 7.99,
    category: "desserts",
  },
  {
    id: "31",
    name: "Cannoli",
    description:
      "Crispy shells filled with sweet ricotta cheese and chocolate chips",
    price: 6.99,
    category: "desserts",
    vegetarian: true,
  },

  // BEVERAGES
  {
    id: "32",
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh mint and a hint of lavender",
    price: 4.99,
    category: "beverages",
    vegetarian: true,
  },
  {
    id: "33",
    name: "Italian Soda",
    description: "Choice of flavored syrups with sparkling water and cream",
    price: 3.99,
    category: "beverages",
    vegetarian: true,
  },
  {
    id: "34",
    name: "Espresso",
    description: "Single shot of premium Italian espresso",
    price: 3.5,
    category: "beverages",
    vegetarian: true,
  },
  {
    id: "35",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foamed milk",
    price: 4.5,
    category: "beverages",
    vegetarian: true,
  },
];

export default function RestaurantMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "soups", name: "SOUPS" },
    { id: "salads", name: "SALADS" },
    { id: "antipasti", name: "ANTIPASTI" },
    { id: "pasta", name: "PASTA" },
    { id: "main-courses", name: "MAIN COURSES" },
    { id: "desserts", name: "DESSERTS" },
    { id: "beverages", name: "BEVERAGES" },
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
          <p className="text-center text-gray-600 text-sm md:text-base lg:text-lg font-serif italic">
            Authentic Italian Cuisine
          </p>
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
