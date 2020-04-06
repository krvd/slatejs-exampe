import { ReactEditor } from "slate-react";
import {
	Element,
	Range,
	Transforms,
	Editor
} from "slate";

export const LINK_KEY = "link";

export function createLink(editor: ReactEditor, url: string, selection?: Range) {
	const link = {
		type: LINK_KEY,
		url,
		children: [],
	};

	Transforms.wrapNodes(editor, link, { split: true, at: selection });
}

export function removeLink(editor: ReactEditor) {
	Transforms.unwrapNodes(editor, { match: n => n.type === LINK_KEY });
}

export function isLinkActive(editor: ReactEditor) {
	const [link] = Editor.nodes(editor, { match: n => n.type === LINK_KEY });
	return !!link;
}

export const withLinks = (editor: ReactEditor) => {
	const { isInline } = editor;

	editor.isInline = (element: Element) => {
		return element.type === LINK_KEY ? true : isInline(element);
	};

	return editor;
};
