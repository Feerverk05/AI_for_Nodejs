import OpenAI from "openai";

const openAI = new OpenAI();

function getTimeOfDay() {
    return '5:45';
}

async function callOpenAIWithTools() {
    const context: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: 'You are a helpful assistant that gives information about the time of day'
        },
        {
            role: 'user',
            content: 'What is the time of day?'
        }
    ];

    const response = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: context,
        functions: [
            {
                name: 'getTimeOfDay',
                description: 'Get the time of day',
                parameters: {}
            }
        ],
        function_call: { name: 'getTimeOfDay' } 
    });

    const functionCall = response.choices[0].message?.function_call;

    if (functionCall?.name === 'getTimeOfDay') {
        const toolResponse = getTimeOfDay();

        context.push({
            role: 'assistant',
            content: null,
            function_call: functionCall
        });

        context.push({
            role: 'function',
            name: 'getTimeOfDay',
            content: toolResponse
        });
    }

    const secondResponse = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: context
    });

    console.log(secondResponse.choices[0].message?.content);
}

callOpenAIWithTools();
