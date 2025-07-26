import { memo, useCallback, useEffect  } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

import {FaBold, FaItalic, FaListUl, FaListOl, FaUnderline, FaAlignLeft, FaAlignCenter} from "react-icons/fa";


const useContentConverter = () => {
  
  const convertToStrapiFormat = useCallback((tiptapJson) => {
    if (!tiptapJson || !Array.isArray(tiptapJson.content)) {
      return [];
    } 

    const convertNode = (node, parentType = null) => {

      if (!node || !node.type) return null;

      const baseNode = {
        type: node.type,
        children: []
      };

      switch (node.type) {
        case 'heading':
          baseNode.level = node.attrs?.level ?? 1;
          break;
        case 'bulletList':
          baseNode.type = 'list';
          baseNode.format = 'unordered';
          break;
        case 'orderedList':
          baseNode.type = 'list';
          baseNode.format = 'ordered';
          break;
        case 'paragraph':
          if (parentType === 'listItem') {

            if (Array.isArray(node.content)) {
              return node.content.map(child => convertNode(child, node.type)).filter(Boolean);
            }
            return [];
          }
          break;
        case 'listItem':
          baseNode.type = 'list-item';
          if (Array.isArray(node.content)) {
            baseNode.children.push({
              type: "text",
              text: ""
            });
            node.content.forEach(child => {
              if (child.type === 'paragraph') {
                const paragraphContent = convertNode(child, node.type);
                if (Array.isArray(paragraphContent)) {
                  baseNode.children = baseNode.children.concat(paragraphContent);
                } else if (paragraphContent) {
                  baseNode.children.push(paragraphContent);
                }
              } else {
                baseNode.children.push(convertNode(child, node.type));
              }
            });
          }
          break;
        case 'text':
          baseNode.text = node.text ?? '';
          if (Array.isArray(node.marks)) {
            const marks = node.marks.reduce((acc, mark) => {
              switch (mark.type) {
                case 'bold':
                  acc.bold = true;
                  break;
                case 'italic':
                  acc.italic = true;
                  break;
                case 'underline':
                  acc.underline = true;
                  break;
                // no default
              }
              return acc;
            }, {});
            Object.assign(baseNode, marks);
          }
          delete baseNode.children;
          return baseNode;
        // no default
      }

      if (Array.isArray(node.content) && node.type !== 'listItem') {
        baseNode.children = node.content
        .map(child => convertNode(child, node.type))
        .filter(Boolean);
      }

      if (baseNode.children && baseNode.children.length === 0) {
        delete baseNode.children;
      }

      return baseNode;
    };

    return tiptapJson.content.map(node => convertNode(node)).filter(Boolean);
  }, []);

  return { convertToStrapiFormat };
};


const TextEditor = ({ setNewVacancy, saveTextEditor, setEditorLetters, setKeepEitor, savingEditorContent }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
    ],
    content: savingEditorContent || '',
    editorProps: {
      attributes: {
        class: 'ProseMirror',
        style: 'min-height: 200px; height: 200px; overflow-y: auto; overflow-anchor: none;'
      }
    }
  });

  useEffect(() => {
    if (editor) {
      setKeepEitor(editor);
    }
}, [editor, setKeepEitor]);

useEffect(() => {
  if (editor && savingEditorContent) {
      editor.commands.setContent(savingEditorContent);
  }
}, [editor, savingEditorContent]);
 
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = ({ editor }) => {
      const text = editor.getText();
      const charCount = text ? text.length : 0;
      setEditorLetters && setEditorLetters(charCount);
    };

    editor.on('update', handleUpdate);
    
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, setEditorLetters]);

  const { convertToStrapiFormat } = useContentConverter();

  const handleSave = useCallback(() => {
    if (!editor) return;

    try {
      const tiptapJson = editor.getJSON();
      let strapiFormat;

      if (!tiptapJson.content ||
         tiptapJson.content.length === 0 || 
          (tiptapJson.content.length === 1 && 
            tiptapJson.content[0].type === 'paragraph' && 
           (!tiptapJson.content[0].content || tiptapJson.content[0].content.length === 0))
          ) {
            strapiFormat = [{
              type: 'paragraph',
              children: [{
                type: 'text',
                text: 'Їнші вимоги відсутні'
              }],
            },];
      } else {

        strapiFormat = convertToStrapiFormat(tiptapJson);
      }

      setNewVacancy(prev => ({
        ...prev,
        requirements: strapiFormat || []
      }));
    } catch (error) {
      console.error('Помилка конвертації в формат Strapi', error);
    }
  }, [editor, convertToStrapiFormat, setNewVacancy]);

  const preventScroll = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (saveTextEditor) {
      handleSave();
    }
  }, [saveTextEditor, handleSave]);

  return (
    <div className="editor">
      <div className="toolbar">
        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().toggleBold().run()}}
          className={editor?.isActive('bold') ? 'active' : ''}
        >
          <FaBold/>
        </button>
        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().toggleItalic().run()}}
          className={editor?.isActive('italic') ? 'active' : ''}
        >
          <FaItalic/>
        </button>
        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().toggleUnderline().run()}}
          className={editor?.isActive('underline') ? 'active' : ''}
        >
          <FaUnderline />
        </button>
        <select
          value={editor?.getAttributes('heading')?.level || 'paragraph'}
          onChange={(e) => {
            const level = parseInt(e.target.value)
            if (level > 0) {
              editor.chain().focus().toggleHeading({ level }).run()
            } else {
              editor.chain().focus().setParagraph().run()
            }
          }}
        >
          <option value="paragraph">Текст</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
        </select>

        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().toggleBulletList().run()}}
          className={editor?.isActive('bulletList') ? 'active' : ''}
        >
            <FaListUl />
        </button>
        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().toggleOrderedList().run()}}
          className={editor?.isActive('orderedList') ? 'active' : ''}
        >
          <FaListOl />
        </button>
        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().setTextAlign('left').run()}}
          className={editor?.isActive({ textAlign: 'left' }) ? 'active' : ''}
        >
          <FaAlignLeft />
        </button> 
        <button
          onClick={(e) => {
            preventScroll(e);
            editor.chain().focus().setTextAlign('center').run()}}
          className={editor?.isActive({ textAlign: 'center' }) ? 'active' : ''}
        >
          <FaAlignCenter />
        </button>

      </div>
      <EditorContent editor={editor} />
    </div>
  );
};


export default memo(TextEditor);