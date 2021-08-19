let carts =document.querySelectorAll('.cart_icon');
let src =document.querySelectorAll('.product_img img');
let dd =document.querySelectorAll('.product .por-info p');
let allproduct= document.querySelectorAll('.product');
let names= document.querySelectorAll(' .prodname');
let prices=document.querySelectorAll(' .product-price');
let product=[];

for(let i=0;i<prices.length;i++){
   
  
    product=[
        ...product,
       {
        name:names[i].textContent,
        id: i,
        price:  parseInt(prices[i].textContent),
        img: src[i].getAttribute('src'),
        details: dd[i].textContent,
        incart:0
       } 
    ]
}
console.log(product);
function onloadcartnum(){
    let num=localStorage.getItem('cartsNumber');
    if(num ){
        document.querySelector('.add-cart span').textContent= num;
    }
}

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartsNumber(product[i]);
        totalCost(product[i]);
        productSelcted(product[i]);
    })
}


function productSelcted(Product){
    let sss=localStorage.getItem('selected-pp')
    
    if(sss){
        
        localStorage.removeItem("selected-pp");
        localStorage.setItem('selected-pp',JSON.stringify(Product));
    }else{
        localStorage.setItem('selected-pp',JSON.stringify(Product));
    }
}


function writeDetails(){
    let Details= document.querySelector('.product-details');
    let Selected=localStorage.getItem('selected-pp');
    Selected=JSON.parse(Selected);
    if(Selected && Details){
        Details.innerHTML=`
        <div class="details_cont">
        <div class="left">
            <img src="${Selected.img}">
        </div>
        <div class="right">
            <h1>${Selected.name}</h1>
            <div class="price">Product price: <span>${Selected.price}</span></div>
            <form>
               
                <a href="index.html">Submit</a>
            </form>
            <div class="details">
                <h3>Product Details</h3>
                <p>
                    ${Selected.details}
                </p>
            </div>
        </div>
    </div>
        
        
        `
    }



}


writeDetails();









function cartsNumber(product){
    let num=localStorage.getItem('cartsNumber');
    num=parseInt(num);
    if(num){
        localStorage.setItem('cartsNumber',num+1)
        document.querySelector('.add-cart span').textContent= num+1;

    }else{
        localStorage.setItem('cartsNumber',1);
        document.querySelector('.add-cart span').textContent=1;
    }

    setItem(product);
}
function deletecartsNumber(product){
    let num=localStorage.getItem('cartsNumber');
    num=parseInt(num);
    localStorage.setItem('cartsNumber',num-1);
    document.querySelector('.add-cart span').textContent= num-1;

}




function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');

    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost+product.price);
    }else{
        localStorage.setItem('totalCost',product.price);
    }
}


function deletefromtotalcost(product){
    let cartCost=localStorage.getItem('totalCost');
    cartCost=parseInt(cartCost);
    localStorage.setItem('totalCost',cartCost-product.price);
}

function deleteitemfromtotalcost(product){
    let cartCost=localStorage.getItem('totalCost');
    cartCost=parseInt(cartCost);
    localStorage.setItem('totalCost',cartCost-product.price*product.incart);
    
}

function setItem(product){
    let cartItem=localStorage.getItem('productInCart');
    cartItem=JSON.parse(cartItem);///////////////////
    if(cartItem != null){
        if( cartItem[product.id] == undefined) {
            cartItem={
                ...cartItem,
                [product.id]: product
            }
        }
        cartItem[product.id].incart+=1;

    }else{
        product.incart=1;
        cartItem= {
            [product.id]: product
        }
    }

    localStorage.setItem('productInCart',JSON.stringify(cartItem));
}
let x=[];
function displaycarts(){
    let cartItem=localStorage.getItem('productInCart');
    cartItem=JSON.parse(cartItem);
    let productContainer= document.querySelector('.product-list');
    if(cartItem && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItem).map(item=>{
            productContainer.innerHTML+=`



            <div class="row">
            <div class="col-5 list name-p">
                <a  herf="" class="cansle"> <i class="fas fa-times-circle"></i></a> 
                <img src="${item.img}" alt="">
                <p>${item.name}</p>

            </div>
            <div class="col-2 list price">
            
                <p>${item.price}</p>
            </div>
            <div class="col-3 list quantaty ">
                <a class="increas"> <i class="fas fa-arrow-alt-circle-up"></i></a> 
                <span> ${item.incart}</span>
                <a class="decreas" ><i class="fas fa-arrow-alt-circle-down"></i></a> 

            </div>
            <div class="col-2 list tot-gg">
              <p>${item.price*item.incart}</p>

            </div>

        </div>



            
           
            `
            x=[...x, item.id]
        });
        
        let cartCost=localStorage.getItem('totalCost');

        let ff=document.querySelector('.toal-product .row span');
        ff.textContent=cartCost;
       

    }

}




displaycarts();
onloadcartnum();

let inc=document.querySelectorAll('.increas')

for (let i=0;i<inc.length;i++){
    inc[i].addEventListener('click',() =>{
        increasItem(i);
    })
}





function increasItem(i){
    console.log(x[i])
    let cartItem=localStorage.getItem('productInCart');
    cartItem=JSON.parse(cartItem);
    let nan= document.querySelectorAll('.quantaty span');
    nan[i].textContent=parseInt( cartItem[x[i]].incart)+1;
    cartsNumber(cartItem[[x[i]]]);
    totalCost(cartItem[[x[i]]]);
    let cartCost=localStorage.getItem('totalCost');
    let ff=document.querySelector('.toal-product .row span');
    ff.textContent=cartCost;
    let check =parseInt( cartItem[x[i]].incart)+1;
    let productCost=document.querySelectorAll('.tot-gg');
    productCost[i].textContent=check*cartItem[[x[i]]].price;
}
let dec=document.querySelectorAll('.decreas')

for (let i=0;i<inc.length;i++){
    dec[i].addEventListener('click',() =>{
        decreasItem(i);
    })
}
function decreasItem(i){
    
    let cartItem=localStorage.getItem('productInCart');
    cartItem=JSON.parse(cartItem);
    let nan= document.querySelectorAll('.quantaty span')
    if(parseInt(cartItem[x[i]].incart) >1){
        nan[i].textContent=parseInt( cartItem[x[i]].incart)-1;
        cartItem[[x[i]]].incart-=1;
        localStorage.setItem('productInCart',JSON.stringify(cartItem));
        deletefromtotalcost(cartItem[x[i]]);
        deletecartsNumber(cartItem[x[i]]);
        let cartCost=localStorage.getItem('totalCost');
        let ff=document.querySelector('.toal-product .row span');
        ff.textContent=cartCost;
        let check =parseInt( cartItem[x[i]].incart);
        let productCost=document.querySelectorAll('.tot-gg');
        productCost[i].textContent=check*cartItem[[x[i]]].price;
        
    }else{
        let cartItem=localStorage.getItem('productInCart');
        cartItem=JSON.parse(cartItem);
        deleteItemfromCartNumber(cartItem[x[i]])
        deleteitemfromtotalcost(cartItem[x[i]])
        delete cartItem[x[i]];
        localStorage.setItem('productInCart',JSON.stringify(cartItem));
        location.reload();
        
    }
    



}


let del=document.querySelectorAll('.cansle')

for (let i=0;i<inc.length;i++){
    del[i].addEventListener('click',() =>{
        deletetItem(i);
    })
}




function deletetItem(i){
    let cartItem=localStorage.getItem('productInCart');
    cartItem=JSON.parse(cartItem);
    deleteItemfromCartNumber(cartItem[x[i]])
    deleteitemfromtotalcost(cartItem[x[i]])
    delete cartItem[x[i]];
    localStorage.setItem('productInCart',JSON.stringify(cartItem));
    location.reload();
    
}


function deleteItemfromCartNumber(product){
    let num=localStorage.getItem('cartsNumber');
    num=parseInt(num);
    let mins= parseInt(product.incart);
    localStorage.setItem('cartsNumber',num-mins);
    document.querySelector('.add-cart span').textContent= num-mins;
}



window.addEventListener("scroll", function(){
    const btn = document.querySelector(".up-btn");
    btn.classList.toggle('up-btn-active', window.scrollY >10);
});
