export default function getImage(name) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}
