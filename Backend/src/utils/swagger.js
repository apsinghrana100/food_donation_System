// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FOOD DONATION API ",
      version: "1.0.0",
      description: "API documentation for your Node.js backend",
    },
    servers: [
      {
        url: "http://localhost:5000", // Your base URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

export default  swaggerDocs ;
