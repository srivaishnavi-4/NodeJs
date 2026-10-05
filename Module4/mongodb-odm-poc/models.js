const mongoose = require("mongoose");


// ===============================
// Department Schema
// ===============================

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        }
    },
    {
        timestamps: true
    }
);


// ===============================
// Course Schema
// ===============================

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        },

        credits: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        }
    },
    {
        timestamps: true
    }
);


// Index on Course name

courseSchema.index({
    name: 1
});


// ===============================
// Student Schema
// ===============================

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 17,
            max: 60
        },


        // 1 : Many relationship
        // Department -> Students

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },


        // Many : Many relationship
        // Student <-> Course

        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ]
    },

    {
        timestamps: true
    }
);


// Index on email

studentSchema.index({
    email: 1
});


// Index on department

studentSchema.index({
    department: 1
});


const Department = mongoose.model(
    "Department",
    departmentSchema
);

const Course = mongoose.model(
    "Course",
    courseSchema
);

const Student = mongoose.model(
    "Student",
    studentSchema
);


module.exports = {
    Department,
    Course,
    Student
};