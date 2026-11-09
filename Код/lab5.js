"use strict";
// Гуломов

const Lab5 = (() => {
  function scopeExample() {
    const output = [];
    function showMessage() {
      let message = "Привет, я JavaScript!";
      output.push(message);
    }
    showMessage();
    let error = "";
    try { output.push(message); }
    catch (exception) { error = exception.name; }
    return { message: output[0], error };
  }
  function isPalindrome(text) {
    const normalized = text.normalize("NFC").toLocaleLowerCase("ru").replace(/ё/g, "е").replace(/[^\p{L}\p{N}]/gu, "");
    return normalized.length > 0 && normalized === Array.from(normalized).reverse().join("");
  }
  function squareNegatives(values) {
    if (values.length <= 10) throw new Error("Массив должен содержать больше 10 чисел.");
    return values.map(value => value < 0 ? value ** 2 : value);
  }
  class UserName {
    constructor(name) { this.name = name; }
    showName() { return this.name; }
  }
  class Greeting {
    constructor(userName) { this.userName = userName; }
    showMessage() {
      let message = "Привет, " + this.userName;
      return message;
    }
  }
  class NameReverser {
    constructor(name) { this.name = name; }
    reverse() { return Array.from(this.name).reverse().join(""); }
  }
  function classEvidence(name) {
    const user = new UserName(name);
    let callError = "";
    try { UserName(name); } catch (error) { callError = error.name; }
    return { type: typeof UserName, instance: user instanceof UserName,
      methodInPrototype: Object.hasOwn(UserName.prototype, "showName"), callError };
  }
  function mount() {
    LabUI.bind("scope-run", () => {
      const result = scopeExample();
      LabUI.show("scope-out", `Внутри функции: ${result.message}\nОбращение к message снаружи: ${result.error}\nОшибка перехвачена: переменная локальная.`);
    }, "scope-out");
    LabUI.bind("palindrome-run", () => {
      const text = document.getElementById("text").value;
      LabUI.show("palindrome-out", `${text}: ${isPalindrome(text) ? "палиндром" : "не палиндром"}.`);
    }, "palindrome-out");
    LabUI.bind("squares-run", () => {
      const values = LabUI.array(document.getElementById("values").value);
      LabUI.show("squares-out", `До:    ${values.join(", ")}\nПосле: ${squareNegatives(values).join(", ")}`);
    }, "squares-out");
    LabUI.bind("classes-run", () => {
      const name = document.getElementById("person-name").value.trim();
      if (!name) throw new Error("Введите имя.");
      const user = new UserName(name), greeting = new Greeting("Вася"), reverse = new NameReverser(name);
      const proof = classEvidence(name);
      LabUI.show("classes-out", `UserName: ${user.showName()}\nGreeting: ${greeting.showMessage()}\nNameReverser: ${reverse.reverse()}\ntypeof UserName: ${proof.type}\ninstanceof UserName: ${proof.instance}\nМетод в prototype: ${proof.methodInPrototype}\nВызов без new: ${proof.callError}`);
    }, "classes-out");
  }
  return { scopeExample, isPalindrome, squareNegatives, UserName, Greeting, NameReverser, classEvidence, mount };
})();
if (typeof document !== "undefined") Lab5.mount();
if (typeof module !== "undefined") module.exports = Lab5;
