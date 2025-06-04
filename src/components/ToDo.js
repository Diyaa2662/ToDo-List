import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TasksContext } from "../contexts/tasksContext";
// dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
// dialog

export default function ToDo({ task }) {
  const { tasks, setTasks } = useContext(TasksContext);
  const [updatedTodo, setUpdatedTodo] = useState(() => ({
    title: task.title,
    description: task.description,
  }));
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  // evevnt handlers
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleUpdateClick = () => {
    setOpenUpdateDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDialog(false);
  };

  function handleUpdateClose() {
    setOpenUpdateDialog(false);
  }

  function handleConfirmDelete() {
    const updatedtasks = tasks.filter((t) => {
      return task.id !== t.id;
    });
    setTasks(updatedtasks);
    localStorage.setItem("tasks", JSON.stringify(updatedtasks));
  }

  function handleConfirmUpdate() {
    const updatedTask = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          title: updatedTodo.title,
          description: updatedTodo.description,
        };
      } else return t;
    });
    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    setOpenUpdateDialog(false);
  }
  // evevnt handlers

  function handlecheckclick() {
    const updatedtasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.iscomplete = !t.iscomplete;
      }
      return t;
    });
    setTasks(updatedtasks);
    localStorage.setItem("tasks", JSON.stringify(updatedtasks));
  }
  return (
    <>
      {/* delete dialog */}

      <Dialog
        style={{ direction: "rtl" }}
        open={openDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك في حذف المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>إلغاء</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete dialog */}

      {/* update dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={openUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name=""
            label="عنوان المهمة"
            type=""
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name=""
            label="التفاصيل"
            type=""
            fullWidth
            variant="standard"
            value={updatedTodo.description}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إلغاء</Button>
          <Button onClick={handleConfirmUpdate} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* update dialog */}

      <Card
        className="card"
        sx={{ minWidth: 275, background: "#283593", marginTop: 5 }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "right",
                  textDecoration: task.iscomplete ? "line-through" : "none",
                }}
              >
                {task.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {task.description}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <IconButton
                onClick={() => {
                  handlecheckclick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: task.iscomplete ? "white" : "#8bc34a",
                  background: task.iscomplete ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
