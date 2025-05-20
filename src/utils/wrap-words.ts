/**
 * Wraps words containing hyphens in span elements to prevent unwanted word breaks
 * @param element The HTML element to process
 */
export function wrapHyphenatedWords(element: HTMLElement): HTMLElement {
  // Process all text nodes that contain hyphens
  const textNodes = getTextNodesWithHyphens(element);

  textNodes.forEach((textNode) => {
    const text = textNode.nodeValue || '';

    // Create a document fragment to hold the modified content
    const fragment = document.createDocumentFragment();

    // Split the text by spaces while preserving whitespace
    const parts = text.split(/(\s+)/);

    for (const part of parts) {
      // Check if the part contains a hyphen and is not just whitespace
      if (part.includes('-') && /\S/.test(part)) {
        const span = document.createElement('span');
        span.classList.add('split-word-nowrap');
        span.textContent = part;
        fragment.appendChild(span);
      } else {
        // Keep non-hyphenated parts as they are
        fragment.appendChild(document.createTextNode(part));
      }
    }

    // Replace the original text node with our fragment
    if (textNode.parentNode) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
  return element;
}

/**
 * Gets all text nodes within an element that contain hyphens
 * @param element The element to search within
 * @returns Array of text nodes containing hyphens
 */
function getTextNodesWithHyphens(element: Node): Text[] {
  const result: Text[] = [];

  // Use TreeWalker for efficient DOM traversal
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

  let node;
  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    // Only include text nodes that contain hyphens
    if (textNode.nodeValue && textNode.nodeValue.includes('-')) {
      result.push(textNode);
    }
  }

  return result;
}
