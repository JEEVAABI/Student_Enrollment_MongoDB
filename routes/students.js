const express = require('express')

const router = express.Router()

const studentModel = require('../models/students');



router.get('/',(request,response)=>{
    response.send("Display student")
})
router.post('/',(request,response)=>{
    response.send("Adding new stdents")
})

router.patch('/:id',(request,response)=>{
    response.send(`Update on student id ${request.params.id}`)
})
router.delete('/:id',(request,response)=>{
    response.send(`delete on student id ${request.params.id}`)
})


module.exports = router