const express = require('express');
const router = express.Router();
const {CreatePost, AllPost, EditPost, deletePost} = require('../controllers/ProductsController');
const {IsLoginUser} = require('../middlewares/isLoginUser');
const upload = require('../config/multer-config');

router.get( '/', function(req, res){
    res.send('Product model is working');
})

router.post('/create', upload.single('image'), IsLoginUser ,CreatePost)
router.get('/index', IsLoginUser ,AllPost)
router.post('/edit/:id', IsLoginUser ,EditPost)
router.delete('/delete/:id', IsLoginUser ,deletePost)


module.exports = router;