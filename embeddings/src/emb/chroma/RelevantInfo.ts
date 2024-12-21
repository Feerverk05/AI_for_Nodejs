import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import OpenAI from "openai";
const chroma = new ChromaClient({path: "http://localhost:8000"});

const studentInfo = ``;

const clubInfo = ``;

const embeddingFunction: OpenAIEmbeddingFunction = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_API_KEY!,
    openai_model: 'text-embedding-3-small'
})

const collectionName = "personal-infos";

async function createCollection() {
    await chroma.createCollection({name:collectionName});
}
