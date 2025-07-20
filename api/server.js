import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // <-- Executar a função

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  // lista todos

  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

app.put("/usuarios/:id", async (req, res) => {
  // editar um registro

  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  // deletar um registro
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "usuário deletado com sucesso" });
});








//-------------------------- veiculos -----------------------------

app.post("/Veiculos", async (req, res) => {
  await prisma.veiculos.create({
    data: {
      placa: req.body.placa,
      marca: req.body.marca,
      cor: req.body.cor,
    },
  });
  res.status(201).json(req.body);
});

app.get("/Veiculos", async (req, res) => {
  // lista todos

  let users = [];

  if (req.query) {
    users = await prisma.veiculos.findMany({
      where: {
        marca: req.query.marca,
        modelo: req.query.modelo,
        ano: req.query.ano,
        cor: req.query.cor,
        placa: req.query.placa,
      },
    });
  } else {
    users = await prisma.veiculos.findMany();
  }
  res.status(200).json(users);
});

app.put("/Veiculos/:id", async (req, res) => {
  // editar um registro

  await prisma.veiculos.update({
    where: {
      id: req.params.id,
    },
    data: {
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      cor: req.body.cor,
      placa: req.body.placa,
    },
  });
  res.status(201).json(req.body);
});

app.delete("/Veiculos/:id", async (req, res) => {
  // deletar um registro
  await prisma.veiculos.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Veiculo deletado com sucesso" });
});

app.listen(3000);

// link https://www.youtube.com/watch?v=PyrMT0GA3sE&t=3317s



