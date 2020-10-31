/*
* Function to open a drowdown for loggedin users so they can use:
*
* - My Profile
* - Settings
* - Logout
*
* */

// get the button and the menu
let btn = document.getElementById('user-menu-button');
let menu = document.getElementById('user-menu');

// function if the user clicks on the button aka profile picture then toggle class "hidden" and make menu visible or not
window.onload = function () {
    if (btn) {
        btn.addEventListener('click', function () {
            menu.classList.toggle('hidden');
        });
    }

    // if user resizes the window then add class "hidden" to the menu
    addEventListener('resize', function () {
        menu.classList.add("hidden");
    });
}