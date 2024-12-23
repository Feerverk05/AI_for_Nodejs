import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
});


const question = "What themes does Gone with the Wind explore?";

async function main() {
    const loader = new PDFLoader('books.pdf', {
        splitPages: false
    });
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        separators:[`. \n`]
    });

    const splittedDocs = await splitter.splitDocuments(docs);

    const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());
    await vectorStore.addDocuments(splittedDocs);

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
