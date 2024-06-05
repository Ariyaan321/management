const express = require('express');

const app = express();
const cors = require('cors');
const connectToMongoDB = require('./view/conn')
const userRouter = require('./routes/users')
const productRouter = require('./routes/products');

app.use(cors())
app.use(express.json());

connectToMongoDB();

// Route registration for all /users routes
app.use('/users', userRouter);

// Route registration for all /products routes
app.use('/products', productRouter);

// root route endpoint
app.get('/', (req, res) => {
    res.send("Root endpoint!");
});

app.get('/userData', (req, res) => {
    res.send()
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})

// Default catch all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

process.on('SIGINT', () => {
    console.log("SIGINT");
    mongoose.disconnect();
    console.log("TERMINATED");
});