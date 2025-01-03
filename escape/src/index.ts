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

async function translate2(){
    const result = await inference.translation({
        model: 'facebook/nllb-200-distilled-600M',
        inputs: 'How is the weather in Paris',
        //@ts-ignore
        parameters: {
            src_lang: 'eng_Latn',
            tgt_lang: 'spaa_Latn'
        }
    });
    console.log(result)
}

async function answearQuestion() {
    const result = await inference.questionAnswering({
        inputs: {
            context: 'The quick brown fox jumps over the lazy dog',
            //question: 'What color is the fox'
            //question: 'Is dog lazy?'
            question: 'What is the meaning of life?'

        }
    })
    console.log(result);
}
answearQuestion()
