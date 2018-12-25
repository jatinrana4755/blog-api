//importing mongoose module.
const mongoose = require('mongoose')





//import schema.

const Schema = mongoose.Schema;

let emailSchema = new Schema(
    {

      

        email: {
            type: String,
            default: ''
        },

       
    }

)

mongoose.model('Email',emailSchema);

