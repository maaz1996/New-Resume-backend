const { Profiles } = require("../models");
const timeDifference = (date1, date2) => {
  return Math.abs((date1.getTime() - date2.getTime()) / 3600000);
};
const getAllResumeService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let resumes = await Profiles.find({});
      resolve(resumes);
    } catch (err) {
      return reject(err);
    }
  });
};

const getOneProfileService = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundOrder = await Orders.findById(orderId);
      resolve(foundOrder);
    } catch (err) {
      return reject(err);
    }
  });
};
const postOrderService = async (user_id, details, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let createObj = {
        details: JSON.stringify(details),
        name: name,
        user_id: user_id,
        status: "ON",
      };
      console.log(Profiles);
      const response = await Profiles.insert(createObj);
      resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
};
const updateOrderService = async (services, orderId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        return reject("Missing values");
      }
      const findExisitingOrder = await Orders.findOne({
        $and: [
          {
            _id: orderId,
          },
          {
            status: "INCOMPLETE",
          },
        ],
      }).sort({ updatedAt: -1 });
      if (!findExisitingOrder) {
        resolve("No order found");
      }
      const timeDiff = timeDifference(
        new Date(),
        findExisitingOrder?.order_datetime
      );
      if (timeDiff <= 3) {
        resolve("order_exists");
      } else {
        let updateObj = status
          ? {
              status: status,
            }
          : {
              services: services,
            };
        let filter = { _id: orderId };
        resolve(await Orders.findOneAndUpdate(filter, updateObj));
      }
    } catch (err) {
      return reject(err);
    }
  });
};
const deleteOrderService = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Orders.deleteOne({ _id: orderId });
      resolve("order deleted");
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  getAllResumeService,
  getOneProfileService,
  postOrderService,
  updateOrderService,
  deleteOrderService,
};
