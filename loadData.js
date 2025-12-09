import fs from "fs"
import path from "path"

export function loadDocument() {
    const dirPath = path.join(process.cwd(), "data");
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".txt"));

    const docs = [];

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        // console.log("File Path: ", fullPath);
        const text = fs.readFileSync(fullPath, "utf-8");
        // console.log("Text Data: ", text);

        docs.push({
            id: file,
            text: text
        });
    }

    return docs;
}