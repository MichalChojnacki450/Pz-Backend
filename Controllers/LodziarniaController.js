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
        res.send(404).send(err)
        
    }    
}

const addTaste = async (req,res) =>{
    console.log(req.body)
    try{
        const smakiToSave = await Smaki({
            lodziarnia:req.user.name,
            nazwaSmaku:req.body.nazwaSmaku,
            adress:req.query.address,
            dostepnosc: req.body.dostepnosc            
        })

        console.log(smakiToSave)
    
        smakiToSave.save();
        res.status(201).send(smakiToSave)
        
    }
    catch(err){
        console.log(err)
        res.send(404).send(err)
        
    }  
}
const getTaste = async (req,res) =>{
    
    try{
        Smaki.find({email:req.query.adress}).select().exec((err,smakiToSave)=>{
            res.status(201).send(smakiToSave)
          })
        
        
    }
    catch(err){
        console.log(err)
        res.send(404).send(err)
    }  
}
const editTaste = async (req,res) => {  
    try{
        console.log(req.body)
        Smaki.findOneAndUpdate({adress:req.query.address,nazwaSmaku:req.body.taste},{nazwaSmaku:req.body.newTaste,dostepnosc:req.body.dostepnosc}).exec((err,smak)=>{
            res.status(201).send(smak)
          })
    }
    catch(err){
        console.log(err)
        res.send(404).send(err)
    }  
}
const getAll = async(req,res) => {

    try{
        Lodziarnia.find().exec((err,lodziarnie)=>{
            res.status(201).send(lodziarnie)
          })
        
        
    }
    catch(err){
        console.log(err)
        res.send(404).send(err)
    }  

}

const getByAdress = async(req,res) => {

    try{
        Lodziarnia.findOne({adress:req.query.address}).exec((err,lodziarnie)=>{
            res.status(201).send(lodziarnie)
          })
        
        
    }
    catch(err){
        console.log(err)
        res.send(404).send(err)
    }  

}

module.exports = {register,addTaste,getTaste,getAll,getByAdress,editTaste}