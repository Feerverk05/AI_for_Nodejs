import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser, CommaSeparatedListOutputParser } from '@langchain/core/output_parsers'
import { StructuredOutputParser } from 'langchain/output_parsers'


const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
})

async function stringParser() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Write a short description for the following product: {product_name}'
    );

    const parser = new StringOutputParser();
            
    const chain = prompt.pipe(model).pipe(parser);

    const response = await chain.invoke({
        product_name: 'bicycle'
    })
    console.log(response);  
}

async function CommaSeparatedParser() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Provide the first 5 the following product: {word}'
    );

    const parser = new CommaSeparatedListOutputParser();
            
    const chain = prompt.pipe(model).pipe(parser);

    const response = await chain.invoke({
        word: 'bicycle'
    })
    console.log(response);  
}

async function structedParser() {
    const templatePrompt = ChatPromptTemplate.fromTemplate(
        `Generate a response in JSON format.
        {format_instructions}
        Phrase: {phrase}`
    );

    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name: 'the name of the person',
        likes: 'what the person likes'
    })

    const chain = templatePrompt.pipe(model).pipe(outputParser);

    const result = await chain.invoke({
        phrase: 'John loves cycling',
        format_instructions: outputParser.getFormatInstructions()
    })
    console.log(result);
}


CommaSeparatedParser();

