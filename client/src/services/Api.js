import axios from 'axios';

export class ApiClient {
    instance = axios.create({
        baseURL: 'http://localhost:5000/api'
    });

    getTickerDict() {
        return new Promise((resolve, reject) => {
            resolve(this.instance
                .get('/getTickerDict')
                .then(res => res.data)
            ).catch(err => {
                reject(console.log(err));
            });
        });
    }

    getSuggestion(searchTerm) {
        return new Promise((resolve, reject) => {
            resolve(this.instance
                .get('/getSuggestion', { params: { 'id': searchTerm }})
                .then(res => res.data)
            ).catch(err => {
                reject(console.log(err));
            });
        });
    }

    getCompanyOverview(ticker) {
        return new Promise((resolve, reject) => {
            resolve(this.instance
                .get('/getOverview', { params: { 'id': ticker }})
                .then(res => res.data)
            ).catch(err => {
                reject(console.log(err));
            });
        });
    }
}