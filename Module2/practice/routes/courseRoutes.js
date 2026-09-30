const express = require("express");

const router = express.Router();

const {
    getCourses,
    getCourseById,
    createCourse,
    replaceCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");


router.get("/", getCourses);

router.get("/:id", getCourseById);

router.post("/", createCourse);

router.put("/:id", replaceCourse);

router.patch("/:id", updateCourse);

router.delete("/:id", deleteCourse);


module.exports = router;