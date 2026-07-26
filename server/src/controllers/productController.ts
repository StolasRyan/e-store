import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async(req:Request, res:Response) => {
    try {
        const products = await queries.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        return res.status(500).json({ error: "Failed to get products" });
    }
};

export const getMyProducts = async(req:Request, res:Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({ error: "Unauthorized" });

        const products = await queries.getProductsByUserId(userId);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error getting user products:", error);
        return res.status(500).json({ error: "Failed to get user products" });
    }
}

export const getProductByID = async(req:Request<{id:string}>, res:Response) => {
    try {
        const {id} = req.params;
        const product = await queries.getProductById(id);
        if(!product) return res.status(404).json({ error: "Product not found" });
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error getting product:", error);
        return res.status(500).json({ error: "Failed to get product" });
    }
}

export const createProduct = async(req:Request, res:Response) => {
    try{
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({ error: "Unauthorized" });

        const {title, description, imageUrl} = req.body;
        if(!title || !description || !imageUrl){
         res.status(400).json({ error: "Missing required fields" });
         return;   
        } 

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        })
        res.status(201).json(product);
    }catch(error){
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
}

export const updateProduct = async(req:Request<{id:string}>, res:Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({ error: "Unauthorized" });

        const {id} = req.params;
        const {title, description, imageUrl} = req.body;

        const existingProduct = await queries.getProductById(id);
        if(!existingProduct) return res.status(404).json({ error: "Product not found" });

        if(existingProduct.userId !== userId) return res.status(403).json({ error: "Only the creator can update the product" });

        const product = await queries.updateProduct(id, {
            title,
            description,
            imageUrl
        });

        res.status(200).json(product);
    }catch(error){
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Failed to update product" });
    }
};

export const deleteProduct = async(req:Request<{id:string}>, res:Response) => {
    try{
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({ error: "Unauthorized" });

        const {id} = req.params;
        const existingProduct = await queries.getProductById(id);
        if(!existingProduct) return res.status(404).json({ error: "Product not found" });

        if(existingProduct.userId !== userId) return res.status(403).json({ error: "Only the creator can delete the product" });

        const product = await queries.deleteProduct(id);
        res.status(200).json({message: "Product deleted successfully"});
    }catch(error){
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to delete product" });
    }
}