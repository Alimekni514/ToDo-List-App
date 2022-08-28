let input = document.querySelector("#task");
let add = document.querySelector("#add");
let deletebtns = document.querySelectorAll(".delete");
let updatebtns = document.querySelectorAll(".update");
let alltasks = JSON.parse(localStorage.getItem("alltasks"));
let counterboxTotatDone = 0;

fetchDatafromLocalStorage();
// Add Task
add.onclick = () => {
  let userinput = input.value.trim();
  if (userinput) {
    console.log(alltasks);
    if (!alltasks) {
      alltasks = [];
    }
    input.value = "";
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth();
    let year = dateNow.getFullYear();
    let hours = dateNow.getHours();
    let minutes = dateNow.getMinutes();
    let seconds = dateNow.getSeconds();
    let date = `${month}/${day}/${year}  ${hours}:${minutes}:${seconds}`;
    let taskinfo = { name: userinput, date: date };
    alltasks.push(taskinfo);
    localStorage.setItem("alltasks", JSON.stringify(alltasks));
    fetchDatafromIndiceLocalStorage(alltasks.length);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ekteb Task Mte3k!",
    });
  }
};

function fetchDatafromLocalStorage() {
  let box = document.querySelector(".tasks");
  if (alltasks) {
    let counterboxTotalTodos = alltasks.length;
    let counterboxTotalTodosh3 = document
      .querySelector(".counter")
      .querySelectorAll("h3")[0]
      .querySelector("span");
    counterboxTotalTodosh3.textContent = counterboxTotalTodos;
    alltasks.forEach((task, index) => {
      //create li
      let li = document.createElement("li");
      li.className = "task";
      //create label
      let label = document.createElement("label");
      label.for = `${index}`;
      //create checkbox
      let checko = document.createElement("input");
      checko.type = "checkbox";
      checko.id = `${index}`;
      checko.setAttribute("onclick", "cocher(this)");

      //create task
      let p = document.createElement("p");
      p.innerText = task.name;
      p.setAttribute("onclick", "updatetask(this)");
      //create settings_button
      let divbutton = document.createElement("div");
      //create Buttons
      let updatebutton = document.createElement("button");
      updatebutton.setAttribute("class", "update");
      updatebutton.innerText = "Save";
      updatebutton.setAttribute("onclick", `saveTask(this)`);
      let deletebutton = document.createElement("button");
      deletebutton.setAttribute("class", "delete");
      deletebutton.innerText = "Delete";
      deletebutton.setAttribute("onclick", `deleteTask(${index},this)`);
      //create Time p
      let time = document.createElement("p");
      time.textContent = task.date;
      //apppend to label
      label.appendChild(checko);
      label.appendChild(p);
      //append to div buttons
      divbutton.appendChild(updatebutton);
      divbutton.appendChild(deletebutton);

      //append to task
      li.appendChild(label);
      li.appendChild(time);
      li.appendChild(divbutton);
      //append li to ul
      box.appendChild(li);
    });
  }
}
 function  fetchDatafromIndiceLocalStorage (index) {

    let box=document.querySelector(".tasks");
            //create li
            let li=document.createElement("li");
            li.className="task";
            //create label
            let label=document.createElement("label");
            label.for=`${index-1}`;
            //create checkbox
            let checko=document.createElement("input");
            checko.type="checkbox";
            checko.id=`${index-1}`;
            checko.setAttribute("onclick","cocher(this)");
            //create task
            let p=document.createElement("p");
            p.innerText=alltasks[index-1].name;
            //create settings_button
            let divbutton=document.createElement("div");
            //create Buttons
            let updatebutton=document.createElement("button");
            updatebutton.setAttribute("class","update");
            updatebutton.innerText="Save";
            updatebutton.setAttribute("onclick",`saveTask(this)`);
            let deletebutton=document.createElement("button");
            deletebutton.setAttribute("class","delete");
            deletebutton.innerText="Delete";
            deletebutton.setAttribute("onclick",`deleteTask(${index-1},this)`);
             //create Time p
             let time=document.createElement("p");
             time.textContent=alltasks[index-1].date;
             p.setAttribute("onclick","updatetask(this)");
            //apppend to label
            label.appendChild(checko);
            label.appendChild(p);
            //append to div buttons
            divbutton.appendChild(updatebutton);
            divbutton.appendChild(deletebutton);
            //append to task
            li.appendChild(label);
            li.appendChild(time);
            li.appendChild(divbutton);
            //append li to ul
            box.appendChild(li);
            //bech nzidou fi total todos b 1
            let counterboxTotalTodos=alltasks.length;
        let counterboxTotalTodosh3=document.querySelector(".counter").querySelectorAll("h3")[0].querySelector("span");
        counterboxTotalTodosh3.textContent=counterboxTotalTodos;

}
function updatetask(task) {
  labelmata3task = task.parentNode;
  let divbtns = labelmata3task.parentNode
    .querySelector("div")
    .querySelector(".update");
  divbtns.style.visibility = "visible";
  console.log(labelmata3task);
  let inputjdid = document.createElement("input");
  inputjdid.type = "text";
  inputjdid.setAttribute("class", "jdid");
  inputjdid.value = task.innerText;
  labelmata3task.appendChild(inputjdid);
  labelmata3task.querySelector("p").remove();
}
function saveTask(btn) {

  let label = btn.parentNode.parentNode.querySelector("label");
  let newtask = label.querySelector(".jdid").value;
  let pTime = btn.parentNode.parentNode.querySelector("p").textContent;
  let Timekol = alltasks.map((e) => e.date);
  let indexTime = Timekol.indexOf(pTime);
  alltasks[indexTime].name = newtask;
  localStorage.setItem("alltasks", JSON.stringify(alltasks));
  let p = document.createElement("p");
  p.setAttribute("onclick", "updatetask(this)");
  p.textContent = newtask;
  label.querySelector(".jdid").remove();
  label.appendChild(p);
  let divbtns = labelmata3task.parentNode
  .querySelector("div")
  .querySelector(".update");

  divbtns.style.visibility="hidden";
}
function deleteTask(indice, element) {
  let jedElement = element.parentNode.parentNode;
  console.log(jedElement);
  let pTime = jedElement.querySelector("p").textContent;
  console.log(pTime);
  let Timekol = alltasks.map((e) => e.date);
  let indexTime = Timekol.indexOf(pTime);
  alltasks.splice(indexTime, 1);
  localStorage.setItem("alltasks", JSON.stringify(alltasks));
  element.parentNode.parentNode.remove();
  let counterboxTotalTodos = alltasks.length;
  let counterboxTotalTodosh3 = document
    .querySelector(".counter")
    .querySelectorAll("h3")[0]
    .querySelector("span");
  counterboxTotalTodosh3.textContent = counterboxTotalTodos;
  //lena bech nzidou fi done
  counterboxTotatDone += 1;
  console.log(counterboxTotatDone);
  let counterboxTotalDoneh3 = document
    .querySelector(".counter")
    .querySelectorAll("h3")[1]
    .querySelector("span");
  counterboxTotalDoneh3.textContent = counterboxTotatDone;
}
function cocher(checkbox) {
  let Bouh = checkbox.parentNode;
  let p = Bouh.querySelector("p");
  if (checkbox.checked) {
    p.style.textDecoration = "line-through";
  } else {
    p.style.textDecoration = "none";
  }
}
