var checkOutProdcutsId = JSON.parse(getCookie("prodcuts")) ?? [] 
var numOfProductsInChecoutCards = document.getElementsByClassName("small-circle")[0];
var cateigoryName = document.getElementsByClassName("cateigory")[0];
cateigoryName.innerHTML = "<h1>All Products</h1>"
var imagesItem = 0;


numOfProductsInChecoutCards.innerHTML = checkOutProdcutsId.length;



///////////// slider //////////////////////////////////////////////////////////////////
var images = ["../assets/images/1.jpg","../assets/images/2.jpg","../assets/images/3.jpg","../assets/images/4.jpg","../assets/images/5.jpg","../assets/images/6.jpg"];

var imageContent = document.getElementsByClassName("image")[0];
// var slider = document.getElementsByClassName("slider")[0];
var currentImage = 1;
/// get the next image
function nextImage () {
    if(currentImage > 5)
        currentImage = 0;
    imageContent.setAttribute("src", images[currentImage++]);
}
// get the prevouse image
function prevImage () {
    if (currentImage < 0)
        currentImage = 5;
    imageContent.setAttribute("src", images[currentImage--]);
}

////////////// ender slider ///////////////////////////////////////////////////////////


/////////////////////// start products sectoin /////////////////////


///////////////// model /////////////////////////////////////



var modal = document.getElementById("myModal");
function openModal(myProduct) {
    modal.style.display = "block"; 
    createModelItem(myProduct);
}

function closeModal() {
    modal.style.display = "none"; 
}

function isEXist(id) {
    for (let i = 0; i < checkOutProdcutsId.length; i++) {
        if(checkOutProdcutsId[i].product.id == id)
            return true;
    }
    return false;
}



function createModelItem(myProduct){
    
    var modelContent = document.getElementsByClassName("model")[0];
    modelContent.innerHTML = 
    `<div class='row'>
        <div class='col'>
        <div class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="card-img-top modal_img" src="${myProduct.images[0]}" />
                </div>
            </div>
            <a onclick="prevItemImage('${[...myProduct.images]}')" class="carousel-control-prev" >
                <span class="carousel-control-prev-icon black"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a onclick="nextItemImage('${[...myProduct.images]}')" class="carousel-control-next" >
                <span class="carousel-control-next-icon black"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
            <small><span class="currentImage">1</span> / ${myProduct.images.length}</small>
        </div>
        <div class='col'>
                    <div class="col">
                        <h1 class="title">${myProduct.title}</h1>
                        <small class="brand">${myProduct.brand}</small>
                        
                        </div>
                        <div class="col"><h3 class="price">$${myProduct.price}</h3></div>
                        <p class="card-text desc">${myProduct.description}</p>
                        Amount <input oninput='checkAmont(${myProduct.stock}, ${myProduct.price}, ${myProduct.id})' class="countinput countinput${myProduct.id}" type='txt' value='1' >
                        <br><small class='error error${myProduct.id}'>should greater than 0 and less than ${myProduct.stock} and a not fraction number</small>
                        <p>Total price = $<span class = 'totalPrices totalPriceForElement${myProduct.id}'>${myProduct.price}</span></p>
                <div class="rating product${myProduct.id}" >
                    <small class="rating-num">(${myProduct.rating})</small>
                    <input type="radio" id="star5" name="product${myProduct.id}" value="5" disabled>
                    <label for="star5"></label>
                    <input type="radio" id="star4" name="product${myProduct.id}" value="4" disabled>
                    <label for="star4"></label>
                    <input type="radio" id="star3" name="product${myProduct.id}" value="3" disabled>
                    <label for="star3"></label>
                    <input type="radio" id="star2" name="product${myProduct.id}" value="2" disabled>
                    <label for="star2"></label>
                    <input type="radio" id="star1" name="product${myProduct.id}" value="1" disabled>
                    <label for="star1"></label>
                <div class="buttons">
                    <button onclick='addProdcutToCheckOut(${JSON.stringify({id:myProduct.id, images: myProduct.images, price: myProduct.price, title: myProduct.title})})' class="add-card btn btn-outline-primary">add to card</button>
                    <button onclick='removeElement(${myProduct.id})' class="remove-card btn btn-outline-danger">remove from card</button>
                    </div>
            </div>
        </div>
    </div>

    `; 

    ratoing(myProduct.id, myProduct.rating);
    btn = document.getElementsByClassName("add-card")[0];
    remove_btn  = document.getElementsByClassName("remove-card")[0];
    div = document.getElementsByClassName("countinput"+myProduct.id)[0];
    if(isEXist(myProduct.id)){
        removeBtnAdd(myProduct.id);
        
    }else{
        enableBtnAdd(myProduct.id);
    }
    
    
}
var btn, remove_btn, div;

function enableBtnAdd(id){
    div.removeAttribute("disabled");
    btn.removeAttribute("disabled");
    btn.innerHTML = "add to card";
    remove_btn.style.display = "none";
    
}

function removeBtnAdd(id){
    div.setAttribute("disabled", "");
    btn.setAttribute("disabled", '');
    btn.innerHTML = "already added";
    remove_btn.style.display = "block";
}

function removeElement(id) {
    deleteItem(id);
    enableBtnAdd(id);
}

function addProdcutToCheckOut(item){
    var amount = document.getElementsByClassName("countinput")[0];
    checkOutProdcutsId.push({product: item, count: amount.value});
    numOfProductsInChecoutCards.innerHTML = checkOutProdcutsId.length;
    setCookie("prodcuts", JSON.stringify(checkOutProdcutsId));
    removeBtnAdd(item.id);

    // closeModal();
}



function prevItemImage(myImages) {
    var currentImage = document.getElementsByClassName("currentImage")[0];
    var image = myImages.split(",");
    var imagesContent = document.getElementsByClassName("modal_img")[0];
    if (imagesItem < 0 || imagesItem > Number(image.length - 1))
        imagesItem = Number(image.length - 1);

        currentImage.innerHTML = imagesItem + 1;
    imagesContent.setAttribute("src", image[imagesItem--]);
    
}

function nextItemImage(myImages) {
    var currentImage = document.getElementsByClassName("currentImage")[0];
    var image = myImages.split(',');
    var imagesContent = document.getElementsByClassName("modal_img")[0];
    if (imagesItem < 0 || imagesItem > Number(image.length - 1))
        imagesItem = 0;
        currentImage.innerHTML = imagesItem + 1;
    imagesContent.setAttribute("src", image[imagesItem++]);
    
}



//////////////////////////////////////////////////////////



var parent = document.getElementsByClassName("parent")[0];

function createCard (myProduct) {
    var cardDiv = document.createElement("div");   
    cardDiv.setAttribute("class", "card myCard") 
    cardDiv.onclick = function () {openModal(myProduct);}
    cardDiv.setAttribute("style", "width: 25rem;") 
    cardDiv.innerHTML = `
    <img class="card-img-top" src="${myProduct.images[0]}">
                <span class="discount-label">- ${myProduct.discountPercentage} %</span>
                <span class="stock">${myProduct.stock} left</span>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="title">${myProduct.title}</h5>
                            <small class="brand">${myProduct.brand}</small>
                        </div>
                        </div>
                        <div class="col"><h3 class="price">$${myProduct.price}</h3></div>
                    <p class="card-text desc">${myProduct.description}</p>
                </div>
                <div class="card-body row">
                    <div class="rating product${myProduct.id} col" >
                        <small class="rating-num">(${myProduct.rating})</small>
                        <input type="radio" id="star5" name="product${myProduct.id}" value="5" disabled>
                        <label for="star5"></label>
                        <input type="radio" id="star4" name="product${myProduct.id}" value="4" disabled>
                        <label for="star4"></label>
                        <input type="radio" id="star3" name="product${myProduct.id}" value="3" disabled>
                        <label for="star3"></label>
                        <input type="radio" id="star2" name="product${myProduct.id}" value="2" disabled>
                        <label for="star2"></label>
                        <input type="radio" id="star1" name="product${myProduct.id}" value="1" disabled>
                        <label for="star1"></label>
                    </div>
                </div>
    `; 
    
    parent.append(cardDiv);
    var ratting = document.querySelectorAll(`.product${myProduct.id} input`);
    ratting[5 - Math.floor(myProduct.rating)].checked = true;

    addCat();
}


function ratoing (id, rating){
    var ratting = document.querySelectorAll(`.product${id} input`);
    ratting[5 - Math.floor(rating)].checked = true;
}

var product = new XMLHttpRequest();

product.open("GET", "https://dummyjson.com/products");

product.send("");


product.onreadystatechange = function () {
    if (product.readyState == 4) {
        if (product.status == 200) {
            var myProcuts = JSON.parse(product.response).products;
            for (let i = 0; i < myProcuts.length; i++) {
                createCard(myProcuts[i]);
                addCat(myProcuts[i].category);
            }
        }else
            throw "eror";
    }
};

////////// end prodcuts section //////////////////////////////////////////



////////////// add category sectoin ///////////////////////////////////

function addOption(categories) {
    var select = document.getElementById("myCat");
    for (let i = 0; i < categories.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = categories[i];
        select.append(option);
        
    }
}

function addCat() {
    var optoins = new XMLHttpRequest();

    optoins.open("GET", "https://dummyjson.com/products/categories");

    optoins.send("");


    optoins.onreadystatechange = function () {
        if (optoins.readyState == 4) {
            if (optoins.status == 200) {
                var myProcuts = JSON.parse(optoins.response);
                addOption(myProcuts)
                }
            }else{}
        } 
};


function onSelectOptoin(e) {

    var category = e.target.value;
    var selectedOptoin = new XMLHttpRequest();
    var url;
    if(category == 'All Prodcuts')
        url  = "https://dummyjson.com/products"
    else
        url = "https://dummyjson.com/products/category/" + category;
    selectedOptoin.open("GET", url);

    selectedOptoin.send("");


    selectedOptoin.onreadystatechange = function () {
        if (selectedOptoin.readyState == 4) {
            if (selectedOptoin.status == 200) {
                var myProcuts = JSON.parse(selectedOptoin.response).products;
                parent.innerHTML = "";
                cateigoryName.innerHTML = `<h1>${category}<h1>`
                for (let i = 0; i < myProcuts.length; i++) {
                    createCard(myProcuts[i]);
                }
                }
            }else{}
        } 



}





////////////////////////////////////////////////////////////////////////////

/////////////////////// cookie ///////////////////////////////////////////


function setCookie (key, val){
    document.cookie = `${key}=${val};`;
}

function deleteCookie(key) {
    document.cookie = `${key}=fasdf;expires=${date}}`;
    

}

function getCookie(cookieName) {
    var cookies = document.cookie.split(";");
    for (let i = 0; i < document.cookie.length; i++) {
        if(cookies[i]?.split("=")[0] == cookieName){
            return (cookies[i]?.split("=")[1]).split(",");

        }
        
    }
    return null;
}

///////////////// search ////////////////////////////////////////

function getElement(e) {
    var val = e.target.value;
    var search = new XMLHttpRequest();

    search.open("GET", "https://dummyjson.com/products/search?q="+val);

    search.send("");


    search.onreadystatechange = function () {
        if (search.readyState == 4) {
            if (search.status == 200) {
                parent.innerHTML = "";
                var myProcuts = JSON.parse(search.response).products;
                for (let i = 0; i < myProcuts.length; i++) 
                    createCard(myProcuts[i])
            }
            }else{}
        } 
}

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



var totatPrice = document.getElementsByClassName("total")[0];

const cartItemsContainer = document.getElementById('cart-items');
function renderCartItems() {    

    numOfProductsInChecoutCards.innerHTML = checkOutProdcutsId.length;
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
                <p class='item-price'>${item.price.toFixed(2)} / ${count} QTR</p>
                <h5><p>Total = $<span class = 'totalPrices totalPriceForElement${item.id}'>${(item.price * getElementCount(item.id)).toFixed(2)}</span></p></h5>
            </div>
            
        </div>
        <button class='btn btn-outline-danger fa fa-trash' onclick='deleteItem(${item.id})'></button>
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

    totatPrice.innerHTML = total.toFixed(2);
    
}

function deleteItem(id) {
    deleteFromItems(id);
    setCookie("prodcuts", JSON.stringify(checkOutProdcutsId));
    renderCartItems();
}


function checkAmont(itemAmount, price, id) {
    var btn = document.getElementsByClassName("add-card")[0];
    var totalPriceForItem = document.getElementsByClassName("totalPriceForElement"+id)[0];
    var amountInout = document.getElementsByClassName("countinput"+id)[0];
    var errorMsg = document.getElementsByClassName("error"+id)[0];
    if(amountInout.value < 1 || amountInout.value > itemAmount || Math.floor(Number(amountInout.value)) != amountInout.value){
        errorMsg.style.opacity = "1";
        btn.setAttribute("disabled", '');

    }else {
        btn.removeAttribute("disabled");
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


function showorders(e) {
    e.preventDefault();
    renderCartItems();
    var myCard = document.getElementsByClassName("my_card")[0];
    myCard.classList.toggle("active");
}
