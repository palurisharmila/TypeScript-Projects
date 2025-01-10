import React, { useState } from "react";
import { questions } from "./QuestionTypes";
const Quiz: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [selectedCategory, setSelectedCategory] = useState<string>("General Science");
    const [showScore, setShowScore] = useState(false);
    const filteredQuestions = questions.filter(
        (question) => question.category === selectedCategory

    );

    const calculateScore = () => {
        return filteredQuestions.reduce((acc, question, index) => {
            if (selectedAnswers[index] === question.answer) {
                return acc + 1;
            }
            return acc;
        }, 0);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedAnswers({ ...selectedAnswers, [currentIndex]: option });
    };

    const handleNext = () => {
        if (currentIndex < filteredQuestions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } 
        else {
            setShowScore(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setCurrentIndex(0);
        setShowScore(false);
        setSelectedAnswers({});
    };

    const handleClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div>
            <h1>Quiz App</h1>
            <label>Select Category:</label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="General Science">General Science</option>
                <option value="Current Affairs">Current Affairs</option>
                <option value="History">History</option>
            </select>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                    marginTop: "20px",
                }}
            >
                {filteredQuestions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        style={{
                            margin: "5px",    
                            backgroundColor: index === currentIndex ? "#4caf50" : "#f0f0f0",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: index === currentIndex ? "white" : "black",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {showScore ? (
                <div>
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {calculateScore()} / {filteredQuestions.length}</p>
                </div>

            ) : (
                <div>
                    <p>
                        Question {currentIndex + 1} of {filteredQuestions.length}
                    </p>
                    <h3>{filteredQuestions[currentIndex].questionText}</h3>
                    {filteredQuestions[currentIndex].options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="option"
                                value={option}
                                checked={selectedAnswers[currentIndex] === option}
                                onChange={() => handleOptionSelect(option)}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>

                    ))}
                    <div>
                        <button onClick={handlePrevious} disabled={currentIndex === 0}>
                            Previous
                        </button>
                        <button onClick={handleNext}>
                            {currentIndex === filteredQuestions.length - 1 ? "Submit": "Next"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;

