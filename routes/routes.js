const { request, response } = require('express');
const express = require('express');
const router = express.Router()
const singUpCopy = require('../models/SingupModels')

router.post('/songup',(request,response)=>{
    const singedUpUser = new singUpCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        email:request.body.email,
        password:request.body.password
    })

    singedUpUser.save()
    .them(date =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })

})

module.exports = router