import React from "react";
import { RenderElementProps } from "slate-react";
import {
	DefaultElement,
	LinkElement
} from "../elements";
import { LINK_KEY } from "./link"

export function renderElement(props: RenderElementProps) {
	const { attributes, children, element } = props;

	switch (element.type) {
		case LINK_KEY:
			return (
				<LinkElement
					{...attributes}
					href={element.url}
				>
					{children}
				</LinkElement>
			);
		default:
			return <DefaultElement {...attributes}>{children}</DefaultElement>;
	}
}
