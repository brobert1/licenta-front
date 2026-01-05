import { Button, Modal } from '@components';
import { useDisclosure } from '@hooks';
import { classnames } from '@lib';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import { useCallback, useState } from 'react';
import Input from './Input';

const EditorButton = ({ icon, onClick, isActive, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        isActive && 'bg-primary text-white',
        'button flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-white hover:bg-primary hover:text-white'
      )}
    >
      <i className={icon}></i>
    </Button>
  );
};

const replaceEmptyParagraphsWithBreaks = (html) => {
  return html.replace(/<p><\/p>|<h1><\/h1>|<h2><\/h2>|<h3><\/h3>/g, '<br />');
};

const RichText = ({ placeholder, onChange, value, ...props }) => {
  const { hide, isOpen, show } = useDisclosure();
  const [url, setUrl] = useState('');

  const editor = useEditor({
    extensions: [
      Document,
      BulletList,
      Paragraph,
      Text,
      Bold,
      OrderedList,
      Italic,
      Underline,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        validate: (href) => {
          const urlPattern = /^(https?):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
          return urlPattern.test(href);
        },
      }),
    ],
    content: replaceEmptyParagraphsWithBreaks(value),
    onUpdate({ editor }) {
      const sanitizedContent = replaceEmptyParagraphsWithBreaks(editor.getHTML());
      onChange(sanitizedContent);
    },
    onCreate({ editor }) {
      const sanitizedContent = replaceEmptyParagraphsWithBreaks(editor.getHTML());
      editor.commands.setContent(sanitizedContent);
    },
    immediatelyRender: false,
  });

  const toggleLink = useCallback(() => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      show(true);
    }
  }, [editor]);

  const handleLinkChange = useCallback(() => {
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    hide();
  }, [editor, url]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2" {...props}>
      <div className="flex flex-wrap gap-2">
        <EditorButton
          icon="fa-solid fa-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <EditorButton
          icon="fa-solid fa-italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <EditorButton
          icon="fa-solid fa-underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        />
        <EditorButton
          icon="fa-solid fa-paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
        />
        <EditorButton
          icon="fa-solid fa-h1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        />
        <EditorButton
          icon="fa-solid fa-h2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        />
        <EditorButton
          icon="fa-solid fa-h3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
        />
        <EditorButton
          icon="fa-solid fa-list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        />
        <EditorButton
          icon="fa-solid fa-list-ol"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        />
        <EditorButton
          icon="fa-solid fa-link"
          onClick={toggleLink}
          isActive={editor.isActive('link')}
        />
      </div>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor }) => editor.isActive('link')}
      >
        <div className="flex items-center gap-4 rounded-md bg-white px-4 py-2 text-sm shadow-md">
          <a href={editor.getAttributes('link').href} target="_blank" rel="noreferrer">
            {editor.getAttributes('link').href}
          </a>
          <Button
            className="button primary flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-red-300 bg-red-200 hover:bg-red-300"
            onClick={toggleLink}
          >
            <i className="fa-regular fa-xmark"></i>
          </Button>
        </div>
      </BubbleMenu>
      <EditorContent editor={editor} />
      <Modal isOpen={isOpen} hide={hide} title="Adaugă link">
        <div className="flex flex-col items-center gap-4">
          <Input onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
          <Button className="button full primary" onClick={handleLinkChange}>
            Adaugă
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RichText;
