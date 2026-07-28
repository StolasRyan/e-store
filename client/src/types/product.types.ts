export interface User{
createdAt: string
email: string
id: string
imageUrl: string
name: string
updatedAt: string
}

export interface Comment{
    content: string,
createdAt: string,
id: string,
productId: string,
user: User,
userId: string
}

export type Product = {
    comments: Comment[],
    createdAt: string,
    description: string,
    id: string,
    imageUrl: string,
    title: string,
    updatedAt: string,
    user: User,
    userId: string
}
