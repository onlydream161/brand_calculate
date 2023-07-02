const form1 = document.querySelector(".form1");
const form2 = document.querySelector(".form2");
const popupButton = document.querySelector(".button__popup");
const tableBody = document.querySelector(".table__body");

let data1 = {};
let data2 = {};
const data1Function = function (event) {
  event.preventDefault();
  let data = Object.fromEntries(new FormData(form1));
  data1 = { ...data };
};
const data2Function = function (event) {
  event.preventDefault();
  let data = Object.fromEntries(new FormData(form2));
  data2 = { ...data };
};

form1.addEventListener("submit", (event) => {
  data1Function(event);
  console.log(data1);
});
form2.addEventListener("submit", (event) => {
  deletePrice();
  data2Function(event);
  answers(data2, data1);
});

// переводим логистику в число
const correctLogistic = function (otsrochka, price) {
  let numberotsrochka = Number(otsrochka);
  let numberPrice = Number(price);
  let peremNumber = numberPrice + 0 + 5 + 2.95;
  let sum = ((peremNumber * 0.12) / 365) * numberotsrochka;
  return sum;
};

//общая формула
const sumFormula = function (logist, price, fasovka, marga) {
  let priceNum = Number(price);
  let fasovkaNum = Number(fasovka);
  let margaNum = Number(marga);
  let kosvennie = 1.61;
  let dostavka = 4.17;
  let praymieZatrats = 3.37;
  let sum =
    (logist + dostavka + priceNum / 1.1) * fasovkaNum +
    margaNum +
    kosvennie +
    praymieZatrats;
  return sum;
};
//вывод цен
const answers = function sum(obj, obj2) {
  for (category in obj) {
    if (obj[category]) {
      let correctlog = correctLogistic(obj2.otsrochka, obj[category]);

      let lastSum = sumFormula(
        correctlog,
        obj[category],
        obj2.fasovka,
        obj2.marga
      );

      console.log(`${category} : ${lastSum.toFixed(2)} `);
      let tr = document.createElement("tr");

      tr.innerHTML = `<td>${category}</td> <td>${lastSum.toFixed(2)}</td>`;
      tableBody.append(tr);
    }
  }
};
// очистка цен
const deletePrice = function () {
  tableBody.innerHTML = "";
};
