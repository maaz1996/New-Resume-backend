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

const getOneResumeService = async (resumeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundResume = await Profiles.findOne({ user_id: resumeId });
      resolve(foundResume);
    } catch (err) {
      return reject(err);
    }
  });
};
const postResumeService = async (userId, details, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findProfile = await Profiles.findOne({ user_id: userId });
      if (findProfile) {
        resolve("profile_exists");
      } else {
        const newUser = new Profiles({
          details: JSON.stringify(details),
          name,
          userId,
        });
        await newUser.save();
        resolve("saved_user");
      }
    } catch (err) {
      return reject(err);
    }
  });
};
const updateResumeService = async (services, orderId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        return reject("Missing values");
      }
      const findExisitingOrder = await Profiles.findOne({
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
        resolve(await Profiles.findOneAndUpdate(filter, updateObj));
      }
    } catch (err) {
      return reject(err);
    }
  });
};
const deleteResumeService = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Profiles.deleteOne({ _id: orderId });
      resolve("order deleted");
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  getAllResumeService,
  getOneResumeService,
  postResumeService,
  updateResumeService,
  deleteResumeService,
};
