const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  #total = 0;
  limit = 0;
  constructor(options) {

    super(options);
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    let error;
    let data;
    try{
      this.#total += chunk.length;
      if(this.#total > this.limit){
        new LimitExceededError();
      }
      data = chunk.toString()
    }  catch (e) {
    error = e;
  }
  callback(error, data);


  }

}

module.exports = LimitSizeStream;
