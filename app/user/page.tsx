"use client";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { ChevronDown, ChevronUp, ShoppingCart, Text, X } from "lucide-react";
import { useEffect, useState } from "react";

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

// Helper function to round up to the next 30-minute interval
const roundToNext30Minutes = (date: Date) => {
  const ms = 1000 * 60 * 30; // 30 minutes in milliseconds
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

// Helper function to format time in HH:MM AM/PM format
const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

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
  const [error, setError] = useState("");
  const [timeOptions, setTimeOptions] = useState<Date[]>([]);

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

  const handleCheckout = () => {
    setCheckout((prev) => !prev);
    setShowOrder(false);
  };

  const handlePlaceOrder = () => {
    // if (!name || !phone) {
    if (!name) {
      setError("Please enter your name and phone number");
      return;
    }
    // if (phone.length != 10) {
    //   setError("Please enter a valid phone number");
    //   return;
    // }
    window.location.reload();
  };

  useEffect(() => {
    let newTotal = 0;
    dishes.forEach((dish) => {
      newTotal += dish.price * dish.quantity;
    });
    setTotal(newTotal);
  }, [dishes]);

  useEffect(() => {
    // Get current time and round it up to the next 30-minute interval
    const currentTime = new Date();
    const next30MinTime = roundToNext30Minutes(currentTime);

    // Generate time options for the next few hours (e.g., next 5 hours)
    const options: Date[] = [];
    for (let i = 0; i < 10; i++) {
      const newTime = new Date(next30MinTime.getTime() + i * 30 * 60 * 1000);
      options.push(newTime);
    }

    setTimeOptions(options);
  }, []);

  return (
    <>
      <AlertDialog open={checkout}>
        <AlertDialogContent
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex flex-col px-2 py-4 items-center justify-center bg-black/50"
        >
          <AlertDialogHeader className="bg-white py-2 w-full px-2">
            <AlertDialogTitle className="text-2xl">
              <div className="flex justify-between">
                <p>Order Details</p>
                <button onClick={() => setCheckout(false)}>
                  <X />
                </button>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="max-h-[30vh] overflow-hidden overflow-y-scroll w-full flex flex-col space-y-2">
              {dishes.map((dish) => {
                if (dish.quantity > 0) {
                  return (
                    <div key={dish.id} className="flex gap-6 items-center">
                      <img
                        src={dish.image}
                        className="w-14 h-14 rounded-lg"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold">{dish.name}</p>
                        <p className="font-bold">
                          Qty: {dish.quantity} x {dish.price} ={" "}
                          {dish.price * dish.quantity}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-white w-full py-4 px-2 flex flex-col gap-2">
            <div className="flex flex-col ">
              <label className="font-semibold">Name</label>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div className="flex flex-col ">
              <label htmlFor="">Phone Nnumber</label>
              <Input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  if (
                    e.target.value.length > 10 ||
                    isNaN(Number(e.target.value))
                  ) {
                    return;
                  }
                  setPhone(e.target.value);
                }}
              />
            </div> */}
            <div className="flex flex-col ">
              <label htmlFor="">Time</label>
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[160px] justify-start text-left font-normal"
                  >
                    <ClockIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    <span>Select a time</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <div className="grid grid-cols-1 gap-2 p-4 max-h-[40vh] overflow-y-scroll">
                    {[...Array(48)].map((_, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        className="rounded-md px-3 py-1 text-sm font-medium hover:bg-muted/50"
                      >
                        {new Date(i * 30 * 60 * 1000).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover> */}
              <div>
                <label htmlFor="timeSelect">Select a time:</label>
                <select id="timeSelect">
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time.toISOString()}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
          </div>
          <AlertDialogFooter className="bg-white pb-3 w-full">
            <Button onClick={handlePlaceOrder}>Confirm and Place Order</Button>
            {error && <p className="text-red-500">{error}</p>}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                  className="rounded-lg overflow-hidden col-span-1 bg-white"
                >
                  <img
                    className="w-full h-32 object-cover"
                    src={dish.image}
                    alt=""
                  />
                  <div className="py-1 px-2">
                    <p className="font-semibold">{dish.name}</p>
                    <p>
                      {dish.description.length > 20
                        ? dish.description.slice(0, 20) + "..."
                        : dish.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-extrabold">{dish.price}</p>
                      {dish.quantity > 0 && (
                        <p className="font-bold shadow-lg bg-red-500 text-white rounded-sm px-1">
                          Qty: {dish.quantity}
                        </p>
                      )}
                    </div>
                  </div>
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
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="sticky w-full py-1 bg-white text-white mt-0 bottom-0"
        >
          {showOrder && (
            <div className="sticky w-full bg-cyan-200 rounded-t-[2rem] pb-8 pl-2 pt-2 max-h-[40vh] overflow-y-scroll no-scrollbar">
              {dishes.map((dish) => {
                if (dish.quantity > 0) {
                  return (
                    <div
                      key={dish.id}
                      className="flex bg-blue-500 mx-2 py-1 rounded-sm justify-between px-2 mt-2 items-center"
                    >
                      <div>
                        <img
                          src={dish.image}
                          className="w-14 h-14 rounded-lg"
                          alt=""
                        />
                      </div>
                      <div className="w-1/2">
                        <div className="flex justify-between px-1">
                          <p className="font-semibold">{dish.name}</p>
                          <p className="font-bold">{dish.price}</p>
                        </div>
                        <div className="flex justify-between font-bold shadow-lg bg-red-500 text-white rounded-sm px-1">
                          <p className="">Qty: {dish.quantity}</p>
                          <p>{dish.price * dish.quantity}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleAdd(dish.id)}
                          className="bg-green-500 px-1 text-3xl rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(dish.id)}
                          className="bg-red-500 px-2 text-3xl rounded"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
          {total > 0 && (
            <div
              className={`bg-red-500 mx-2 py-2 rounded px-2 flex justify-between items-center ${
                showOrder ? "mt-2" : ""
              }`}
            >
              <div className="flex gap-2">
                <button
                  className="bg-white text-red-500 font-bold py-1 px-2 rounded"
                  onClick={() => setShowOrder((prev) => !prev)}
                >
                  {showOrder ? <ChevronDown /> : <ChevronUp />}
                </button>
                <p className="bg-white text-red-500 font-bold py-1 px-2 rounded">
                  Total: <span className="font-extrabold text-xl">{total}</span>
                </p>
              </div>
              <div>
                <button
                  onClick={handleCheckout}
                  className="bg-white text-red-500 font-bold py-1 px-2 rounded flex items-center gap-2"
                >
                  <div className="relative h-full pr-2 pt-1">
                    <p className="rounded-full bg-black text-white absolute right-0 top-0 text-xs px-1">
                      {dishes.reduce((a, b) => a + b.quantity, 0)}
                    </p>
                    <ShoppingCart />
                  </div>
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;

// function ClockIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <polyline points="12 6 12 12 16 14" />
//     </svg>
//   );
// }
