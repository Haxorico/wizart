const httpError = require("../model/http-errors");
const Complain = require("../model/complain-model");

const getComplains = async (req, res, next) => {
  const amount = +req.query.NumberOfComplains;
  if (!amount || amount < 1)
    return next(new httpError("NumberOfComplains must be greater than 0", 500));
  //#note: Not sure if should sort by date added or date written so will now sort by date written.
  //if need date added I can add it as a field..
  try {
    //#note: Usually to just get the id I would use that in the projection...
    //however, since we also updaing it I need the _id (from mongodb) so might aswell get all
    //and then on the return just map the id.
    const complains = await Complain.find({ IsBeenCared: false }, "", {
      limit: amount,
      sort: { getTime: 1 },
    });
    //#note this can be checked using other 3rd party libs like 'express-validator'
    //But since this is the one and only time we check for unique.  Didnt add a full external lib for a simple solution
    if (complains.length === 0) return res.json([]);
    //res.json(complains);
    for (let c of complains) {
      c.IsBeenCared = false;
      await c.save();
    }
    res.json(complains.map((c) => c.id));
  } catch (err) {
    console.log(err);
    return next(new httpError("Error fetching complains", 500));
  }
};

module.exports = { getComplains };
