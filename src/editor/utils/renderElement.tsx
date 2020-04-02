import React from "react";
import { RenderElementProps } from "slate-react";
import { DefaultElement } from "../elements";

export function renderElement(props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      )
    default:
      return <DefaultElement {...attributes}>{children}</DefaultElement>;
  }
}
