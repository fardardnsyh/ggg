"use server"

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


export async function generateEmbeddings(docId:string) {
    auth().protect(); //protect this route with clerk
 
    // turn a PDF into embeddings [0.01234, 0.345,...]
    await generateEmbeddingsInPineconeVectorStore(docId);

    revalidatePath('/dashboard');

    return {completed: true};
}