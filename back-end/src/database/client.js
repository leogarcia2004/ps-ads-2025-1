import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    "query",
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
  if (e.params) {
    console.log("Parameters: " + e.params);
  }
});

export default prisma;
