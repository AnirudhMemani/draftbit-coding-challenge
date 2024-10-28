import { prisma } from ".";

async function seed() {
    await prisma.component.create({
        data: {
            props: {
                create: {
                    marginAndPadding: {
                        create: {
                            marginBottom: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                            marginRight: 30,
                            marginBottomUnit: "POINTS",
                            paddingBottomUnit: "POINTS",
                            paddingLeftUnit: "PERCENTAGE",
                            marginRightUnit: "POINTS",
                        },
                    },
                },
            },
        },
    });
}

seed()
    .then(() => console.log("Seed completed"))
    .catch((error) => console.error("There was an error when trying to seed the database:", error));
