const express           = require('express');
const app               = express();
const mongoose          = require('mongoose');
const Url               = require("./models/url.js");
const body              = require('body-parser');
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(body.urlencoded({extended:true}));
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://rt1301:radhavilla1301@cluster0.hc7tc.mongodb.net/ShortUrl?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Root route
app.get("/",async (req, res)=>{
    const shortUrls = await Url.find({});
    res.render("index",{shortUrls:shortUrls});
});
app.post("/shortUrls",async (req, res)=>{
    await Url.create({full:req.body.fullUrl});
    res.redirect("/");
});
// Redirecting to the actual webpage
app.get("/:url",(req, res)=>{
    Url.findOne({short:req.params.url},(err,foundUrl)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            foundUrl.clicks++;
            foundUrl.save();
            res.redirect(foundUrl.full);
        }
    })
})
app.listen(3000,()=>{console.log("Server is running")});