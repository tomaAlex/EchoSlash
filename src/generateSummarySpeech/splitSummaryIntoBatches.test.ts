import { expect, test } from "bun:test";
import splitSummaryIntoBatches from "./splitSummaryIntoBatches";

test("generateSummarySpeech.splitTextIntoPhrases", () => {
  expect(
    splitSummaryIntoBatches(
      [
        "Hello world!",
        "How are you today?",
        "I am fine.",
        "Thank you!",
        "Blah blah...",
        "Aha!",
      ],
      55
    )
  ).toEqual([
    ["Hello world!", "How are you today?", "I am fine.", "Thank you!"],
    ["Blah blah...", "Aha!"],
  ]);
});
