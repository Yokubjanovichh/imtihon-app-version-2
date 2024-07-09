import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import algoritm_logo from "../../assets/algoritm.svg";
import "./rigister.css";

export default function Auth() {
  const [name, setName] = useState("");
  const [courseDay, setCourseDay] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && courseDay && courseTime && phoneNumber) {
      const userData = { name, courseDay, courseTime, phoneNumber };
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/question");
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
    }
  };

  return (
    <form>
      <div className="rigister">
        <div className="paxta">
          <img src={algoritm_logo} alt="logo" />
          <h1>Algoritm edu exam app</h1>
        </div>
        <h1>Ro'yxatdan o'tish</h1>
        <label>
          <p>Ism familiya:</p>
          <input
            type="text"
            value={name}
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
            <option value="Seshanba, Payshanba, Shanba">
              Seshanba, Payshanba, Shanba
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
            value={phoneNumber}
            placeholder="+998 "
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Jo'natish
        </button>
      </div>
    </form>
  );
}
