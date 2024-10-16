import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, name, description, price, image } = await req.json();
  const dish = await prisma.dish.update({
    where: { id: id },
    data: {
      name,
      description,
      price,
      image,
    },
  });
  return NextResponse.json({ message: "Dish Updated succesfully", dish });
}
