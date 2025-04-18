const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,res,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        const ext = path.extname(file.originalname)
        cb(null,file.fieldname+'-'+Date.now()+ext)
    }
})

const upload = multer({storage})

const handleFileUpload = (req,res,next) =>{
    const singleUpload = upload.single("image")

    singleUpload(req,res,function (err){
        if(err instanceof multer.MulterError){
            return res.status(400).json({error:err.message})
        }
        else if(err){
            return res.status(500).json({error:"Internal Server Error"})
        }
        req.imageName = req.file ? req.file.filename : null
        next()
    })
    
}

module.exports = handleFileUpload