import { SpeechToTextOutput } from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useCallback, useState } from "react";

export const useConvertSpeechToText = () => {
  const [transcribeText, setTranscribeText] = useState("");
  const [error, setError] = useState("");

  const convertSpeechToText = useCallback(
    // Amazon Transcribe Streaming が正常動作したのは Buffer[] | ArrayBuffer[] 型のみだった
    // 以下型指定(BytesSource型)では動作しない為、ここだけany型で回避
    // async (bytes: Buffer | ArrayBuffer | Blob | string) => {
    async (bytes: any) => {
      try {
        const result: SpeechToTextOutput = await Predictions.convert({
          transcription: {
            source: { bytes },
            language: "en-US",
          },
        });
        console.log("audio2text", result.transcription.fullText);
        setTranscribeText(result.transcription.fullText);
      } catch (error) {
        console.error(error);
        setError(JSON.stringify(error, null, 2));
      }
    },
    []
  );

  return { convertSpeechToText, transcribeText, error };
};
