import { openai } from "./client.js";
import { vectorStore } from "./embedStore.js";
import { cosineSimiliarity } from "./similiarity.js";

export async function retrieveRelevantChunks(query, k = 4) {
    const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query
    });

    const queryEmbeding = embeddingRes.data[0].embedding;

    const scored = vectorStore.map(item => ({
        ...item,
        score: cosineSimiliarity(queryEmbeding, item.embedding)
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, k);
}