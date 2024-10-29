import { Router } from "express";
import { getComponentId, getMarginPadding, updateMarginPadding } from "../controllers/component.controller";

/**
 * Router configuration for the Component API routes.
 * - `GET /` - Retrieves a new or existing component ID.
 * - `GET /:id/margin-padding` - Fetches margin and padding settings for a specific component by ID.
 * - `PUT /:id/margin-padding` - Updates margin and padding settings for a specific component by ID.
 *
 * @export componentRouter - The configured Express Router instance.
 */
const componentRouter = Router();

componentRouter.get("/", getComponentId);
componentRouter.get("/:id/margin-padding", getMarginPadding);
componentRouter.put("/:id/margin-padding", updateMarginPadding);

export { componentRouter };
