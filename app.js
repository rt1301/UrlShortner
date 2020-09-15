const express           = require('express');
const app               = express();
const mongoose          = require('mongoose');
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://rt1301:radhavilla1301@cluster0.hc7tc.mongodb.net/ShortUrl?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Root route
app.get("/",(req, res)=>{
    res.render("index");
});
app.post("/shortUrls",(req, res)=>{

})
app.listen(3000,()=>{console.log("Server is running")});