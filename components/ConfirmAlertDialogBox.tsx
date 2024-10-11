import { dishType } from "@/app/lib/types";
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
import { X } from "lucide-react";
import { useEffect, useState } from "react";

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

// Helper function to round up to the next 30-minute interval
const roundToNext30Minutes = (date: Date) => {
  const ms = 1000 * 60 * 30; // 30 minutes in milliseconds
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

function ConfirmAlertDialogBox({
  name,
  setName,
  checkout,
  setCheckout,
  dishes,
}: {
  name: string;
  setName: (name: string) => void;
  checkout: boolean;
  setCheckout: (checkout: boolean) => void;
  dishes: dishType[];
}) {
  const [timeOptions, setTimeOptions] = useState<Date[]>([]);
  const [error, setError] = useState("");

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
  );
}

export default ConfirmAlertDialogBox;
