// TABEL BUKU //
function showtabel() {
    var x = document.getElementById("tabelBuku");
    if (x.style.display === "none") {
        x.style.display = "table";
    }
}

// detail buku
function showdetail(x) {
    // Get the modal
    var modal = document.getElementById("detailModal");

    // Get the button that opens the modal
    var btn = document.getElementById("dModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    document.getElementById('iiiooo').innerHTML = x;
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function openTable(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


//SUBMIT FORM BUKU
function showformbuku() {
    var x = document.getElementById("formbuku");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function hideformbuku() {
    document.getElementById('formbuku').style.display='none';
}

function disablebuku() {
    document.getElementById("buku").disabled = true;
}
function enablebuku() {
    document.getElementById("buku").disabled = false;
}

// SUBMIT FORM JURNAL
function showformjurnal() {
    var x = document.getElementById("formjurnal");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function hideformjurnal() {
    document.getElementById('formjurnal').style.display='none';
}

function disablejurnal() {
    document.getElementById("jurnal").disabled = true;
}

function enablejurnal() {
    document.getElementById("jurnal").disabled = false;
}

// MODAL PEMINJAMAN //
function showstatus() {
    // Get the modal
    var modal = document.getElementById("statusModal");

    // Get the button that opens the modal
    var btn = document.getElementById("sModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

// simpan jquery
function simpan(x) {
    document.getElementById('simpanan').innerHTML = x;
}