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

function openModal(myProduct) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block"; 
    createModelItem(myProduct);
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"; 
}


function createModelItem(myProduct){
    var modelContent = document.getElementsByClassName("model")[0];
    var images = myProduct.images;
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
                <div>
                    <button onclick='addProdcutToCheckOut(${myProduct.id})' class="btn btn-outline-primary">add to card</button>
                </div>
            </div>
        </div>
    </div>

    `; 
    ratoing(myProduct.id, myProduct.rating);

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
    cardDiv.setAttribute("style", "width: 18rem;") 
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



function addProdcutToCheckOut(id){
    if( !checkOutProdcutsId.find((element) => element.id == id)){
        checkOutProdcutsId.push({id: id, count: 1});
        numOfProductsInChecoutCards.innerHTML = checkOutProdcutsId.length;
        setCookie("prodcuts", JSON.stringify(checkOutProdcutsId));
        closeModal();

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



/*
* checkout page
* increse amount
* check moutn >0 < total amount
* if the use buy product minus the amount by one
*
*/