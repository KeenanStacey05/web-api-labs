import "./App.css";
import Task from "./components/Task";
import React, { useState, useEffect } from "react";
import AddTaskForm from "./components/Form";
import { v4 as uuidv4 } from "uuid";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getTasks, addTask, deleteTask, updateTask } from "./api/tasky-api";

function App() {
  const [taskState, setTaskState] = useState({ tasks: [] });

  useEffect(() => {
    getTasks().then((tasks) => {
      setTaskState({ tasks: tasks });
    });
  }, []);

  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    updateTask(tasks[taskIndex]);
    setTaskState({ tasks });
  };

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id);
    setTaskState({ tasks });
  };

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low",
  });

  const formChangeHandler = (event) => {
    let form = { ...formState };

    switch (event.target.name) {
      case "title":
        form.title = event.target.value;
        break;
      case "description":
        form.description = event.target.value;
        break;
      case "deadline":
        form.deadline = event.target.value;
        break;
      case "priority":
        form.priority = event.target.value;
        break;
      default:
        form = formState;
    }
    setFormState(form);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks ? [...taskState.tasks] : [];
    const form = { ...formState };
    const newTask = await addTask(form);
    tasks.push(newTask);
    setTaskState({ tasks });
  };

  console.log(formState);

  return (
    <div>
      <h1>
        <Container component="main">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              backgroundColor: "gray",
              textAlign: "center",
              color: "white",
              padding: "20px",
              margin: "20px 0 40px 0",
              borderRadius: "4px",
            }}
          >
            Tasky
          </Typography>
        </Container>
      </h1>
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          alignItems="flex-start"
          justifyContent="center"
        >
          {taskState.tasks.map((task, index) => (
            <Task
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              done={task.done}
              key={task._id}
              markDone={() => doneHandler(index)}
              deleteTask={() => deleteHandler(index)}
            />
          ))}
        </Grid>
      </Container>

      <Container
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          my: 6,
          py: 6,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
          }}
        >
          <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
