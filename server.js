const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Pproduct= require('./models/productmodel')

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Merhaba')
})


app.get('/products', async(req, res) => {
    try {
        const product = await Pproduct.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products/',async (req,res)=>{
    try {
        const product = await Pproduct.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const product = await Pproduct.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req,res)=>{

try {
    const{id} = req.params;
    const product= await Pproduct.findByIdAndUpdate(id,req.body);
    if(!product){
        return res.status(404).json({message: 'ulasilamiyor ${id}'})
    }
    res.status(200).json(product);
} catch (error) {
    res.status(500).json({message: error.message})
}
})

app.delete('/products/:id', async(req,res)=>{

try {
    const{id} = req.params;
    const product= await Pproduct.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({message: 'ulasilamiyor ${id}'})
    }
    res.status(200).json(product);
} catch (error) {
    res.status(500).json({message: error.message})
}})


mongoose.connect('mongodb+srv://berkantozturk:Berkant@cluster0.vvx74ph.mongodb.net/')
.then(()=> {
    app.listen(3000 ,() =>{
        console.log('calisiyor')
    })
}).catch((error)=>{
    console.log(error)
})