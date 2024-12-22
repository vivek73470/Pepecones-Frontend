import { customEditer } from "../constant";

export const editorConfig = {
  style: customEditer,
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  width: 800,
  maxHeight: 400,
  controls: {
    bold: { command: 'bold', exec: 'bold' },
    italic: { command: 'italic', exec: 'italic' },
    underline: { command: 'underline', exec: 'underline' },
    ul: { command: 'insertUnorderedList', exec: 'insertUnorderedList' }
  }
};
