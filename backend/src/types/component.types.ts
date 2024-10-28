import { Prisma } from "@prisma/client";

export const componentInclude = Prisma.validator<Prisma.ComponentInclude>()({
    props: {
        include: { marginAndPadding: true },
    },
});

export type TComponentDetails = Prisma.ComponentGetPayload<{
    select: typeof componentInclude;
}>;
