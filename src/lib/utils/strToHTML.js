// const support = (function() {
//   if(!window.DOMParser) return false;
//   const parser = new window.DOMParser();
//   try {
//     parser.parseFromString('x', 'text/html');
//   } catch(error) {
//     return false;
//   }
//   return true;
// })();

export function strToHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.innerHTML;
  // if(support) {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, 'text/html');
  //   return doc.body;
  // }

  // const dom = document.createElement('div');
  // dom.innerHTML = htmlString;
  // return dom;
}