/**
 * Created by schott on 24.09.16.
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function setSessionStorage(key, value){
    sessionStorage.setItem(key, value);
}
function getSessionStorage(key){
    return sessionStorage.getItem(key);
}

function setHtmlStorage(key, value){
    localStorage.setItem(key, value);
}
function getHtmlStorage(key){
    return localStorage.getItem(key);
}

function checkHTMLStorage(f, key, value){
if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    if (value != ""){
        f(key, value);
    }
    else{
        f(key);
    }
    return true;

} else {
    alert("No HTML localstorage is supported!");
    return false;
    // TODO: use cookies instead?
}

}