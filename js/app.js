import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const mahasiswaCol = collection(db, "data_mahasiswa");

const form = document.getElementById('dataForm');
const alertElement = document.querySelector('.alert');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const nim = document.getElementById('nim').value.trim();
    const mk = document.getElementById('mk').value.trim();
    const nilai = document.getElementById('nilai').value.trim();

    if (!nama || !nim || !mk || !nilai) {
        alert("⚠️ Semua field harus diisi!");
        return;
    }

    try {
        await addDoc(mahasiswaCol, {
            nama,
            nim,
            mk,
            nilai,
            timestamp: new Date()
        });

        if (alertElement) {
            alertElement.style.display = 'block';
            setTimeout(() => {
                alertElement.style.display = 'none';
            }, 3000);
        }

        form.reset();
    } catch (error) {
        console.error(error);
        alert("❌ Gagal menyimpan data: " + error.message);
    }
});
