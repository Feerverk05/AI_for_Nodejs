import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

const client = new ChromaClient({
    path: 'http://localhost:8000'
})

async function main(){
    const response = await client.createCollection({
        name: 'data-test2'
    })
    console.log(response)
}

async function addData() {
    const collection = await client.getCollection({
        name: 'data-test2'
    });
    const result = await collection.add({
        ids: ['id1'],
        documents:['Here is my entry'],
    })
    console.log(result)
}
