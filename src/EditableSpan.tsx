import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export type EditableSpanType = {
  title: string;
  onChangeTitle: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanType) {
  const { title, onChangeTitle } = props;

  const [editMode, setEditMode] = useState(false);
  const [titleState, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChangeTitle(titleState);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={titleState}
      onBlur={activateViewMode}
      onChange={onChangeHandler}
      variant="standard"
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
}
