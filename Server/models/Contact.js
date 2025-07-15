const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  Name: {type: String,required: true},
  Image: {type: String, default: "" }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;