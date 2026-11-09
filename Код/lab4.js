"use strict";
// Гуломов

const Lab4 = (() => {
  function objectExample(notify) {
    const user = { name: "Джон", age: 30 };
    user.sayHi = function() { notify("Привет!"); };
    user.sayHi();
    return user;
  }
  function buyerInfo() {
    const buyer = {
      id: 1, name: "Довуд", city: "Москва",
      email: "student@example.org", ordersCount: 2, discount: 5
    };
    return { buyer, selected: { name: buyer.name, city: buyer.city, ordersCount: buyer.ordersCount } };
  }
  const users = [
    { id: 1, name: "Довуд", active: true },
    { id: 2, name: "Даниил", active: true },
    { id: 3, name: "Кирил", active: false }
  ];
  const restaurants = [
    { id: 1, name: "Кафе 1", open: true },
    { id: 2, name: "Кафе 2", open: false }
  ];
  const orders = [
    { id: 101, userId: 1, restaurantId: 1, total: 1200, status: "новый" },
    { id: 102, userId: 2, restaurantId: 1, total: 650, status: "выдан" },
    { id: 103, userId: 3, restaurantId: 2, total: 800, status: "новый" }
  ];
  function selectOrders(minimum = 1000) {
    const selected = [];
    for (const order of orders) {
      const user = users.find(item => item.id === order.userId);
      const restaurant = restaurants.find(item => item.id === order.restaurantId);
      if (order.status === "новый" && order.total >= minimum && user.active && restaurant.open) {
        selected.push({ order: order.id, user: user.name, restaurant: restaurant.name, total: order.total });
      }
    }
    return selected;
  }
  function User(name) {
    this.name = name;
    this.isAdmin = false;
    this.sayHi = function() { return `Меня зовут: ${this.name}`; };
  }
  function groupUsers(names) {
    return names.map(name => new User(name));
  }
  function Student(name, group, course) {
    this.name = name;
    this.group = group;
    this.course = course;
    this.describe = function() {
      return `Студент: ${this.name}\nГруппа: ${this.group}\nКурс: ${this.course}`;
    };
  }
  function mount() {
    LabUI.bind("object-run", () => {
      const user = objectExample(text => alert(text));
      LabUI.show("object-out", `Имя: ${user.name}\nВозраст: ${user.age}\nТип sayHi: ${typeof user.sayHi}\nМетод вывел: Привет!`);
    }, "object-out");
    LabUI.bind("buyer-run", () => {
      const result = buyerInfo();
      LabUI.show("buyer-out", `В объекте ${Object.keys(result.buyer).length} свойств. Выбрано три:\nИмя: ${result.selected.name}\nГород: ${result.selected.city}\nЧисло заказов: ${result.selected.ordersCount}`);
    }, "buyer-out");
    LabUI.bind("orders-run", () => {
      const minimum = LabUI.parseNumber(document.getElementById("minimum").value);
      if (minimum < 0) throw new Error("Минимальная сумма не может быть отрицательной.");
      const result = selectOrders(minimum);
      LabUI.show("orders-out", result.length ? result.map(item => `Заказ ${item.order}: ${item.user}; ${item.restaurant}; ${item.total} руб.`).join("\n") : "Подходящих заказов нет.");
    }, "orders-out");
    LabUI.bind("group-run", () => {
      const names = document.getElementById("names").value.split(/[,;\n]+/).map(x => x.trim()).filter(Boolean);
      if (!names.length) throw new Error("Введите хотя бы одно имя.");
      const group = groupUsers(names);
      LabUI.show("group-out", group.map(user => `${user.sayHi()}; isAdmin: ${user.isAdmin}`).join("\n"));
    }, "group-out");
    LabUI.bind("student-run", () => {
      const student = new Student("Гуломов Довуд", "ИСТ-Б-02-Д-2023-1", 4);
      LabUI.show("student-out", student.describe());
    }, "student-out");
  }
  return { objectExample, buyerInfo, users, restaurants, orders, selectOrders, User, groupUsers, Student, mount };
})();
if (typeof document !== "undefined") Lab4.mount();
if (typeof module !== "undefined") module.exports = Lab4;
