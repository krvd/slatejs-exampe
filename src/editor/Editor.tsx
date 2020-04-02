import React from "react";
import { createEditor, Node, Element } from "slate";
import {
  ReactEditor,
  Editable,
  withReact,
  Slate
} from "slate-react";
import { renderLeaf, renderElement, withLinks } from "./utils"
import { Toolbar } from "./Toolbar";

export interface EditorProps {
  value: Node[];
  onChange: (value: Node[]) => void;
  placeholder?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
}

export function Editor(props: EditorProps) {
  const { value, onChange, ...other } = props;
  const editor = React.useMemo(() => withLinks(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        {...other}
      />
    </Slate>
  );
}

export { Node };
