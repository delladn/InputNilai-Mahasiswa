import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const mahasiswaCol = collection(db, "data_mahasiswa");

const tableBody = document.querySelector('tbody');

async function loadData() {
    tableBody.innerHTML = '';
    let counter = 1;

    const snapshot = await getDocs(mahasiswaCol);
    snapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement('tr');
        [counter, data.nama, data.nim, data.mk, data.nilai].forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
        counter++;
    });
}

loadData();
