import rehype from 'rehype';
import highlight from 'rehype-highlight';

export function parseContent(content) {
  return rehype()
    .data('settings', {fragment: true})
    .use(highlight)
    .process(content, function(parsedContent) {
      return String(parsedContent);
    });
}