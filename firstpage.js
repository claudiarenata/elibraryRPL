// TABEL BUKU //
function showtabel() {
    var x = document.getElementById("tabelBuku");
    if (x.style.display === "none") {
        x.style.display = "table";
    }
}

// MODAL DETAIL BUKU //
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

// MODAL PEMINJAMAN //
function showborrow(x) {
    // Get the modal
    var modal = document.getElementById("detailModal");

    // Get the button that opens the modal
    var btn = document.getElementById("pModal");

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