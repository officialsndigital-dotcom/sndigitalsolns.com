import { getImageProps, type ImageProps } from "next/image";

/**
 * next/image without its inline style. next/image writes style="color:transparent"
 * on every <img>, which SEO audits report as inline styles; the same rule lives in
 * globals.css instead. Sizing, srcset and lazy loading are unchanged.
 */
export default function Img(props: ImageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style, ...imgProps } = getImageProps(props).props;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...imgProps} />;
}
