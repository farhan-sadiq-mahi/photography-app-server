const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config();

app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized access'
        })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorize access'
            })
        }
        req.decoded = decoded;
        next();

    });

}



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
        const { id } = req.params;
        const query = { serviceId: id };
        const cursor = reviewsCollection.find(query);
        const review = await cursor.toArray();
        res.send({
            success: true,
            message: 'Here is the reviews you wanted',
            data: review
        });


    } catch (error) {

        console.log(error.name, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
})




app.get('/myreviews', verifyJWT, async (req, res) => {
    const decoded = req.decoded;
    console.log(decoded);
    if (decoded.email !== req.query.email) {
        res.status(403).send({
            success: false,
            message: 'Unauthorize access'
        })
    }
    let query = {};
    if (req.query.email) {
        query = {
            email: req.query.email
        }
    }
    const cursor = reviewsCollection.find(query);
    const result = await cursor.toArray();
    res.send({
        success: true,
        message: 'Successful',
        data: result
    });
})

app.get('/reviewss', async (req, res) => {
    let query = { email: req.query.email }
    const cursor = reviewsCollection.find(query);
    const result = await cursor.toArray();
    res.send({
        success: true,
        message: 'Successful',
        data: result
    });
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

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = { _id: ObjectId(id) };
        const result = await reviewsCollection.deleteOne(query);
        res.send({
            success: true,
            message: 'Deleted Successfully',
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

app.post('/jwt', (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
    res.send({ token });
})


app.listen(port, () => {
    console.log('server running on port 5000')

})