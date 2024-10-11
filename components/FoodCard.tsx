import { dishType } from "@/app/lib/types";

function FoodCard({ dish }: { dish: dishType }) {
  return (
    <div>
      <img className="w-full h-32 object-cover" src={dish.image} alt="" />
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
    </div>
  );
}

export default FoodCard;
