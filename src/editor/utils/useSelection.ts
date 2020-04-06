import React from "react";
import { ReferenceObject } from "popper.js";
import {
  ReactEditor,
  useSlate
} from "slate-react";
import {
  Editor,
  Range
} from "slate";

export function useSelection() {
	const editor = useSlate();
	const [referenceObject, setReferenceObject] = React.useState<ReferenceObject>();
	const [prevSelection, setPrevSelection] = React.useState<Range>();

	React.useEffect(() => {
		if (editor.selection)
			setPrevSelection(editor.selection || undefined);

		const domSelection = window.getSelection();

		if (domSelection && domSelection.toString()) {
			const clientBinds = domSelection.getRangeAt(0).getBoundingClientRect();

			setReferenceObject({
				clientWidth: clientBinds.width,
				clientHeight: clientBinds.height,
				getBoundingClientRect: () => clientBinds,
			});
			return;
		}
	}, [editor.selection]);

	return {
		editor,
		prevSelection,
		referenceObject,
		selection: editor.selection,
		isTextSelected: isSlateTextSelected(editor)
	};
}

function isSlateTextSelected(editor: ReactEditor) {
	const { selection } = editor;

	return !!selection
		&& ReactEditor.isFocused(editor)
		&& !Range.isCollapsed(selection)
		&& Editor.string(editor, selection) !== " ";
}

