import { Text } from "lucide-react";

const dishes = [
  {
    name: "Hamburger",
    description: "Hamburger with cheese",
    price: 50,
    image:
      "https://img.freepik.com/premium-photo/extreme-closeup-tasty-hanburger-food-photography_779330-6030.jpg?w=2000",
  },
  {
    name: "Pizza",
    description: "Pizza with cheese and toppings",
    price: 100,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
  },
  {
    name: "Salad",
    description: "Salad with cheese and toppings",
    price: 80,
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/07/salad.jpg",
  },
  {
    name: "Pasta",
    description: "Pasta with cheese and toppings",
    price: 120,
    image:
      "https://www.yummytummyaarthi.com/wp-content/uploads/2022/11/red-sauce-pasta-1.jpg",
  },
  {
    name: "fries",
    description: "fries with cheese and toppings",
    price: 20,
    image:
      "https://www.awesomecuisine.com/wp-content/uploads/2009/05/french-fries.jpg",
  },
  {
    name: "Gobi Manchurian",
    description: "Drinks with cheese and toppings",
    price: 20,
    image:
      "https://www.hookedonheat.com/wp-content/uploads/2006/03/Gobi-Manchurian-HOHV.jpg",
  },
  {
    name: "Masala Dosa",
    description: "Sides with cheese and toppings",
    price: 20,
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-1014x1536.jpg",
  },
  {
    name: "Sides",
    description: "Sides with cheese and toppings",
    price: 20,
    image:
      "https://www.awesomecuisine.com/wp-content/uploads/2009/05/french-fries.jpg",
  },
];

const status = ["All", "Breakfast", "Lunch", "Treat", "Desert", "Drinks"];
function page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-2">
        <div>
          <h1 className="text-2xl font-semibold mt-2">Menu</h1>
        </div>
        <div className="flex items-center">
          <Text />
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none px-2 py-2 w-full"
          />
        </div>
      </div>
      <hr className="mt-1 mb-8" />
      <div className="w-full bg-cyan-200 min-h-[90vh] rounded-t-[2rem] pb-10 pl-2">
        <div className="flex gap-5 px-4 py-3 max-w-screen overflow-auto">
          {status.map((status) => (
            <p key={status} className="text-sm">
              {status}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pr-2">
          {dishes.map((dish) => (
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
                <p className="font-extrabold">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
