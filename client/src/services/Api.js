import apiClient from 'axios';

const searchInstance = apiClient.create({
    baseURL: 'http://localhost:5000/api'
});

export function getTickerDict() {
    return new Promise ((resolve, reject) => {
        resolve(searchInstance.get('/getTickerDict')
            .then(res => res.data))
            .catch(err => {
                reject(console.log(err));
            });
    });
}

export function getList() {
    return new Promise ((resolve, reject) => {
        resolve(searchInstance.get('/getList')
            .then(res => res.data))
            .catch(err => {
                reject(console.log(err));
            });
    });
}