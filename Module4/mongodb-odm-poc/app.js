const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const {
    Department,
    Course,
    Student
} = require("./models");


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


// ======================================================
// DATABASE CONNECTION + CONNECTION POOL
// ======================================================

async function connectDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI, {

            maxPoolSize:
                Number(process.env.DB_MAX_POOL_SIZE) || 10,

            minPoolSize:
                Number(process.env.DB_MIN_POOL_SIZE) || 2
        });

        console.log("MongoDB connected");

    } catch (error) {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
}


// ======================================================
// DATABASE EVENT LISTENERS
// ======================================================

mongoose.connection.on("connected", () => {

    console.log("EVENT: MongoDB connected");

});


mongoose.connection.on("error", (error) => {

    console.log(
        "EVENT: MongoDB error:",
        error.message
    );

});


mongoose.connection.on("disconnected", () => {

    console.log(
        "EVENT: MongoDB disconnected"
    );

});


// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {

    res.json({
        message: "College Management API is running"
    });

});


// ======================================================
// CREATE DEPARTMENT
// ======================================================

app.post("/departments", async (req, res) => {

    try {

        const department =
            await Department.create(req.body);

        res.status(201).json(department);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// ======================================================
// CREATE COURSE
// ======================================================

app.post("/courses", async (req, res) => {

    try {

        const course =
            await Course.create(req.body);

        res.status(201).json(course);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// ======================================================
// CREATE STUDENT
// ======================================================

app.post("/students", async (req, res) => {

    try {

        const student =
            await Student.create(req.body);

        res.status(201).json(student);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// ======================================================
// GET ALL STUDENTS
// ======================================================

app.get("/students", async (req, res) => {

    try {

        const students =
            await Student.find();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ======================================================
// POPULATE DEPARTMENT
// ======================================================

app.get("/students/with-department", async (req, res) => {

    try {

        const students =
            await Student.find()
                .populate("department");

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ======================================================
// POPULATE COURSES
// ======================================================

app.get("/students/with-courses", async (req, res) => {

    try {

        const students =
            await Student.find()
                .populate("courses");

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ======================================================
// POPULATE EVERYTHING
// ======================================================

app.get("/students/details", async (req, res) => {

    try {

        const students =
            await Student.find()
                .populate("department")
                .populate("courses");

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ======================================================
// FIND STUDENT BY EMAIL
// Demonstrates INDEX usage
// ======================================================

app.get("/students/email/:email", async (req, res) => {

    try {

        const student =
            await Student.findOne({
                email: req.params.email
            })
            .populate("department")
            .populate("courses");


        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }


        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ======================================================
// GET STUDENTS BY DEPARTMENT
// ======================================================

app.get(
    "/departments/:departmentId/students",
    async (req, res) => {

        try {

            const students =
                await Student.find({
                    department:
                        req.params.departmentId
                })
                .populate("department")
                .populate("courses");

            res.json(students);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// ======================================================
// ADD COURSE TO STUDENT
// ======================================================

app.put(
    "/students/:studentId/courses/:courseId",
    async (req, res) => {

        try {

            const student =
                await Student.findByIdAndUpdate(

                    req.params.studentId,

                    {
                        $addToSet: {
                            courses:
                                req.params.courseId
                        }
                    },

                    {
                        new: true
                    }
                )
                .populate("department")
                .populate("courses");


            if (!student) {

                return res.status(404).json({
                    message: "Student not found"
                });

            }


            res.json(student);

        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }

    }
);


// ======================================================
// DATABASE STATUS
// ======================================================

app.get("/database-status", (req, res) => {

    const states = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };


    res.json({
        state:
            states[mongoose.connection.readyState],

        poolSize:
            process.env.DB_MAX_POOL_SIZE,

        minimumPoolSize:
            process.env.DB_MIN_POOL_SIZE
    });

});


// ======================================================
// START SERVER
// ======================================================

async function startServer() {

    await connectDatabase();

    app.listen(PORT, () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    });

}


startServer();