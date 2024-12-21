import { OpenAI } from 'openai'
import { createReadStream, writeFileSync } from 'fs';

const openai = new OpenAI()

async function createTranscription(){
    const response = await openai.audio.transcriptions.create({
        file: createReadStream('AudioSample.m4a'),
        model: 'whisper-1',
        language: 'en'
    });
    console.log(response);
}
createTranscription()