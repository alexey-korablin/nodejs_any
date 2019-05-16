const axios = require('axios');

const getBreeds = async () => {
    try {
        return await axios.get('https://dog.ceo/api/breeds/list/all');
    } catch (e) {
        console.error(e);
    }
}

const countBreeds = async () => {
    const breeds = await getBreeds();
    if (breeds.data.message) {
        console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
    }
}

countBreeds();