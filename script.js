function fixHangingWords() {
  const article = document.querySelector('article');

  if (!article) return;

  const walker = document.createTreeWalker(
    article,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (node.parentElement.closest('script, style, textarea')) {
      continue;
    }

    textNodes.push(node);
  }

  const shortWords = /(?<!\p{L})(в|и|к|с|у|о|а|на|по|из|от|до|за|не|но|же|ли|бы|об|со|во|под|при|для|из-за)\s+(?=\p{L})/giu;

  textNodes.forEach(node => {
    node.textContent = node.textContent.replace(
      shortWords,
      (match, word) => word + '\u00A0'
    );
  });
}

fixHangingWords();
