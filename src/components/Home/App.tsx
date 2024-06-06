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
// import Groq from "groq-sdk";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "../ui/text-animate";
import { Message, continueConversation } from "../../app/actions";
import { readStreamableValue } from "ai/rsc";
import axios from 'axios';

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;
const MODEL_NAME = 'alpha-stella-en-v2'; // Example model name

const DEEPGRAM_URL = `https://api.beta.deepgram.com/v1/speak?model=${MODEL_NAME}&performance=some&encoding=linear16&sample_rate=24000`;
export default function App() {
  const [caption, setCaption] = useState("Start Speaking...");
  const [conversation, setConversation] = useState<Message[]>([]);

  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { microphone, setupMicrophone, startMicrophone, microphoneState } =
    useMicrophone();

  const keepAliveInterval = useRef<any>();

  useEffect(() => {
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
    const previousTrans = document.getElementById("previousTrans");
    const bottom = document.getElementById("bottom");

    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      connection.send(e.data);
    };

    const onTranscript = async (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      const thisCaption = data.channel.alternatives[0].transcript;

      if (thisCaption.trim().length !== 0) {
        setCaption(thisCaption);
      }

      if (isFinal && speechFinal) {
        if (previousTrans && thisCaption.trim().length !== 0) {
          previousTrans.appendChild(getUserTrans(" " + thisCaption));

          if (previousTrans.innerText.length !== 0) {
            setCaption("");
          }
        }

        if (thisCaption.trim().length !== 0) {
          const { messages, newMessage } = await continueConversation([
            ...conversation,
            { role: "user", content: thisCaption },
          ]);

          let textContent = "";
          const conversationHistory: Message[] = [];

          for await (const delta of readStreamableValue(newMessage)) {
            textContent = `${textContent}${delta}`;

            conversationHistory.push({
              role: "assistant",
              content: textContent,
            });
          }

          setConversation([...messages, ...conversationHistory]);

          previousTrans?.appendChild(getAITrans(textContent));
        }
      }
    };

    if (connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      if (conversation.length === 0) {
        startMicrophone();
      }
    }

    bottom?.scrollIntoView();

    return () => {
      connection.removeListener(
        LiveTranscriptionEvents.Transcript,
        onTranscript
      );
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
    };
  }, [connectionState, conversation]);

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
  const [text, setText] = useState('here we go again');
  const [audioSrc, setAudioSrc] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/tts/', { text });
      const audioUrl = URL.createObjectURL(new Blob([response.data]));
      setAudioSrc(audioUrl);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    }
  };

  
  return (
    <div>
      <div>
        <div
          className="text-md md:text-xl lg:text-2xl p-1 font-black text-black dark:text-neutral-100 opacity-80 flex flex-col gap-1"
          id="previousTrans"
        ></div>
        <TextAnimate text={caption} type="calmInUp" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here"
          style={{ width: '300px', height: '100px', marginBottom: '20px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          Convert to Speech
        </button>
      </form>
      {audioSrc && (
        <audio controls style={{ display: 'block', marginTop: '20px' }}>
          <source src={audioSrc} type="audio/wav" />
          does not support the audio element.
        </audio>
      )}
    </div>

      <div id="bottom" className="mb-4"></div>
    </div>
  );
}

function getUserTrans(text: string) {
  const p = document.createElement("p");
  p.innerText = text;
  return p;
}

function getAITrans(text: string) {
  const p = document.createElement("p");
  p.innerText = text;
  p.classList.add(...["text-pink-400", "opacity-80"]);
  return p;
}
