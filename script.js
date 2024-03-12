const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const msg = document.querySelector(".msg");
const i = document.querySelector("i");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector(".dropdown img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let fromCurrCode = fromCurr.value.toLowerCase();
  let toCurrCode = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${fromCurrCode}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let ExchangeRate = data[fromCurrCode][toCurrCode];

  let finalAmount = amtVal * ExchangeRate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});

function swapDropdowns() {
  
  const selectedOption1 = fromCurr.options[fromCurr.selectedIndex];
  const selectedOption2 = toCurr.options[toCurr.selectedIndex];
  
  const selectedIndex1 = fromCurr.selectedIndex;
  const selectedIndex2 = toCurr.selectedIndex;
  
  // Swap options
  fromCurr.removeChild(selectedOption1);
  toCurr.removeChild(selectedOption2);
  
  fromCurr.insertBefore(selectedOption2, fromCurr.options[selectedIndex1]);
  toCurr.insertBefore(selectedOption1, toCurr.options[selectedIndex2]);
}

i.addEventListener("click", () => {
  swapDropdowns();
  updateExchangeRate();
});
