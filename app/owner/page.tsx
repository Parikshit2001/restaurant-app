import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const orders = [
  {
    id: 1,
    name: "Order 1",
    time: "2022-01-01 12:00:00",
    items: [
      {
        id: 1,
        name: "Item 1",
        price: 100,
      },
      {
        id: 2,
        name: "Item 2",
        price: 200,
      },
    ],
  },
  {
    id: 2,
    name: "Order 2",
    time: "2022-01-01 12:00:00",
    items: [
      {
        id: 1,
        name: "Item 1",
        price: 100,
      },
      {
        id: 2,
        name: "Item 2",
        price: 200,
      },
    ],
  },
  {
    id: 3,
    name: "Order 3",
    time: "2022-01-01 12:00:00",
    items: [
      {
        id: 1,
        name: "Item 1",
        price: 100,
      },
      {
        id: 2,
        name: "Item 2",
        price: 200,
      },
    ],
  },
];

function Owner() {
  return (
    <div className="mb-4">
      <div className="border-b-2 w-full flex px-2 py-2 shadow-xl">
        <Link
          className="bg-cyan-900 text-white w-full px-2 py-2"
          href={"/owner/menu"}
        >
          Update Menu
        </Link>
      </div>
      <div className="my-3 ml-3">
        <h1 className="text-3xl">ORDERS</h1>
      </div>
      <div className="flex flex-col gap-4 max-w-[500px] mx-2">
        {orders.map((order) => (
          <Card key={order.id} className="">
            <CardHeader>
              <CardTitle>{order.name}</CardTitle>
            </CardHeader>
            {order.items.map((item) => (
              <CardContent key={item.id}>
                <h1>{item.name}</h1>
                <h1>{item.price}</h1>
              </CardContent>
            ))}
            <CardFooter>
              <p>
                Total Order Value:{" "}
                {order.items.reduce((total, item) => total + item.price, 0)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Owner;
