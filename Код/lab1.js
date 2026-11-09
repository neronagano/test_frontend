"use strict";
// Гуломов

const Lab1 = (() => {
  function calculate(a, b) {
    return {
      sum: a + b, difference: a - b, product: a * b,
      quotient: b === 0 ? "деление на ноль" : a / b,
      remainder: b === 0 ? "деление на ноль" : a % b,
      power: a ** b
    };
  }
  function originalNumber(result) {
    return (result - 7) / 2;
  }
  function ageByYear(name, birthYear, year = new Date().getFullYear()) {
    if (!name.trim()) throw new Error("Имя не должно быть пустым.");
    if (!Number.isInteger(birthYear) || birthYear < 1900 || birthYear > year) {
      throw new Error(`Год рождения должен быть целым от 1900 до ${year}.`);
    }
    return `${name.trim()}: ${year - birthYear}`;
  }
  function mount() {
    LabUI.bind("number-run", () => {
      const raw = prompt("Введите любое число", "12.5");
      if (raw === null) return LabUI.show("number-out", "Ввод отменён.");
      const value = LabUI.parseNumber(raw);
      LabUI.show("number-out", `Исходный ввод: ${raw}\nТип ввода: ${typeof raw}\nЧисло: ${value}\nТип числа: ${typeof value}`);
    }, "number-out");
    LabUI.bind("calc-run", () => {
      const a = LabUI.askNumber("Первое число", "12");
      if (a === null) return LabUI.show("calc-out", "Ввод отменён.");
      const b = LabUI.askNumber("Второе число", "5");
      if (b === null) return LabUI.show("calc-out", "Ввод отменён.");
      const result = calculate(a, b);
      const operations = [["+", "sum"], ["-", "difference"], ["*", "product"], ["/", "quotient"], ["%", "remainder"], ["**", "power"]];
      LabUI.show("calc-out", operations.map(([sign, key]) => `${a} ${sign} ${b} = ${LabUI.number(result[key])}`).join("\n"));
    }, "calc-out");
    LabUI.bind("mind-run", () => {
      const y = LabUI.askNumber("Задумайте число, умножьте его на 2, прибавьте 7. Введите результат", "27");
      LabUI.show("mind-out", y === null ? "Ввод отменён." : `Вы задумали число ${originalNumber(y)}.`);
    }, "mind-out");
    LabUI.bind("age-run", () => {
      const name = prompt("Введите имя", "Довуд");
      if (name === null) return LabUI.show("age-out", "Ввод отменён.");
      const year = LabUI.askNumber("Введите год рождения", "2005");
      if (year === null) return LabUI.show("age-out", "Ввод отменён.");
      const result = ageByYear(name, year);
      LabUI.show("age-out", `${result}\nВозраст рассчитан по году рождения.`);
      const popup = window.open("", "ageResult", "width=520,height=260");
      if (!popup) {
        LabUI.show("age-out", `${result}\nРазрешите всплывающее окно для вывода через document.write().`);
        return;
      }
      popup.document.open();
      popup.document.write(`<!doctype html><html lang="ru"><meta charset="utf-8"><title>Возраст по году рождения</title><body><p>${LabUI.escape(result)}</p></body></html>`);
      popup.document.close();
    }, "age-out");
  }
  return { calculate, originalNumber, ageByYear, mount };
})();
if (typeof document !== "undefined") Lab1.mount();
if (typeof module !== "undefined") module.exports = Lab1;
