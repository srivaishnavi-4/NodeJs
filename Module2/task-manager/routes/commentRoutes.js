const express = require("express");

const router = express.Router();

const {
    getComments,
    addComment,
    deleteComment
} = require("../controllers/commentController");


router.get("/", getComments);

router.post("/", addComment);

router.delete("/:commentId", deleteComment);


module.exports = router;