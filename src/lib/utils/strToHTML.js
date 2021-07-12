const support = (function() {
  if(!window. DOMParser) return false;
  const parser = new DOMParser();
  try {
    parser.parseFromString('x', 'text/html');
  } catch(error) {
    return false;
  }
  return true;
})();

function strToHTML(htmlString) {
  if(support) {
    const parser = new DomParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body;
  }

  const dom = document.createElement('div');
  dom.innerHTML = htmlString;
  return dom;
}