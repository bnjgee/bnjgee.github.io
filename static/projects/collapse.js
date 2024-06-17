// static/scripts/collapse.js
function toggleCollapse(id) {
    const element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// static/scripts/toggleColumns.js
function toggleColumns() {
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');
    const toggleButton = document.querySelector('.toggle-button');

    if (leftColumn.classList.contains('hidden')) {
        leftColumn.classList.remove('hidden');
        rightColumn.classList.remove('full-width');
        toggleButton.innerHTML = "<<"; // Change button text to "<<"
    } else {
        leftColumn.classList.add('hidden');
        rightColumn.classList.add('full-width');
        toggleButton.innerHTML = ">>"; // Change button text to ">>"
    }
}