const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// MiddleWare ----------
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USERR}:${process.env.DB_PASS}@cluster0.oheyy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run () {
    try{
        await client.connect();
        const wholeSaleShopCollectionUser = client.db('ReactJS_Test_India').collection('StudentLIst');
    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running my node crud server')
})

app.listen(port, () => {
    console.log('crud server is running')
})