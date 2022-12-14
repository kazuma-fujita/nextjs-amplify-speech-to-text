import { useConvertSpeechToText } from "../hooks/use-convert-speech-to-text";
import { AudioRecorder } from "./audio-recorder";

export const SpeechToText = () => {
  const { convertSpeechToText, transcribeText, error } =
    useConvertSpeechToText();
  return (
    <div className="Text">
      <div>
        <h3>Speech to text</h3>
        <AudioRecorder finishRecording={convertSpeechToText} />
        <p>{transcribeText}</p>
        <p>{error}</p>
      </div>
    </div>
  );
};
