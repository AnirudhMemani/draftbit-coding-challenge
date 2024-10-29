import { prisma } from "../db";
import { TMarginPaddingSettingsSchema } from "../schema/component.schema";
import { componentInclude } from "../types/component.types";

/**
 * Fetches a component by its unique ID.
 * - Uses Prisma to query the database for the specified component and include additional properties.
 *
 * @param {string} id - The unique identifier of the component.
 * @returns {Promise<object | null>} The component data if found, otherwise null.
 */
export const fetchComponentById = async (id: string) => {
    return await prisma.component.findUnique({
        where: { id },
        include: componentInclude,
    });
};

/**
 * Updates the margin and padding properties of a component.
 * - Checks if the component exists in the database by its ID.
 * - If it exists, updates the specified properties in the component's `marginAndPadding` section.
 *
 * @param {string} id - The unique identifier of the component.
 * @param {TMarginPaddingSettingsSchema} data - The new margin and padding data to update.
 * @returns {Promise<object | null>} The updated component data, or null if the component does not exist.
 */
export const updateComponentPaddingAndMargin = async (id: string, data: TMarginPaddingSettingsSchema) => {
    const componentExists = await prisma.component.findUnique({ where: { id }, select: { id: true } });

    if (!componentExists) {
        return null;
    }

    return await prisma.component.update({
        where: { id },
        data: {
            props: {
                update: {
                    marginAndPadding: {
                        update: {
                            marginTop: data.marginTop?.value ?? undefined,
                            marginBottom: data.marginBottom?.value ?? undefined,
                            marginLeft: data.marginLeft?.value ?? undefined,
                            marginRight: data.marginRight?.value ?? undefined,
                            paddingTop: data.paddingTop?.value ?? undefined,
                            paddingBottom: data.paddingBottom?.value ?? undefined,
                            paddingLeft: data.paddingLeft?.value ?? undefined,
                            paddingRight: data.paddingRight?.value ?? undefined,
                            marginTopUnit: data.marginTop?.unit ?? undefined,
                            marginBottomUnit: data.marginBottom?.unit ?? undefined,
                            marginLeftUnit: data.marginLeft?.unit ?? undefined,
                            marginRightUnit: data.marginRight?.unit ?? undefined,
                            paddingTopUnit: data.paddingTop?.unit ?? undefined,
                            paddingBottomUnit: data.paddingBottom?.unit ?? undefined,
                            paddingLeftUnit: data.paddingLeft?.unit ?? undefined,
                            paddingRightUnit: data.paddingRight?.unit ?? undefined,
                        },
                    },
                },
            },
        },
        include: {
            props: { include: { marginAndPadding: true } },
        },
    });
};
