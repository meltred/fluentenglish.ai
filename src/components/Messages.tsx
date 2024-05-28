"use client";

import { useVoice } from "@humeai/voice-react";

export default function Messages() {
  const { messages } = useVoice();

  return (
    <div>
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <div key={msg.type + index}>
              <div className="my-1 text-xs uppercase font-bold text-cyan-500">
                {msg.message.role}
              </div>
              <div className="my-1 pl-4">{msg.message.content}</div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
