const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.route"));

app.use("/api/todo", require("./routes/todos.route"));
async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.t8vfh82.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log("server start on port: " + PORT);
    });
  } catch (erorr) {
    console.error("erorr : " + erorr);
  }
}
start();
