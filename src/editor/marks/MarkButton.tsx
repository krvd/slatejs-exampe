import React from "react";
import clsx from "clsx";

import { useSlate } from "slate-react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

import { isMarkActive, toggleMark } from "../utils"


const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.common.white,
    opacity: 0.75,
    "&:hover": {
      opacity: 1
    },
    paddingTop: 8,
    paddingBottom: 8
  },
  active: {
    opacity: 1
  }
}));

interface Props {
  children: JSX.Element,
  mark: string
}

export function MarkButton(props: Props) {
  const { mark, children } = props;

  const editor = useSlate();
  const s = useStyles();

  const changeMark = React.useCallback(
    (e) => {
      e.preventDefault();
      toggleMark(editor, mark);
    },
    [mark, editor]
  );

  return (
    <IconButton
      className={clsx(
        s.button,
        isMarkActive(editor, mark) && s.active
      )}
      size="small"
      onMouseDown={changeMark}
    >
      {children}
    </IconButton>
  );
}
