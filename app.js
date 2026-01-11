const express = require("express");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/users", authRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);