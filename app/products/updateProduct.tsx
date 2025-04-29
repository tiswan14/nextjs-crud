"use client"
import { SyntheticEvent, useState } from "react"
import type { Brand } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"

type Product = {
    id: number
    title: string
    price: number
    brandId: number
}

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product }) => {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price.toString());
    const [brand, setBrand] = useState(product.brandId.toString());
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/products/${product.id}`, {
                title,
                price: Number(price),
                brandId: Number(brand),
            });

            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleModal = () => setIsOpen(!isOpen);

    return (
        <>
            <button className="btn btn-info btn-sm text-white" onClick={handleModal}>Edit</button>

            <div className={`modal ${isOpen ? 'modal-open' : ''} flex justify-center items-center`}>
                <div className="modal-box w-full max-w-md p-6">
                    <h3 className="font-bold text-lg mb-4">Update {product.title}</h3>
                    <form className="space-y-4" onSubmit={handleUpdate}>
                        <div className="form-control w-full flex flex-col">
                            <label className="label text-left mb-2">
                                <span className="label-text">Nama Produk</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Masukkan nama produk"
                                required
                            />
                        </div>

                        <div className="form-control w-full flex flex-col">
                            <label className="label text-left mb-2">
                                <span className="label-text">Harga</span>
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Masukkan harga produk"
                                required
                            />
                        </div>

                        <div className="form-control w-full flex flex-col">
                            <label className="label text-left mb-2">
                                <span className="label-text">Brand</span>
                            </label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="select select-bordered w-full"
                                required
                            >
                                {brands.map((b) => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-action flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleModal}
                                className="btn btn-outline"
                            >
                                Tutup
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                        </div>
                    </form>


                </div>
            </div>



        </>
    );
};

export default UpdateProduct
