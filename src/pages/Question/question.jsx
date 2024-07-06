import React from "react";
import "./question.css";

export default function Question() {
  return (
    <form>
      <div className="questions">
        <h1 className="question">Savollar:</h1>
        {questionsList.map((question, index) => (
          <label key={index}>
            <h2>{index + 1}-Savol</h2>
            <p>{question}</p>
            <textarea
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
            ></textarea>
          </label>
        ))}
        <button disabled={disabled} type="button" onClick={handleSend}>
          Jo'natish
        </button>
      </div>
    </form>
  );
}
