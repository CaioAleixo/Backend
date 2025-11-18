const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const router = express.Router();

const swaggerPath = path.join(__dirname, '..', 'swagger.yaml');
const file = fs.readFileSync(swaggerPath, 'utf8');
const swaggerDocument = YAML.parse(file);

router.use('/', swaggerUI.serve);
router.get('/', (req, res) => {
  return res.send(swaggerUI.setup(swaggerDocument)(req, res));
});

module.exports = router;