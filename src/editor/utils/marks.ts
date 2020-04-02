import { Editor, Transforms, Text } from "slate"

export function isMarkActive(editor: Editor, mark: string): boolean {
  const [match] = Editor.nodes(editor, {
    match: n => n[mark] === true,
    mode: 'all',
  });
  return !!match;
}

export function toggleMark(editor: Editor, mark: string) {
  const isActive = isMarkActive(editor, mark);
  Transforms.setNodes(
    editor,
    { [mark]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}
