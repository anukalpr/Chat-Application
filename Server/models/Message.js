const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  message: {
    type: String, 
    maxlength:1000,
    trim:true,
    required:true,
    validate:[
      {
        validator:(value)=>value.length>0,
        message:"message cannot be Empty",
      },{
        validator:(value)=>/^[a-zA-Z0-9\s]*$/.test(value),
        message:"message can only contain alphanumeric characters and spaces",
      }
    ]
  },
  createdAt:{typeLDate,default:Date.now()}
},{timestamps:true});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;