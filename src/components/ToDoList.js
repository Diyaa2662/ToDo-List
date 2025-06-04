import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { TasksContext } from "../contexts/tasksContext";
import { v4 as uuidv4 } from "uuid";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import ToDo from "./ToDo";

export default function ToDoList() {
  const { tasks, setTasks } = useContext(TasksContext);

  const [titleinput, setTitleinput] = useState("");
  const [displayedTasksType, setDisplayedTasksType] = useState("all");

  const completedTasks = tasks.filter((t) => {
    return t.iscomplete;
  });

  const notCompletedTasks = tasks.filter((t) => {
    return !t.iscomplete;
  });

  let tasksTobeRendered = tasks;
  if (displayedTasksType === "completed") {
    tasksTobeRendered = completedTasks;
  } else if (displayedTasksType === "not-completed") {
    tasksTobeRendered = notCompletedTasks;
  }

  const tasksJSX = tasksTobeRendered.map((t) => {
    return <ToDo key={t.id} task={t} />;
  });

  useEffect(() => {
    console.log("useEffect");
    const storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storageTasks);
  }, [setTasks]);

  function changeDisplayedType(e) {
    setDisplayedTasksType(e.target.value);
  }

  function handleAddClick() {
    const newtask = {
      id: uuidv4(),
      title: titleinput,
      description: "",
      iscomplete: false,
    };
    const updatedTasks = [...tasks, newtask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTitleinput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "90vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography variant="h2">مهامي</Typography>
          <Divider />
          {/* {filter buttons} */}
          <ToggleButtonGroup
            value={displayedTasksType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            style={{ direction: "ltr", marginTop: "30px" }}
          >
            <ToggleButton value="not-completed">غير منجز</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* {tasks todo} */}
          {tasksJSX}
          {/* {tasks todo} */}
          {/* add tasks */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={8}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleinput}
                onChange={(e) => {
                  setTitleinput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={4}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Button
                style={{ width: "100%", height: "100%", fontSize: "20px" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleinput.length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/* add tasks */}
        </CardContent>
      </Card>
    </Container>
  );
}
