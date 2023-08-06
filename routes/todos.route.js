const { Router, json } = require("express");
const Todo = require("../model/Todos");

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { text, userId } = req.body;
    const todo = await new Todo({
      text,
      owner: userId,
      isCompleted: false,
      isImportant: false,
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const todo = await Todo.find({ owner: userId });
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id });

    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});
router.put("/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.put("/important/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    todo.isImportant = !todo.isImportant;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
