const form_type = document.querySelector(".form_type");
const form1 = document.querySelector(".form1");
const form2 = document.querySelector(".form2");
const popupButton = document.querySelector(".button__popup");
const tableBody = document.querySelector(".table__body");
const nowTitle = document.querySelector(".nowType");

let dataType = {};
let data1 = {};
let data2 = {};
const dataTypeFunction = function (event) {
  event.preventDefault();
  let data = Object.fromEntries(new FormData(form_type));
  console.log(data);
  let title = `Вы считаете:  ${data.type} `;
  console.log(title);
  nowTitle.textContent = title;
  dataType = { ...data };
};
const data1Function = function (event) {
  event.preventDefault();
  let data = Object.fromEntries(new FormData(form1));
  data1 = { ...data };
};
const data2Function = function (event) {
  event.preventDefault();
  let data = Object.fromEntries(new FormData(form2));
  console.log(data);
  data2 = { ...data };
};
form_type.addEventListener("submit", (event) => {
  dataTypeFunction(event);
  deletePrice();
  deleteValye();
  console.log(dataType);
});

form1.addEventListener("submit", (event) => {
  data1Function(event);
  console.log(data1);
});
form2.addEventListener("submit", (event) => {
  deletePrice();

  data2Function(event);
  if (dataType.type == "brand") {
    answers(data2, data1, correctLogistic, sumFormula);
  }
  if (dataType.type == "noname") {
    answers(data2, data1, correctLogisticNoname, sumNoName);
  }
  if (dataType.type == "orehi") {
    answersMishkino(data2, data1, orehiFunction, 1.2);
  }
  if (dataType.type == "eco_crupi") {
    answersMishkino(data2, data1, ecoCrupFunction, 1.1);
  }
});

// переводим brand логистику в число
const correctLogistic = function (otsrochka, price, logist) {
  let numberotsrochka = Number(otsrochka);
  let numberPrice = Number(price);
  let logistika = Number(logist);
  let peremNumber = numberPrice + 0 + logistika + 2.95;
  let sum = ((peremNumber * 0.12) / 365) * numberotsrochka;

  return sum;
};

//общая формула Brand
const sumFormula = function (logist, price, fasovka, marga, logisticData) {
  let priceNum = Number(price);
  let fasovkaNum = Number(fasovka);
  let margaNum = Number(marga);
  let logistData = Number(logisticData);
  let kosvennie = 1.61;
  let dostavka = (logistData + 0) / 1.2;

  let praymieZatrats = 3.2;
  let sum =
    (logist + dostavka + priceNum / 1.1) * fasovkaNum +
    margaNum +
    kosvennie +
    praymieZatrats;

  return sum;
};
// переводим noname логистику в число
const correctLogisticNoname = function (otsrochka, price, dataLogist) {
  let numberotsrochka = Number(otsrochka);
  let numberPrice = Number(price);
  let logistData = Number(dataLogist);
  let peremNumber = numberPrice + 0 + logistData + 2.95;
  let sum = ((peremNumber * 0.12) / 365) * numberotsrochka;
  return sum;
};
//форумла Noname
const sumNoName = function (logist, price, fasovka, marga, logisticData) {
  let priceNum = Number(price);
  let fasovkaNum = Number(fasovka);
  let margaNum = Number(marga);
  let logistData = Number(logisticData);
  let kosvennie = 1.43;
  // тут ошибка!!!!! доставка считатся другая
  let dostavka = (logistData + 0) / 1.18;
  let praymieZatrats = 1.66;
  let sum =
    (logist + dostavka + priceNum / 1.1) * fasovkaNum +
    margaNum +
    kosvennie +
    praymieZatrats;
  return sum;
};
//вывод цен brand и noname
const answers = function sum(obj, obj2, functionLogistic, mainformula) {
  for (category in obj) {
    if (obj[category]) {
      let correctlog = functionLogistic(
        obj2.otsrochka,
        obj[category],
        obj2.logistika
      );
      console.log(correctlog);
      let lastSum = mainformula(
        correctlog,
        obj[category],
        obj2.fasovka,
        obj2.marga,
        obj2.logistika
      );

      console.log(`${category} : ${lastSum.toFixed(2)} `);
      let retro = Number(obj2.retro * lastSum.toFixed(2));
      let sNds = lastSum.toFixed(2) * 1.1;
      let sRetro = sNds + retro;
      let tr = document.createElement("tr");

      tr.innerHTML = `<td>${category}</td> <td>${lastSum.toFixed(
        2
      )}</td><td>${sNds.toFixed(2)}</td> <td>${sRetro.toFixed(2)}</td>`;
      tableBody.append(tr);
    }
  }
};

// функция подсчета Орехи
const orehiFunction = function (fasovka, price, otsrochka, logistica, marga) {
  let fasovka1 = Number(fasovka);
  let price1 = Number(price);
  let otsrochka1 = Number(otsrochka);
  let logistica1 = Number(logistica);
  let marga1 = Number(marga);
  let sirio = (fasovka1 * price1) / 1.2;
  let gafrocarton = 0.75;
  let indivUpakovka = 1.47;
  let fasovkaAll = 3.98;
  let finance = Number(
    (((fasovka1 * price1 + 2.95) * 0.12) / 365) * otsrochka1
  );
  let totalsumSNds =
    (sirio + gafrocarton + indivUpakovka + fasovkaAll) * 1.2 +
    finance +
    logistica1 * fasovka1 +
    marga1;

  return totalsumSNds;
};

//функция вывода ЭкоКрупы
const ecoCrupFunction = function (fasovka, price, otsrochka, logistica, marga) {
  let fasovka1 = Number(fasovka);
  let price1 = Number(price);
  let otsrochka1 = Number(otsrochka);
  let logistica1 = Number(logistica);
  let marga1 = Number(marga);
  let sirio = (fasovka1 * price1) / 1.1;
  let gafrocarton = 1.25;
  let indivUpakovka = 2.5;
  let fasovkaAll = 3.98;
  let finance = Number(
    (((fasovka1 * price1 + 2.95) * 0.12) / 365) * otsrochka1
  );
  let totalsumSNds =
    (sirio + gafrocarton + indivUpakovka + fasovkaAll) * 1.1 +
    finance +
    logistica1 * fasovka1 +
    marga1;

  return totalsumSNds;
};

// функция вывода орехи
const answersMishkino = function (obj1, obj2, mainformula, nds) {
  for (category in obj1) {
    if (obj1[category]) {
      let lastSum = mainformula(
        obj2.fasovka,
        obj1[category],
        obj2.otsrochka,
        obj2.logistika,
        obj2.marga
      );

      let noNds = lastSum / nds;
      let withpromo = lastSum + noNds * Number(obj2.retro);

      let tr = document.createElement("tr");

      tr.innerHTML = `<td>${category}</td> <td>${noNds.toFixed(
        2
      )}</td><td>${lastSum.toFixed(2)}</td> <td>${withpromo.toFixed(2)}</td>`;
      tableBody.append(tr);
    }
  }
};
// очистка цен
const deletePrice = function () {
  tableBody.innerHTML = "";
};

// очистка инпутов
const inputs = document.querySelectorAll("input[type=text]");
const deleteValye = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
};
