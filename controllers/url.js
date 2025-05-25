const {nanoid}=require('nanoid');
const URL=require("../models/url")



async function handleshorturlgeneration(req,res) {
    const body=req.body;
    if(!body.url)return res.status(400).json({err:"url required"});
     const shortID=nanoid(8);
     await URL.create({
         shortId:shortID,
         redirectURL:body.url,
         visitHistory:[]
     });
     return res.json({id:shortID})
}

async function handlegetanalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId})
    return res.json({totalclicks:result.visitHistory.length,
        analytics:result.visitHistory,
    }
        
    )

}

module.exports={
    handleshorturlgeneration,
    handlegetanalytics,
}