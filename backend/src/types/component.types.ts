import { Prisma } from "@prisma/client";

/**
 * Specifies the fields to include in queries for the `Component` model.
 *
 * - `props`: Includes related properties of the component.
 * - `marginAndPadding`: Ensures that `marginAndPadding` fields are included within `props` for each component retrieved.
 */
export const componentInclude = Prisma.validator<Prisma.ComponentInclude>()({
    props: {
        include: { marginAndPadding: true },
    },
});

/**
 * Type definition for `Component` details.
 *
 * - This type uses the `componentInclude` selection criteria to include specific fields in the
 *   `Component` model's query payload.
 * - Used to ensure type-safe access to selected properties, such as `props` and `marginAndPadding`.
 */
export type TComponentDetails = Prisma.ComponentGetPayload<{
    select: typeof componentInclude;
}>;
