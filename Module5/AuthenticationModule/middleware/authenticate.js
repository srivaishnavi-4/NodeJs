const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({

                success: false,

                error: "Authorization header is required"

            });

        }


        // Expected:
        // Authorization: Bearer TOKEN

        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                success: false,

                error:
                    "Authorization format must be Bearer <token>"

            });

        }


        const token = parts[1];


        // Verify and decode JWT
        const payload =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Attach payload to request
        req.user = payload;


        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            error: "Invalid or expired token"

        });

    }

};


module.exports = authenticate;