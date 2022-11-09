const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
console.log()

const uri = `mongodb+srv://${process.env.DB}:${process.env.DB_PASS}@cluster0.gaubth5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function dbConnect() {
    try {
        await client.connect();
        console.log('database connected');
    } catch (error) {
        console.log(error.name, error.message)
    }
}
dbConnect();


const servicesCollection = client.db("MyPhotography").collection("services");
const reviewsCollection = client.db("MyPhotography").collection("reviews");



app.get('/', (req, res) => {
    res.send('hello form server')
})



app.get('/homeservices', async (req, res) => {
    try {
        const query = {};
        const cursor = servicesCollection.find(query).sort({ "dateTime": -1 }).limit(3);
        const result = await cursor.toArray();
        res.send({
            success: true,
            message: 'Got The Data',
            data: result
        })
    } catch (error) {
        console.log(error.name, error.message);
        res.send({
            success: false,
            message: error.message
        })

    }
})


app.get('/service/:id', async (req, res) => {
    try {
        const id = req.params;
        const query = { _id: ObjectId(id) };
        const service = await servicesCollection.findOne(query);
        res.send({
            success: true,
            message: 'Here is the service you wanted',
            data: service
        });


    } catch (error) {

        console.log(error.name, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
})


app.get('/services', async (req, res) => {
    try {
        const query = {};
        const cursor = servicesCollection.find(query);
        const result = await cursor.toArray();
        res.send({
            success: true,
            message: 'Successfully got the services data',
            data: result
        })
    } catch (error) {
        console.log(error.name, error.message);
        res.send({
            success: false,
            message: error.message
        })

    }
})

app.get('/review/:id', async (req, res) => {
    try {
        const id = req.params;
        const query = { serviceId: id };
        const reviews = await reviewsCollection.find(query);
        res.send({
            success: true,
            message: 'Here is the service you wanted',
            data: reviews
        });


    } catch (error) {

        console.log(error.name, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
})


app.post('/addservice', async (req, res) => {
    try {
        const service = req.body;
        const result = await servicesCollection.insertOne(service)
        if (result.insertedId) {
            res.send({
                success: true,
                message: 'Successfully added the Service'
            })
        }
        else {
            res.send({
                success: false,
                message: 'Cannot add the Service'
            })
        }
    } catch (error) {

    }
})

app.post('/addreview', async (req, res) => {
    try {
        const review = req.body;
        const result = await reviewsCollection.insertOne(review);
        if (result.insertedId) {
            res.send({
                success: true,
                message: 'Successfully added the Service'
            })
        }
        else {
            res.send({
                success: false,
                message: 'Cannot add the Service'
            })
        }
    } catch (error) {

    }
})


app.listen(port, () => {
    console.log('server running on port 5000')

})