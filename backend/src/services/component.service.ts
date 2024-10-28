import { prisma } from "../db";
import { TMarginPaddingSettingsSchema } from "../schema/component.schema";
import { componentInclude } from "../types/component.types";

export const fetchComponentById = async (id: string) => {
    return await prisma.component.findUnique({
        where: { id },
        include: componentInclude,
    });
};

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
