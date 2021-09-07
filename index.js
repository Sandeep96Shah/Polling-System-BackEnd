const express=require('express');
const port=8000;
const app=express();

//requiring the database
const db=require('./config/mongoose');

app.use(express.urlencoded());

//middleware for routes
app.use('/',require('./routes'));

//running server
app.listen(port,function(err)
{
     if(err)  {
         console.log(`Error in running server:${port}`);
         return;
    }

     console.log(`Server is running on Port : ${port}`); 
     return;
});