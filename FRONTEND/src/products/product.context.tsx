import { createContext, useState } from "react"
import { createProduct, getAllSellerProducts } from "./product.api"
export const ProductContext = createContext(null)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(null)
    const createSellerProduct = async (formData: FormData) => {
        try {
            const res = await createProduct(formData)
            console.log(res)
        } catch (err) {
            throw err
        }
    }
    const getAllProducts = async () => {
        try {
            const res = await getAllSellerProducts()
            // console.log(res.products)
            setProducts(res.products)
            // console.log(products)
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    return (
        <ProductContext.Provider value={{ products, loading, setProducts, setLoading, createSellerProduct, getAllProducts }}>
            {children}
        </ProductContext.Provider>
    )
}