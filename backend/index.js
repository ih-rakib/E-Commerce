const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()


// middlewares
app.use(express.json({ limit: "27mb" }))
app.use((express.urlencoded({ limit: "27mb" })))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


// All routes
const authRoutes = require('./src/users/user.route')
const productRoutes = require('./src/products/products.route')
const reviewRoutes = require('./src/reviews/reviews.route')

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)

main().then(() => console.log("MongoDB is connected successfully")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);

    app.get('/', (req, res) => {
        res.send('backend is running')
    })
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})