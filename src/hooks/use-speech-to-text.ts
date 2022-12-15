import MicrophoneStream from "microphone-stream";
import { useState } from "react";
import { useConvertSpeechToText } from "./use-convert-speech-to-text";

export const useSpeechToText = (sourceLanguageCode: string) => {
  const { convertSpeechToText, transcribeText, error } =
    useConvertSpeechToText(sourceLanguageCode);
  const [isLoading, setIsLoading] = useState(false);
  const [micStream, setMicStream] = useState<MicrophoneStream | null>(null);
  const [audioBuffer] = useState(
    (() => {
      let buffer: ArrayBuffer[] = [];
      const addData = (raw: any) => {
        buffer = buffer.concat(...raw);
        return buffer;
      };
      const reset = () => {
        buffer = [];
      };
      const getData = () => buffer;
      return { reset, addData, getData };
    })()
  );

  const startRecording = async () => {
    audioBuffer.reset();

    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const startMic = new MicrophoneStream();

    startMic.setStream(stream);
    (startMic as any).on("data", (chunk: Buffer) => {
      var raw = MicrophoneStream.toRaw(chunk);
      if (raw == null) {
        return;
      }
      audioBuffer.addData(raw);
    });

    setMicStream(startMic);
    setIsLoading(true);
  };

  const stopRecording = async () => {
    if (micStream) {
      micStream.stop();
      setMicStream(null);
      const resultBuffer = audioBuffer.getData();
      await convertSpeechToText(resultBuffer);
      setIsLoading(false);
    }
  };

  return { startRecording, stopRecording, transcribeText, isLoading, error };
};
