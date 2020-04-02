import React from "react";
import { RenderLeafProps } from "slate-react";

export function renderLeaf(props: RenderLeafProps) {
  const { attributes, leaf, children } = props;
  let wrappedChildren = children;

  if (leaf.bold) {
    wrappedChildren = <strong>{wrappedChildren}</strong>
  }

  if (leaf.italic) {
    wrappedChildren = <em>{wrappedChildren}</em>
  }

  if (leaf.underline) {
    wrappedChildren = <ins>{wrappedChildren}</ins>
  }

  return <span {...attributes}>{wrappedChildren}</span>;
}
