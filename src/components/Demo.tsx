"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";

interface Props {
  humeAccessToken: string;
}

export default function Demo({ humeAccessToken }: Props) {
  return (
    <VoiceProvider
      auth={{
        type: "accessToken",
        value: humeAccessToken,
      }}
    >
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}
