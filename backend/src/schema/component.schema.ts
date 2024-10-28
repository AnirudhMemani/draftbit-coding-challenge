import z from "zod";

const UnitEnum = ["POINTS", "PERCENTAGE", "AUTO"] as const;
export type TUnitEnum = (typeof UnitEnum)[number];

const ALLOW_EMPTY_VALUE_UNITS = new Set(["AUTO"]);

const valueUnitPairSchema = z.object({
    value: z.number().optional(),
    unit: z.enum(UnitEnum),
});

export const marginPaddingSettingsSchema = z
    .object({
        paddingTop: valueUnitPairSchema,
        paddingBottom: valueUnitPairSchema,
        paddingLeft: valueUnitPairSchema,
        paddingRight: valueUnitPairSchema,
        marginTop: valueUnitPairSchema,
        marginBottom: valueUnitPairSchema,
        marginLeft: valueUnitPairSchema,
        marginRight: valueUnitPairSchema,
    })
    .partial()
    .refine(
        (data) => {
            const isValueUnitPairValid = (value?: number, unit?: TUnitEnum) => {
                if (unit && ALLOW_EMPTY_VALUE_UNITS.has(unit)) {
                    return true;
                }

                return value !== undefined && unit !== undefined;
            };

            return [
                isValueUnitPairValid(data.marginTop?.value, data.marginTop?.unit),
                isValueUnitPairValid(data.marginBottom?.value, data.marginBottom?.unit),
                isValueUnitPairValid(data.marginLeft?.value, data.marginLeft?.unit),
                isValueUnitPairValid(data.marginRight?.value, data.marginRight?.unit),
                isValueUnitPairValid(data.paddingTop?.value, data.paddingTop?.unit),
                isValueUnitPairValid(data.paddingBottom?.value, data.paddingBottom?.unit),
                isValueUnitPairValid(data.paddingLeft?.value, data.paddingLeft?.unit),
                isValueUnitPairValid(data.paddingRight?.value, data.paddingRight?.unit),
            ].every(Boolean);
        },
        {
            message:
                "If a margin or padding value is provided, its unit must also be provided, except when the unit is 'AUTO'",
        }
    );

export type TMarginPaddingSettingsSchema = z.infer<typeof marginPaddingSettingsSchema>;
