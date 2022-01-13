const Lodziarnia = require('../Models/Lodziarnia')
const Smaki = require('../Models/Smaki')
const User = require('../Models/User')

const register = async (req,res) => {
    try{

        const existed = await Lodziarnia.findOne({adress:req.body.address})

        if(existed)
        {
            return res.status(404).send({err:"Lodziarnia istnieje"})
        }
        else{
            
            // User.findOne({email:req.user.email}).exec((err,userInfo)=>{
            //     const user = userInfo;
            //     console.log(user)
            // })
            
            const lodziarniaToSave = await Lodziarnia({
                name:req.user.name,
                city:req.body.city,
                adress:req.body.address,
                lat:req.body.lat,
                lon:req.body.lon
            })
        
            lodziarniaToSave.save();
            res.status(201).send(lodziarniaToSave)
        }
    }
    catch(err){
        console.log(err)
    }    
}

const addTaste = async (req,res) =>{
    console.log(req.user.name)
    try{
        const smakiToSave = await Smaki({
            lodziarnia:req.user.name,
            nazwaSmaku:req.body.nazwaSmaku,
            dostepnosc: req.body.dostepnosc            
        })

        console.log(smakiToSave)
    
        smakiToSave.save();
        res.status(201).send(smakiToSave)
        
    }
    catch(err){
        console.log(err)
    }  
}
const getTaste = async (req,res) =>{
    
    try{
        Smaki.find({email:req.query.miasto}).select({name:1,email:1}).exec((err,smakiToSave)=>{
            res.status(201).send(smakiToSave)
          })
        
        
    }
    catch(err){
        console.log(err)
    }  
}

module.exports = {register,addTaste,getTaste}