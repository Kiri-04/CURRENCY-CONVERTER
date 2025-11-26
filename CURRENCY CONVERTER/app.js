// const BASE_URL = "https://v6.exchangerate-api.com/v6/abcd1234/latest";

// const dropdown = document.querySelectorAll(".dropdown select")
// const btn = document.querySelector("form button");
// const fromCurr=document.querySelector(".from select");
// const toCurr=document.querySelector(".to select");

// for(let select of dropdown){
//     for(currCode in countryList){
//         let newOption = document.createElement("option");
//         newOption.textContent=currCode;
//         newOption.value=currCode;
//         if(select.name==="from" && currCode==="USD"){
//             newOption.selected="selected";
//         }
//         select.append(newOption);
//     }
//     select.addEventListener("change",(evt) => {
//         updateFlag(evt.target);
//     });
// }

// const updateFlag = (element) => {
//     let currCode=element.value;
//     let countryCode=countryList[currCode];
//     let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img=element.parentElement.querySelector("img");
//     img.src=newSrc;
// };

// btn.addEventListener("click",async(evt) =>{
//     evt.preventDefault();
//     let amount=document.querySelector(".amount input");
//     let amtVal=amount.value;
//     if(amtVal===""|| amtVal<0){
//         amtVal=1;
//         amount.value="1";
//     }
//     // console.log(fromCurr.value,toCurr.value);
//     // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
//     const BASE_URL = "https://v6.exchangerate-api.com/v6/abcd1234/latest";
//     let response = await fetch(URL);
//     console.log(response);
// });


const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdown) {
  for (let currCode in countryList) {
    const opt = document.createElement("option");
    opt.value = currCode;
    opt.textContent = currCode;
    if (select.name === "from" && currCode === "USD") opt.selected = true;
    if (select.name === "to" && currCode === "INR") opt.selected = true;
    select.append(opt);
  }
  select.addEventListener("change", e => {
    const img = e.target.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryList[e.target.value]}/flat/64.png`;
  });
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = parseFloat(document.querySelector(".amount input").value);
  if (isNaN(amount) || amount <= 0) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;
  const url = `https://open.er-api.com/v6/latest/${from}`; 

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("API data:", data);

    if (data.result === "success" && data.rates[to]) {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      msg.textContent = `${amount} ${from} = ${converted} ${to}`;
    } else {
      msg.textContent = "Conversion failed. Please try again.";
      console.error("Response missing rate or unsuccessful:", data);
    }
  } catch (err) {
    msg.textContent = "Network or fetch error. Check your connection.";
    console.error(err);
  }
});




