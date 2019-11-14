// TABEL BUKU //
function showtabel() {
    var x = document.getElementById("tabelBuku");
    if (x.style.display === "none") {
        x.style.display = "table";
    }
}

// MODAL DETAIL BUKU //
function showdetail() {
    // Get the modal
    var modal = document.getElementById("detailModal");

    // Get the button that opens the modal
    var btn = document.getElementById("dModal");

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

// MODAL PEMINJAMAN //
function showborrow() {
    // Get the modal
    var modal = document.getElementById("borrowModal");

    // Get the button that opens the modal
    var btn = document.getElementById("pModal");

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

//LOGIN 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
    
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}