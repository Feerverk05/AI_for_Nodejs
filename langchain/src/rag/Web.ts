import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'


const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
});

const myData = [
    "My name Kateryna",
    "My name Yuliia",
    "My favorite food is sushi",
    "My favorite food is pizza"
];

const question = "What are my favorite foods";

async function main() {
    const loader = new CheerioWebBaseLoader('https://js.langchain.com/docs/get_started/introduction');
    const docs = await loader.load();
    const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());
    
    await vectorStore.addDocuments(
        myData.map(content => new Document({ pageContent: content }))
    );

    const retriever = vectorStore.asRetriever({ k: 2 });

    const results = await retriever.getRelevantDocuments(question);
    const resultDocs = results.map(result => result.pageContent);

    const template = ChatPromptTemplate.fromMessages([
        ['system', 'List the favorite foods based on the following data: {context}'],
        ['human', '{input}']
    ]);

    const chain = template.pipe(model);

    const response = await chain.invoke({
        input: question,
        context: resultDocs.join(', ')
    });

    console.log(response.content);
}

main();
