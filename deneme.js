const express = require('express')
const mongoose = require('mongoose')
const app = express()
const berkant= require('./models/productmodel')
app.use(express.json())

app.get('/', (req,res)=> {
    res.send('baglandiniz')
})
    app.listen(2000,() => {
        console.log('working')
    })

app.post('/berkant', async(req,res)=>{
    try {
        console.log(req.body)
        const berkanta = await berkant.create(req.body)
        res.status(200).json(berkanta);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://berkantozturk:Berkant@cluster0.vvx74ph.mongodb.net/')
.then(()=> {
 //do something
}).catch((error)=>{
    console.log(error)
})