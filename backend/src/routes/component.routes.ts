import { Router } from "express";
import { getComponentId, getMarginPadding, updateMarginPadding } from "../controllers/component.controller";

const componentRouter = Router();

componentRouter.get("/", getComponentId);
componentRouter.get("/:id/margin-padding", getMarginPadding);
componentRouter.put("/:id/margin-padding", updateMarginPadding);

export { componentRouter };
