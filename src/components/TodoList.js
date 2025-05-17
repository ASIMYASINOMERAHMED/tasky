import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AnimatedText from "./ui/animated-text";
import Divider from "@mui/material/Divider";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { v4 as uuidv4 } from "uuid";
const initialTasks = [
  {
    id: uuidv4(),
    title: "Task 1",
    description: "Description for Task 1",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Task 2",
    description: "Description for Task 2",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Task 3",
    description: "Description for Task 3",
    completed: false,
  },
];
export default function TodoList() {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [newTask, setNewTask] = React.useState("");
  const [filterState, setFilterState] = React.useState("all");
  function handleFilterChange(e, newFilterState) {
    if (newFilterState !== null) {
      setFilterState(() => newFilterState);
    }
  }
  let TaskstobeRendered = tasks;
  let theme = "#ffe9ed";
  if(filterState === "completed"){
    theme = "#eaffe5";
    TaskstobeRendered = tasks.filter((task) => task.completed);
  }else if(filterState === "uncompleted"){
    theme = "#ffe9ed";
    TaskstobeRendered = tasks.filter((task) => !task.completed);
  }
  else{
    theme = "#ffe9ed";
    TaskstobeRendered = tasks;
  }
  const handleDeleteTask = (id) => {
    const updatedTodo = tasks.filter((task) => task.id !== id);
    setTasks(updatedTodo);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodo));
  };
  const handleEditTask = (id, title, description) => {
    const updatedTodo = tasks.map((task) =>
      task.id === id
        ? { ...task, title: title, description: description }
        : task
    );
    setTasks(updatedTodo);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodo));
  };
  const handleCompleteTask = (id) => {
    const updatedTodo = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTodo);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodo));
  };

  const Tasks =
    TaskstobeRendered.length === 0 ? (
      <h1 className="text-center" style={{color:"#aba6a7" , fontSize:"2rem"}}>--No Tasks--</h1>
    ) : (
      TaskstobeRendered.map((task) => {
        return (
          <Todo
            key={task.id}
            todo={task}
            theme= {task.completed ? "#eaffe5" : "#ffe9ed"}
            Symbol={task.completed ? "✔️" : "📌"}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleCompleteTask={handleCompleteTask}
          />
        );
      })
    );

  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("TodoList"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
  const handleAddTask = () => {
    if(newTask === "") return;
    const newTodo = {
      id: uuidv4(),
      title: newTask,
      description: "",
      completed: false,
    };

    setTasks([...tasks, newTodo]);
    localStorage.setItem("TodoList", JSON.stringify([...tasks, newTodo]));
    setNewTask("");
  };

  return (
    <Container
      maxWidth="lg"
      style={{ height: "90%", maxHeight: "100vh", overflow: "auto"}}
    >
      <div
        className="sticky top-0 bg-white z-50 text-white p-4"
        style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.2)" }}
      >
        <Typography
          gutterBottom
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <AnimatedText
            text="Tasky🎯"
            className="text-4xl md:text-6xl font-bold mb-6 text-sky-500"
          />
      
        </Typography>
        <Typography
          gutterBottom
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#aba6a7",
          }}
        >
          simple tasks and Notes tracker
        </Typography>
        <Divider variant="middle" />
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <ToggleButtonGroup
            value={filterState}
            exclusive
            onChange={handleFilterChange}
            aria-label="filter"
            color="primary"
          >
            <ToggleButton value="all" aria-label="all">
              <h2>All</h2>
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed">
              <h2>Completed</h2>
            </ToggleButton>
            <ToggleButton value="uncompleted" aria-label="uncompleted">
              <h2>Uncompleted</h2>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <Card sx={{ minWidth: 275 , borderRadius:"0"}}>
        <CardContent>{Tasks}</CardContent>
      </Card>
      <div
        className="sticky bottom-0 z-50 text-white p-4 bg-white"
        style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.2)"}}
      >
        <Grid container spacing={2}>
          <Grid
            size={8}
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Task"
              variant="outlined"
              placeholder="Add a new task"
              style={{ width: "100%" }}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Grid>
          <Grid
            size={4}
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={() => handleAddTask()}
              disabled={newTask === ""}
            >
              <AddIcon /> &nbsp; Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
