import React, { useState, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Mic, StopCircleRounded } from '@mui/icons-material';
import { uploadAudioFile } from '../../utils/api';
import {
    setXAxis, setYAxis,
} from '../../features/Dashboard-Slice/chartSlice';
import { setChartType } from '../../features/Dashboard-Slice/chartTypeSlice';

function AudioRecorder({ selectedTable, databaseName }) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const dispatch = useDispatch();

const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
    const startRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorderRef.current = new MediaRecorder(stream);
                    audioChunksRef.current = [];

                    mediaRecorderRef.current.ondataavailable = (event) => {
                        audioChunksRef.current.push(event.data);
                    };

                    mediaRecorderRef.current.onstop = () => {
                        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                        if (audioBlob.size === 0) {
                            console.error('Audio Blob is empty!');
                            return;
                        }
                        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
                        const formData = new FormData();
                        formData.append('audio', audioFile);
                        formData.append('tableName', selectedTable);
                        formData.append('databaseName', databaseName);
                        uploadAudioFile(formData)
                            .then(response => {
                                console.log('Audio uploaded successfully:', response.data);
                                dispatch(setXAxis(response.data.extracted_data.columns));  
                                dispatch(setYAxis(response.data.extracted_data.rows));     
                                dispatch(setChartType(response.data.extracted_data.chart_type));
                            })
                            .catch(error => {
                                console.error('Error uploading audio:', error);
                            });

                    };

                    mediaRecorderRef.current.start();
                    setIsRecording(true);
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    return (
        <div style={{ 
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            width: '95px',
            padding: '10px 0',
            marginLeft: '10px',
          }}>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: isRecording ? '#ff4d4d' :appBarColor,
                color: 'white',
                borderRadius: '5px',
                padding: '8px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                fontSize: '12px',
                fontWeight: '500',
                minWidth: '5px'
              }}
            >
              {isRecording ? <StopCircleRounded style={{ marginRight: '8px' }} /> : <Mic style={{ margin: '1px' }} />}
              {/* <span>{isRecording ? 'Stop Recording' : 'Record Audio'}</span> */}
            </button>
          </div>
          
          {audioUrl && (
            <div style={{
              width: '100%',
              marginTop: '15px',
              padding: '10px',
              background: '#efefef',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <audio 
                controls 
                src={audioUrl}
                style={{ 
                  width: '100%',
                  maxWidth: '300px',
                  height: '40px'
                }}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      );



}

export default AudioRecorder;