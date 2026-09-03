export default function ImagePlaceholder({ label = 'Photography coming soon', alt = 'Photography placeholder', className = '' }) {
  return <div className={`image-placeholder ${className}`.trim()} role="img" aria-label={alt}><span>{label}</span></div>;
}
