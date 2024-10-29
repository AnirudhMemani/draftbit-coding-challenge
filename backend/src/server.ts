import cors from "cors";
import "dotenv/config";
import express from "express";
import { componentRouter } from "./routes/component.routes";

/**
 * Sets up and configures the Express application with necessary middleware.
 * - Enables CORS (Cross-Origin Resource Sharing) for security and compatibility.
 * - Configures the app to parse JSON payloads.
 * - Mounts the various routes.
 *
 * @returns {express.Application} The configured Express application instance.
 */
const setupApp = (): express.Application => {
    const app: express.Application = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/v1/component", componentRouter);

    return app;
};

/**
 * Main function to initialize and start the server.
 * - Retrieves the server port from the environment or uses a default port.
 * - Starts listening on the specified port and logs the server URL.
 */
const main = async () => {
    const app = setupApp();
    const port = parseInt(process.env.SERVER_PORT || "12346");
    app.listen(port, () => {
        console.log(`Draftbit Coding Challenge is running at http://localhost:${port}/`);
    });
};

main();
