require("dotenv").config();
//to target files in .env

const mongoose = require("mongoose");

const app = require("./app");

const port = 8080;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });
