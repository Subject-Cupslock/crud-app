import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const type = searchParams.get("type") as "INCOME" | "EXPENSE" | null;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  const skip = (page - 1) * limit;

  const where = {
    type: type || undefined,
    date:
      startDate && endDate
        ? { gte: new Date(startDate), lte: new Date(endDate) }
        : undefined,
  };

  const transaction = await prisma.transaction.findMany({
    where,
    skip,
    take: limit,
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

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, date, category, amount, type, comment } = body;

  const transaction = await prisma.transaction.update({
    where: { id },
    data: { date: new Date(date), category, amount, type, comment },
  });

  return NextResponse.json(transaction);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.transaction.delete({ where: { id } });

  return NextResponse.json({ message: "Transaction deleted" });
}
