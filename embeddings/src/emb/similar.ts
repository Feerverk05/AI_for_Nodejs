import { DataWithEmbeddings, generateEmbeddings, loadJSONData } from "./data";

function dotProduct(a: number[], b: number[]) {
    return a.map((value, index) => value * b[index]).reduce((a, b) => a + b, 0);
}

function cosineSimilarity(a: number[], b: number[]) {
    const product = dotProduct(a, b);
    const aMagnitude = Math.sqrt(a.map(value => value * value).reduce((a, b) => a + b, 0));
    const bMagnitude = Math.sqrt(b.map(value => value * value).reduce((a, b) => a + b, 0));
    return product / (aMagnitude * bMagnitude);
}

async function main() {
    let dataWithEmbeddings;

    try {
        dataWithEmbeddings = await loadJSONData<DataWithEmbeddings[]>('dataWithEmbeddings2.json');
        if (!dataWithEmbeddings) {
            throw new Error('Failed to load embeddings data');
        }
    } catch (error) {
        console.error('Error loading data:', error);
        return;
    }

    const input = 'How old is John?';

    let inputEmbedding;
    try {
        inputEmbedding = await generateEmbeddings(input);
        if (!inputEmbedding || !inputEmbedding.data || inputEmbedding.data.length === 0) {
            throw new Error('Failed to generate embeddings');
        }
    } catch (error) {
        console.error('Error generating embeddings:', error);
        return;
    }

    const similarities: {
        input: string,
        similarity: number
    }[] = [];

    for (const entry of dataWithEmbeddings) {
        const similarity = cosineSimilarity(
            entry.embedding,
            inputEmbedding.data[0].embedding
        );
        similarities.push({
            input: entry.input,
            similarity
        });
    }

    console.log(`Similarity of "${input}" with:`);
    const sortedSimilarities = similarities.sort((a, b) => b.similarity - a.similarity);
    sortedSimilarities.forEach(similarity => {
        console.log(`${similarity.input}: ${similarity.similarity}`);
    });
}

main();
