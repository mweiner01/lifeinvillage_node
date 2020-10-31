let btn = document.getElementById('user-menu-button');
let menu = document.getElementById('user-menu');
window.onload = function () {
    if (btn) {
        btn.addEventListener('click', function () {
            menu.classList.toggle('hidden');
        });
    }

    addEventListener('resize', function () {
        menu.classList.add("hidden");
    });

    addEventListener('online', function () {
        if (onlineStatus === 0) {
            alert("Du bist nun wieder online");
            onlineStatus = 1;
        }
    });
    addEventListener('offline', function () {
        onlineStatus = 0;
        alert("Du bist nun offline");
    });
}