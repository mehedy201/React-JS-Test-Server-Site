const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// MiddleWare ----------
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Pass}@cluster0.oheyy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run () {
    try{
        await client.connect();
        const studentCollection = client.db('ReactJS').collection('student-list');

         // Post Data get from client site
        app.post('/student-list', async(req, res) => {
            const student = req.body;
            const result = await studentCollection.insertOne(student);
            res.send({success: true, result});
        });

        // Get Data From Server ----------
        app.get('/student-lists', async(req, res) => {
            const query ={};
            const cursor = studentCollection.find(query);
            const allStudent = await cursor.toArray();
            res.send(allStudent);
          });

        //Get single Student List ------------
        app.get('/student-lists/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const student = await studentCollection.findOne(query);
            res.send(student);
          })
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