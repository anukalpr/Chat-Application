const express=require("express");
const router=express.Router();
const Contact=require("../models/Contact");

router.post('/add-contact',async(req,res)=>{
   const {Name,Email,Image}=req.body;
    try{
        const newContact=new Contact({Name,Email,Image});
        await newContact.save();
        res.status(201).json({ message: "Contact Created", contact: newContact });
    } catch (error) {
      res.status(500).json({ error: "Failed to create contact", details: error.message });
    }
});
router.get('/get-contact', async (req, res) => {
    try {
      const contacts = await Contact.find(); 
      res.status(200).json({ message: "Contacts retrieved", contacts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts", details: error.message });
    }
});
module.exports=router;

