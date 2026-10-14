"use client";

import { apiRequest } from "@/lib/api";
import { EditorContent, useEditor } from "@tiptap/react";
import { Editor, Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Bold, Heading2, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Redo2, Table2, Undo2 } from "lucide-react";
import { ChangeEvent, DragEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { toast } from "sonner";

type NewsRichTextEditorProps = {
  initialContent: string;
  onChange: (html: string) => void;
  kind?: "news" | "blog";
};

type UploadResponse = { data: { url: string } };

export type NewsRichTextEditorHandle = {
  uploadPendingImages: () => Promise<string>;
  setEditable: (editable: boolean) => void;
};

const ImageGallery = Node.create({
  name: "imageGallery",
  group: "block",
  content: "image+",
  isolating: true,
  draggable: true,
  addAttributes() {
    return {
      columns: {
        default: 2,
        parseHTML: (element) => Number(element.getAttribute("data-columns")) || 2,
        renderHTML: (attributes) => ({ "data-columns": attributes.columns }),
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-image-gallery]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-image-gallery": "true" }), 0];
  },
});

const ArticleImage = ImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 100,
        parseHTML: (element) => Number(element.getAttribute("data-width")) || 100,
        renderHTML: (attributes) => ({ "data-width": attributes.width }),
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => ({ "data-align": attributes.align }),
      },
    };
  },
});

const NewsRichTextEditor = forwardRef<NewsRichTextEditorHandle, NewsRichTextEditorProps>(
function NewsRichTextEditor({ initialContent, onChange, kind = "news" }, ref) {
  const fileInput = useRef<HTMLInputElement>(null);
  const imageUploadMode = useRef<"single" | "gallery">("single");
  const galleryColumns = useRef(2);
  const pendingFiles = useRef(new Map<string, File>());
  const objectUrls = useRef(new Set<string>());
  const [uploading, setUploading] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      ArticleImage.configure({ allowBase64: false }),
      ImageGallery,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML()),
    editorProps: {
      attributes: {
        class: "news-editor-content min-h-72 w-full px-4 py-3 outline-none",
        "aria-label": "News article body",
      },
    },
  });

  const insertImages = (files: File[]) => {
    if (!editor) return;
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (!images.length) {
      toast.error("Choose a JPG, PNG, WebP, or GIF image");
      return;
    }
    if (images.some((file) => !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      toast.error("Images must be JPG, PNG, WebP, or GIF and no larger than 10 MB");
      return;
    }

    const nodes = images.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.current.add(url);
      pendingFiles.current.set(url, file);
      return {
        type: "image",
        attrs: { src: url, alt: file.name, width: 100, align: "center" },
      };
    });
    if (imageUploadMode.current === "gallery" && nodes.length > 1) {
      editor.chain().focus().insertContent({
        type: "imageGallery",
        attrs: { columns: galleryColumns.current },
        content: nodes,
      }).run();
    } else {
      editor.chain().focus().insertContent(nodes).run();
    }
    if (fileInput.current) fileInput.current.value = "";
  };

  const uploadPendingImages = useCallback(async (): Promise<string> => {
    if (!editor) throw new Error("Article editor is not ready");
    const pending: Array<{ url: string; file: File }> = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === "image" && typeof node.attrs.src === "string") {
        const file = pendingFiles.current.get(node.attrs.src);
        if (file) pending.push({ url: node.attrs.src, file });
      }
    });

    setUploading(true);
    try {
      for (const { url, file } of pending) {
        const formData = new FormData();
        formData.append("image", file);
        const result = await apiRequest<UploadResponse>(`/content/${kind}/images`, {
          method: "POST",
          body: formData,
        });
        let currentPosition = -1;
        let currentAttributes: Record<string, unknown> | undefined;
        editor.state.doc.descendants((node, position) => {
          if (node.type.name === "image" && node.attrs.src === url) {
            currentPosition = position;
            currentAttributes = node.attrs;
            return false;
          }
          return true;
        });
        if (currentAttributes && currentPosition >= 0) {
          editor.view.dispatch(editor.state.tr.setNodeMarkup(currentPosition, undefined, {
            ...currentAttributes,
            src: result.data.url,
          }));
        }
        pendingFiles.current.delete(url);
        URL.revokeObjectURL(url);
        objectUrls.current.delete(url);
      }
      const html = editor.getHTML();
      if (/src=["']blob:/i.test(html)) {
        throw new Error("An article image is still waiting to upload. Please retry saving.");
      }
      return html;
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }, [editor, kind]);

  useImperativeHandle(ref, () => ({
    uploadPendingImages,
    setEditable: (editable) => editor?.setEditable(editable),
  }), [editor, uploadPendingImages]);

  useEffect(() => () => {
    for (const url of objectUrls.current) URL.revokeObjectURL(url);
  }, []);

  const handleImageFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) insertImages(Array.from(event.target.files));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    const images = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
    if (!images.length) return;
    event.preventDefault();
    insertImages(images);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const images = Array.from(event.clipboardData.files).filter((file) => file.type.startsWith("image/"));
    if (!images.length) return;
    event.preventDefault();
    insertImages(images);
  };

  const chooseImageFiles = (mode: "single" | "gallery") => {
    if (mode === "gallery") {
      const requestedColumns = Number(window.prompt("How many columns should this image row have?", "2"));
      if (!Number.isInteger(requestedColumns) || requestedColumns < 2 || requestedColumns > 4) {
        toast.error("Choose between 2 and 4 image columns");
        return;
      }
      galleryColumns.current = requestedColumns;
    }
    imageUploadMode.current = mode;
    fileInput.current?.click();
  };

  const insertTable = (value: Editor) => {
    const rows = Number(window.prompt("How many rows should the table have?", "3"));
    const columns = Number(window.prompt("How many columns should the table have?", "3"));
    if (!Number.isInteger(rows) || !Number.isInteger(columns) || rows < 1 || columns < 1 || rows > 20 || columns > 12) {
      toast.error("Choose 1–20 rows and 1–12 columns");
      return;
    }
    value.chain().focus().insertTable({ rows, cols: columns, withHeaderRow: true }).run();
  };

  const addLink = () => {
    if (!editor) return;
    const url = window.prompt("Paste the link URL");
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) {
        toast.error("Use an http, https, or email link");
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: parsed.href }).run();
    } catch {
      toast.error("Enter a valid link URL");
    }
  };

  const toolbarButton = (
    label: string,
    action: (editor: Editor) => void,
    icon: React.ReactNode,
    active = false,
    disabled = false,
  ) => (
    <button
      key={label}
      type="button"
      aria-label={label}
      title={label}
      disabled={!editor?.isEditable || disabled}
      onClick={() => editor && action(editor)}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded border px-2.5 text-sm disabled:opacity-40 ${active ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
    >
      {icon}<span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="overflow-hidden rounded border bg-white" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()} onPaste={handlePaste}>
      <div className="flex flex-wrap gap-2 border-b bg-muted/30 p-2" role="toolbar" aria-label="Article formatting">
        {toolbarButton("Heading", (value) => value.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={16} />, editor?.isActive("heading", { level: 2 }))}
        {toolbarButton("Bold", (value) => value.chain().focus().toggleBold().run(), <Bold size={16} />, editor?.isActive("bold"))}
        {toolbarButton("Italic", (value) => value.chain().focus().toggleItalic().run(), <Italic size={16} />, editor?.isActive("italic"))}
        {toolbarButton("Bulleted list", (value) => value.chain().focus().toggleBulletList().run(), <List size={16} />, editor?.isActive("bulletList"))}
        {toolbarButton("Numbered list", (value) => value.chain().focus().toggleOrderedList().run(), <ListOrdered size={16} />, editor?.isActive("orderedList"))}
        {toolbarButton("Quote", (value) => value.chain().focus().toggleBlockquote().run(), <Quote size={16} />, editor?.isActive("blockquote"))}
        {toolbarButton("Add link", () => addLink(), <Link2 size={16} />)}
        <button
          type="button"
          aria-label="Add image"
          title="Add image"
          disabled={!editor?.isEditable || uploading}
          onClick={() => chooseImageFiles("single")}
          className="inline-flex h-9 items-center justify-center gap-2 rounded border px-2.5 text-sm disabled:opacity-40 hover:bg-muted"
        >
          <ImagePlus size={16} /><span className="hidden sm:inline">Add image</span>
        </button>
        {toolbarButton("Add image row", () => chooseImageFiles("gallery"), <ImagePlus size={16} />)}
        <label className="flex h-9 items-center gap-1 rounded border px-2 text-xs">
          Image size
          <select
            aria-label="Selected image size"
            disabled={!editor?.isEditable || !editor.isActive("image")}
            value={editor?.getAttributes("image").width ?? 100}
            onChange={(event) => editor?.chain().focus().updateAttributes("image", { width: Number(event.target.value) }).run()}
            className="max-w-20 bg-transparent"
          >
            {[25, 33, 50, 75, 100].map((width) => <option key={width} value={width}>{width}%</option>)}
          </select>
        </label>
        <label className="flex h-9 items-center gap-1 rounded border px-2 text-xs">
          Position
          <select
            aria-label="Selected image position"
            disabled={!editor?.isEditable || !editor.isActive("image")}
            value={editor?.getAttributes("image").align ?? "center"}
            onChange={(event) => editor?.chain().focus().updateAttributes("image", { align: event.target.value }).run()}
            className="max-w-24 bg-transparent"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
        {toolbarButton("Insert table", insertTable, <Table2 size={16} />)}
        {toolbarButton("Undo", (value) => value.chain().focus().undo().run(), <Undo2 size={16} />)}
        {toolbarButton("Redo", (value) => value.chain().focus().redo().run(), <Redo2 size={16} />)}
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleImageFiles}
          className="hidden"
          aria-label="Choose article images"
        />
      </div>
      {uploading && <p className="border-b px-4 py-2 text-sm text-muted-foreground">Uploading article images...</p>}
      <EditorContent editor={editor} />
      <p className="border-t bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
        Images are uploaded when you save or publish. Add image row places images side by side. Tables can have up to 20 rows and 12 columns.
      </p>
    </div>
  );
});

export default NewsRichTextEditor;
