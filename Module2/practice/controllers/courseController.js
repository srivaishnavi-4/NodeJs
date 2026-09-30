const courses = require("../data/courses");

// GET /api/v1/courses
const getCourses = (req, res) => {

    const { category } = req.query;

    let result = courses;

    if (category) {
        result = courses.filter(
            course => course.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
};


// GET /api/v1/courses/:id
const getCourseById = (req, res) => {

    const id = Number(req.params.id);

    const course = courses.find(course => course.id === id);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    res.status(200).json({
        success: true,
        data: course
    });
};


// POST /api/v1/courses
const createCourse = (req, res) => {

    const {
        name,
        category,
        instructor,
        duration
    } = req.body;

    if (!name || !category || !instructor || !duration) {
        return res.status(400).json({
            success: false,
            message: "All course details are required"
        });
    }

    const newCourse = {
        id: courses.length + 1,
        name,
        category,
        instructor,
        duration,
        status: "active"
    };

    courses.push(newCourse);

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: newCourse
    });
};


// PUT /api/v1/courses/:id
const replaceCourse = (req, res) => {

    const id = Number(req.params.id);

    const index = courses.findIndex(course => course.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    const {
        name,
        category,
        instructor,
        duration,
        status
    } = req.body;

    if (!name || !category || !instructor || !duration || !status) {
        return res.status(400).json({
            success: false,
            message: "Complete course details are required"
        });
    }

    courses[index] = {
        id,
        name,
        category,
        instructor,
        duration,
        status
    };

    res.status(200).json({
        success: true,
        message: "Course replaced successfully",
        data: courses[index]
    });
};


// PATCH /api/v1/courses/:id
const updateCourse = (req, res) => {

    const id = Number(req.params.id);

    const course = courses.find(course => course.id === id);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    const { status, duration } = req.body;

    if (status) {
        course.status = status;
    }

    if (duration) {
        course.duration = duration;
    }

    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: course
    });
};


// DELETE /api/v1/courses/:id
const deleteCourse = (req, res) => {

    const id = Number(req.params.id);

    const index = courses.findIndex(course => course.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    const deletedCourse = courses.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        data: deletedCourse[0]
    });
};


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    replaceCourse,
    updateCourse,
    deleteCourse
};