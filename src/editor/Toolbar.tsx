import React from "react";
import {
	Popper,
	PopperProps,
	ButtonGroup,
	Input
} from "@material-ui/core";
import {
	FormatBold,
	FormatItalic,
	FormatUnderlined,
	Link,
	Close
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
	MarkButton,
	LinkButton
} from "./buttons";
import {
	useSelection,
	createLink,
	removeLink,
	BOLD_MARK_KEY,
	ITALIC_MARK_KEY,
	UNDERLINE_MARK_KEY
} from "./utils";

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.common.black
	},
	input: {
		color: theme.palette.common.white,
		padding: theme.spacing(0.25, 1)
	},
	close: {
		opacity: 0.75,
		cursor: "pointer",
		"&:hover": {
			opacity: 1
		}
	}
}));

export interface ToolbarProps extends Omit<PopperProps, "children" | "open"> {}

export function Toolbar(props: ToolbarProps) {
  const s = useStyles();
  const [link, setLink] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const { editor, isTextSelected, selection, referenceObject, prevSelection } = useSelection();

	React.useEffect(() => {
		if (isTextSelected && referenceObject) {
			setOpen(true);
			return;
		}
		if (link === null) {
			setOpen(false);
		}
	}, [selection, referenceObject, link]);

	function searchInputCloseHandler() {
    if (link) {
      createLink(editor, link, prevSelection);
    }
    setLink(null);
  }

	return (
		<Popper
			className={s.root}
			placement="top"
			anchorEl={referenceObject}
			open={open}
			{...props}
		>
			{link === null ? (
				/* Formatting controls */
				<ButtonGroup variant="text" color="primary">
					<MarkButton mark={BOLD_MARK_KEY}>
						<FormatBold fontSize="small" />
					</MarkButton>
					<MarkButton mark={ITALIC_MARK_KEY}>
						<FormatItalic fontSize="small" />
					</MarkButton>
					<MarkButton mark={UNDERLINE_MARK_KEY}>
						<FormatUnderlined fontSize="small" />
					</MarkButton>
					<LinkButton
						onLinkFound={() => removeLink(editor)}
						onLinkNotFound={() => setLink("")}
					>
						<Link fontSize="small" />
					</LinkButton>
				</ButtonGroup>
			) : (
				/* URL input field */
				<form onSubmit={x => x.preventDefault()}>
					<Input
						className={s.input}
						type="url"
						value={link}
						onChange={x => setLink(x.target.value)}
						endAdornment={
							<Close
								className={s.close}
								fontSize="small"
								onClick={searchInputCloseHandler}
							/>
						}
						placeholder="https://"
						disableUnderline
						fullWidth
						autoFocus
					/>
				</form>
			)}
		</Popper>
	);
}
