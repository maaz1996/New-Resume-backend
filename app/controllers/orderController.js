const {
  getAllResumeService,
  getOneOrderService,
  postOrderService,
  updateOrderService,
  deleteOrderService,
} = require("../services/orderServices");
const { HttpStatusCode } = require("../enums/httpStatus");

const getAllResume = async (req, res) => {
  try {
    const response = await getAllResumeService();
    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "All Resumes Fetched Successfully",
      data: response,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in fetching all orders!. Please try again later!",
    });
  }
};
const getOneResume = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const response = await getOneOrderService(orderId);
    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Order Fetched Successfully!",
      data: response,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in fetching order!. Please try again later!`",
    });
  }
};

const postOrder = async (req, res) => {
  try {
    const { services, totalfee } = req.body;
    const response = await postOrderService(services, totalfee);
    if (response == "order_exists") {
      res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: "Order Request already exists, Please try after sometime!",
        data: "NA",
      });
    } else {
      res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: "Order posted Successfully!`",
        data: response,
      });
    }
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in posting order!. Please try again later!",
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { services, orderId, status } = req.body;
    const response = await updateOrderService(services, orderId, status);
    if (response == "order_exists") {
      res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: "Order Request already exists, Please try after sometime!",
        data: "NA",
      });
    } else {
      res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: "Order posted Successfully!`",
        data: response,
      });
    }
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in posting order!. Please try again later!",
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const response = await deleteOrderService(orderId);
    if (response == "order_exists") {
      res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: "Order Request already exists, Please try after sometime!",
        data: "NA",
      });
    } else {
      res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: "Order posted Successfully!`",
        data: response,
      });
    }
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in posting order!. Please try again later!",
    });
  }
};
module.exports = {
  getAllResume,
  getOneResume,
  postOrder,
  updateOrder,
  deleteOrder,
};
