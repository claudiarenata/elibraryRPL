// LOGIN PAGE MHS
function showloginmhs() {
    var x = document.getElementById("loginmhs");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
function hideloginmhs() {
    document.getElementById('loginmhs').style.display='none';
}

//DISABLED LOGIN MHS
function disablemhs() {
    document.getElementById("mhs").disabled = true;
}
function enablemhs() {
    document.getElementById("mhs").disabled = false;
}

// LOGIN PAGE ADMIN
function showloginadm() {
    var x = document.getElementById("loginadm");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
function hideloginadm() {
    document.getElementById('loginadm').style.display='none';
}

//DISABLED LOGIN ADMIN
function disableadm() {
    document.getElementById("adm").disabled = true;
}
function enableadm() {
    document.getElementById("adm").disabled = false;
}
