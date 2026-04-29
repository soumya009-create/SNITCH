import axios from "axios";

const productInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true
})
export async function createProduct(formData: FormData) {
    try {
        const response = await productInstance.post("/create", formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}
export async function getAllSellerProducts() {
    try {
        const response = await productInstance.get("/getproducts")
        return response.data
    } catch (err) {
        throw err
    }
}

export async function fetchEveryProduct() {
    try {
        const response = await productInstance.get("/allproducts")
        return response.data
    } catch (err) {
        throw err
    }
}
