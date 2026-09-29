// Convert one CSV row into an employee object
export function createEmployee(row) {
    return {
        Education: row[0],
        JoiningYear: Number(row[1]),
        City: row[2],
        PaymentTier: Number(row[3]),
        Age: Number(row[4]),
        Gender: row[5],
        EverBenched: row[6],
        ExperienceInCurrentDomain: Number(row[7]),
        LeaveOrNot: Number(row[8])
    };
}


// Filter using column values
export function matchesFilter(employee, filters) {

    // Column: City
    if (
        filters.city &&
        employee.City.toLowerCase() !== filters.city.toLowerCase()
    ) {
        return false;
    }

    // Column: Education
    if (
        filters.education &&
        employee.Education.toLowerCase() !==
        filters.education.toLowerCase()
    ) {
        return false;
    }

    // Column: Gender
    if (
        filters.gender &&
        employee.Gender.toLowerCase() !==
        filters.gender.toLowerCase()
    ) {
        return false;
    }

    // Column: PaymentTier
    if (
        filters.paymentTier &&
        employee.PaymentTier !== Number(filters.paymentTier)
    ) {
        return false;
    }

    // Column: Age
    if (
        filters.maxAge &&
        employee.Age > Number(filters.maxAge)
    ) {
        return false;
    }

    // Column: Experience
    if (
        filters.minExperience &&
        employee.ExperienceInCurrentDomain <
        Number(filters.minExperience)
    ) {
        return false;
    }

    // Column: LeaveOrNot
    if (
        filters.leave !== undefined &&
        employee.LeaveOrNot !== Number(filters.leave)
    ) {
        return false;
    }

    return true;
}