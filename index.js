

const express = require('express')
const {userRouter} = require('./routes/user.Router')
const {productRouter}= require('./routes/product.Routes')
const {vehicleRouter}= require('./routes/vehicle.Routes')
const {vendorRouter}= require('./routes/vendor.Routes')
const bodyParser = require('body-parser');

const cors = require('cors')
const {connection} = require('./db')

const app = express()
app.use(cors());
app.use(express.json())



app.get('/',(req,res)=>{
    res.status(200).send({"msg":"this is the homepage"})
})


app.use('/users',userRouter)
app.use('/product' , productRouter)
app.use('/vehicle', vehicleRouter)
app.use('/vendor', vendorRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, async()=>{
     try{
         await connection
         console.log('Connected to DB')
         console.log('Server is running at port 8080')
     }catch(err){
        console.log("Error:",err)
     }
})