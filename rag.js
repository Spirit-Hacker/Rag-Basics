import { openai } from "./client.js";
import { retrieveRelevantChunks } from "./retriever.js";

export async function answerWithRag(query) {
    const chunks = await retrieveRelevantChunks(query);

    const contextText = chunks.map((c, i) => `Chunk ${i + 1}:\n${c.text}`).join("\n\n");

    const messages = [
        {
            role: "system",
            content: `
                You are a helpful assistant that answers questions using ONLY the provided context.
                If the context does not contain the answer, say "I don't know from the given notes."
                Context:

                ${contextText.trim()}
            `
        },
        {
            role: "user",
            content: query
        }
    ];

    const res = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: messages
    });

    return res.choices[0].message.content;
}