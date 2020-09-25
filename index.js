const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();


const url = "mongodb+srv://testUser:123qwe@cluster0.t4p3m.azure.mongodb.net/books?retryWrites=true&w=majority";
const port = 4000;

async function start() {
  try {
    await mongoose.connect(url, { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    app.listen(port, () => console.log('Сервер прослушивает порт ' + port));
  } catch (err) {
    console.log('Server error', err.message);
    process.exit(1)
  }
}

start()

app.use(bodyParser.json());
app.use('/',  require('./api'));



