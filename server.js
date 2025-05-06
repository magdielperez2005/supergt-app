const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos en Render (PostgreSQL)
const db = new Pool({
    user: "supergt_db_user",
    host: "dpg-d03gvgali9vc73flerq0-a.oregon-postgres.render.com",
    database: "supergt_db",
    password: "8J5CggUkUrYr7ATEZkEwCU9IBtQ2O16a",
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

// Ruta para recibir datos del formulario
app.post("/comprar", async (req, res) => {
    const { nombre, telefono, direccion, total } = req.body;

    if (!nombre || !telefono || !direccion || !total) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    try {
        await db.query(
            "INSERT INTO compras (nombre, telefono, direccion, total) VALUES ($1, $2, $3, $4)",
            [nombre, telefono, direccion, total]
        );
        res.status(200).send("Compra guardada exitosamente");
    } catch (err) {
        console.error("Error al guardar:", err);
        res.status(500).send("Error en el servidor");
    }
});

// Puerto dinámico para Render o local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
