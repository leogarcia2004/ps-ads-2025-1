import prisma from "../database/client.js";

const controller = {};

controller.create = async (req, res) => {
  try {
    await prisma.seller.create({ data: req.body });
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

controller.retrieveAll = async (req, res) => {
  try {
    const result = await prisma.seller.findMany({
      orderBy: [{ fullname: "asc" }],
    });
    res.send(result);
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

controller.retrieveOne = async (req, res) => {
  try {
    const result = await prisma.seller.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (result) res.send(result);
    else res.status(404).end();
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

controller.update = async (req, res) => {
  try {
    await prisma.seller.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(204).end();
  } catch (error) {
    if (error?.code === "P2025") res.status(404).end();
    else res.status(500).end();
    console.error(error);
  }
};

controller.delete = async (req, res) => {
  try {
    await prisma.seller.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).end();
  } catch (error) {
    if (error?.code === "P2025") res.status(404).end();
    else res.status(500).end();
    console.error(error);
  }
};

export default controller;
