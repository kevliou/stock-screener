import apiClient from 'axios';

const searchInstance = apiClient.create({
    baseURL: 'http://localhost:5000/api'
});

export class PredictiveSearchAPI {
    getTickerDict() {
        return new Promise((resolve, reject) => {
            resolve(searchInstance
                .get('/getTickerDict')
                .then(res => res.data)
            ).catch(err => {
                reject(console.log(err));
            });
        });
    }

    getSuggestion(searchTerm) {
        return new Promise((resolve, reject) => {
            resolve(searchInstance
                .get('/getSuggestion', { params: { 'id': searchTerm }})
                .then(res => res.data)
            ).catch(err => {
                reject(console.log(err));
            });
        });
    }
}