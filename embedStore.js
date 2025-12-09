import { openai } from "./client.js";
import { loadDocument } from "./loadData.js";
import { chunkText } from "./chunk.js";

// create an in memory vector store
export let vectorStore = [];

export async function buildVectorStore() {
    const docs = loadDocument();
    let idCounter = 0;

    for (const doc of docs) {
        const chunks = chunkText(doc.text);

        for (const chunk of chunks) {
            const embedingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk
            });

            const embedding = embedingRes.data[0].embedding;

            vectorStore.push({
                id: idCounter++,
                text: chunk,
                embedding: embedding,
            })
        }
    }

    console.log("Vector Store Build Success");
}