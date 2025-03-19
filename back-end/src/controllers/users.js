import prisma from "../database/client.js";
import bcrypt from "bcrypt";
const controller = {};

controller.create = async (req, res) => {
  try {
    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12);

    await prisma.user.create({ data: req.body });
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

controller.retrieveAll = async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      orderBy: [{ fullname: "asc" }],
    });
    res.send(result);
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

controller.retrieveOne = async (req, res) => { // Padrão esse modelo de função
  try {
    const result = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if(result) res.send(result);
    else res.status(404).end();

  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
}

controller.update = async (req, res) => {
  try {

    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12);
    await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(204).end();
  } catch (error) {

    if(error?.code === "P2025") res.status(404).end();
    else res.status(404).end();
    console.error(error);
  }
}

controller.delete = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).end();
  } catch (error) {
    if(error?.code === "P2025") res.status(404).end();
    else res.status(404).end();
    console.error(error);
  }
}

export default controller;
