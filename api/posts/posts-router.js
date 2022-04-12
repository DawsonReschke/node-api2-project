// implement your posts router here
const express = require('express') 
const DB = require('./posts-model')
const router = express.Router(); 

router.get('/',async(req,res)=>{
    DB.find()
        .then(posts=>res.json(posts))
        .catch(e=>res.status(500).json({message:'The posts information could not be retrieved'}))
})

router.get('/:id',async(req,res)=>{
    const {id} = req.params
    DB.findById(id)
        .then(post=>{
            if(!post) return res.status(404).json({message:'The post with the specified ID does not exist'})
            res.json(post)
        })
        .catch(e=>res.status(500).json({message:'The post information could not be retrieved'}))
})


router.get('/:id/comments',async (req,res)=>{
    const {id} = req.params
    const POST = await DB.findById(id)
    if(!POST) return res.status(404).json({message:'The post with the specified ID does not exist'})
    DB.findPostComments(id)
        .then(comments=>{
            res.json(comments)
        })
        .catch(e=>res.status(500).json({message:'The comments information could not be retrieved'}))
})


router.post('/',async (req,res)=>{
    const {title,contents} = req.body
    if(!title || !contents) return res.status(400).json({message:'Please provide title and contents for the post'})
    DB.insert(req.body)
        .then(inserted=>res.status(201).json({...req.body,id:inserted.id}))
        .catch(e=>res.status(500).json({message:'There was an error while saving the post to the database'}))
})


router.put('/:id',async(req,res)=>{
    const {title,contents} = req.body
    const {id} = req.params
    if(!title || !contents) return res.status(400).json({message:'Please provide title and contents for the post'})
    DB.update(id,req.body)
        .then(updated => {
            if(!updated) return res.status(404).json({message:'The post with the specified ID does not exist'})
            res.json({...req.body,id:updated})
        })
        .catch(e=>res.status(500).json({message:'The post information could not be modified'}))
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params
    const POST = await DB.findById(id)
    if(!POST) return res.status(404).json({message:'The post with the specified ID does not exist'})
    DB.remove(id)
        .then(removed=>{
            res.json({...POST})
        })
        .catch(e=>res.status(500).json({message:'The comments information could not be retrieved'}))
})

module.exports = router