const Lodziarnia = require('../Models/Lodziarnia')

const register = async (req,res) => {
    console.log(req.body)
    console.log(req.user)
    try{

        const existed = await Lodziarnia.findOne({adress:req.body.address})

        if(existed)
        {
            return res.status(404).send({err:"Lodziarnia istnieje"})
        }
        else{
            const lodziarniaToSave = await Lodziarnia({
                name:req.user.name,
                city:req.body.city,
                adress:req.body.address
            })
        
            lodziarniaToSave.save();
            res.status(201).send(lodziarniaToSave)
        }
    }
    catch(err){
        console.log(err)
    }

    
    
    
}

module.exports = {register}