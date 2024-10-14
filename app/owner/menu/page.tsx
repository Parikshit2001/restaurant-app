"use client";
import { ChevronLeft, Text } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { dishType } from "@/app/lib/types";
import FoodCard from "@/components/FoodCard";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const items = [
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
function Menu() {
  const [dishes, setDishes] = useState(items);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [updateDish, setUpdateDish] = useState<dishType>();
  // const [newDish, setNewDish] = useState({});

  const handleEdit = (id: number) => {
    // if (Object.keys(updateDish).length > 0) return;
    const dish = dishes.find((dish) => dish.id === id);
    if (!dish) return;
    setUpdateDish(dish);
  };

  const handleSave = () => {
    if (!updateDish) return;
    const newDishes = dishes.map((dish) => {
      if (dish.id === updateDish.id) {
        return updateDish;
      }
      return dish;
    });
    setDishes(newDishes);
    setUpdateDish(undefined);
  };

  const handleRemove = () => {
    if (!updateDish) return;
    const newDishes = dishes.filter((dish) => dish.id !== updateDish.id);
    setDishes(newDishes);
    setUpdateDish(undefined);
  };

  // const handlePlus = () => {};

  // const handleAdd = () => {};

  const handleCancel = () => {
    setUpdateDish(undefined);
  };
  const session = useSession();
  console.log(session);

  if (!session.data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Button onClick={() => signIn("google")}>Login with Google</Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-2">
        <div className="w-full mt-2 flex justify-between">
          <Link
            href={"/owner"}
            className="flex text-lg items-center bg-red-500 text-white rounded pr-3"
          >
            <ChevronLeft />
            Back
          </Link>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
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
      <div className="w-full bg-cyan-200 min-h-[90vh] rounded-t-[2rem] pb-6 pl-2">
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
                key={dish.id}
                className={`rounded-lg overflow-hidden col-span-1 bg-white`}
              >
                {updateDish?.id !== dish.id ? (
                  <div className="h-full flex flex-col justify-between">
                    <FoodCard dish={dish} />
                    <div className="flex text-lg bg-cyan-900">
                      <button
                        onClick={() => handleEdit(dish.id)}
                        className="w-full text-green-500 font-extrabold border-t-2 shadow-xl py-0.5"
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      className="w-full h-32 object-cover"
                      src={dish.image}
                      alt=""
                    />
                    <div className="py-1 px-2">
                      <input
                        type="text"
                        value={updateDish.name}
                        onChange={(e) =>
                          setUpdateDish({ ...updateDish, name: e.target.value })
                        }
                        className="font-semibold bg-white border"
                      />
                      <textarea
                        value={updateDish.description}
                        onChange={(e) =>
                          setUpdateDish({
                            ...updateDish,
                            description: e.target.value,
                          })
                        }
                        className="text-wrap border mt-1"
                      />
                      <div className="flex justify-between items-center">
                        <input
                          type="number"
                          value={updateDish.price}
                          onChange={(e) =>
                            setUpdateDish({
                              ...updateDish,
                              price: Number(e.target.value),
                            })
                          }
                          className="font-extrabold border"
                        />
                      </div>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex text-lg bg-cyan-900"
                    >
                      <button
                        onClick={handleCancel}
                        className="w-full text-red-500 font-extrabold border-t-2 shadow-xl py-0.5"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSave}
                        className="w-full text-green-500 font-extrabold border-t-2 shadow-xl py-0.5 border-l-2"
                      >
                        SAVE
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleRemove}
                        className="bg-red-500 text-white w-full font-semibold"
                      >
                        REMOVE
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          <div className="col-span-1 bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center min-h-[30vh]">
            <button className="text-7xl font-semibold shadow-lg border rounded-full w-20 h-20">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
