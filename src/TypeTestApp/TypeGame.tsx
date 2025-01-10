import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from "./Store";
import { fetchSentences, setCurrentSentence } from "./TypeTestSlice";
import { CircularProgress } from "@mui/material";

const TypeGame: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { sentences, currentSentence, loading, error } = useSelector((state: RootState) => state.sentences);
    const [userInput, setUserInput] = useState<string>("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWPM] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchSentences());
    }, [dispatch]);

    
    const handleInputChange = (value: string) => {
        if (!startTime) {
            setStartTime(Date.now());
        }
        setUserInput(value);

    };

    const handleFinish = () => {
        if (currentSentence && startTime) {
            const endTime = Date.now();
            calculateWPM(endTime);
            calculateAccuracy(userInput);
            setFinished(true);
        }
    };

    const calculateWPM = (endTime: number) => {
        if (startTime && currentSentence) {
            const timeTakenMinutes = (endTime - startTime) / 60000;
            const wordCount = currentSentence.split("").length;
            setWPM(Math.round(wordCount / timeTakenMinutes));
        }
    };

    const calculateAccuracy = (input: string) => {
        if (currentSentence) {
            const totalChars = currentSentence.length;
            const correctChars = input.split("").filter((char, idx) => char === currentSentence[idx]).length;
            setAccuracy(Math.round((correctChars / totalChars) * 100));
        }
    };

    const nextSentence = () => {
        if (sentences.length > 0) {
            const nextIndex = Math.floor(Math.random() * sentences.length);
            dispatch(setCurrentSentence(sentences[nextIndex]));
        }
        setUserInput("");
        setStartTime(null);
        setWPM(null);
        setAccuracy(null);
        setFinished(false);
    }

   

    if (loading) return <p><CircularProgress/></p>
    if (error) return <p>Error:{error}</p>
    return (
        <div style={{ fontFamily: "Arial,san-serif", textAlign: "center", marginTop: "50px" }}>
            <h1>Typing Speed Test</h1>
            
            {!finished && (
                <>
                <p style={{ fontSize: "1.5em", fontStyle: "italic" }}>
                {currentSentence}
            </p>
                    <textarea
                        value={userInput}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Start typing here..."
                        style={{ width: "80%", height: "100px", }}
                        disabled={finished}
                    /><br />
                    <button
                        onClick={handleFinish}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            fontSize: "1em",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}>
                        Finish
                    </button>
                </>
            )}
            {finished && (
                <div>
                    <p><strong>WPM:</strong>{wpm}</p>
                    <p><strong>Accuracy:</strong>{accuracy}%</p>
                    <button
                        onClick={nextSentence}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            fontSize: "1em",
                            backgroundColor: "#28A745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>

    );
};

export default TypeGame;


