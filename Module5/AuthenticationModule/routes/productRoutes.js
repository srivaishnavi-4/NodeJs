const express = require("express");

const authenticate =
    require("../middleware/authenticate");

const authorizeAdmin =
    require("../middleware/authorizeAdmin");


const router = express.Router();


const products = [

    {
        id: 1,
        name: "Laptop",
        price: 55000
    },

    {
        id: 2,
        name: "Mouse",
        price: 800
    },

    {
        id: 3,
        name: "Keyboard",
        price: 1500
    },
    
    {
        id: 4,
        name: "Monitor",
        price: 12000
    },

    {
        id: 5,
        name: "i-Mouse",
        price: 8000
    },

    {
        id: 6,
        name: "i-Keyboard",
        price: 15000
    },
    
    {
        id: 7,
        name: "MacBook Pro",
        price: 200000
    },

    {
        id: 8,
        name: "i-phone",
        price: 1000000
    },

    {
        id: 9,
        name: "Samsung Galaxy",
        price: 150000
    }

];


// GET PRODUCTS
router.get("/", (req, res) => {

    res.json({

        success: true,

        products

    });

});


// DELETE PRODUCT
router.delete(
    "/:id",

    authenticate,

    authorizeAdmin,

    (req, res) => {

        const productId =
            Number(req.params.id);


        const productIndex =
            products.findIndex(
                product =>
                    product.id === productId
            );


        if (productIndex === -1) {

            return res.status(404).json({

                success: false,

                error: "Product not found"

            });

        }


        const deletedProduct =
            products.splice(
                productIndex,
                1
            );


        res.json({

            success: true,

            message:
                "Product deleted successfully",

            product: deletedProduct[0]

        });

    }

);


module.exports = router;