const express = require("express");
const path = require("path");

const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    Email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact',contactSchema);

  //const contect = new ({ name: 'Silence' });
//console.log(silence.name);

app.use('/static', express.static('static'));
app.use(express.urlencoded())

app.set('view engine' , 'pug')// set the templet engine as pug



app.set('views', path.join(__dirname, 'views') );//set the views directory

//endpoints 

app.get("/", (req, res)=>{
    
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    
   var myData = new Contact(req.body);
   myData.save().then(()=>{
    res.send("this item has been to the data  base")
   }).catch(()=>{
    res.status(400).send("item was not saved to the database")
   });
   // res.status(200).render('contect.pug', params);
});

app.listen(port, ()=>{
    console.log(`the application stated successfully on port ${port}`);
});