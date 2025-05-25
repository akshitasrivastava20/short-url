const express=require('express');
const app=express();
const PORT=8001
const {connectDb}=require('./connect')
const router=require('./routes/url')
const URL=require('./models/url');

connectDb("mongodb://127.0.0.1:27017/short-url").then(()=>
    console.log("mongo connected")
);
app.use(express.json());
app.use("/api/url",router)

app.get("/api/url/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
   const entry= await URL.findOneAndUpdate(
        {shortId:shortId},
        {$push:{
            visitHistory:{timestamp:Date.now(),

            },
        },
    });
    res.redirect(entry.redirectURL)
})




app.listen(PORT,()=>{
    console.log(`server running at port${PORT}`)
})