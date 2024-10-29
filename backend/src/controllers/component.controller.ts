import { Request, Response } from "express";
import seed from "../db/seed";
import { MarginPaddingResponseDTO } from "../dto/marginPadding.dto";
import { STATUS_CODE } from "../lib/constants";
import { printLogs } from "../lib/log";
import { marginPaddingSettingsSchema } from "../schema/component.schema";
import { fetchComponentById, updateComponentPaddingAndMargin } from "../services/component.service";

export const getComponentId = async (_req: Request, res: Response) => {
    try {
        const componentId = await seed();

        res.status(STATUS_CODE.OK).json({ componentId });
    } catch (error) {
        printLogs("Error trying to get component ID");
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: "Error fetching component ID" });
    }
};

export const getMarginPadding = async (req: Request, res: Response) => {
    try {
        const componentId = req.params.id;
        const component = await fetchComponentById(componentId);

        if (!component?.props?.marginAndPadding) {
            return res.status(STATUS_CODE.NOT_FOUND).json({ message: "Component or properties not found" });
        }

        const marginPaddingResponseDTO: MarginPaddingResponseDTO = MarginPaddingResponseDTO.toResponse(component);

        res.status(STATUS_CODE.OK).json(marginPaddingResponseDTO);
    } catch (error) {
        printLogs("Error fetching component properties:", error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: "Error fetching properties" });
    }
};

export const updateMarginPadding = async (req: Request, res: Response) => {
    const validationResult = marginPaddingSettingsSchema.safeParse(req.body);

    if (!validationResult.success) {
        const { fieldErrors } = validationResult.error.flatten();

        const formattedErrors = Object.entries(fieldErrors).map(([field, errors]) => ({
            field,
            errors,
        }));

        return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: "Invalid parameters",
            errors: formattedErrors,
        });
    }

    try {
        const componentId = req.params.id;

        const updatedComponent = await updateComponentPaddingAndMargin(componentId, validationResult.data);

        if (updatedComponent === null) {
            return res.status(STATUS_CODE.NOT_FOUND).json({ message: "This component does not exist" });
        }

        res.status(STATUS_CODE.OK).json({
            message: "Component padding and margin updated successfully",
            updatedComponent,
        });
    } catch (error) {
        printLogs("Error updating component:", error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Error updating component",
        });
    }
};
