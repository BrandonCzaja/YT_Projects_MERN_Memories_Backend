// Usually in the backend the syntax is const express = require('express') but to use the modern import syntax I had to add the ' "type": "module" ' line to the package.json file. That is all I had to do. 
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose  from 'mongoose';
import postRoutes from './routes/posts.js'


const app = express();
const PORT = process.env.PORT || 3000



// Routes
// This router makes it so all posts in the posts.js file start with the url /posts
app.use('/posts', postRoutes)





// limit: 30m is to limit the size of images that we will be sending
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


app.use(cors())



// MongoDB Connection String - Will be added to .env file later
const CONNECTION_URL = 'mongodb+srv://YouTube_Projects:SSCotting31@cluster0.cyspk.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// Connect app to database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // Run the app listener based on if the connection is working or not
    .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
    .catch((error) => console.log(error.message))
    
mongoose.set('useFindAndModify', false)