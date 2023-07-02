const express = require("express");
const router = express.Router();
const middleware = require("../config/auth");
const resumeController = require("../controllers/orderController");

router.get("/orders/getall", middleware.auth, resumeController.getAllOrders);

router.get(
  "/orders/get/:orderId",
  middleware.auth,
  resumeController.getOneOrder
);

router.post("/orders/post", middleware.auth, resumeController.postOrder);

router.put("/orders/update", middleware.auth, resumeController.updateOrder);

router.delete("/orders/delete", middleware.auth, resumeController.deleteOrder);

module.exports = router;
