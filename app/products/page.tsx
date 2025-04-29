import { PrismaClient } from "../generated/prisma/"
import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct"
import UpdateProduct from "./updateProduct"

const prisma = new PrismaClient()

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: {
                select: {
                    name: true,
                },
            },
        },
    })
    return res
}

const getBrands = async () => {
    const res = await prisma.brand.findMany()
    return res
}

const Product = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()])

    return (
        <div>
            <div className="mb-2">
                < AddProduct brands={brands} />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Harga</th>
                        <th>Brand</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand.name}</td>
                            <td className="text-center flex items-center justify-center gap-3">
                                <UpdateProduct brands={brands} product={product} />
                                <DeleteProduct product={product} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product
