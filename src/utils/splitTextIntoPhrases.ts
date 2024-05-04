/**
 * Split text by punctuation followed by space or end of text. Uses a
 * positive lookahead to keep the punctuation at the end of each sentence.
 *
 * @param text The to be split into phrases
 * @returns Full phrases of input text array.
 */
export const splitTextIntoPhrases = (text: string) => {
  const phrases = text.split(/(?<=[\.\?!])\s+(?=[A-Z])/);

  // Filter out any empty strings and trim spaces
  return phrases.map((phrase) => phrase.trim());
};
