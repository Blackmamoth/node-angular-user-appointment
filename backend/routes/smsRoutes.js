const { sendApiKeys } = require("../controllers/smsController");
const router = require("express").Router();

router.route("/send").post(sendApiKeys);

module.exports = router;
