const { getUser } = require("../service/auth");

async function restrictedtologgedinuseronly (req,res,next) {
    
    const userid=req.headers["authorization"];
   

    if(!userid) return res.redirect('/login');
    const token=userid.split('Bearer ')[1];

    const user=getUser(userid);
    
    if(!user) return res.redirect('/login');

     req.user=user;
    next();
}
async function checkAuth(req,res,next) {
    const userid=req.headers["authorization"];
    //  const userid=req.cookies.uid;
     const token=userid.split('Bearer ')[1];
     const user=getUser(token);
     req.user=user;
     next();
}

module.exports={
    restrictedtologgedinuseronly,
    checkAuth,
}