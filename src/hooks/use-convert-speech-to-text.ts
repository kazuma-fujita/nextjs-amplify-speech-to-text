import { SpeechToTextOutput } from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useState } from "react";

export const useConvertSpeechToText = () => {
  const [transcribeText, setTranscribeText] = useState("");
  const [error, setError] = useState("");

  const convertSpeechToText =
    // Amazon Transcribe Streaming が正常動作したのは Buffer[] | ArrayBuffer[] 型のみだった
    // 以下型指定(BytesSource型)では動作しない為、ここだけany型で回避
    // async (bytes: Buffer | ArrayBuffer | Blob | string) => {
    async (bytes: any) => {
      console.log("bytes", bytes);
      try {
        const result: SpeechToTextOutput = await Predictions.convert({
          transcription: {
            source: { bytes },
            // language: "en-US",
            language: "ja-JP",
          },
        });
        console.log("audio2text", result.transcription.fullText);
        setTranscribeText(result.transcription.fullText);
      } catch (err) {
        const error = err as Error;
        console.error(error);
        setError(error.message);
      }
    };
  return { convertSpeechToText, transcribeText, error };
};
