const fs = require("fs");
const csv = require("csvtojson");

const complainService = require("../services/complain-service");

const FILE106_PATH = "./files/106.csv";

//check if file exists.
const checkFile106 = async () => {
  console.log("checking file");
  const readFile = async () => {
    try {
      console.log("file found: Reading.");
      const data = await csv().fromFile(FILE106_PATH);
      for (item of data) {
        await complainService.addComplain(item);
      }
    } catch (err) {
      console.log("err =>", err);
    }
  };
  fs.access(FILE106_PATH, fs.F_OK, (err) => {
    if (err) {
      console.log("file NOT found checking again soon in 5 seconds");
      return setTimeout(checkFile106, 5000);
    }
    readFile().then(() => {
      console.log("finished everything. Deleting file");
      fs.unlink(FILE106_PATH, (err) => {
        if (err) console.log(err);
        else console.log("File removed");
        //#note not sure if the process should repeat and look for the file again, If so no problem to re-call the function here.
        //setTimeout(checkFile106, 5000);
      });
    });
  });
};

module.exports = { checkFile106 };
