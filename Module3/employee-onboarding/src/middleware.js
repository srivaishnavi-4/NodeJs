import { z } from "zod";


/*
Application-level middleware
*/
export function requestLogger(req, res, next) {

    console.log(
        `${req.method} ${req.originalUrl}`
    );

    next();
}


/*
Application-level middleware

Creates request-specific state
and stores it in res.locals.
*/
export function requestContext(req, res, next) {

    res.locals.requestContext = {
        requestId:
            `REQ-${Date.now()}`,

        receivedAt:
            new Date().toISOString()
    };

    next();
}


/*
Router-level middleware

Checks whether the request
contains an API key.
*/
export function checkApiKey(req, res, next) {

    const apiKey =
        req.headers["x-api-key"];

    if (!apiKey) {

        return next(
            new AppError(
                "API key is required",
                401
            )
        );
    }

    /*
    Store authenticated information
    in res.locals.
    */
    res.locals.user = {
        role: "HR",
        apiKey
    };

    next();
}


/*
Zod validation schema
*/
export const employeeSchema = z.object({

    name: z
        .string()
        .min(3, "Name must contain at least 3 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    department: z
        .string()
        .min(2, "Department is required"),

    age: z
        .number()
        .int()
        .min(18, "Employee must be at least 18")
        .max(60, "Invalid employee age")
});


/*
Validation middleware
*/
export function validateEmployee(req, res, next) {

    const result =
        employeeSchema.safeParse(req.body);

    if (!result.success) {

        return next(
            new AppError(
                "Invalid employee data",
                400,
                result.error.issues
            )
        );
    }

    /*
    Store validated data in res.locals.
    */
    res.locals.employee =
        result.data;

    next();
}


/*
Custom operational error
*/
export class AppError extends Error {

    constructor(
        message,
        statusCode = 500,
        details = null
    ) {

        super(message);

        this.name = "AppError";

        this.statusCode =
            statusCode;

        this.details =
            details;

        this.isOperational = true;
    }
}


/*
Global error-handling middleware
*/
export function errorHandler(
    err,
    req,
    res,
    next
) {

    console.error(
        "ERROR:",
        err.message
    );

    const statusCode =
        err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        message:
            err.isOperational
                ? err.message
                : "Internal server error",

        requestId:
            res.locals
                ?.requestContext
                ?.requestId,

        details:
            err.details || undefined
    });
}