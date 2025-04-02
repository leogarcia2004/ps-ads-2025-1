import prisma from "../database/client.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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

controller.login = async function (req, res) {
  try {
    // Busca o usuário no BD usando o valor dos campos
    // "username" OU "email"
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: req.body?.username },
          { email: req.body?.email }
        ]
      }
    })

    if(!user) {
      // Se o usuário não existir, retornamos HTTP 404: Not Found
      console.error("Usuário não encontrado")
      return res.status(401).end()
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password)

    if(!passwordIsValid) {
      // Se a senha não for válida, retornamos HTTP 401: Unauthorized
      console.error("Senha inválida")
      return res.status(401).end()
    }

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    )

    res.send({ token,user })
  }
  catch(error) {
    // Se algo de errado acontecer, cairemos aqui
    // Nesse caso, vamos exibir o erro no console e enviar
    // o código HTTP correspondente a erro do servidor
    // HTTP 500: Internal Server Error
    console.error(error)
    res.status(500).end()
  }
}

export default controller;
