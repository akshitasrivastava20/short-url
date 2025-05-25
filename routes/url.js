const express=require('express');

const router=express.Router();

const {handleshorturlgeneration,handlegetanalytics}=require("../controllers/url")

router.post('/',handleshorturlgeneration);
router.get('/analytics/:shortId',handlegetanalytics)

module.exports=router;