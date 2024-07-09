import React, { useState } from "react";
import "./questions.css";

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
  const [answers, setAnswers] = useState(Array(questionsList.length).fill(""));
  const [disabled, setDisabled] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setDisabled(true);

    const userData = JSON.parse(localStorage.getItem("userData"));

    const filledAnswers = answers.map((answer) =>
      answer.trim() === "" ? "-" : answer
    );

    const requestBody = {
      chat_id: YOUR_CHAT_ID,
      text: `
      \nIsm: ${userData.name}
      \nVaqti: ${userData.courseTime}
      \nKuni: ${userData.courseDay}
      \nTelefon-raqami: ${userData.phoneNumber} \n
------------------------------------------
      \nSavollar: \n${filledAnswers
        .map((answer, index) => `Savol ${index + 1}: ${answer}`)
        .join("\n")}`,
    };

    fetch(`https://api.telegram.org/bot${YOUR_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Xatolik yuz berdi");
        }
        return response.json();
      })
      .then((data) => {
        alert("Javoblarigiz muvafiqiyatlik yuborildi✅");
        setDisabled(false);
        setAnswers(Array(questionsList.length).fill(""));
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
