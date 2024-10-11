import { dishType } from "@/app/lib/types";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";

function Checkout({
  showOrder,
  setShowOrder,
  total,
  dishes,
  handleAdd,
  handleRemove,
  setCheckout,
}: {
  showOrder: boolean;
  setShowOrder: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  dishes: dishType[];
  handleAdd: (id: number) => void;
  handleRemove: (id: number) => void;
  setCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleCheckout = () => {
    setCheckout(true);
    setShowOrder(false);
  };

  return (
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
  );
}

export default Checkout;
