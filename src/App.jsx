import { useState } from "react";

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

const YOUR_BOT_TOKEN = "7038740534:AAHJ85y5kXoFdEP44nLWccJq2rMaw1AtNqw";
const YOUR_CHAT_ID = -1002052638504;

export default function App() {
  const [name, setName] = useState("");
  const [courseDay, setCourseDay] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [goToQuestions, setGoToQuestions] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [answers, setAnswers] = useState(Array(questionsList.length).fill(""));

  const handleSubmit = () => {
    if (name && courseDay && courseTime && phoneNumber) {
      setGoToQuestions(true);
    } else {
      alert("Barcha maydonlarni to'ldiring");
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    setDisabled(true);

    // Bo'sh javoblarni '-' bilan to'ldirish
    const filledAnswers = answers.map((answer) =>
      answer.trim() === "" ? "-" : answer
    );

    const requestBody = {
      chat_id: YOUR_CHAT_ID,
      text: `
      \nIsm: ${name}
      \nVaqti: ${courseTime}
      \nKuni: ${courseDay}
      \nTelefon-raqami: ${phoneNumber} \n
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
        setGoToQuestions(false);
        setDisabled(false);
        setName("");
        setCourseDay("");
        setCourseTime("");
        setPhoneNumber("");
        setAnswers(Array(questionsList.length).fill(""));
      })
      .catch((error) => {
        alert("Xatolik yuz berdi❌");
        console.error("Xatolik yuz berdi:", error);
      });
  };

  return (
    <form>
      {!goToQuestions && (
        <div className="rigister">
          <h1>Ro'yxatdan o'tish</h1>
          <label>
            <p>Ism familiya:</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="F.I.O"
            />
          </label>
          <label>
            <p>Dars kunlaringiz:</p>
            <select
              value={courseDay}
              onChange={(e) => setCourseDay(e.target.value)}
            >
              <option value={""}>Dars kunlari tanlang</option>
              <option value="Dushanba, Chorshanba, Juma">
                Dushanba, Chorshanba, Juma
              </option>
              <option value="Sheshanba, Payshanba, Shanba">
                Sheshanba, Payshanba, Shanba
              </option>
            </select>
          </label>
          <label>
            <p>Dars vaqtini tanlang:</p>
            <select
              value={courseTime}
              onChange={(e) => setCourseTime(e.target.value)}
            >
              <option value={""}>Dars vaqtini tanlang</option>
              <option value="08:00-10:00">08:00 - 10:00</option>
              <option value="10:00-12:00">10:00 - 12:00</option>
              <option value="12:00-14:00">12:00 - 14:00</option>
              <option value="14:00-16:00">14:00 - 16:00</option>
              <option value="16:00-18:00">16:00 - 18:00</option>
            </select>
          </label>
          <label>
            <p>Ota yoki onangizning telefon raqamlari:</p>
            <input
              required
              type="text"
              placeholder="+998 "
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit" onClick={handleSubmit}>
            Jo'natish
          </button>
        </div>
      )}
      {goToQuestions && (
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
      )}
    </form>
  );
}
