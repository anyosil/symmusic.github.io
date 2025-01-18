var ITEMS_PER_PAGE = 15;
var currentPage = 1;
var data = {};

function main() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhr.responseText);
            displaySongs(data)
        }
    }
    xhr.open("GET", "database.json", true);
    xhr.send();
}

function displaySongs(songs) {
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    var start = (currentPage - 1) * ITEMS_PER_PAGE;
    var end = start + ITEMS_PER_PAGE;
    var paginatedSongs = songs.slice(start, end);

    for (var i = 0; i < paginatedSongs.length; i++) {
        var item = paginatedSongs[i];
        var div = document.createElement("div");
        div.className = "image-box";
        div.innerHTML =
        '<img src="' + item.cover + '" alt="' + item.title + '">' +
        '<p><strong>Title:</strong> ' + item.title + '</p>' +
        '<p><strong>Artist:</strong> ' + item.artist + '</p>' +
        '<p><strong>Album:</strong> ' + item.album + '</p>' +
        '<a href="' + item.file + '" target="_blank" class="play-button">Play!</a>';
        resultsContainer.appendChild(div);
    }

    if (songs.length === 0) {
        alert("Uh Oh!, We searched near and far!. Please try a different search term.");
    }

    updatePaginationControls(songs.length);
}

function updatePaginationControls(totalItems) {
    var paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Clear existing controls

    var totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    if (currentPage > 1) {
        var prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.onclick = function () {
            currentPage--;
            displaySongs(data);
        };
        paginationContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        var nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.onclick = function () {
            currentPage++;
            displaySongs(data);
        };
        paginationContainer.appendChild(nextButton);
    }
}

function performSearch() {
    var query = document.getElementById("searchInput").value.toLowerCase();
    var results = data.filter(function(item) {
        return item.title.toLowerCase().indexOf(query) !== -1 ||
            item.artist.toLowerCase().indexOf(query) !== -1 ||
            item.album.toLowerCase().indexOf(query) !== -1
    }
    );
    displaySongs(results);
    alert("To return to HomePage Please give a blank search request. Search Will now continue");
}

alert('Welcome to Symbian Internet Music Service! This service is still under development, so you might encounter some issues!');
main(); // Display all songs initially
