import React, {MouseEvent} from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

interface StylesProps {
	active?: boolean;
}

interface Props extends StylesProps {
	children: JSX.Element;
	onClick: () => any;
}

const useStyles = makeStyles(theme => ({
	button: {
		color: theme.palette.common.white,
		opacity: (x: StylesProps) => x.active ? 1 : 0.75,
		"&:hover": {
			opacity: 1
		},
		paddingTop: 8,
		paddingBottom: 8
	},
}));

export function ToolbarButton(props: Props) {
	const { children, onClick, ...rest } = props;
	const s = useStyles(rest);

	function clickHandler (e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		onClick();
	}

	return (
		<IconButton
			className={s.button}
			size="small"
			onMouseDown={clickHandler}
		>
			{children}
		</IconButton>
	);
}

ToolbarButton.defaultProps = {
	active: false
};
