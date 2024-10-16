import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export async function POST(req: NextRequest) {
  const { name, description, price, image } = await req.json();
  const dish = await prisma.dish.create({
    data: {
      name,
      description,
      price,
      image,
      menuId: 1,
    },
  });
  return NextResponse.json({ message: "Dish Added succesfully", dish });
}
