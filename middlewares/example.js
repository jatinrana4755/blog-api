
//example middleware function
 let exampleMiddleware=(req,res,next)=>{

    req.user={'firstName':'Jatin','lastName':'rana'}

    next();



 }
 module.exports={
     exampleMiddleware:exampleMiddleware
 }