const express=require('express');
const router=express.Router();
const Notes=require('../models/Notes');
const fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');




//ROUTE 1: Get All Notes using: GET 'api/notes/fetchallnotes' . Login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//ROUTE 2: Add a new note using: POST 'api/notes/addnotes' . Login required
router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','description length should be atleast 8 characters').isLength({ min: 8 })] ,async (req,res)=>{
    try{
    const {title,description,tag} = req.body;
    //if there are errors, return Bad Request and the error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNote=await note.save();

    res.json(savedNote);
   }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
   }
})

//ROUTE 3: Update a Note using: PUT 'api/notes/updateanote' . Login required
router.put('/updateanote/:id', fetchuser, async (req,res)=>{
    try{
   const {title, description, tag} =req.body;
   // Create a newNote object
   const newNote={};
   if(title){newNote.title=title};
   if(description){newNote.description=description};
   if(tag){newNote.tag=tag};

   //Find the note to be updated and update it
//    const note =Notes.findByIdAndUpdate()
    let note= await Notes.findById(req.params.id);//the note added by user 1 cannot be edited by user2,3,4......infinity
    if(!note){
      return  res.status(404).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        return  res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})//{new:true}=>Allow user 1 to edit the note
    res.json({note})
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
   }
   
})

//ROUTE 4: Delete a Note using: DELETE 'api/notes/deleteanote' . Login required
router.delete('/deleteanote/:id', fetchuser, async (req,res)=>{
    try{
    //Find the note to be deleted and delete it
    // const note =Notes.findByIdAndUpdate()
     let note= await Notes.findById(req.params.id);//the note added by user 1 cannot be deleted by user2,3,4......infinity
     if(!note){
       return  res.status(404).send("Not found")
     }
     //Allow the user to delete a note if only the user owns this
     if(note.user.toString() !== req.user.id){
         return  res.status(401).send("Not allowed")
     }
 
     note = await Notes.findByIdAndDelete(req.params.id)
     res.json({"Success":"Note has been deleted"})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
       }
 })


module.exports=router