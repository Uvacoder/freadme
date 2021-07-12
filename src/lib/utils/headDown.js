export function headDown(html) {
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(html, 'text/html');
  const blacklisted = parsedHTML.querySelectorAll('head, script');
  blacklisted.forEach((node) => node.remove());

  const actualHTML = parsedHTML.querySelector('body').childNodes;

  const headings = Array.from(parsedHTML.querySelectorAll('h1, h2, h3, h4'));
  headings.forEach((heading) => {
    console.log(heading)
  });
  // console.log(children);
}