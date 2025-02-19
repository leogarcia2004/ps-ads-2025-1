import prisma from "../database/client.js";

const controller = {};

controller.create = async (req, res) => {
  try {
    await prisma.customer.create({ data: req.body });
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

export default controller;
