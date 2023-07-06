const express = require("express");
const router = express.Router();
const middleware = require("../config/auth");
const resumeController = require("../controllers/orderController");

router.get("/resume/getall", middleware.auth, resumeController.getAllResume);

router.get(
  "/resume/get/:resumeId",
  middleware.auth,
  resumeController.getOneResume
);

router.post("/resume/post", middleware.auth, resumeController.postResume);

router.put("/resume/update", middleware.auth, resumeController.updateResume);

router.delete("/resume/delete", middleware.auth, resumeController.deleteResume);

module.exports = router;
