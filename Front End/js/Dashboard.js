let click = document.querySelector('.click');
let list = document.querySelector('.list');
click.addEventListener("click", () => {
    list.classList.toggle('newlist');
});


// Modal Popup For Creating a Folder
const trigger = document.querySelector('#trigger');
const modalWrapper = document.querySelector('.modal__wrapper');
const closeBtn = document.querySelector('.close');

trigger.addEventListener('click', function () {
    openModal();
});

closeBtn.addEventListener('click', function () {
    closeModal();
});

modalWrapper.addEventListener('click', function (e) {
    if (e.target !== this) return;
    closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
})

function openModal() {
    modalWrapper.classList.add('active');
}

function closeModal() {
    modalWrapper.classList.remove('active');
}




// Modal Popup for Uploading a File
const trigger1 = document.querySelector('#trigger1');
const modalWrapper1 = document.querySelector('#modal__wrapper1');
const closeBtn1 = document.querySelector('#close1');

trigger1.addEventListener('click', function () {
    openModal1();
});

closeBtn1.addEventListener('click', function () {
    closeModal1();
});

modalWrapper1.addEventListener('click', function (e) {
    if (e.target !== this) return;
    closeModal1();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal1();
    }
})

function openModal1() {
    modalWrapper1.classList.add('active');
}

function closeModal1() {
    modalWrapper1.classList.remove('active');
}


//Modal Popup for Uploading a Folder
const trigger2 = document.querySelector('#trigger2');
const modalWrapper2 = document.querySelector('#modal__wrapper2');
const closeBtn2 = document.querySelector('#close2');

trigger2.addEventListener('click', function () {
    openModal2();
});

closeBtn2.addEventListener('click', function () {
    closeModal2();
});

modalWrapper2.addEventListener('click', function (e) {
    if (e.target !== this) return;
    closeModal2();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal2();
    }
})

function openModal2() {
    modalWrapper2.classList.add('active');
}

function closeModal2() {
    modalWrapper2.classList.remove('active');
}