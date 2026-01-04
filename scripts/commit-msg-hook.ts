import { readFileSync, writeFileSync } from "node:fs";
import { GoogleGenAI } from "@google/genai";

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error("Error: Commit message file not provided");
  process.exit(1);
}

console.log(commitMsgFile);

try {
  const commitMessage = readFileSync(commitMsgFile, "utf-8").trim();

  if (!commitMessage) {
    console.log("Empty commit message, skipping translation");
    process.exit(0);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY is not configured");
    console.error("Set it in your .env file");
    console.error("Get your API key at: https://aistudio.google.com/apikey");
    process.exit(1);
  }
  const ai = new GoogleGenAI({ apiKey });
  const translationPrompt = `
Translate to English. Rules: Technical tone. Concise. Return ONLY translated text. No explanations. No extra words. No punctuation if original doesn't have it. Preserve all emojis in their original position.
Original: "${commitMessage}"
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: translationPrompt,
  });

  const translatedMessage = response.text?.trim();

  if (!translatedMessage) {
    console.log("No translation received, keeping original message");
    process.exit(0);
  }

  writeFileSync(commitMsgFile, `${translatedMessage}\n`);
  process.exit(0);
} catch (error) {
  console.error("Error during translation:", error);
  console.log("Proceeding with original message");
  process.exit(0);
}
