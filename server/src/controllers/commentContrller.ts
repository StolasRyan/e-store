import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
        try {
            const { userId } = getAuth(req);
            if (!userId) return res.status(401).json({ error: "Unauthorized" });

            const {productId} = req.params;
            const strProductId = Array.isArray(productId) ? productId[0] : productId;
            const {content} = req.body;

            if(!content) return res.status(400).json({ error: "Missing required fields" });

            const product = await queries.getProductById(strProductId);
            if(!product) return res.status(404).json({ error: "Product not found" });

            const comment = await queries.createComment({
                userId,
                productId: strProductId,
                content
            });
            res.status(201).json(comment);
        } catch (error) {
            console.error("Error creating comment:", error);
            return res.status(500).json({ error: "Failed to create comment" });
        }
};

export const deleteComment = async (req: Request<{commentId:string}>, res:Response) => {
    try{
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({ error: "Unauthorized" });

        const {commentId} = req.params
        const existingComment = await queries.getCommentById(commentId);
        if(!existingComment) return res.status(404).json({ error: "Comment not found" });
        if(existingComment.userId !== userId) return res.status(403).json({ error: "Only the creator can delete the comment" });

        await queries.deleteComment(commentId);
        res.status(200).json({message: "Comment deleted successfully"});
    }catch(error){
        console.error("Error deleting comment:", error);
        return res.status(500).json({ error: "Failed to delete comment" });
    }
}
