"use client";

import {
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from "@/context/DeepgramContextProvider";
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from "@/context/MicrophoneContextProvider";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "../ui/text-animate";

export default function App() {
  const [caption, setCatption] = useState<string | undefined>(
    "Start Speaking..."
  );
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { microphone, setupMicrophone, startMicrophone, microphoneState } =
    useMicrophone();

  const captionTimeout = useRef<any>();
  const keepAliveInterval = useRef<any>();

  useEffect(() => {
    // start listening
    // this can also be done with user interaction
    // like clicking button
    setupMicrophone();
  }, []);

  useEffect(() => {
    if (microphoneState == MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2",
        interim_results: true,
        smart_format: true,
        filler_words: true,
        utterance_end_ms: 3000,
      });
    }
  }, [microphoneState]);

  useEffect(() => {
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      connection.send(e.data);
    };

    const onTranscript = (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      const thisCaption = data.channel.alternatives[0].transcript;

      console.log(thisCaption);
      setCatption(thisCaption);

      if (isFinal && speechFinal) {
        clearTimeout(captionTimeout.current);

        captionTimeout.current = setTimeout(() => {
          setCatption(undefined);
          clearTimeout(captionTimeout.current);
        }, 3000);
      }
    };

    if (connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      connection.removeListener(
        LiveTranscriptionEvents.Transcript,
        onTranscript
      );
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);

      clearTimeout(captionTimeout.current);
    };
  }, [connectionState]);

  useEffect(() => {
    if (!connection) return;

    if (
      microphoneState !== MicrophoneState.Open &&
      connectionState === LiveConnectionState.OPEN
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 10000);
    } else {
      clearTimeout(keepAliveInterval.current);
    }

    return () => {
      clearTimeout(keepAliveInterval.current);
    };
  }, [microphoneState, connectionState]);

  return (
    <div>{caption ? <TextAnimate text={caption} type="popIn" /> : null}</div>
  );
}
