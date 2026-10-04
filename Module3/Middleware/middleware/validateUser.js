const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function validateUser(req, res, next) {

    const { name, email, dob } = req.body;

    const errors = [];

    // Name validation
    if (!name || name.trim() === "") {
        errors.push("Name is required");
    }

    // Email validation
    if (!email) {
        errors.push("Email is required");
    } else if (!emailRegex.test(email)) {
        errors.push("Email must be a valid email address");
    }

    // Date validation
    if (!dob) {
        errors.push("Date of birth is required");
    } else if (!dateRegex.test(dob)) {
        errors.push("Date of birth must use YYYY-MM-DD format");
    } else {
        const date = new Date(dob);

        if (isNaN(date.getTime())) {
            errors.push("Date of birth must be a valid date");
        }
    }

    // Return all validation errors
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
}

module.exports = validateUser;