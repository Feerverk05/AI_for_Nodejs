import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
})

async function fromTemplate() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Write a short description for the following product: {product_name}'
    );

    const chain = prompt.pipe(model);

    const response = await chain.invoke({
        product_name: 'bicycle'
    })

    console.log(response.content);  
}

fromTemplate();
