const addbtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addbtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="tools">
           <button class="edit"><i class="fas fa-edit"></i></button>
          <button class="delete"><i class="fas fa-trash-alt"></i></button>
       </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

  note.innerHTML = htmlData;

  const deleteBtn = note.querySelector(".delete");
  const editBtn = note.querySelector(".edit");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  textArea.value = text;
  mainDiv.innerHTML = text;

  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (e) => {
    const value = e.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);

  const updateLSData = () => {
    const textAreaData = document.querySelectorAll("textarea");

    const notes = [];

    textAreaData.forEach((note) => {
      return notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
  };
}
