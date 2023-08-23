import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState, KeyboardEvent } from "react";

export type AddItemFormPropsType = {
  addItemFunc: (name: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const { addItemFunc } = props;

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const addTask = () => {
    const taskTitle = newTaskTitle.trim();
    if (!taskTitle) {
      setError("Field is required");
      return;
    }
    addItemFunc(taskTitle);
    setNewTaskTitle("");
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="New task title"
        value={newTaskTitle}
        onKeyDown={onInputKeyDown}
        onChange={onChangeHandler}
        error={Boolean(error)}
        helperText={error}
      />
      <IconButton onClick={addTask} color="primary">
        <ControlPoint/>
      </IconButton>
    </div>
  );
}
