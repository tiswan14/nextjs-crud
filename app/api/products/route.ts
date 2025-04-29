import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";
import type { Product } from "@/app/generated/prisma";  
const prisma = new PrismaClient()

type ProductInput = {
    title: string;
    price: number;
    brandId: number;
};

export const POST = async (request: Request) => {
    try {
        const body: ProductInput = await request.json();

        const newProduct = await prisma.product.create({
            data: {
                title: body.title,
                price: body.price,
                brandId: body.brandId,
            },
        });

        return NextResponse.json({ newProduct }, { status: 201 });
    } catch (error) {
        console.error("Error saat membuat produk:", error);
        return NextResponse.json({ error: "Terjadi kesalahan di server" }, { status: 500 });
    }
};
