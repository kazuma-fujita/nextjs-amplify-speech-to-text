import { useSpeechToText } from "../hooks/use-speech-to-text";

type Props = {
  sourceLanguageCode: string;
};

export const SpeechToText = ({ sourceLanguageCode }: Props) => {
  const { startRecording, stopRecording, transcribeText, isLoading, error } =
    useSpeechToText(sourceLanguageCode);

  return (
    <>
      <button onClick={isLoading ? stopRecording : startRecording}>
        {isLoading ? "Stop" : "Start"} recording
      </button>
      <textarea value={transcribeText} rows={8} cols={32} readOnly />
      {error && <p>{error}</p>}
    </>
  );
};
