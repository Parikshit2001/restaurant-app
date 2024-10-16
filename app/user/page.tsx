"use client";
import Checkout from "@/components/Checkout";
import ConfirmAlertDialogBox from "@/components/ConfirmAlertDialogBox";
import FoodCard from "@/components/FoodCard";
import { Check, Text } from "lucide-react";
import { useEffect, useState } from "react";
import { dishType } from "../lib/types";
import axios from "axios";
import { URL } from "../lib/constants";

const recent = [
  { name: "Khushi", total: 250 },
  { name: "Ram Mohan Mantry", total: 990 },
];

const status = ["All", "Breakfast", "Lunch", "Treat", "Desert", "Drinks"];
function User() {
  const [dishes, setDishes] = useState<dishType[]>([]);
  const [total, setTotal] = useState(100);
  const [showOrder, setShowOrder] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [recentData] = useState(recent);

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
    if (!newDishes?.some((dish) => dish.quantity > 0)) {
      setShowOrder(false);
      setCheckout(false);
    }
  };

  useEffect(() => {
    axios.get(`${URL}/api/owner/getmenu`).then((res) => {
      const newDishes = res.data.dishes;
      newDishes.map((dish: dishType) => {
        dish.quantity = 0;
        return dish;
      });
      setDishes(res.data.dishes);
    });
  }, []);

  useEffect(() => {
    let newTotal = 0;
    dishes?.forEach((dish) => {
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
      <div>
        <div>
          <aside
            className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out bg-gray-800 text-white z-50 ${
              expanded ? "translate-x-0 w-64" : "-translate-x-64 w-64"
            }`}
          >
            <div className="mx-2">
              <div>
                <h1 className="text-xl font-semibold my-2">Recent Orders</h1>
              </div>
              <div className="flex items-center pr-2">
                <button onClick={() => setExpanded((prev) => !prev)}>
                  <Text />
                </button>
                <input
                  type="text"
                  placeholder="Search recent orders"
                  className="focus:outline-none px-2 py-2 w-full font-extrabold text-lg text-black rounded-lg"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
                {nameSearch && (
                  <button
                    onClick={() => setNameSearch("")}
                    className="bg-red-500 text-white px-2 py-2 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-[85vh] overflow-y-scroll">
                {recentData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-1"
                  >
                    <div className="bg-cyan-500 rounded-lg py-2 text-black px-1 flex justify-between items-center flex-1">
                      <div>
                        <p className="font-bold">
                          {item.name.length > 10
                            ? item.name.slice(0, 9) + "..."
                            : item.name}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">{item.total}</p>
                      </div>
                    </div>
                    <div className="bg-blue-500 py-2 px-1 rounded-lg font-bold">
                      <Check />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div
          onClick={(e) => {
            if (expanded) {
              setExpanded(false);
              e.stopPropagation();
            }
            setShowOrder(false);
          }}
          className="bg-white min-h-screen"
        >
          <div className="mx-2">
            <div>
              <h1 className="text-2xl font-semibold mt-2">Menu</h1>
            </div>
          </div>
          <div className={`bg-white w-full ${checkout ? "" : "sticky top-0"}`}>
            <div className="flex items-center pr-2 w-full">
              <button onClick={() => setExpanded((prev) => !prev)}>
                <Text />
              </button>
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
                    selectedStatus === "All" ||
                    dish.tags.includes(selectedStatus)
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
      </div>
    </>
  );
}

export default User;
