let commentDiv = document.getElementById('show-comments-div');
let commentBtn = document.getElementById('show-comments');

let comments = document.getElementById('comments');

function getId(el) {
    let str = el.split('-');
    return str[str.length - 1];
}

$(document).on("click", function (event) {
    if(event.target === document.getElementById('show-comments-'+getId(event.target.id))) {
        let comments = document.getElementById('comments-' + getId(event.target.id))
        let commentDiv = document.getElementById('show-comments-div' + getId(event.target.id));

        if(comments.classList.contains('hidden')) {
            comments.classList.toggle('hidden');
            document.getElementById('show-comments-'+getId(event.target.id)).innerText = "Weniger Anzeigen..."
        } else {
            comments.classList.toggle('hidden');
            document.getElementById('show-comments-'+getId(event.target.id)).innerText = "Mehr Anzeigen..."
        }
    }
});