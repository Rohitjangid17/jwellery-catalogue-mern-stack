import "../config/env.config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Jeweller Catalogue API",
            version: "1.0.0",
            description: "API Documentation for the Jewellery Catalogue",
        },
        servers: [{
            url:
                process.env.NODE_ENV === "development"
                    ? `http://localhost:${process.env.PORT}${process.env.API_PREFIX}`
                    : `${process.env.PRODUCTION_API_URL}${process.env.API_PREFIX}`
        }],
        components: {
            schemas: {
                Address: {
                    type: "object",
                    properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        state: { type: "string" },
                        zip: { type: "string" },
                        country: { type: "string" },
                    },
                },
                User: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        password: { type: "string" },
                        gender: { type: "string", enum: ["male", "female", "other"] },
                        dob: { type: "string", format: "date" },
                        profile_image: { type: "string" },
                        address: { $ref: "#/components/schemas/Address" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                RegisterInput: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "password123" },
                    },
                },
                LoginInput: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "password123" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/**/*.js"],
}

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
