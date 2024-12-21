import { OpenAI } from 'openai'

const openai = new OpenAI()

async function generateFreeImage() {
    const response = await openai.images.generate({
        prompt: 'A photo of a cat on a mat',
        model: 'dall-e-2',
        style: 'vivid',
        size: '256x256',
        quality: 'standard',
        n: 1
    });
    console.log(response)
}

generateFreeImage;