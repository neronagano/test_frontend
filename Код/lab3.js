"use strict";
// Гуломов

const Lab3 = (() => {
  function randomArray(length = 15, random = Math.random) {
    return Array.from({ length }, () => Math.floor(random() * 41) - 10);
  }
  function statistics(values) {
    let positiveSum = 0, negativeSum = 0, positiveCount = 0, negativeCount = 0, zeros = 0;
    for (const value of values) {
      if (value > 0) { positiveSum += value; positiveCount++; }
      else if (value < 0) { negativeSum += value; negativeCount++; }
      else { zeros++; }
    }
    return { positiveSum, negativeSum, positiveCount, negativeCount, zeros,
      positiveMean: positiveCount ? positiveSum / positiveCount : null,
      negativeMean: negativeCount ? negativeSum / negativeCount : null };
  }
  function squareNegatives(values) {
    if (values.length <= 10) throw new Error("Массив должен содержать больше 10 чисел.");
    return values.map(value => value < 0 ? value ** 2 : value);
  }
  function analyzeColors(values) {
    const counts = [0, 0, 0], longest = [0, 0, 0];
    let previous = -1, run = 0;
    for (const value of values) {
      counts[value]++;
      run = value === previous ? run + 1 : 1;
      previous = value;
      longest[value] = Math.max(longest[value], run);
    }
    const maximum = Math.max(...longest);
    const leaders = [0, 1, 2].filter(color => longest[color] === maximum && maximum > 0);
    return { count: values.length, counts, longest, maximum, leaders };
  }
  function simulate(count = 1000000, random = Math.random) {
    const values = new Uint8Array(count);
    for (let i = 0; i < count; i++) values[i] = Math.floor(random() * 3);
    return analyzeColors(values);
  }
  function mount() {
    LabUI.bind("random-run", () => {
      const values = randomArray();
      const s = statistics(values);
      LabUI.show("random-out", `Массив: ${values.join(", ")}\nПоложительных: ${s.positiveCount}; сумма: ${s.positiveSum}\nСреднее положительных: ${LabUI.number(s.positiveMean)}`);
      window.lab3Random = { values, statistics: s };
    }, "random-out");
    LabUI.bind("array-run", () => {
      const values = LabUI.array(document.getElementById("array").value);
      const squared = squareNegatives(values), s = statistics(values);
      LabUI.show("array-out", `Исходный массив (${values.length}): ${values.join(", ")}\nПосле замены: ${squared.join(", ")}\nСреднее положительных: ${LabUI.number(s.positiveMean)}\nСреднее отрицательных: ${LabUI.number(s.negativeMean)}\nНулей: ${s.zeros}`);
    }, "array-out");
    LabUI.bind("simulation-run", () => {
      const result = simulate();
      const names = ["красный", "чёрный", "белый"];
      const lines = names.map((name, i) => `${name}: выпадений ${result.counts[i]}; максимальная серия ${result.longest[i]}`);
      LabUI.show("simulation-out", `Испытаний: ${result.count}\n${lines.join("\n")}\nСамая длинная серия: ${result.maximum}; цвет: ${result.leaders.map(i => names[i]).join(", ")}`);
      window.lab3Simulation = result;
    }, "simulation-out");
  }
  return { randomArray, statistics, squareNegatives, analyzeColors, simulate, mount };
})();
if (typeof document !== "undefined") Lab3.mount();
if (typeof module !== "undefined") module.exports = Lab3;
