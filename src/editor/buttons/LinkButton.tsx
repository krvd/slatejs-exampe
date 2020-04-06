import React from "react";
import { useSlate } from "slate-react";
import { ToolbarButton } from "./ToolbarButton";
import { isLinkActive } from "../utils";

interface Props {
	children: JSX.Element;
	onLinkFound: () => void;
	onLinkNotFound: () => void
}

export function LinkButton(props: Props) {
	const editor = useSlate();
	const { children, onLinkFound, onLinkNotFound } = props;

	function clickHandler() {
		if (isLinkActive(editor)) {
			onLinkFound()
		} else {
			onLinkNotFound()
		}
	}

	return (
		<ToolbarButton active={isLinkActive(editor)} onClick={clickHandler}>
			{children}
		</ToolbarButton>
	);
}
