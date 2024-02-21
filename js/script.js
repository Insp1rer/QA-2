// import data from "./" assert { type: "json" };

// console.log(data);
// fetch("./json/data.json")
//   .then((response) => response.json())
//   .then((test) => showInfo(test));

// function showInfo(test) {
//   console.table(test.products);
// }

let http = new XMLHttpRequest();

http.open("get", "data.json", true);
http.send();

http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let fullArray = JSON.parse(this.response);

    let uniqueValues = {};

    for (const obj of fullArray) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key].toLowerCase();

          if (!uniqueValues[key]) {
            uniqueValues[key] = new Set();
          }

          if (uniqueValues[key].has(value)) {
            console.error(
              `Помилка: Знайдено дубль для ключа ${key} та значення ${value}`
            );
          } else {
            uniqueValues[key].add(value);
          }
        }
      }
    }
  }
};
