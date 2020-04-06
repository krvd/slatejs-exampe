import React from "react";
import { RenderLeafProps } from "slate-react";
import {
  BOLD_MARK_KEY,
  ITALIC_MARK_KEY,
  UNDERLINE_MARK_KEY
} from "./marks"

export function renderLeaf(props: RenderLeafProps) {
  const { attributes, leaf, children } = props;
  let wrappedChildren = children;

  if (leaf[BOLD_MARK_KEY]) {
    wrappedChildren = <strong>{wrappedChildren}</strong>
  }

  if (leaf[ITALIC_MARK_KEY]) {
    wrappedChildren = <em>{wrappedChildren}</em>
  }

  if (leaf[UNDERLINE_MARK_KEY]) {
    wrappedChildren = <ins>{wrappedChildren}</ins>
  }

  return <span {...attributes}>{wrappedChildren}</span>;
}
