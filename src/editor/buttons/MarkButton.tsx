import React from "react";
import { useSlate } from "slate-react";
import { ToolbarButton } from "./ToolbarButton";
import {
  isMarkActive,
  toggleMark
} from "../utils";

interface Props {
  children: JSX.Element,
  mark: string
}

export function MarkButton(props: Props) {
  const editor = useSlate();
  const { mark, children } = props;

  return (
    <ToolbarButton
      active={isMarkActive(editor, mark)}
      onClick={() => toggleMark(editor, mark)}
    >
      {children}
    </ToolbarButton>
  );
}
