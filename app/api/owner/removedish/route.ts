import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const dish = await prisma.dish.delete({
    where: { id },
  });
  return NextResponse.json({ dish });
}
