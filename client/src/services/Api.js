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
        .get('/getSuggestion', { params: { 'id': searchTerm } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getCompanyOverview(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getOverview', { params: { 'id': ticker } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getQuote(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getQuote', { params: { 'id': ticker } })
        .then(res => res.data)
        .then(res => res['Global Quote'])
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getIntraday(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getIntraday', { params: { 'id': ticker } })
        .then(res => res.data)
        .then(res => res['Time Series (Daily)'])
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }
}