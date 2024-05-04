import { MAXIMUM_CHARACTERS_PER_SPEECH_BATCH } from "@constants";

const splitSummaryIntoBatches = (
  remainingSummaryPhrases: string[],
  speechBatchCharactersThreshold: number = MAXIMUM_CHARACTERS_PER_SPEECH_BATCH,
  currentPhrasesBatches: SpeechPhrasesBatch[] = [[]]
): SpeechPhrasesBatch[] => {
  if (remainingSummaryPhrases.length == 0) {
    return currentPhrasesBatches;
  }

  const currentBatch = currentPhrasesBatches[currentPhrasesBatches.length - 1];
  const nextPhrase = remainingSummaryPhrases[0];

  const canCurrentBatchTakeNextPhrase =
    currentBatch.join("").length + nextPhrase.length <=
    speechBatchCharactersThreshold;

  canCurrentBatchTakeNextPhrase
    ? currentBatch.push(nextPhrase)
    : currentPhrasesBatches.push([nextPhrase]);

  return splitSummaryIntoBatches(
    remainingSummaryPhrases.slice(1),
    speechBatchCharactersThreshold,
    currentPhrasesBatches
  );
};

export default splitSummaryIntoBatches;
