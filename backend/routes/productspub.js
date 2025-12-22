const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  console.log('DEBUG: GET /products');
  db.query('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('ERROR GET PRODUCTS PUBLIC:', err);
      return res.status(500).json({ error: String(err) });
    }

    const products = (rows || []).map(p => {
      let media = [];
      try { media = p.media ? JSON.parse(p.media) : []; } catch(e) { media = (p.media||'').split(',').map(s=>s.trim()).filter(Boolean); }
      let colors = [];
      try { colors = p.colors ? JSON.parse(p.colors) : (p.colors||'').split(',').map(s=>s.trim()).filter(Boolean); } catch(e){ colors = []; }
      let sizes = [];
      try { sizes = p.sizes ? JSON.parse(p.sizes) : (p.sizes||'').split(',').map(s=>s.trim()).filter(Boolean); } catch(e){ sizes = []; }

      return {
        ...p,
        media,
        colors,
        sizes
      };
    });

    res.json(products);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('DEBUG: GET /products/' + id);
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error('ERROR GET PRODUCT PUBLIC:', err);
      return res.status(500).json({ error: String(err) });
    }
    if (!rows || rows.length === 0) return res.status(404).json({ message: 'Product not found' });

    const p = rows[0];
    let media = [];
    try { media = p.media ? JSON.parse(p.media) : []; } catch(e) { media = (p.media||'').split(',').map(s=>s.trim()).filter(Boolean); }
    let colors = [];
    try { colors = p.colors ? JSON.parse(p.colors) : (p.colors||'').split(',').map(s=>s.trim()).filter(Boolean); } catch(e){ colors = []; }
    let sizes = [];
    try { sizes = p.sizes ? JSON.parse(p.sizes) : (p.sizes||'').split(',').map(s=>s.trim()).filter(Boolean); } catch(e){ sizes = []; }

    const product = { ...p, media, colors, sizes };
    res.json(product);
  });
});

module.exports = router;