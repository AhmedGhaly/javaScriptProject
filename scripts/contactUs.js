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

////////////////////// check inputs //////////////////////////////////////

// full name
function checkFullName(fName){
    var regx = /^[a-zA-Z ,-]+$/;

    return regx.test(fName);
}

function checkEmail(email){
    var regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regx.test(email);
}

function checPasswork(password){
    var regx = /.{8,}/;
    return regx.test(password);
}

function checPhone(phone){
    var regx = /\d{11,}/;
    return regx.test(phone);
}


function checkFullNameInput() {
    checkAllInputs();
    var fName = document.getElementById("exampleInputFullName");
    var errorMsg = document.getElementById("fullName");
    if(checkFullName(fName.value)){
        errorMsg.style.display = "none";
        fName.style.border = "1px solid #ced4da";
        fName.style.boxShadow = "0 0 0 0.2rem rgba(0,123,255,.25)";
    }else{
        errorMsg.style.display = "block";
        fName.style.border = "1px solid red";
        fName.style.boxShadow = "0 0 0 0.2rem rgb(220, 177, 177)";
    }
}


function checkEmailInput() {
    checkAllInputs();
    var email = document.getElementById("exampleInputEmail1");
    var errorMsg = document.getElementById("emailHelp");
    if(checkEmail(email.value)){
        errorMsg.style.display = "none";
        email.style.border = "1px solid #ced4da";
        email.style.boxShadow = "0 0 0 0.2rem rgba(0,123,255,.25)";
    }else{
        errorMsg.style.display = "block";
        email.style.border = "1px solid red";
        email.style.boxShadow = "0 0 0 0.2rem rgb(220, 177, 177)";


    }
}

function checkPassworkInput() {
    checkAllInputs();
    var passwrod = document.getElementById("exampleInputPassword1");
    var errorMsg = document.getElementById("password");
    if(checPasswork(passwrod.value)){
        errorMsg.style.display = "none";
        passwrod.style.border = "1px solid #ced4da";
        passwrod.style.boxShadow = "0 0 0 0.2rem rgba(0,123,255,.25)";
    }else{
        errorMsg.style.display = "block";
        passwrod.style.border = "1px solid red";
        passwrod.style.boxShadow = "0 0 0 0.2rem rgb(220, 177, 177)";


    }
}

function checkPhoneInput() {

    checkAllInputs();
    var phone = document.getElementById("phoneInput");
    var errorMsg = document.getElementById("phone");
    if(checPhone(phone.value)){
        errorMsg.style.display = "none";
        phone.style.border = "1px solid #ced4da";
        phone.style.boxShadow = "0 0 0 0.2rem rgba(0,123,255,.25)";
    }else{
        errorMsg.style.display = "block";
        phone.style.border = "1px solid red";
        phone.style.boxShadow = "0 0 0 0.2rem rgb(220, 177, 177)";


    }
}

function submitInputs(e) {
    e.preventDefault();



}

function checkAllInputs() {
    var btn = document.getElementById("submitBtn");
    var fName = document.getElementById("exampleInputFullName").value;
    var email = document.getElementById("exampleInputEmail1").value;
    var passwrod = document.getElementById("exampleInputPassword1").value;
    var phone = document.getElementById("phoneInput").value;
    if(checkEmail(email) && checPasswork(passwrod) && checPhone(phone) && checkFullName(fName))
        btn.removeAttribute("disabled");
    else
        btn.setAttribute("disabled", '');
}
////////////////////////////////////////////////////////////////////////////