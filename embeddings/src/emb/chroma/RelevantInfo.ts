import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import OpenAI from "openai";
const chroma = new ChromaClient({path: "http://localhost:8000"});

const studentInfo = `Information`;

const clubInfo = `Information`;

const universityInfo = `Information`;

const embeddingFunction: OpenAIEmbeddingFunction = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_API_KEY!,
    openai_model: 'text-embedding-3-small'
})

const collectionName = "personal-infos";

async function createCollection() {
    await chroma.createCollection({name:collectionName});
}

async function getCollection() {
    const collection = await chroma.getCollection({
        name: collectionName,
        embeddingFunction
    });
    return collection;
}

async function populateCollection() {
    const collection = await getCollection();
    await collection.add({
        documents: [studentInfo, clubInfo, universityInfo],
        ids: ['id1', 'id2', 'id3'],
    })
}

async function askQuestion(){
    const question = 'What the time?';
    const collection = await getCollection();
    const result = await collection.query({
        queryTexts: question,
        nResults: 1
    })
    const relevantInfo = result.documents[0][0]
    if(relevantInfo){
        const openai = new OpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            messages: [{
                role: 'assistant',
                content: `Answear: ${relevantInfo}` 
            },
            {
                role:'user',
                content: question
            }]
        })
        const responseMessage = response.choices[0].message;
        console.log(responseMessage.content);
    }
}

async function main() {
    await askQuestion();
}

main();
