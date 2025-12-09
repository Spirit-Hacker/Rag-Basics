import dotenv from "dotenv";
dotenv.config();

import { buildVectorStore } from "./embedStore.js";
import { answerWithRag } from "./rag.js";

async function main() {
    console.log("Building Vector Store");
    await buildVectorStore();

    const query = "Explain Weather in simple terms based on my notes.";
    const answer = await answerWithRag(query);

    console.log("Q: ", query);
    console.log("A: ", answer);
}

main().catch(console.error);