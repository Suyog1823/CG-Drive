// let click = document.querySelector('.click');
// let list = document.querySelector('.list');
// click.addEventListener("click", () => {
//     list.classList.toggle('newlist');
// });


// // Modal Popup For Creating a Folder
// const trigger = document.querySelector('#trigger');
// const modalWrapper = document.querySelector('.modal__wrapper');
// const closeBtn = document.querySelector('.close');

// trigger.addEventListener('click', function () {
//     openModal();
// });

// closeBtn.addEventListener('click', function () {
//     closeModal();
// });

// modalWrapper.addEventListener('click', function (e) {
//     if (e.target !== this) return;
//     closeModal();
// });

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//         closeModal();
//     }
// })

// function openModal() {
//     modalWrapper.classList.add('active');
// }

// function closeModal() {
//     modalWrapper.classList.remove('active');
// }




// // Modal Popup for Uploading a File
// const trigger1 = document.querySelector('#trigger1');
// const modalWrapper1 = document.querySelector('#modal__wrapper1');
// const closeBtn1 = document.querySelector('#close1');

// trigger1.addEventListener('click', function () {
//     openModal1();
// });

// closeBtn1.addEventListener('click', function () {
//     closeModal1();
// });

// modalWrapper1.addEventListener('click', function (e) {
//     if (e.target !== this) return;
//     closeModal1();
// });

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//         closeModal1();
//     }
// })

// function openModal1() {
//     modalWrapper1.classList.add('active');
// }

// function closeModal1() {
//     modalWrapper1.classList.remove('active');
// }


// //Modal Popup for Uploading a Folder
// const trigger2 = document.querySelector('#trigger2');
// const modalWrapper2 = document.querySelector('#modal__wrapper2');
// const closeBtn2 = document.querySelector('#close2');

// trigger2.addEventListener('click', function () {
//     openModal2();
// });

// closeBtn2.addEventListener('click', function () {
//     closeModal2();
// });

// modalWrapper2.addEventListener('click', function (e) {
//     if (e.target !== this) return;
//     closeModal2();
// });

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//         closeModal2();
//     }
// })

// function openModal2() {
//     modalWrapper2.classList.add('active');
// }

// function closeModal2() {
//     modalWrapper2.classList.remove('active');
// }
function createFolder() {
  try {
    var request = {
      body: JSON.stringify({
        folderName: fname.value,
        createdBy: id,
        createdAt: curr.toISOString(),
        isDeleted: 0,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(api, request).then((folderCreateResponse) => {
      console.log(folderCreateResponse);
      listFolders();
    });
  } catch (err) {
    console.log(err);
  }
}


function listFolders() {
  try {
    var create = document.getElementById("mainn");
    create.innerHTML = "";
    fetch("http://localhost:61516/api/Documents/" + sessionStorage["id"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((files) => {
        console.log(files);
        files.forEach((file) => {
          var create = document.getElementById("mainn");

          var createChild = document.createElement("div");

          createChild.classList.add("abc2");
          const fold = file.documentName;

          var div1 = document.createElement("div");

          div1.classList.add("abc");

          let con = "";

          con +=
            "<span onclick='openfile()' class='iconify' data-icon='bi:folder-fill' style='color: #3a86ff;' data-width='70'></span>";

          con += "<br/><p style='color:black'><b>";

          con += fold + "<b><p>";

          div1.innerHTML = con;

          var div2 = document.createElement("span");

          let con2 = "";
          con2 += `<span class='iconify' data-icon='ion:enter-outline' data-width='30' onclick='openfile(${file.folderId})'>Open folder></span>&nbsp;`;

          con2 += `<span class='iconify' data-icon='fluent:delete-20-regular' data-width='30' onclick='deletefolder(${file.folderId})'>Delete </span>`;
          div2.classList.add("btn123");

          div2.innerHTML = con2;

          createChild.appendChild(div1);

          createChild.appendChild(div2);

          create.append(createChild);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
function onLoad() {
  listFolders();
}

onLoad();


function openfile() {
  window.location.href = "file.html";
}

function deletefolder(folder) {
  var raw = "";
  var requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow",
  };

  let deleteurl = "http://localhost:61516/api/Documents/" + folder;
  fetch(deleteurl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}


function search1() {
  try {
    var id1 = document.getElementById("search");

    if (id1.value == "") {
      location.reload();
    } else {
      var create = document.getElementById("mainn");
      create.innerHTML = "";
      fetch(
        "http://localhost:61516/api/Folders/" +
          sessionStorage["folderid"] +
          "/" +
          id1.value,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((folders) => {
          console.log(folders);
          folders.forEach((folder) => {
            var create = document.getElementById("mainn");

            var createChild = document.createElement("div");

            createChild.classList.add("abc2");
            const fold = folder.folderName;

            var div1 = document.createElement("div");

            div1.classList.add("abc");

            let con = "";

            con +=
              "<span onclick='openfile(fold)' class='iconify' data-icon='bi:folder-fill' style='color: #3a86ff;' data-width='70'></span>";

            con += "<br/><p style='color:black'><b>";

            con += fold + "<b><p>";

            div1.innerHTML = con;

            var div2 = document.createElement("span");

            let con2 = "";

            con2 += `<button class='btn btn-success'  onclick="openfile(${folder.folderId})">Open folder</button>&nbsp;`;

            con2 += `<button class='btn btn-danger' onclick='deletefolder(${folder.folderId})' >Delete</button>`;
            div2.classList.add("btn123");

            div2.innerHTML = con2;
            // div.innerHTML = folder.fName;

            createChild.appendChild(div1);

            createChild.appendChild(div2);

            create.append(createChild);
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
}


function logout() {
    sessionStorage.clear();
    window.location.href = "Sign_In.html";
}