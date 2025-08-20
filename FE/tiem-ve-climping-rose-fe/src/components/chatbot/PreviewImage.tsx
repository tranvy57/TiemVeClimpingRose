import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface PreviewImageProps {
  src: string | Blob;
  alt?: string;
}

function PreviewImage({ src, alt }: PreviewImageProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  return (
    <>
      {/* Ảnh trong Markdown */}
      <img
        src={src}
        alt={alt}
        style={{ cursor: "zoom-in", maxWidth: "100%", borderRadius: 8 }}
        onClick={() => {
          const url = typeof src === "string" ? src : URL.createObjectURL(src);
          setPreviewSrc(url);
        }}
      />

      {/* Overlay preview */}
      {previewSrc && (
        <div
          onClick={() => setPreviewSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={previewSrc}
            alt={alt || ""}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 8,
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              cursor: "zoom-out",
            }}
          />
        </div>
      )}
    </>
  );
}

export default function MarkdownRenderer({ text }: { text: string }) { 
  return (
    <ReactMarkdown
      components={{
        p: ({ node, children }) => {
          // Nếu trong p chỉ có 1 ảnh, bỏ <p> luôn
          if (node &&
            node.children.length === 1 &&
            node.children[0].type === "element" &&
            node.children[0].tagName === "img"
          ) {
            return <>{children}</>;
          }
          return <p>{children}</p>;
        },
        img: ({ node, ...props }) => (
          <PreviewImage src={props.src || ""} alt={props.alt || ""} />
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
