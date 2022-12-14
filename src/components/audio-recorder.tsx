import { useState } from "react";
import MicrophoneStream from "microphone-stream";

type Props = {
  finishRecording: (bytes: Buffer[] | ArrayBuffer[]) => void;
};

export const AudioRecorder = ({ finishRecording }: Props) => {
  const [recording, setRecording] = useState(false);
  const [micStream, setMicStream] = useState<MicrophoneStream | null>(null);
  const [audioBuffer] = useState(
    (function () {
      let buffer: ArrayBuffer[] = [];
      function add(raw: any) {
        buffer = buffer.concat(...raw);
        return buffer;
      }
      function newBuffer() {
        console.log("resetting buffer");
        buffer = [];
      }

      return {
        reset: function () {
          newBuffer();
        },
        addData: function (raw: Float32Array) {
          return add(raw);
        },
        getData: function () {
          return buffer;
        },
      };
    })()
  );

  async function startRecording() {
    console.log("start recording");
    audioBuffer.reset();

    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const startMic = new MicrophoneStream();

    startMic.setStream(stream);
    (startMic as any).on("data", (chunk: Buffer) => {
      var raw: Float32Array = MicrophoneStream.toRaw(chunk);
      if (raw == null) {
        return;
      }
      audioBuffer.addData(raw);
    });

    setRecording(true);
    setMicStream(startMic);
  }

  async function stopRecording() {
    console.log("stop recording");

    if (micStream) {
      micStream.stop();
      setMicStream(null);
      setRecording(false);
      const resultBuffer = audioBuffer.getData();
      finishRecording(resultBuffer);
    }
  }

  return (
    <>
      {recording && <button onClick={stopRecording}>Stop recording</button>}
      {!recording && <button onClick={startRecording}>Start recording</button>}
    </>
  );
};
