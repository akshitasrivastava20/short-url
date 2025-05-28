const express=require('express');
const app=express();

const path =require("path")
const cookieParser=require('cookie-parser');
const PORT=8001
const {connectDb}=require('./connect')
const urlrouter=require('./routes/url')
const URL=require('./models/url');
const staticRouter=require("./routes/staticRouter");
const userRouter=require("./routes/user");
const {checkforAuthentication,
    restrictTo}=require('./middlewares/auth')


connectDb("mongodb://127.0.0.1:27017/short-url").then(()=>
    console.log("mongo connected")
);
app.set("view engine","ejs");
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/user",userRouter);
app.use("/",staticRouter);
app.use("/url",restrictTo(["NORMAL"]),urlrouter);

app.get("/url/:shortId",async(req,res)=>{
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