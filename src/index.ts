import { OpenAi } from 'openai'

const openai = new OpenAi()

async function main(){
    const response = await openai.chat.compleions.create({
        model: 'gpt-3.5-turbo',
        messages:[{
            role: 'user',
            content: 'How tall is mount everest?'
        }]
    })
    console.log(response.choice[0].message.context)
}
main();
