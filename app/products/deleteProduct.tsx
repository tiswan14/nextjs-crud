"use client"
import { useState } from "react"
import type { Product } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"

type Product = {
    id: number
    title: string
    price: number
    brandId: number
}

const DeleteProduct = ({ product }: { product: Product[] }) => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleDelete = async (productId: number) => {
        try {
            await axios.delete(`/api/products/${productId}`)
            router.refresh()
            setIsOpen(false)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div>
                <button className="btn btn-error btn-sm text-white" onClick={handleModal}>Hapus</button>
            </div>

            <div className={`modal ${isOpen ? 'modal-open' : ''} flex justify-center items-center`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apakah kamu yakin ingin menghapus produk ini {product.title}?</h3>
                    <div className="modal-action flex justify-end gap-3 mt-6">
                        <button type="button" className="btn btn-outline" onClick={handleModal}>Tidak</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDelete(product.id)}>Ya</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct
