var  checkOutProdcutsId = JSON.parse(getCookie("prodcuts")) ?? [] 
var totatPrice = document.getElementsByClassName("total")[0];


function getCookie(cookieName) {
    var cookies = document.cookie.split(";");
    for (let i = 0; i < document.cookie.length; i++) {
        if(cookies[i]?.split("=")[0] == cookieName){
            return (cookies[i]?.split("=")[1]).split(",");

        }
        
    }
    return null;
}





function setCookie (key, val){
    document.cookie = `${key}=${val};`;
}

const cartItemsContainer = document.getElementById('cart-items');
function renderCartItems() {    
    cartItemsContainer.innerHTML = '';

    if (checkOutProdcutsId.length === 0) {
        const emptyCartMessage = document.createElement('h1');
        emptyCartMessage.classList.add('empty-cart');
        totatPrice.innerHTML = 0;
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyCartMessage);
    } else {
        for (let i = 0; i < checkOutProdcutsId.length; i++) {
            renderCards(checkOutProdcutsId[i].product, checkOutProdcutsId[i].count);
        
    }
}
}


function renderCards(item, count) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', 'row');
    cartItem.innerHTML = 
    `
        <img src='${item.images[0]}' />
        <div class='item-details row'>
            <div class='col-8'>
                <h3>${item.title}</h3>
                <p class='item-price'>${item.price.toFixed(2)}</p>
                Amount <input oninput='checkAmont(${item.stock}, ${item.price}, ${item.id})' class="countinput countinput${item.id}" type='txt' value='${count}' >
                <small class='error error${item.id}'>should greater than 0 and less than ${item.stock} and a not fraction number</small>
            </div>
            <div class='col-2'>
                <h4 >Total price = $ <span class = 'totalPrices totalPriceForElement${item.id}'>${item.price * getElementCount(item.id)}</span></h4>
            </div>
            <div class='col-2'>
                <button class='btn btn-outline-danger' onclick='deleteItem(${item.id})'>Delete</button>
            </div>
        </div>
    `;

    cartItemsContainer.appendChild(cartItem);
    

    totalPriceChange();
}

function totalPriceChange() {
    var total = 0;
    var totalPrices = document.getElementsByClassName("totalPrices");
    for (let i = 0; i < totalPrices.length; i++) {
        total += Number(totalPrices[i].innerHTML);
        
    }

    totatPrice.innerHTML = total;
    
}

function deleteItem(id) {

    deleteFromItems(id);
    setCookie("prodcuts", JSON.stringify(checkOutProdcutsId));
    divDanger = document.getElementsByClassName("text_indecator_danger")[0];
    showDiv(divDanger, "item removed...")
    setTimeout(() => {
        disapearDiv(divDanger);
    }, 2000);
    renderCartItems();
}


function checkAmont(itemAmount, price, id) {
    var totalPriceForItem = document.getElementsByClassName("totalPriceForElement"+id)[0];
    var amountInout = document.getElementsByClassName("countinput"+id)[0];
    var errorMsg = document.getElementsByClassName("error"+id)[0];
    if(amountInout.value < 1 || amountInout.value > itemAmount || Math.floor(Number(amountInout.value)) != amountInout.value){
        errorMsg.style.opacity = "1";
    }else {
        errorMsg.style.opacity = "0";
        totalPriceForItem.innerHTML = Math.floor(amountInout.value * price);
        setElementCount(id, amountInout.value);
        setCookie("prodcuts", JSON.stringify(checkOutProdcutsId));
        totalPriceChange();
    }

}

function setElementCount(id,count) {
    for (let i = 0; i < checkOutProdcutsId.length; i++) {
        if(checkOutProdcutsId[i].product.id == id)
        {
            checkOutProdcutsId[i].count = count;
        }
        
    }
}



function getElementCount(id) {
    for (let i = 0; i < checkOutProdcutsId.length; i++) {
        if(checkOutProdcutsId[i].product.id == id)
        {
            return checkOutProdcutsId[i].count;
        }
        
    }
}


function deleteFromItems(id) {
    for (let i = 0; i < checkOutProdcutsId.length; i++) {
        if(checkOutProdcutsId[i].product.id == id){
            checkOutProdcutsId.splice(i, 1);
            return;
        }
    }

}

renderCartItems();




///////////////// scroller sectoin //////////////////////////////////////////////////


window.onscroll = function() {
    showBackToTopButton();
};
function showBackToTopButton() {
    var button = document.getElementById("backToTopBtn");
    
    if (document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
    button.style.display = "none";
    }
}

function scrollToTop() {
    window.scroll({
        behavior: "smooth", 
        top: 0,
        left: 0
    })
}

///////////////////////////////////////////////////////////////////////////



// show succes and danger div 




function disapearDiv(div){
    div.style.display = "none";

}


function showDiv(div, msg){
    div.style.display = "inline";
    div.innerHTML = msg;
}

