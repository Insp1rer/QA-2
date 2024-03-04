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
      if (obj.code && obj["Найменування товару"] && obj["Виробник товару"]) {
        if (!isNaN(obj.code)) {
          if (obj.code % 1 === 0 && obj.code > 0) {
            if (Object.keys(obj).length <= 3) {
              for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                  const value = obj[key].toLowerCase();

                  if (!uniqueValues[key]) {
                    uniqueValues[key] = new Set();
                  }

                  if (
                    uniqueValues[key].has(value) &&
                    key !== "Виробник товару"
                  ) {
                    console.error(
                      `Помилка: Знайдено дубль в товарі під кодом ${obj.code}, ключ - "${key}" та значення - "${value}"`
                    );
                  } else {
                    uniqueValues[key].add(value);
                    console.log(`${key} - ${value}`);
                  }
                }
              }
            } else {
              console.error(
                `Кількість властивостей перевищує 3 в об'єкті з кодом - ${obj.code}`
              );
            }
          } else {
            console.error(
              "Код записаний як дробове число, менший за нуль або рівний нескінченності"
            );
          }
        } else {
          console.error(
            `Помилка: Значення цього коду - "${obj.code}", воно має бути числом`
          );
        }
      } else {
        console.error(
          "Об'єкт пустий, в нього відсутня властивість, або має некоректну назву ключа"
        );
      }
    }
  } else {
    console.log("Не вдалося прочитати файл");
  }
};
