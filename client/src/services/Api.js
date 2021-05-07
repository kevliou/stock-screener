import axios from 'axios';

export class ApiClient {
  instance = axios.create({
    baseURL: 'https://hidden-fortress-30522.herokuapp.com/api'
    // baseURL: 'http://localhost:5000/api'
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

  getKeyStats(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getKeyStats', { params: { 'id': ticker } })
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
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getPreviousDayQuote(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getPreviousDayQuote', { params: { 'id': ticker } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getIntradayQuotes(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getIntradayQuotes', { params: { 'id': ticker } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getFiveDayQuotes(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getFiveDayQuotes', { params: { 'id': ticker } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getAnnualQuotes(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getAnnualQuotes', { params: { 'id': ticker } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }

  getFiveYearQuotes(ticker) {
    return new Promise((resolve, reject) => {
      resolve(this.instance
        .get('/getFiveYearQuotes', { params: { 'id': ticker } })
        .then(res => res.data)
      ).catch(err => {
        reject(console.log(err));
      });
    });
  }
}