import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const transaction = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transaction);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { date, category, amount, type, comment } = body;

  const transaction = await prisma.transaction.create({
    data: {
      date: new Date(date),
      category,
      amount,
      type,
      comment,
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}
