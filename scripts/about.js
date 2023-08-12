var checkOutProdcutsId = JSON.parse(getCookie("prodcuts")) ?? [] 
var numOfProductsInChecoutCards = document.getElementsByClassName("small-circle")[0];
numOfProductsInChecoutCards.innerHTML = checkOutProdcutsId.length;


function getCookie(cookieName) {
    var cookies = document.cookie.split(";");
    for (let i = 0; i < document.cookie.length; i++) {
        if(cookies[i]?.split("=")[0] == cookieName){
            return (cookies[i]?.split("=")[1]).split(",");

        }
        
    }
    return null;
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