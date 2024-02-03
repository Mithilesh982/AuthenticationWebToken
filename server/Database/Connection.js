const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const Connection = async () => {
  const username = "Mithilesh09";
  const password = "mithilesh09";
  const clusterName = "cluster1";
  const dbName = "QuntumIt";
  const URL = `mongodb+srv://${username}:${password}@${clusterName}.laahf.mongodb.net/${dbName}`;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });
    console.log(`DataBase Connected Successfully : ${dbName}`);
  } catch (error) {
    console.log("Error while connecting Databse : ", error);
  }
};

module.exports = Connection;
