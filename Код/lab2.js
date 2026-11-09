"use strict";
// Гуломов

const Lab2 = (() => {
  function normalize(text) {
    return text.normalize("NFC").toLocaleLowerCase("ru").replace(/ё/g, "е").replace(/[^\p{L}\p{N}]/gu, "");
  }
  function isPalindrome(text) {
    const value = normalize(text);
    return value.length > 0 && value === Array.from(value).reverse().join("");
  }
  function factorial(n) {
    if (!Number.isInteger(n) || n < 0 || n > 500) throw new Error("Для факториала допустимо целое число от 0 до 500.");
    let result = 1n;
    for (let i = 2; i <= n; i++) result *= BigInt(i);
    return result;
  }
  function primesTo(n) {
    const result = [];
    for (let value = 2; value <= n; value++) {
      let prime = true;
      for (let divisor = 2; divisor * divisor <= value; divisor++) {
        if (value % divisor === 0) { prime = false; break; }
      }
      if (prime) result.push(value);
    }
    return result;
  }
  function countToTen() {
    const byWhile = [], byFor = [];
    let i = 1;
    while (i <= 10) { byWhile.push(i); i++; }
    for (let j = 1; j <= 10; j++) byFor.push(j);
    return { byWhile, byFor };
  }
  function quiz(ask, tell) {
    const questions = [
      { question: "Зимой и летом одним цветом. Что это?", answers: ["елка", "ель"] },
      { question: "Висит груша — нельзя скушать. Что это?", answers: ["лампочка", "лампа"] }
    ];
    let score = 0;
    for (const item of questions) {
      const answer = ask(item.question);
      if (answer === null) return { score, cancelled: true };
      if (item.answers.includes(normalize(answer))) {
        score++;
        tell("Верно :)");
      } else { tell("Неверно :("); }
    }
    return { score, cancelled: false };
  }
  function feast(ask) {
    let answer, count = 0;
    do {
      answer = ask("Ещё по одной? Введите 1, чтобы закончить.");
      if (answer === null) return { count, cancelled: true };
      count++;
    } while (answer.trim() !== "1");
    return { count, cancelled: false };
  }
  function guessNumber(ask, tell, random = Math.random) {
    const secret = Math.floor(random() * 100) + 1;
    let attempts = 0;
    while (true) {
      const input = ask("Угадайте целое число от 1 до 100");
      if (input === null) return { attempts, cancelled: true };
      const value = Number(input);
      if (!input.trim() || !Number.isInteger(value) || value < 1 || value > 100) {
        tell("Нужно целое число от 1 до 100.");
        continue;
      }
      attempts++;
      if (value === secret) {
        tell("Верно! Число угадано.");
        return { secret, attempts, cancelled: false };
      }
      tell(value < secret ? "Загаданное число больше." : "Загаданное число меньше.");
    }
  }
  function mount() {
    LabUI.bind("quiz-run", () => {
      const result = quiz(text => prompt(text), text => alert(text));
      LabUI.show("quiz-out", `Отгадки: ${result.score} из 2.${result.cancelled ? " Викторина отменена." : ""}`);
    }, "quiz-out");
    LabUI.bind("count-run", () => {
      const result = countToTen();
      LabUI.show("count-out", `while: ${result.byWhile.join(" ")}\nfor:   ${result.byFor.join(" ")}`);
    }, "count-out");
    LabUI.bind("feast-run", () => {
      const result = feast(text => prompt(text));
      LabUI.show("feast-out", `Число ответов: ${result.count}. ${result.cancelled ? "Ввод отменён." : "Цикл завершён вводом 1."}`);
    }, "feast-out");
    LabUI.bind("journal-run", () => {
      const n = LabUI.parseNumber(document.getElementById("journal").value);
      if (!Number.isInteger(n) || n < 1 || n > 500) throw new Error("Введите номер от 1 до 500.");
      LabUI.show("journal-out", `Номер в журнале: ${n}\n${n}! = ${factorial(n)}\nПростые числа до ${n}: ${primesTo(n).join(", ") || "нет"}`);
    }, "journal-out");
    LabUI.bind("surname-run", () => {
      const surname = document.getElementById("surname").value;
      if (!normalize(surname)) throw new Error("Введите фамилию.");
      LabUI.show("surname-out", `${surname}: ${isPalindrome(surname) ? "палиндром" : "не палиндром"}.`);
    }, "surname-out");
    LabUI.bind("guess-run", () => {
      const result = guessNumber(text => prompt(text), text => alert(text));
      LabUI.show("guess-out", result.cancelled ? `Игра отменена. Попыток: ${result.attempts}.` : `Число ${result.secret} угадано. Попыток: ${result.attempts}.`);
    }, "guess-out");
  }
  return { normalize, isPalindrome, factorial, primesTo, countToTen, quiz, feast, guessNumber, mount };
})();
if (typeof document !== "undefined") Lab2.mount();
if (typeof module !== "undefined") module.exports = Lab2;
