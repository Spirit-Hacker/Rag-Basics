export function chunkText(text, chunkSize = 500, overlap = 100) {
    const sentences = text.split(/(?<=[.?!])\s+/);
    const chunks = [];

    let currentChunk = "";

    for (const sentence of sentences) {
        if ((currentChunk + " " + sentence).length > chunkSize) {
            chunks.push(currentChunk.trim());

            // start a new chunk with overlap
            currentChunk = currentChunk.slice(-overlap) + " " + sentence;
        } else {
            currentChunk += " " + sentence;
        }
    }

    if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}