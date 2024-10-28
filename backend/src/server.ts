import cors from "cors";
import "dotenv/config";
import express from "express";
import { componentRouter } from "./routes/component.routes";

const setupApp = (): express.Application => {
    const app: express.Application = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/v1/component", componentRouter);

    return app;
};

const main = async () => {
    const app = setupApp();
    const port = parseInt(process.env.SERVER_PORT || "12346");
    app.listen(port, () => {
        console.log(`Draftbit Coding Challenge is running at http://localhost:${port}/`);
    });
};

main();
