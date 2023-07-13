const {
  getAllResumeService,
  getOneResumeService,
  postResumeService,
  updateResumeService,
  deleteResumeService,
  testResumeService,
} = require("../services/resumeServices");
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
    const resumeId = req.params.resumeId;
    const response = await getOneResumeService(resumeId);
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
const postResume = async (req, res) => {
  try {
    const { user_id, details, name } = req.body;
    const response = await postResumeService(user_id, details, name);
    let finalResponse, statusCode, finalStatus, finalData;
    if (response == "profile_exists") {
      (finalResponse = "Profile already Exists!"),
        (statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY),
        (finalStatus = false);
    } else {
      (finalResponse = "Order posted Successfully!"),
        (statusCode = HttpStatusCode.SUCCESS),
        (finalStatus = true),
        (finalData = response);
    }
    res.status(statusCode).json({
      success: finalStatus,
      message: finalResponse,
      data: finalData,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in posting order!. Please try again later!",
    });
  }
};
const updateResume = async (req, res) => {
  try {
    const { services, orderId, status } = req.body;
    const response = await updateResumeService(services, orderId, status);
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
const deleteResume = async (req, res) => {
  try {
    const { orderId } = req.body;
    const response = await deleteResumeService(orderId);
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
const testResume = async (req, res) => {
  try {
    const { orderId } = req.body;
    const response = await testResumeService(orderId);

    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Order posted Successfully!`",
      data: response,
    });
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
  postResume,
  updateResume,
  deleteResume,
  testResume,
};
