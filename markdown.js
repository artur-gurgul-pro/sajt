const hljs = require('highlight.js')
const { marked } = require('marked')
const { markedHighlight } = require('marked-highlight')
const matter = require('gray-matter')

marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
}))

function parseMD(file) {
    
    const fileContents = fs.readFileSync(path.join("./", file), 'utf8')
    
    const { data: metadata, content: markdownContent } = matter(fileContents)

    const htmlContent = marked(markdownContent)

    return {
        meta: metadata,
        content: htmlContent
    }
}

const renderer = new marked.Renderer();
renderer.paragraph = (text) => {
    return text.text
}


function parseMarkdown(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          for (let i = 0; i < obj[key].length; i++) {
            if (typeof obj[key][i] === 'object' && obj[key][i] !== null) {
              parseMarkdown(obj[key][i]);
            } 
            else if (typeof obj[key][i] === 'string') {
              obj[key][i] = marked(obj[key][i], { renderer });
            }
          }
        } else {
          parseMarkdown(obj[key]);
        }
      } else if (typeof obj[key] === 'string') {
        obj[key] = marked(obj[key], { renderer });
      }
    }
}