import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const revalidate = 10;

export async function GET() {
  const dishes = await prisma.dish.findMany({});
  console.log(dishes);
  return NextResponse.json({ dishes });
}
