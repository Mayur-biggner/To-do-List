//Initial References
const addBtn = document.getElementById("add");
let items = window.addEventListener("load", () => {
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log('storedTasks',storedTasks);
  renderData(storedTasks);
});

let tasks = [];
addBtn.addEventListener("click", (e) => {
  addTask(e);
});
function addTask(e) {
  e.preventDefault();

  let item = document.getElementById("To-do").value;
  let indexOfTasktoUpdate = document
    .getElementById("To-do")
    .getAttribute("index");
  console.log(item);
  if (item === "") {
    alert("please enter");
  } else {
    console.log("indexOfTasktoUpdate", indexOfTasktoUpdate);
    if (indexOfTasktoUpdate) {
      editTheValue(indexOfTasktoUpdate);
      addBtn.innerText = "Add";
      document.getElementById('To-do').removeAttribute('index');
    } else {
      let oldTasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = oldTasks ? oldTasks : [];
      tasks.push(item);
      // localStorage.setItem("",)
      localStorage.setItem("tasks", JSON.stringify(tasks));
      let storedTasks = JSON.parse(localStorage.getItem("tasks"));
      Array.isArray(storedTasks) && renderData(storedTasks);
    }
  }
}

function renderData(storedTasks) {
  document.getElementById("To-do").value = "";
  let list = document.getElementById("List");
  //  console.log(list)
  list.innerHTML = "";
  console.log(storedTasks);
  Array.isArray(storedTasks) &&
    storedTasks.map((item,index) => {
      console.log(item);
      let editid = index + "edit";
      let deleteid = index + "delete";

      let li = document.createElement("li");
      li.innerHTML = `<span class='list_span'>${item}</span><button id='btn_edit'><span class="material-symbols-outlined " id=${editid}>
        edit_note
        </span></button><button id='btn_delete'><span class="material-symbols-outlined" id=${deleteid}>
        delete
        </span></button>`;
      list.appendChild(li);
      console.log(editid);
      document.getElementById(editid).addEventListener("click", () => {
        myEditfunc(item);
      });
      document.getElementById(deleteid).addEventListener("click", () => {
        myDeletefunc(item);
      });
    });
}

function myDeletefunc(task) {
  console.log("hii");
  tasks = JSON.parse(localStorage.getItem("tasks"));

  let newTasks = tasks.filter((i) => {
    return i != task && i;
  });
  console.log("after delete log", newTasks);
  tasks = newTasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log("storedTasks", storedTasks);
  // window.location.reload();
  renderData(storedTasks);
}

function myEditfunc(task) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  // console.log('tasks',tasks)
  let indexOfTask = tasks.findIndex((t) => t === task);
  console.log('indexOfTask',indexOfTask);
  // console.log('taks',tasks[indexOfTask])
  // localStorage.setItem('tasks', JSON.stringify(tasks));
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  // console.log('storedTasks',storedTasks);
  // // window.location.reload();
  // console.log(document.getElementById('To-do').value)
  document.getElementById("To-do").value = tasks[indexOfTask];
  document.getElementById("To-do").setAttribute("index", indexOfTask);
  // console.log('index',tasks[indexOfTask])
  // renderData(storedTasks);
  document.getElementById("add").innerText = "UPDATE";

  // let editTxt=document.getElementById('editid');
  // console.log('edit',editTxt)
}
function editTheValue(indexOfTasktoUpdate) {
  let updateValue = document.getElementById("To-do").value;
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  // let indexOfTask=document.getElementById('To-do').getAttribute('index');
  console.log(indexOfTasktoUpdate, "indexOfTask", updateValue);
  if (!updateValue) {
    alert("Please enter the value...");
  } else {
    storedTasks[indexOfTasktoUpdate] = updateValue;
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    renderData(storedTasks);
  }
}
