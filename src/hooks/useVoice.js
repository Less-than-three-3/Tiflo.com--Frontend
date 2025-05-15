import {useState, useRef, useEffect} from "react";

export const useVoice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const mimeType = 'audio/webm; codecs=opus';

  useEffect(() => {
    const initialize = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            channelCount: 1,
            sampleRate: 16000,
            sampleSize: 16
          }
        });
        
        const recorder = new MediaRecorder(stream, { 
          mimeType,
          audioBitsPerSecond: 16000 
        });

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: mimeType });
          setAudioBlob(blob); // Сохраняем blob в состоянии
          chunksRef.current = [];
        };

        mediaRecorderRef.current = recorder;
      } catch (error) {
        console.error('Recorder error:', error);
      }
    };

    initialize();

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const start = () => {
    if (mediaRecorderRef.current?.state === 'inactive') {
      chunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stop = () => {
    return new Promise(resolve => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: mimeType });
          setAudioBlob(blob);
          chunksRef.current = [];
          resolve(blob);
        };
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      } else {
        resolve(null);
      }
    });
  };

  const getAudioData = () => {
    if (!audioBlob) return null;
    
    const formData = new FormData();
    formData.append('voice', audioBlob, 'recording.webm');
    return formData;
  };

  const clear = () => {
    setAudioBlob(null);
    chunksRef.current = [];
  };

  return {
    isRecording,
    start,
    stop,
    clear,
    audioBlob,
    getAudioData
  };
};