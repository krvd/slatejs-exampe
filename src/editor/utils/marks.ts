import {
	Editor,
	Transforms,
	Text
} from "slate";

export const BOLD_MARK_KEY = "bold";
export const ITALIC_MARK_KEY = "italic";
export const UNDERLINE_MARK_KEY = "underline";

export function isMarkActive(editor: Editor, mark: string): boolean {
	const [match] = Editor.nodes(editor, { match: n => n[mark] === true });
	return !!match;
}

export function toggleMark(editor: Editor, mark: string) {
	const isActive = isMarkActive(editor, mark);
	Transforms.setNodes(
		editor,
		{ [mark]: isActive ? null : true },
		{ match: Text.isText, split: true }
	);
}
