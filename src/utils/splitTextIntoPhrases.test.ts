import { expect, test } from "bun:test";
import { splitTextIntoPhrases } from "./splitTextIntoPhrases";

test("utils.splitTextIntoPhrases", () => {
  expect(
    splitTextIntoPhrases(
      "Hello world! How are you today? I am fine. Thank you! Blah blah... Aha!"
    )
  ).toEqual([
    "Hello world!",
    "How are you today?",
    "I am fine.",
    "Thank you!",
    "Blah blah...",
    "Aha!",
  ]);
});
