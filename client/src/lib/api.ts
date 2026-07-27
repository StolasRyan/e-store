import api  from "./axios";

export type UserData =  {
    id: string;
    email: string | undefined;
    name?: string | null;
    imageUrl?: string;
}
export type Product = {
    id: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    userId: string;
    user: {
        id: string;
        email: string;
        name: string ;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
    };

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

export const getProductById = async (id: string) => {
    const {data} = await api.get(`/products/${id}`)
    return data
}

export const getMyProducts = async () => {
    const {data} = await api.get('/products/my')
    return data
}

export const createProduct = async (productData: Partial<Product>) => {
    const {data} = await api.post('/products', productData)
    return data
}

export const updateProduct = async ({id, ...productData}: Product) => {
    const {data} = await api.put(`/products/${id}`, productData)
    return data
}

export const deleteProduct = async (id: string) => {
    const {data} = await api.delete(`/products/${id}`)
    return data
}

//COMMENTS

export const createComment = async ({productId, content}: Comment) => {
    const {data} = await api.post(`/comments/${productId}`, content)
    return data
}
export const deleteComment = async (id: string) => {
    const {data} = await api.delete(`/comments/${id}`)
    return data
}
