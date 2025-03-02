import prisma from "../config/prisma.js";
import agenda from "./agenda.js";

agenda.define("token-cleanup", async () => {
  try {
    await prisma.tokens.deleteMany({
      where: {
        OR: [{ valid: false }, { expiresAt: { lt: new Date() } }],
      },
    });
    console.log("Token cleaned up successfully")
  } catch (error) {
    console.error("Cleanup Failed", error);
  }
});

agenda.every("1 day", "token-cleanup");
