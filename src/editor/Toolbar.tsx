import React from "react";
import {
  Popper,
  PopperProps,
  ButtonGroup,
  IconButton,
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

import { MarkButton } from "./marks";
import { useSelection, wrapLink } from "./utils";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.common.black
  },
  button: {
    color: theme.palette.common.white,
    opacity: 0.75,
    "&:hover": {
      opacity: 1
    },
    paddingTop: 8,
    paddingBottom: 8
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
  const [link, setLink] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const { editor, isTextSelected, selection, referenceObject, prevSelection } = useSelection();
  const s = useStyles();

  React.useEffect(() => {
    if (isTextSelected && referenceObject) {
      setOpen(true);
      return;
    }

    if (link === null) {
      setOpen(false);
    }
  }, [selection, referenceObject]);

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
          <MarkButton mark="bold">
            <FormatBold fontSize="small"/>
          </MarkButton>
          <MarkButton mark="italic">
            <FormatItalic fontSize="small"/>
          </MarkButton>
          <MarkButton mark="underline">
            <FormatUnderlined fontSize="small"/>
          </MarkButton>
          <IconButton
            className={s.button}
            size="small"
            onClick={() => setLink("")}
          >
            <Link fontSize="small"/>
          </IconButton>
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
                onClick={() => {

                  wrapLink(editor, link, prevSelection)
                  setLink(null)
                }}
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
