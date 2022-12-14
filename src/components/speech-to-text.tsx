import { useSpeechToText } from "../hooks/use-speech-to-text";

export const SpeechToText = () => {
  const { startRecording, stopRecording, transcribeText, isLoading, error } =
    useSpeechToText();

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
