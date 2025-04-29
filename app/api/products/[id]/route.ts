import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import type { Product } from "@/app/generated/prisma";
import { request } from "http";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body: Product = await request.json();
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(params.id),
            },
            data: {
                title: body.title,
                price: body.price,
                brandId: body.brandId,
            }
        });
        return NextResponse.json({ updatedProduct }, { status: 200 });
    } catch (error) {
        console.error("Error saat mengupdate produk:", error);
        return NextResponse.json({ error: "Terjadi kesalahan di server" }, { status: 500 });
    }
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json({ deletedProduct }, { status: 200 });
    } catch (error) {
        console.error("Error saat menghapus produk:", error);
        return NextResponse.json({ error: "Terjadi kesalahan di server" }, { status: 500 });
    }
}