import React, { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';

import EditorToolbar, { formats, modules } from './quill-editor-toolbar';

import 'react-quill/dist/quill.snow.css';
import './quill-style.css';

interface IQuillEditor {
  defaultValue?: string;
  onChange: (value: string) => void;
}

export function QuillEditor({ onChange, defaultValue = '' }: IQuillEditor) {
  const quillRef = React.createRef<ReactQuill>();
  const [values, setValues] = useState('');

  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="Static Page"
        className="quill-editor unreset"
        value={values}
        modules={modules}
        style={{ minHeight: '400px' }}
        formats={formats}
        onChange={(value: string) => {
          const length = quillRef.current?.getEditor().getText().trim();
          if (!length) {
            onChange('');
            setValues('');
            return;
          }
          setValues(value);
          onChange(value);
        }}
      />
    </>
  );
}
