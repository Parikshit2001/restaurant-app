"use client";
import { ChevronLeft, Text } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { dishType } from "@/app/lib/types";
import FoodCard from "@/components/FoodCard";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { URL } from "@/app/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const status = ["All", "Breakfast", "Lunch", "Treat", "Desert", "Drinks"];
function Menu() {
  const [dishes, setDishes] = useState<dishType[] | undefined>();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [updateDish, setUpdateDish] = useState<dishType>();
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
  });
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleEdit = (id: number) => {
    const dish = dishes?.find((dish) => dish.id === id);
    if (!dish) return;
    setUpdateDish(dish);
  };

  const handleSave = async () => {
    if (!updateDish) return;
    setLoading(true);
    axios
      .put(`${URL}/api/owner/updatedish`, updateDish)
      .then((res) => {
        console.log(res.data);
        const newDishes = dishes?.map((dish) => {
          if (dish.id === updateDish.id) {
            return updateDish;
          }
          return dish;
        });
        setDishes(newDishes);
      })
      .catch((err) => {
        alert("Update unsuccessful");
        console.log(err);
      })
      .finally(() => {
        setUpdateDish(undefined);
        setLoading(false);
      });
  };

  const handleRemove = () => {
    if (!updateDish) return;
    axios
      .post(`${URL}/api/owner/removedish`, {
        id: updateDish.id,
      })
      .then(() => {
        const newDishes = dishes?.filter((dish) => dish.id !== updateDish.id);
        setDishes(newDishes);
      })
      .catch((err) => {
        console.error(err);
        alert("Dish not removed");
      })
      .finally(() => {
        setUpdateDish(undefined);
      });
  };

  const handlePlus = () => {
    setAdding(true);
  };

  const handleAdd = () => {
    if (newDish.name === "" || newDish.description === "") return;
    setLoading(true);
    axios
      .post(`${URL}/api/owner/adddish`, newDish)
      .then((res) => {
        const newDishes = dishes;
        newDishes?.push(res.data.dish);
        setDishes(newDishes);
        setAdding(false);
        setNewDish({
          name: "",
          description: "",
          price: 0,
          image: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Dish not added");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancelUpdate = () => {
    setUpdateDish(undefined);
  };

  const handleCancelAdd = () => {
    setAdding(false);
    setNewDish({
      name: "",
      description: "",
      price: 0,
      image: "",
    });
    setNewDish({
      name: "",
      description: "",
      price: 0,
      image: "",
    });
  };

  const session = useSession();

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
          {!dishes && <div>Loading...</div>}
          {dishes &&
            dishes
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
                      <div>
                        <img
                          className="w-full h-32 object-cover"
                          src={dish.image}
                          alt=""
                        />
                      </div>
                      <div className="py-1 px-2 flex flex-col space-y-1">
                        <Input
                          type="text"
                          value={updateDish.name}
                          disabled={loading}
                          onChange={(e) =>
                            setUpdateDish({
                              ...updateDish,
                              name: e.target.value,
                            })
                          }
                          className="font-semibold bg-white border"
                        />
                        <div>
                          <Textarea
                            value={updateDish.description}
                            disabled={loading}
                            onChange={(e) =>
                              setUpdateDish({
                                ...updateDish,
                                description: e.target.value,
                              })
                            }
                            className="text-wrap border"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <Input
                            type="number"
                            value={updateDish.price}
                            disabled={loading}
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
                          onClick={handleCancelUpdate}
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
            {!adding ? (
              <button
                onClick={handlePlus}
                className="text-7xl font-semibold shadow-lg border rounded-full w-20 h-20"
              >
                +
              </button>
            ) : (
              <div className="flex flex-col gap-2 py-2">
                <div>
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    id="name"
                    value={newDish.name}
                    onChange={(e) => {
                      setNewDish({
                        ...newDish,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    value={newDish.description}
                    onChange={(e) => {
                      setNewDish({
                        ...newDish,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <Input
                    type="text"
                    id="price"
                    value={newDish.price}
                    onChange={(e) => {
                      setNewDish({
                        ...newDish,
                        price: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <div className="w-full">
                  <Button
                    onClick={handleAdd}
                    className="w-full font-semibold text-lg"
                  >
                    Add
                  </Button>
                </div>
                <div className="w-full">
                  <Button
                    onClick={handleCancelAdd}
                    className="w-full font-semibold text-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
