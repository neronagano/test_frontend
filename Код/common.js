"use strict";

const LabUI = {
  show(id, text) {
    document.getElementById(id).textContent = text;
  },
  bind(id, action, output) {
    document.getElementById(id).addEventListener("click", () => {
      try { action(); }
      catch (error) { this.show(output, error.message); }
    });
  },
  parseNumber(text) {
    if (text === null) return null;
    const value = text.trim().replace(",", ".");
    if (!value || !Number.isFinite(Number(value))) {
      throw new Error("Введите конечное число.");
    }
    return Number(value);
  },
  askNumber(message, initial = "") {
    return this.parseNumber(prompt(message, initial));
  },
  array(text) {
    const parts = text.trim().split(/[\s,;]+/).filter(Boolean);
    if (!parts.length) throw new Error("Введите элементы массива.");
    const values = parts.map(Number);
    if (values.some(value => !Number.isFinite(value))) {
      throw new Error("В массиве допустимы только конечные числа.");
    }
    return values;
  },
  number(value) {
    if (value === null) return "нет элементов";
    if (typeof value === "string") return value;
    if (!Number.isFinite(value)) return "результат вне диапазона Number";
    return String(Number(value.toPrecision(12)));
  },
  escape(text) {
    return String(text).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }
};
