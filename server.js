
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./app');

mongoose.connection.on('connected',()=>console.log('connected'));
mongoose.connection.on('disconnected',()=>console.log('disconnected'));
mongoose.connection.on('error',(error)=>console.log(error));


app.listen(process.env.PORT || 1992,async ()=>{
    // const bcrypt = require('bcrypt');
    // console.log(await bcrypt.compare('test1234','$2b$10$2Zm.C4MqMc8JPNlgQoptKugft0Y1TKAnHEIvnsu4CUfk9.vq4G4SC'));
    await mongoose.connect(process.env.DATABASE);
   
    console.log(`listening on port ${process.env.PORT || 3000}`);
})