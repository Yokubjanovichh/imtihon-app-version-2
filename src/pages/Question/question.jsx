import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./questions.css";

const YOUR_BOT_TOKEN = "7577646788:AAHrRTCGqLM4JU8stvqlFa5piSkRiFynKzk";
const YOUR_CHAT_ID = -4514273857;
const MAX_MESSAGE_LENGTH = 4096;

const questionsList = [
  "CSS nima va nima uchun ishlatiladi?",
  "CSS qanday HTML sahifaga qo‘shiladi?",
  "class va id selectorlari o‘rtasidagi farq nima?",
  "CSS faylini HTML sahifasiga qanday ulash mumkin?",
  "color xususiyati nima va qanday ishlatiladi?",
  "Font o‘lchamini o‘zgartirish uchun qaysi xususiyatdan foydalaniladi?",
  "Margin va Padding o‘rtasidagi farq nima?",
  "CSSda 'box model' nima?",
  "Bir nechta elementlarga bitta class yoki id ni berish mumkinmi?",
  "CSSda position xususiyatining turli qiymatlari nimani anglatadi?",
  "Pseudo-sinfi nima va qanday ishlatiladi?",
  "display: block va display: inline o‘rtasidagi farq nima?",
  "Elementning hajmi va o‘rni qanday belgilanishi mumkin?",
  "Background image qo‘shish uchun qaysi CSS qoidalari ishlatiladi?",
  "Elementning chekka chiziqlarini (border) qanday o‘zgartirish mumkin?",
  "hover pseudo-sinfi qanday ishlaydi?",
  "CSS transition xususiyati nima va qanday qo‘llaniladi?",
  "max-width va min-width xususiyatlari nima?",
  "Flexbox modeli nima va qanday ishlaydi?",
  "Elementlar orasidagi bo'shliqni qanday o'rnatish mumkin?",
  "Shriftning stilini (bold, italic) qanday belgilash mumkin?",
  "CSSda text-transform xususiyati nima va qanday ishlatiladi?",
  "Elementning to‘liq ko‘rinmas bo‘lishi uchun qaysi xususiyat ishlatiladi?",
  "Text-align xususiyati nima va qanday ishlatiladi?",
  "Elementning kengligi va balandligini pikselda qanday belgilash mumkin?",
  "Border-radius xususiyati nima va u qanday ishlatiladi?",
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
