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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToastAlert } from "../contexts/AlertContext";
import { useReducer } from "react";
import TodoReducer from "../reducers/TodoReducer";

const initialTasks = [];
export default function TodoList() {
  const handleOpenToastAlert = useToastAlert();
  const [tasks, dispatch] = useReducer(TodoReducer, initialTasks);
  const [newTask, setNewTask] = React.useState("");
  const [filterState, setFilterState] = React.useState("all");
  const [dialogTask, setDialogTask] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [updatedTodo, setUpdatedTodo] = React.useState({
    title: "",
    description: "",
  });
  function handleFilterChange(e, newFilterState) {
    if (newFilterState !== null) {
      setFilterState(() => newFilterState);
    }
  }
  let TaskstobeRendered = tasks;
  let theme = "#ffe9ed";
  const completedTasks = React.useMemo(() => {
    return tasks.filter((task) => task.completed);
  }, [tasks]);
  const uncompletedTasks = React.useMemo(() => {
    return tasks.filter((task) => !task.completed);
  }, [tasks]);
  if (filterState === "completed") {
    theme = "#eaffe5";
    TaskstobeRendered = completedTasks;
  } else if (filterState === "uncompleted") {
    theme = "#ffe9ed";
    TaskstobeRendered = uncompletedTasks;
  } else {
    theme = "#ffe9ed";
    TaskstobeRendered = tasks;
  }

  const handleCompleteTask = (id) => {
    dispatch({ type: "complete", payload: { Id: id } });
    tasks.map((task) =>
      task.id === id
        ? task.completed
          ? handleOpenToastAlert("Task Uncompleted 🥲")
          : handleOpenToastAlert("Task Completed Successfully 🎉😁")
        : null
    );
  };

  {
    /* Dialogs  Handlers*/
  }

  const ShowDeleteDialog = (todo) => {
    setDialogTask(todo);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const ShowUpdateDialog = (todo) => {
    setDialogTask(todo);
    setUpdatedTodo({
      title: todo.title,
      description: todo.description,
    });
    setOpenUpdateDialog(true);
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleEditTaskClick = () => {
    dispatch({
      type: "update",
      payload: {
        id: dialogTask.id,
        title: updatedTodo.title,
        description: updatedTodo.description,
      },
    });
    handleCloseUpdateDialog();
    handleOpenToastAlert("Task Updated Successfully 😀");
  };
  function handleDeleteClick() {
    dispatch({ type: "delete", payload: dialogTask });
    handleCloseDeleteDialog();
    handleOpenToastAlert("Task Deleted Successfully 😊");
  }
  const Tasks =
    TaskstobeRendered.length === 0 ? (
      <h1
        className="text-center"
        style={{ color: "#aba6a7", fontSize: "2rem" }}
      >
        --No Tasks--
      </h1>
    ) : (
      TaskstobeRendered.map((task) => {
        return (
          <Todo
            key={task.id}
            todo={task}
            theme={task.completed ? "#eaffe5" : "#ffe9ed"}
            Symbol={task.completed ? "✔️" : "📌"}
            showDeleteDialog={ShowDeleteDialog}
            showUpdateDialog={ShowUpdateDialog}
            handleCompleteTask={handleCompleteTask}
          />
        );
      })
    );

  React.useEffect(() => {
    dispatch({ type: "get" });
  }, []);
  const handleAddTask = () => {
    dispatch({ type: "add", payload: { newTitle: newTask } });
    setNewTask("");
    handleOpenToastAlert("Task Added Successfully");
  };

  return (
    <>
      {/* Delete Task Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* update task dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label=""
              placeholder="Title"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label=""
              placeholder="Description"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.description}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, description: e.target.value })
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button onClick={handleEditTaskClick} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Container
        maxWidth="lg"
        style={{ height: "90%", maxHeight: "100vh", overflow: "auto" }}
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
        <Card sx={{ minWidth: 275, borderRadius: "0" }}>
          <CardContent>{Tasks}</CardContent>
        </Card>
        <div
          className="sticky bottom-0 z-50 text-white p-4 bg-white"
          style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.2)" }}
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
    </>
  );
}
