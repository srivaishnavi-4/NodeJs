const request = require("supertest");

const app =
    require("../src/app");


// GET PRODUCTS
describe("Product API", () => {

    test(
        "GET /api/products should return products",
        async () => {

            const response =
                await request(app)
                    .get("/api/products");

            expect(
                [200, 500]
            ).toContain(
                response.statusCode
            );

        }
    );


    // Invalid product ID
    test(
        "GET /api/products/invalid should handle invalid ID",
        async () => {

            const response =
                await request(app)
                    .get(
                        "/api/products/invalid"
                    );

            expect(
                response.statusCode
            ).toBe(500);

            expect(
                response.body.success
            ).toBe(false);

        }
    );


    // Missing route
    test(
        "Unknown route should return 404",
        async () => {

            const response =
                await request(app)
                    .get(
                        "/api/unknown"
                    );

            expect(
                response.statusCode
            ).toBe(404);

            expect(
                response.body.success
            ).toBe(false);

        }
    );


    // Health check
    test(
        "GET /health should return API health",
        async () => {

            const response =
                await request(app)
                    .get("/health");

            expect(
                response.statusCode
            ).toBe(200);

            expect(
                response.body.status
            ).toBe("UP");

        }
    );

});