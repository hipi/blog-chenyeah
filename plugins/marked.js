import marked from "marked";
import prism from "prismjs";
let myMarkedRenderer = new marked.Renderer();
myMarkedRenderer.heading = function(text, level, raw) {
  return `
          <h${level} id="heading-${level}-${text}">
            ${text}
          </h${level}>`;
};
marked.setOptions({
  renderer: myMarkedRenderer,
  highlight: function(code, lang) {
    let languages = ["html", "js", "javascript", "css"].includes(lang)
      ? lang
      : "javascript";
    return Prism.highlight(code, prism.languages[languages]);
  }
});
