import api  from "./axios";
import type { Product } from "../types/product.types";

export type UserData =  {
    id: string;
    email: string | undefined;
    name?: string | null;
    imageUrl?: string;
}


export type Comment = {
    userId: string;
    content: string;
    productId: string;
    id?: string;
}

export const syncUser = async(userData: Omit<UserData, 'id'>)=>{
    const  {data} = await api.post('/users/sync', userData)
    return data
}

export const getAllProducts = async () => {
    const {data} = await api.get('/products')
    return data as Product[]
}

export const getProductById = async (id: string): Promise<Product> => {
    const {data} = await api.get(`/products/${id}`)
    return data
}

export const getMyProducts = async (): Promise<Product[]> => {
    const {data} = await api.get('/products/my')
    return data
}

export const createProduct = async (productData: Partial<Product>) => {
    const {data} = await api.post('/products', productData)
    return data
}

export const updateProduct = async ({id, productData}:{id: string, productData: Partial<Product>}) => {
    const {data} = await api.put(`/products/${id}`, productData)
    return data
}

export const deleteProduct = async (id: string) => {
    const {data} = await api.delete(`/products/${id}`)
    return data
}

//COMMENTS

export const createComment = async ({productId, content}: {productId: string, content: string}) => {
    const {data} = await api.post(`/comments/${productId}`, {content})
    return data
}
export const deleteComment = async ({commentId}: {commentId: string}) => {
    const {data} = await api.delete(`/comments/${commentId}`)
    return data
}
