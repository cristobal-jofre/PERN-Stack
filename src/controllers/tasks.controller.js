const pool = require("../database");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]); // task with id

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found ",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO task (title, description) values($1,$2) RETURNING *",
      [title, description]
    );
    res.json(rows);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const result = await pool.query(
    "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Task not found" });

  return res.json(result.rows[0]);
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]); // task we want to delete with the id
    const { rows } = result;

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Task not found ",
      });
    }
    return res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
