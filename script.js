const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Membuat fungsi tombol add
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item.value);
  item.value = ""; // Menghapus teks pada kolom input setelah menambahkan item baru
});

// Membuat fungsi tombol enter
document.querySelector("#item").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item.value);
    item.value = ""; // Menghapus teks pada kolom input setelah menambahkan item baru
  }
});

function displayItems() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
      const completedClass = itemsArray[i].completed ? 'completed-text' : '';
      const opacityStyle = itemsArray[i].completed ? 'opacity: 0.5;' : '';
      items += `<div class="item ${completedClass}" style="${opacityStyle}">
                  <div class="input-controller">
                    <input type="checkbox" data-index="${i}" ${itemsArray[i].completed ? 'checked' : ''}>
                    <textarea ${itemsArray[i].completed ? 'disabled' : ''}>${itemsArray[i].text}</textarea>
                    <div class="edit-controller">
                      <i class="fa-solid fa-trash deleteBtn"></i>
                      <i class="fa-solid fa-pen-to-square editBtn"></i>
                    </div>
                  </div>
                  <div class="update-controller">
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                  </div>
                  <div class="date">${itemsArray[i].date}</div>
                </div>`;
    }
  
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
    activateCheckboxListeners();
  }

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i); });
  });
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      // Mengembalikan nilai teks asli ke dalam textarea
      inputs[i].value = itemsArray[i].text;
      // Menyembunyikan bagian update-controller
      updateController[i].style.display = "none";
      // Menonaktifkan textarea
      inputs[i].disabled = true;
    });
  });
}

function activateCheckboxListeners() {
    let checkboxes = document.querySelectorAll('.input-controller input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const index = checkbox.getAttribute('data-index');
        markAsCompleted(index, checkbox.checked);
        // Mengatur tampilan teks dengan garis tengah sesuai dengan status checkbox
        const textArea = checkbox.nextElementSibling;
        if (checkbox.checked) {
          textArea.classList.add('completed-text');
        } else {
          textArea.classList.remove('completed-text');
        }
      });
    });
  }

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  displayItems();
}

function updateItem(text, i) {
  itemsArray[i].text = text;
  localStorage.setItem('items', JSON.stringify(itemsArray));
  displayItems();
}

function createItem(text) {
    const newItem = {
      text: text,
      completed: false,
      date: new Date().toLocaleDateString() // Menambahkan tanggal saat item ditambahkan
    };
    itemsArray.unshift(newItem);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    displayItems();
  }
  
  function markAsCompleted(index, completed) {
    itemsArray[index].completed = completed;
    if (completed) {
      const item = itemsArray.splice(index, 1)[0];
      itemsArray.push(item);
    } else {
      const item = itemsArray.splice(index, 1)[0];
      itemsArray.unshift(item);
    }
    localStorage.setItem('items', JSON.stringify(itemsArray));
    displayItems();
  }

window.onload = function () {
  if (itemsArray.length === 0) 
  displayDate();
  displayItems();
};





