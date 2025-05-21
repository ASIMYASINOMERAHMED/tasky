import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";


export default function Todo({
  todo,
  theme,
  Symbol,
  showDeleteDialog,
  showUpdateDialog,
  handleCompleteTask
}) {

  const ShowDeleteDialog = () => {
showDeleteDialog(todo);
  };
const ShowUpdateDialog = () => {
showUpdateDialog(todo);
};

  function handleCompleteClick() {
    handleCompleteTask(todo.id);
  }

  return (
    <div>
    
    
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
                onClick={handleCompleteClick}
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
                onClick={() => ShowUpdateDialog()}
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
                onClick={() => ShowDeleteDialog()}
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
