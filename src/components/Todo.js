import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function Todo({
  todo,
  handleDeleteTask,
  handleEditTask,
  handleCompleteTask,
  theme,
  Symbol,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    description: todo.description,
  });
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const handleClickOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleEditTaskClick = () => {
    handleEditTask(todo.id, updatedTodo.title, updatedTodo.description);
    handleCloseUpdateDialog();
  };
  function handleDeleteClick() {
    handleDeleteTask(todo.id);
    handleCloseDeleteDialog();
  }
  function handleCompleteClick() {
    handleCompleteTask(todo.id);
  }

  return (
    <div>
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
      {/* Task Card */}
      <Card
        className="TodoCard relative z-10"
        sx={{
          minWidth: 275,
          marginTop: "1rem",
          backgroundColor: theme,
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 20,
                  borderRadius: "10px",
                  fontWeight: "bold",
                  textAlign: "left",
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: "#59595c",
                }}
              >
                {todo.title}
                <span
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  &nbsp;{Symbol}
                </span>
              </Typography>

              <Typography
                gutterBottom
                sx={{
                  fontSize: 20,
                  borderRadius: "10px",
                  textAlign: "left",
                  color: "#59595c",
                }}
              >
                {todo.description}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <IconButton
                onClick={() => handleCompleteClick()}
                aria-label="check"
                className="IconButton"
                style={{
                  cursor: "pointer",
                  color: todo.completed ? "white" : "#6dfc71",
                  borderColor: "#6dfc71",
                  border: "1px solid",
                  background: todo.completed ? "#21f947" : "white",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => handleClickOpenUpdateDialog()}
                aria-label="edit"
                className="IconButton"
                style={{
                  cursor: "pointer",
                  color: "#219cf9",
                  borderColor: "#219cf9",
                  border: "1px solid",
                  background: "white",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleClickOpenDeleteDialog()}
                aria-label="delete"
                className="IconButton"
                style={{
                  cursor: "pointer",
                  color: "#ef707d",
                  borderColor: "#ef707d",
                  border: "1px solid",
                  background: "white",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
