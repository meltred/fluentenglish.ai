"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { systemInfo } from "@/lib/systemInfo";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: google("models/gemini-1.5-pro-latest"),
      system: systemInfo,
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
