import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./questions.css";

const YOUR_BOT_TOKEN = "7038740534:AAHJ85y5kXoFdEP44nLWccJq2rMaw1AtNqw";
const YOUR_CHAT_ID = -1002052638504;
const MAX_MESSAGE_LENGTH = 4096;

const questionsList = [
  "Tartiblik va tartibsiz ro'yhatlar orasida qanday farq mavjud?",
  "HTML da element deb nimaga aytiladi?",
  "Qanday input turlarini bilasiz...",
  "HTML da qanday ro'yhat turlari bor?",
  "Textarea va input taglari orasidagi farq nima?",
  "HTML da qanday media taglari mavjud?",
  "HTML formalar nima uchun ishlatiladi?",
  "Audio va video taglar qanday ishlatiladi?",
  "HTML jadvalda colspan va rowspan qanday vazifa uchun ishlatiladi?",
  "HTMLning saytdagi vazifasi nimadan iborat?",
  "HTML da link yaratish uchun qaysi tag ishlatiladi?",
  "Anchor(Link) tag (a) va uning atributlari qanday ishlatiladi?",
  "HTML attribute deb nimaga aytiladi?",
  "<textarea> tagiga uzunlik va balandlik berish uchun qanday atributlar mavjud?",
  "HTML da matnlarni bo'limlarga ajratishni qanday usullari bor?",
  "label tagini vazifasi nimadan iborat?",
  "label tagini input tagiga nechta usul bilan bog'lash mumkin",
  "HTML da image qo'shish uchun qaysi tag ishlatiladi?",
  "Img tagining atributlari va ulardan qanday foydalaniladi?",
  "Media(audio, video) taglarida loop atributi nima vazifa bajaradi?",
  "Block va inline elementlar orasidagi farq nima?",
  "HTML tag deb nimaga ataladi?",
  "HTML da table tagi va uning bolalari qanday ishlatiladi?",
  "<button type='reset'> ning vazifasi nimadan iborat",
  "<thead> va <tbody> taglarining vazifasi nimadan iborat",
  "<form> tagini action atributini vazifasi nimadan iborat?",
  "<!Doctype html> saytdagi vazifasi nimadan iborat?",
  "HTML head va body taglari orasidagi farq nima?",
  "Juft va toq taglarni qanday farqlari bor?",
  "Media(audio, video) taglarida controls atributi nima vazifa bajaradi",
];

export default function Question() {
  const [answers, setAnswers] = useState(
    () =>
      JSON.parse(localStorage.getItem("answers")) ||
      Array(questionsList.length).fill("")
  );
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const splitMessage = (message, maxLength) => {
    const parts = [];
    let remainingMessage = message;
    while (remainingMessage.length > maxLength) {
      const splitIndex = remainingMessage.lastIndexOf("\n", maxLength);
      const index = splitIndex > 0 ? splitIndex : maxLength;
      parts.push(remainingMessage.slice(0, index));
      remainingMessage = remainingMessage.slice(index);
    }
    parts.push(remainingMessage);
    return parts;
  };

  const sendMessage = async (parts) => {
    for (const part of parts) {
      const requestBody = {
        chat_id: YOUR_CHAT_ID,
        text: part,
      };

      await fetch(`https://api.telegram.org/bot${YOUR_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Xatolik yuz berdi");
        }
        return response.json();
      });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    setDisabled(true);

    const userData = JSON.parse(localStorage.getItem("userData"));

    const filledAnswers = answers.map((answer) =>
      answer.trim() === "" ? "-" : answer
    );

    const message = `
------------------------------------------------------------------------------------
    \nIsm: ${userData.name}
    \nVaqti: ${userData.courseTime}
    \nKuni: ${userData.courseDay}
    \nTelefon-raqami: ${userData.phoneNumber} \n
------------------------------------------------------------------------------------
    \nSavollar va Javoblar: \n${questionsList
      .map(
        (question, index) =>
          `Savol ${index + 1}: ${question}\nJavob: ${filledAnswers[index]}`
      )
      .join("\n\n")}`;

    const messageParts = splitMessage(message, MAX_MESSAGE_LENGTH);

    sendMessage(messageParts)
      .then(() => {
        alert("Javoblarigiz muvafiqiyatlik yuborildi✅");
        setDisabled(false);
        setAnswers(Array(questionsList.length).fill(""));
        localStorage.removeItem("answers");
        localStorage.removeItem("userData");
        navigate("/");
      })
      .catch((error) => {
        alert("Xatolik yuz berdi❌");
        console.error("Xatolik yuz berdi:", error);
        setDisabled(false);
      });
  };

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
                newAnswers[index] = e.target.value
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
