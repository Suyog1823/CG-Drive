const api = "http://localhost:61516/api/folders";

var curr = new Date();
var DateTime =
  curr.getFullYear() +
  "-" +
  curr.getMonth() +
  "-" +
  curr.getDay() +
  " " +
  curr.getHours() +
  ":" +
  curr.getMinutes() +
  ":" +
  curr.getSeconds();

var fname = document.getElementById("fname");
var create = document.getElementById("create");

var id = sessionStorage["id"];
console.log(id);

function createFolder() {
  try {
    var request = {
      body: JSON.stringify({
        "folderName": fname.value,
        "createdBy": id,
        "createdAt": curr.toISOString(),
        "isDeleted": 0,
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
    fetch( "http://localhost:61516/api/Folders/" + sessionStorage["id"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          
          var create = document.getElementById("create");
         
          var divBox = document.getElementById("ar");
          
          /*var createChild = document.createElement("div");
          
          createChild.classList.add("abc2");
          var div1 = document.createElement("div");

          div1.classList.add("abc");

          let con='';

 

        con += "<i class='bx bxs-folder-open'></i>";

 

        con += "<br/><p style='color:black'><b>";

 

        con += folder.dName+"<b><p>";

        div1.innerHTML =con;

        var div2 = document.createElement("span");

 

        let con2='';

 

        con2+=`<button type="button" class='btn btn-success'  onclick="openfile()">Add file</button>&nbsp;`;

 

        con2+=`<button type="button"  class='btn btn-danger' onclick='deletefolder(${folder.docId})' >Delete</button>`;

        div2.classList.add("btn123");

 

        div2.innerHTML=con2;*/

 

     
          
         const fold = folder.folderName;
          //console.log(fold);
          
          folderBox.innerHTML = `
            <div style="height: 100px;width: 100px; position: inline-flex; margin-left: 300px; justify-content: row">
            <img style="height: 4rem;width: 4rem;" src='/images/folder.png'>${fold}</div>`;
          
          create.appendChild(folderBox);
        });
      });
  } catch (err) { 
    console.log(err);
  }
  function openfile(FolderId) {
    sessionStorage.setItem("folderId", FolderId);
    window.location.href = "file.html";
  }
}

function onLoad() {
  listFolders();
  //document.getElementById("admin").innerHTML = adminname;
  console.log(curr.toISOString());
}

onLoad();

// let logou = document.getElementById("logoutbtn");
  
//   function logout() {
//     window.location.href = "index.html";
//     sessionStorage.clear();
  
  
//   }*/

