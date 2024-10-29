import z from "zod";

/**
 * Enum representing the allowed units for margin and padding values.
 * - "POINTS": Represents a unit in points.
 * - "PERCENTAGE": Represents a unit in percentage.
 * - "AUTO": Represents an automatic layout setting where no numerical value is needed.
 */
const UnitEnum = ["POINTS", "PERCENTAGE", "AUTO"] as const;
export type TUnitEnum = (typeof UnitEnum)[number];

/**
 * Set containing units that are allowed to have an empty value.
 * Currently, only the "AUTO" unit is permitted to have an empty (undefined) value.
 */
const ALLOW_EMPTY_VALUE_UNITS = new Set(["AUTO"]);

/**
 * Schema for a value-unit pair representing either a margin or padding property.
 * - `value` (optional): The numerical value of the margin or padding.
 * - `unit`: The unit associated with the margin or padding value, restricted to the UnitEnum types.
 */
const valueUnitPairSchema = z.object({
    value: z.number().optional(),
    unit: z.enum(UnitEnum),
});

/**
 * Schema for validating margin and padding settings in a component.
 * Defines a partial object schema with properties for each margin and padding side:
 * - `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
 * - `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
 * Each property is a value-unit pair validated by `valueUnitPairSchema`.
 *
 * The schema also enforces a custom validation rule:
 * - If a margin or padding unit is specified, a value must also be present (unless the unit is "AUTO").
 */
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
