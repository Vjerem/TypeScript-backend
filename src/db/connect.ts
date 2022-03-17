import mongoose from 'mongoose';

module.exports = async function connect(err:any){
    try{
        // const url = 'mongodb://127.0.0.1:27017/wilderdb'
        const url = 'mongodb+srv://Vjerem:Vjerem59@cluster0.syynu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

        await mongoose.connect(url)
        console.log('Connected sucessfully to MongoDB')
    }
    catch(err:any){
        console.error(err.message)
    } 
}
