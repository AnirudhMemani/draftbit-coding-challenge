import { Router } from "express";
import { getMarginPadding, updateMarginPadding } from "../controllers/component.controller";

const componentRouter = Router();

componentRouter.get("/:id/margin-padding", getMarginPadding);

componentRouter.put("/:id/margin-padding", updateMarginPadding);

export { componentRouter };
