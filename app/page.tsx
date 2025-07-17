"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaCoffee, FaGlassWhiskey } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { TbGlass, TbGlassFull } from "react-icons/tb";
import { LuCoffee } from "react-icons/lu";
import { MdLocalBar } from "react-icons/md";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  category: string;
  qty: number;
  unit: string;
  unitValue: number;
  status: string;
  image: string;
  barcode: string | null;
  adminId: number;
  createdAt: string;
  updatedAt: string;
  packagingPrice: number;
}

export default function RestaurantMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://real-obafunso-api.vercel.app/products/menu"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Function to categorize items based on their names and descriptions
  const categorizeItem = (item: MenuItem): string => {
    const name = item.name.toLowerCase();
    const description = item.description.toLowerCase();

    // Alcoholic beverages
    if (
      name.includes("whisky") ||
      name.includes("whiskey") ||
      name.includes("vodka") ||
      name.includes("gin") ||
      name.includes("rum") ||
      name.includes("tequila") ||
      name.includes("brandy") ||
      name.includes("cognac") ||
      name.includes("martel") ||
      name.includes("glenfiddich") ||
      name.includes("bacardi") ||
      name.includes("gordons") ||
      name.includes("campari") ||
      name.includes("carlo rossi") ||
      name.includes("coloman") ||
      name.includes("casamegos") ||
      name.includes("barleys") ||
      name.includes("smirnoff") ||
      name.includes("john bannermans") ||
      name.includes("climax") ||
      name.includes("double black")
    ) {
      return "alcoholic-beverages";
    }

    // Beers
    if (
      name.includes("heineken") ||
      name.includes("guinness") ||
      name.includes("trophy") ||
      name.includes("goldberg") ||
      name.includes("castle lite") ||
      name.includes("budweiser") ||
      name.includes("tiger") ||
      name.includes("desperado") ||
      name.includes("stout")
    ) {
      return "beers";
    }

    // Soft drinks and non-alcoholic
    if (
      name.includes("coke") ||
      name.includes("cola") ||
      name.includes("water") ||
      name.includes("chivita") ||
      name.includes("fayrous") ||
      name.includes("monster") ||
      name.includes("yoghurt") ||
      name.includes("tunik")
    ) {
      return "soft-drinks";
    }

    // Bitters and spirits
    if (
      name.includes("bitters") ||
      name.includes("ace") ||
      name.includes("plastic origin") ||
      name.includes("black bullet") ||
      name.includes("four cousin") ||
      name.includes("andre rose")
    ) {
      return "bitters-spirits";
    }

    // Coffee and hot beverages
    if (
      name.includes("cappuccino") ||
      name.includes("coffee") ||
      name.includes("tea")
    ) {
      return "hot-beverages";
    }

    // Default category
    return "other";
  };

  const categories = [
    { id: "all", name: "All", icon: <MdLocalBar className="text-xl" /> },
    {
      id: "alcoholic-beverages",
      name: "ALCOHOLIC BEVERAGES",
      icon: <FaGlassWhiskey className="text-xl" />,
    },
    {
      id: "beers",
      name: "BEERS",
      icon: <TbGlass className="text-xl" />,
    },
    {
      id: "soft-drinks",
      name: "SOFT DRINKS",
      icon: <IoWaterOutline className="text-xl" />,
    },
    {
      id: "bitters-spirits",
      name: "BITTERS & SPIRITS",
      icon: <FaGlassWhiskey className="text-xl" />,
    },
    {
      id: "hot-beverages",
      name: "HOT BEVERAGES",
      icon: <FaCoffee className="text-xl" />,
    },
    {
      id: "other",
      name: "OTHER",
      icon: <TbGlassFull className="text-xl" />,
    },
  ];

  // Add category to each item
  const itemsWithCategories = menuItems.map((item) => ({
    ...item,
    category: categorizeItem(item),
  }));

  const filteredItems = itemsWithCategories.filter((item) => {
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

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

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
              From perfectly crafted coffee to refreshing beverages and premium
              spirits, discover our curated selection of drinks. Each item is
              thoughtfully selected to provide the perfect refreshment for any
              occasion.
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
            <BiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>
          <div className="overflow-x-auto pb-2 -mb-2">
            <div className="flex space-x-2 min-w-min">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-colors duration-200 flex items-center gap-2
                    ${
                      selectedCategory === category.id
                        ? "bg-gray-900 text-white"
                        : "bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900"
                    } border border-gray-300`}
                >
                  {category.icon}
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
              <section key={category.id} className="menu-section">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 font-serif tracking-wide flex items-center gap-3">
                  {category.icon}
                  {category.name}
                </h1>
                <div className="space-y-6 md:space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="menu-item w-full">
                      <div className="flex justify-between items-baseline gap-2 md:gap-4">
                        <h2 className="text-lg md:text-xl font-bold font-serif flex items-center gap-2">
                          <LuCoffee className="text-gray-600" />
                          {item.name}
                        </h2>
                        <div className="hidden md:block border-b border-dotted border-gray-300 flex-grow mx-4"></div>
                        <div className="text-lg md:text-xl font-bold whitespace-nowrap">
                          ₦{item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-1.5 md:mt-2">
                        {/* <p className="text-gray-700 text-sm md:text-base leading-relaxed font-sans max-w-2xl pl-6">
                          {item.description || `${item.unitValue} ${item.unit}`}
                        </p> */}
                        {/* <div className="text-gray-500 text-xs md:text-sm italic mt-1 font-sans pl-6">
                          <span className="mr-4">Status: {item.status}</span>
                          <span>Stock: {item.qty}</span>
                        </div> */}
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
