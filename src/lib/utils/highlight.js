import {strToHTML} from './strToHTML.js';
// import hljs from 'hljs';

export function highlight(htmlList) {
  const nodes = Array.from(htmlList);
  // console.log(nodes);
  nodes.forEach((node) => {
    if(node.nodeName === 'pre') {
      nodes[node] = applyHighlights(node);
    }
  });
  const nodeParent = document.createElement('section');
  nodeParent.classList.add('content', 'flow');
  nodeParent.tabIndex = '0';
  nodes.forEach((node) => {
    nodeParent.appendChild(node);
  });
  return nodeParent;
}

function applyHighlights(node) {
  return node;
}