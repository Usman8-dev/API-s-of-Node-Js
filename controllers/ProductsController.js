const productModel = require("../models/product-model")
const fs = require("fs");
const path = require("path");

// const CreatePost = async (req, res) => {
//     let { name, price, discount } = req.body;

//     let post = await productModel.create({
//         name,
//         price,
//         discount,
//     })

//     return res.status(201).json({
//         success: true,
//         message: "Post Created successful",
//         Post: post,
//     });
// }

const CreatePost = async (req, res) => {
    try {
        let { name, price, discount } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Get uploaded file path
        const imagePath = `/uploads/${req.file.filename}`;

        // Save post in database
        const post = await productModel.create({
            image: imagePath, // save relative path
            name,
            price,
            discount,
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};

const AllPost = async (req, res) => {

    let allProduct = await productModel.find();

    return res.status(201).json({
        success: true,
        message: "All Posts",
        Post: allProduct,
    });

}

const EditPost = async (req, res) => {
   try{
     let { name, price, discount } = req.body;
    let post = await productModel.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!"
        });
    }
    // 2. If a new file is uploaded, update image path
    let imagePath = post.image; // keep old image if new not provided

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;

        // OPTIONAL: delete old image
        const oldImage = path.join(__dirname, "../..", post.image);
        if (fs.existsSync(oldImage)) {
            fs.unlinkSync(oldImage);
        }
    }

    let updatedPost = await productModel.findOneAndUpdate(
        {
            _id: req.params.id
        }, {
        image: imagePath,
        name,
        price,
        discount,
    },
        {
            new: true
        })

    return res.status(201).json({
        success: true,
        message: "Edit Posts Successfully",
        Post: updatedPost,
    });
   }catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const deletePost = async (req, res) => {
    let deletedpost = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedpost) {
        return res.status(404).json({
            success: false,
            message: "Post not found!"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Post deleted successfully.",
        Post: deletedpost,
    });

}

module.exports = { CreatePost, AllPost, EditPost, deletePost };