const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(salt);
    // console.log(hashPassword);
    const user = { user: req.body.name, password: hashPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    res.status(400).send("User not found");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});
app.listen(3000);
