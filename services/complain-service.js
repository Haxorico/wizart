// const ApiService = require("./api-service");
// const ent_name = "complains";
const httpError = require("../model/http-errors");
const Complain = require("../model/complain-model");

const addComplain = async (complain) => {
  const newComplain = new Complain({
    id: complain.id,
    getTime: complain.getTime,
    IsBeenCared:
      complain.IsBeenCared && complain.IsBeenCared.toLowerCase() === "true",
  });
  //check if id exists.
  const complainExists = await Complain.findOne({ id: complain.id });
  if (complainExists) return; 
  try {
    await newComplain.save();
  } catch (err) {
    throw new httpError("Cannot add item", 500);
  }
};
module.exports = { addComplain };
