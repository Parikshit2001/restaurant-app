"use client";
import Checkout from "@/components/Checkout";
import ConfirmAlertDialogBox from "@/components/ConfirmAlertDialogBox";
import FoodCard from "@/components/FoodCard";
import { Text } from "lucide-react";
import { useEffect, useState } from "react";
import { dishType } from "../lib/types";

const items: dishType[] = [
  {
    id: 1,
    name: "Hamburger",
    description: "Hamburger with cheese",
    price: 50,
    image:
      "https://img.freepik.com/premium-photo/extreme-closeup-tasty-hanburger-food-photography_779330-6030.jpg?w=2000",
    quantity: 0,
    tags: ["Lunch", "Treat"],
  },
  {
    id: 2,
    name: "Pizza",
    description: "Pizza with cheese and toppings",
    price: 100,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
    quantity: 0,
    tags: ["Lunch", "Treat"],
  },
  {
    id: 3,
    name: "Salad",
    description: "Salad with cheese and toppings",
    price: 80,
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/07/salad.jpg",
    quantity: 0,
    tags: ["Breakfast", "Lunch"],
  },
  {
    id: 31,
    name: "Pasta",
    description: "Pasta with cheese and toppings",
    price: 120,
    image:
      "https://www.yummytummyaarthi.com/wp-content/uploads/2022/11/red-sauce-pasta-1.jpg",
    quantity: 0,
    tags: ["Breakfast", "Lunch", "Treat"],
  },
  {
    id: 4,
    name: "fries",
    description: "fries with cheese and toppings",
    price: 20,
    image:
      "https://www.awesomecuisine.com/wp-content/uploads/2009/05/french-fries.jpg",
    quantity: 0,
    tags: ["Breakfast", "Lunch", "Treat"],
  },
  {
    id: 5,
    name: "Gobi Manchurian",
    description: "Drinks with cheese and toppings",
    price: 20,
    image:
      "https://www.hookedonheat.com/wp-content/uploads/2006/03/Gobi-Manchurian-HOHV.jpg",
    quantity: 0,
    tags: ["Breakfast", "Lunch", "Treat"],
  },
  {
    id: 6,
    name: "Masala Dosa",
    description: "Sides with cheese and toppings",
    price: 20,
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-1014x1536.jpg",
    quantity: 0,
    tags: ["Breakfast", "Lunch", "Treat"],
  },
  {
    id: 7,
    name: "Sides",
    description: "Sides with cheese and toppings",
    price: 20,
    image:
      "https://www.awesomecuisine.com/wp-content/uploads/2009/05/french-fries.jpg",
    quantity: 0,
    tags: ["Breakfast", "Lunch", "Treat"],
  },
];

const status = ["All", "Breakfast", "Lunch", "Treat", "Desert", "Drinks"];
function User() {
  const [dishes, setDishes] = useState(items);
  const [total, setTotal] = useState(100);
  const [showOrder, setShowOrder] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");

  const handleAdd = (id: number) => {
    const newDishes = dishes.map((dish) => {
      if (dish.id === id) {
        return {
          ...dish,
          quantity: dish.quantity + 1,
        };
      }
      return dish;
    });
    setDishes(newDishes);
  };

  const handleRemove = (id: number) => {
    const newDishes = dishes.map((dish) => {
      if (dish.id === id) {
        return {
          ...dish,
          quantity: dish.quantity - 1,
        };
      }
      return dish;
    });
    setDishes(newDishes);
    if (!newDishes.some((dish) => dish.quantity > 0)) {
      setShowOrder(false);
      setCheckout(false);
    }
  };

  useEffect(() => {
    let newTotal = 0;
    dishes.forEach((dish) => {
      newTotal += dish.price * dish.quantity;
    });
    setTotal(newTotal);
  }, [dishes]);

  return (
    <>
      <ConfirmAlertDialogBox
        name={name}
        setName={setName}
        checkout={checkout}
        setCheckout={setCheckout}
        dishes={dishes}
      />
      <div
        onClick={() => setShowOrder(false)}
        className="bg-white min-h-screen"
      >
        <div className="mx-2">
          ,
          <div>
            <h1 className="text-2xl font-semibold mt-2">Menu</h1>
          </div>
          <div className="flex items-center pr-2">
            <Text />
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none px-2 py-2 w-full font-extrabold text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="bg-red-500 text-white px-2 py-2 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <hr className="mt-1 mb-8" />
        <div className="w-full bg-cyan-200 min-h-[90vh] rounded-t-[2rem] pb-8 pl-2">
          <div className="flex gap-4 px-4 py-3 max-w-screen overflow-auto items-baseline">
            {status.map((status) => (
              <button
                onClick={() => setSelectedStatus(status)}
                key={status}
                className={`text-sm ${
                  selectedStatus === status ? "text-xl font-semibold" : ""
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pr-2">
            {dishes
              .filter((dish) =>
                dish.name.toLowerCase().includes(search.toLowerCase())
              )
              .filter(
                (dish) =>
                  selectedStatus === "All" || dish.tags.includes(selectedStatus)
              )
              .map((dish) => (
                <div
                  key={dish.name}
                  className="rounded-lg overflow-hidden col-span-1 bg-white flex flex-col justify-between"
                >
                  <FoodCard dish={dish} />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex text-lg bg-cyan-900"
                  >
                    <button
                      onClick={() => handleAdd(dish.id)}
                      className="w-full text-green-500 font-extrabold border-t-2 shadow-xl py-0.5"
                    >
                      ADD
                    </button>
                    {dish.quantity > 0 && (
                      <button
                        onClick={() => handleRemove(dish.id)}
                        className="w-full text-red-500 font-extrabold border-t-2 border-l-2  shadow-xl py-0.5"
                      >
                        REMOVE
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Checkout
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          total={total}
          dishes={dishes}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          setCheckout={setCheckout}
        />
      </div>
    </>
  );
}

export default User;
