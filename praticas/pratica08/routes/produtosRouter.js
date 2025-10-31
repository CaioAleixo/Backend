const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'List of products',
    data: {
      object: 'list',
      total: 0,
      pages: 0,
      limit: 10,
      page: 1
    }
  });
});

module.exports = router;