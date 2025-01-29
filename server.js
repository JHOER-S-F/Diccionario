const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;


app.use(cors());

// Middleware para parsear JSON
app.use(express.json());


app.get('/api/concepto', (req, res) => {
  const query = 'SELECT * FROM concepto';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al obtener los conceptos:', err);
          return res.status(500).json({ error: 'Error al obtener los conceptos' });
      }
      res.json(results);
  });
});


app.post('/concepto', (req, res) => {
    const { concepto, descripcion, imagen, colaborador } = req.body;


    if (!concepto || !descripcion || !colaborador) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const query = 'INSERT INTO concepto (CONCEPTO, DESCRIPCION, IMAGEN, COLABORADOR) VALUES (?, ?, ?, ?)';
    db.query(query, [concepto, descripcion, imagen, colaborador], (err, results) => {
        if (err) {
            console.error('Error al guardar el concepto:', err);
            return res.status(500).json({ mensaje: 'Error al guardar el concepto' });
        }
        res.status(201).json({ mensaje: 'MUCHAS GRACIAS POR SU APORTE', id: results.insertId });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
