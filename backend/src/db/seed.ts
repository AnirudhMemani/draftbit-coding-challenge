import { prisma } from ".";

export default async function seed() {
    const component = await prisma.component.findFirst({ select: { id: true } });

    if (component) {
        return component.id;
    }

    return await prisma.component
        .create({
            data: {
                props: {
                    create: {
                        marginAndPadding: {
                            create: {
                                marginTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 20,
                                marginRight: 30,
                                marginTopUnit: "POINTS",
                                paddingBottomUnit: "POINTS",
                                paddingLeftUnit: "PERCENTAGE",
                                marginRightUnit: "POINTS",
                                paddingTopUnit: "AUTO",
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
            },
        })
        .then((component) => component.id);
}
