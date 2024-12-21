var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const authenticateToken = require("../middleware/auth");

var router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, "qwer", { expiresIn: "1h" });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/me", authenticateToken, async (req, res) => {
  console.log("UserId: ", req.user.id);
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  res.json(user);
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.trim() } });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    const access_token = jwt.sign({ id: user.id }, "qwer", { expiresIn: "1h" });

    res.json({ user, access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EXAMPLE PROTECTED ROUTE
// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1]; // Получаем токен из заголовка

//   if (!token) {
//     return res.sendStatus(401); // Если токен отсутствует, возвращаем 401
//   }

//   jwt.verify(token, "ваш_секретный_ключ", (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Если токен недействителен, возвращаем 403
//     }
//     req.user = user; // Сохраняем информацию о пользователе в запросе
//     next(); // Переходим к следующему middleware
//   });
// };

// // Пример использования middleware на защищенном маршруте
// router.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "Это защищенный маршрут", user: req.user });
// });
module.exports = router;
