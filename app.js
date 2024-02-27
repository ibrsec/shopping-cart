//Constants
const TAX_RATE = 0.18;

const products = document.querySelector(".products");

products.addEventListener("click", (e) => {
  // console.log(e.target);
  //plus
  if (e.target.classList.contains("fa-plus")) {

    e.target.previousElementSibling.textContent++;
    calculatePrice(e.target);
    console.log();

    //minus
  } else if (e.target.classList.contains("fa-minus")) {

    if (Number(e.target.nextElementSibling.textContent) > 1) {
      e.target.nextElementSibling.textContent--;
      calculatePrice(e.target);
    }

    //remove
  } else if (e.target.classList.contains("removeBtn")) {
      e.target.closest(".product").remove();
      calculatePrice(e.target);
    if(document.querySelectorAll(".product").length == 0){
        products.textContent = "No Product"
    }


  }
});

const calculatePrice = (btn) => {
 
    const quantity = Number(
        btn.closest(".product").querySelector("#quantity").textContent
      );


  const price = Number(
    btn.closest(".product").querySelector(".product-price").textContent
  );



  //total each product price
  btn.closest(".product").querySelector(".product-total").textContent = (
    quantity * price
  ).toFixed(2);

  calculateTotalPrices();

};




const calculateTotalPrices = ()=> {

  //order part
  const prices = document.querySelectorAll(".product-total");
  const selectedTotalPriceSpan = document.querySelector("#selectedTotalPrice");

  //total selected price
  const totalSelectedPrice = [...prices].reduce(
    (total, current) => total + +current.textContent,
    0
  );

  selectedTotalPriceSpan.textContent = totalSelectedPrice.toFixed(2);

  //shipping
  const shippingDrop = document.querySelector("#shippingDrop");
const selectedIndex = shippingDrop.selectedIndex;

const shippingPrice =  
+selectedTotalPriceSpan.textContent > 0 ?
shippingDrop.options[selectedIndex].value :
0;


//tax
const taxPriceSpan = document.querySelector("#taxPrice");

taxPriceSpan.textContent = (+selectedTotalPriceSpan.textContent * TAX_RATE).toFixed(2);


//total
const totalPriceSpan = document.querySelector("#totalPrice");
totalPriceSpan.textContent = (+selectedTotalPriceSpan.textContent + +shippingPrice + +taxPriceSpan.textContent).toFixed(2); 
}

document.querySelector("#shippingDrop").onchange = ()=>{
    calculateTotalPrices();
}


window.onload = ()=>{
    calculateTotalPrices();
}