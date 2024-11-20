// Tarayıcı yerel depolama
const localStorageKey = "notes";

// Notları yükle
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    renderNotes(notes);
    return notes;
}

// Notları kaydet
function saveNotes(notes) {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
}

// Notları güncelle
function renderNotes(notes) {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = ""; // Önce temizle

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const noteText = document.createElement("p");
        noteText.textContent = note;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Sil";
        deleteButton.addEventListener("click", () => {
            deleteNote(index);
        });

        noteDiv.appendChild(noteText);
        noteDiv.appendChild(deleteButton);
        notesList.appendChild(noteDiv);
    });
}

// Not ekle
function addNote() {
    const noteText = document.getElementById("noteText").value.trim();
    if (!noteText) {
        alert("Lütfen bir not girin!");
        return;
    }
    const notes = loadNotes();
    notes.push(noteText);
    saveNotes(notes);
    renderNotes(notes);
    document.getElementById("noteText").value = ""; // Giriş alanını temizle
}

// Not sil
function deleteNote(index) {
    const notes = loadNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes(notes);
}

// Etkinlik dinleyicileri
document.getElementById("addNote").addEventListener("click", addNote);

// Uygulama başlatıldığında notları yükle
loadNotes();
