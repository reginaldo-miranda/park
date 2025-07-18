import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // <-- Executar a função


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
  where:{
    id:req.params.id
  },
  data:{
  name: req.body.name,
  email: req.body.email,     
  age: req.body.age
    }
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

app.listen(3000);

// link https://www.youtube.com/watch?v=PyrMT0GA3sE&t=3317s
