const mongoose = require( 'mongoose');

const accountSchema = new mongoose.Schema(
    {
        email:{
            type: String,
        //    trim: true,
          //  unique: true,
         //   required: true
        },
        username :{
            type: String,
        //    trim: true,
        //    required: true
        },
        password :{
            type: String,
        //    trim: true,
          //  required: true
        },
        role :{
            type: Number,
//required: true
        }
    }
);

const Account = mongoose.model('Account', accountSchema) ;

module.exports = Account;