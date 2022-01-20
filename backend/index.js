const connnectToMongo = require('./db');
const express = require('express')

const app = express()
connnectToMongo();
const port = 5000

app.use(express.json());
//Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})