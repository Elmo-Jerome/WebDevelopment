// quantity js

let addBtn = document.querySelector('#plus-btn');
let subBtn = document.querySelector('#minus-btn');
let qty = document.querySelector('#qty_input');

addBtn.addEventListener('click', () =>{
    if(qty.value >= 20){
        qty.value = 20;
    }
    else{
        qty.value  =parseInt(qty.value) + 1;
    }
});

subBtn.addEventListener('click', () =>{
   if(qty.value <= 1){
       qty.value = 1;
   }
   else{
       qty.value  =parseInt(qty.value) - 1;
   }
});
