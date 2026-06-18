interface PostCoverProps {
  slug: string;
  title: string;
  tags?: string[];
  image?: string;
  className?: string;
}

/** Stable hash so each post always gets the same generated cover. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function PostCover({
  slug,
  title,
  tags = [],
  image,
  className = "",
}: PostCoverProps) {
  if (image) {
    return (
      <div className={`overflow-hidden bg-surface-overlay ${className}`}>
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Generated cover: a gradient in the brand's blue→indigo→violet band,
  // deterministic per post, with a dotted motif and the primary tag.
  const h = hash(slug);
  const hue = 210 + (h % 80);
  const gradient = `linear-gradient(135deg, hsl(${hue} 62% 56%), hsl(${hue + 30} 58% 44%))`;
  const label = (tags[0] ? `#${tags[0]}` : title).toLowerCase();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: gradient }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
      <span className="absolute bottom-3 left-4 max-w-[90%] truncate font-mono text-sm tracking-tight text-white/85">
        {label}
      </span>
    </div>
  );
}
