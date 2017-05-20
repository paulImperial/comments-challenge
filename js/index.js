let comment = function (name, comment, GUID) {
    this.name = name,
        this.comment = comment,
        this.GUID = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
        this.inc = function () {
            this.count++;
        },
        this.likes = 0,
        this.dislikes = 0,
        this.dec = function () {
            this.count--;
        },
        this.showComment = function () {
            return this.count;
        }
}

let comments = [];

let counter = 0;

let newCommentContainer = document.getElementById('new-comment');

let add = document.getElementById('add-comment');

let post = document.getElementById('post');

let container = document.getElementById('container');

add.addEventListener('click', function () {
    let pos = newCommentContainer.getBoundingClientRect();
    window.scrollTo(0,pos.top);
    newCommentContainer.classList.toggle('hidden');
    if (!newCommentContainer.classList.contains('hidden')) {
        closeComment('Cancel Comment');
    }
    else {
        add.innerText = "Add Comment";
    }
});

post.addEventListener('click', function () {
    let tc = new comment(document.getElementById('newName').value, document.getElementById('newMessage').value);
    comments.push(tc);
    addWebStorage(document.getElementById('newName').value, document.getElementById('newMessage').value)
    closeComment('Add Comment');
    newCommentContainer.classList.toggle('hidden');
    displayComment();
    counter++
})

// display comments //
let displayComment = function () {
    container.innerHTML = "";
    comments.forEach(function (c) {
        let node = document.createElement('li');
        node.innerHTML = `<div class="wrap-comment"><p>${c.name} says:</p><p>${c.comment}</p><p id=${c.GUID}><button class="button like js-like">Like <span class="js-like-update">${c.likes}</span></button>
        <button class="button dislike js-dislike">Dislike <span class="js-dislike-update">${c.dislikes}</span></button></p></div>`
        container.appendChild(node);
    })

    let like = document.getElementsByClassName('js-like');
    Array.from(like).forEach(function (element) {
        element.addEventListener('click', function (e) {
            let targetGUID = e.target.parentNode.id;
            comments.forEach(function (element) {
                if (targetGUID == element.GUID) {
                    element.likes++
                }
            });
            updateLikes();
        })
    })

    let dislike = document.getElementsByClassName('js-dislike');
    Array.from(dislike).forEach(function (element) {
        element.addEventListener('click', function (e) {
            let targetGUID = e.target.parentNode.id;
            comments.forEach(function (element) {
                if (targetGUID == element.GUID) {
                    element.dislikes++
                }
            });
            updateLikes();
        })
    })

}

// close comment //

let closeComment = function (buttonText) {
    add.innerText = buttonText;
    document.getElementById('newName').value = "";
    document.getElementById('newMessage').value = "";
}

// web storage //
let addWebStorage = function (a, b) {
    let localStorage = window.localStorage;
    localStorage.setItem("name", a);
    localStorage.setItem("comment", b)
}

// update like and dislikes //
let updateLikes = function(){
    for (var i=0;i<comments.length; i++){
        document.getElementById(comments[i].GUID).getElementsByClassName('js-like-update')[0].innerText=comments[i].likes;
        document.getElementById(comments[i].GUID).getElementsByClassName('js-dislike-update')[0].innerText=comments[i].dislikes;
    }
};


