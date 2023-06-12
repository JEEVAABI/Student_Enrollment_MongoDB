//PS C:\Users\jeeva\Documents\mern\student_enrollment> npm install multer
const multer = require("multer")
const path = require("path")
const imageStorage = multer.diskStorage({
    destination:function(requeest,file,callback){
        callback(null,'uploads/')
    },
    filename:function(request,file,callback){
        callback(null,Date.now() +'_'+ file.originalname)
    }
})

const imageupload = multer({
    storage:imageStorage,
    fileFilter:function(request,file,callback){
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png'||file.mimetype == 'image/jpeg' ){
            callback(null,true);
        }
        else{
            console.log("file not supported");
            callback(null,false)
        }
    }
})

module.exports = imageupload;