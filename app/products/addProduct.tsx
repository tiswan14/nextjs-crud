"use client"
import { SyntheticEvent, useState } from "react"
import type { Brand } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    // Pindahkan semua useState ke dalam komponen
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            await axios.post('/api/products', {
                title: title,
                price: Number(price),
                brandId: Number(brand),
            })

            // Reset fields after submission
            setTitle('')
            setPrice('')
            setBrand('')
            router.refresh()
            setIsOpen(false)
        } catch (error) {
            console.error('Error submitting product:', error)
        }
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div className="flex justify-between mb-12 px-[157px]">
                <h1 className="font-bold text-2xl">Daftar Produk</h1>
                <button className="btn btn-primary" onClick={handleModal}>Tambah Produk</button>
            </div>

            <div className={`modal ${isOpen ? 'modal-open' : ''} flex justify-center items-center`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Produk</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Nama Produk */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-base">Nama Produk</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Masukkan nama produk"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Harga Produk */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-base">Harga Produk</span>
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Masukkan harga produk"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Nama Brand */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-base">Nama Brand</span>
                            </label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="" disabled>-- Pilih Brand --</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="modal-action flex justify-end gap-3 mt-6">
                            <button type="button" className="btn btn-outline" onClick={handleModal}>Tutup</button>
                            <button type="submit" className="btn btn-primary" >Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
