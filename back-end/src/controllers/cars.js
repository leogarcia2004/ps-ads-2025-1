import prisma from "../database/client.js";
import Car from "../models/Car.js";
import { ZodError } from 'zod'

const controller = {};

controller.create = async (req, res) => {
  try {
    if(req.body.selling_date) req.body.selling_date = new Date(req.body.selling_date)
    
    // Executa a validação do modelo do Zod para os
    // dados que vieram em req.body
    Car.parse(req.body)

    // Dentro do parâmetro req (requisição), haverá
    // um objeto chamado "body" que contém as informações
    // que queremos armazenar do BD. Então, invocamos o
    // Prisma para fazer a interface com o BD, repassando
    // o req.body
    await prisma.car.create({ data: req.body });
    res.status(201).end();
  } catch (error) {
    if(error instanceof ZodError) res.status(422).send(error.issues)
    else res.status(500).end()
  }
};

controller.retrieveAll = async (req, res) => {
  try {
    const result = await prisma.car.findMany({
      orderBy: [{ model: "asc" }],
    });
    res.send(result);
  } catch (error) {
    res.status(500).end();
    console.error(error);
  }
};

controller.retrieveOne = async (req, res) => { // Padrão esse modelo de função
  try {
    const result = await prisma.car.findUnique({
      where: { id: Number(req.params.id) },
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
    if(req.body.selling_date) req.body.selling_date = new Date(req.body.selling_date)
    Car.parse(req.body)
    await prisma.car.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(204).end();
  } catch (error) {

    if(error?.code === "P2025") res.status(404).end();
    else if(error instanceof ZodError) res.status(422).send(error.issues)
    else res.status(500).end()
    console.error(error);
  }
}

controller.delete = async (req, res) => {
  try {
    await prisma.car.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).end();
  } catch (error) {
    if(error?.code === "P2025") res.status(404).end();
    else res.status(404).end();
    console.error(error);
  }
}

export default controller;
