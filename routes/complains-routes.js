const { Router } = require("express");
const complainControllers = require('../controllers/complain-controller');
const router = Router();

router.get("/", complainControllers.getComplains);

module.exports = router;
