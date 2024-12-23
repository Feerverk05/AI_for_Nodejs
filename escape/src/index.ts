import { HfInference } from '@huggingface/inference'

const inference = new HfInference(
    process.env.HF_TOKEN
)

async function embed(){
    const output = await inference.featureExtraction({
        inputs: 'My Cool Embeddigns',
        model: 'BAAI/bge-small-en-v1.5'
    });
    console.log(output)
}

async function translate(){
    const result = await inference.translation({
        model: 't5-base',
        inputs: 'My Cool Embeddigns'
    });
    console.log(result)
}
translate()
