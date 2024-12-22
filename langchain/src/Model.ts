import { ChatOpenAI } from '@langchain/openai'

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.8,
    maxTokens: 700,
    //verbose: true
})

async function main() {
    //const responsel = await model.invoke(
    //    'Give me 4 good books to read'
    //);
    //console.log(responsel.content)

    const response2 = await model.batch([
        'Hello',
        'Give me 4 good books to read'
    ]);
    console.log(response2)
}

main()
