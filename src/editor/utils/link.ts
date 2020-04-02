import { ReactEditor } from "slate-react";
import { Element, Range, Transforms, Editor } from "slate";

export function wrapLink(editor: ReactEditor, url: string, selection?: Range) {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const link = {
    type: 'link',
    url,
    children: [],
  };

  Transforms.wrapNodes(editor, link, { split: true, at: selection });
  Transforms.collapse(editor, { edge: 'end' });
};

export function unwrapLink(editor: ReactEditor) {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
}

export function isLinkActive(editor: ReactEditor) {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' });
  return !!link;
}

export const withLinks = (editor: ReactEditor) => {
  const { isInline } = editor;

  editor.isInline = (element: Element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  return editor;
};
