// This file wil serve for safe regex compile and highlight matches

function compileRegex(input, flags = 'i') {
  if (!input) return null;
  try {
    return new RegExp(input, flags);
  } catch (err) {
    return null;
  }
}

function highlightMatches(text, re) {
  if (!re) return text;
  return text.replace(re, m => `<mark>${m}</mark>`);
}

window.searchUtils = {
  compileRegex,
  highlightMatches
};