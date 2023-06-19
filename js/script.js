if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/coba/service-worker.js', { scope: '/coba/' })
      .then(function(reg) {
        // Berhasil terdaftar
        console.log('Terdaftar pada scope ' + reg.scope);
      })
      .catch(function(error) {
        // Gagal Terdaftar
        console.log('Gagal: ' + error);
      });
  }



// if ('serviceWorker' in navigator) {   //cek browser support serviceWorker
//     navigator.serviceWorker.register('/coba/service-worker.js',
//       {scope:'/coba/'}).then(function(reg){
//         //Berhasil terdaftar
//         console.log('Terdaftar pada scope' + reg.scope)
//     }).catch(function(error){
//         //Gagal Terdaftar
//         console.log('Gagal :' + error)
//     });
// };



// document.addEventListener('DOMContentLoaded', init, false);

// function init() {
//     if ('serviceWorker' in navigator && navigator.onLine) {
//         navigator.serviceWorker.register('service-worker.js')
//         .then((reg) => {
//             console.log('Service worker registered! 😎', reg);
//         }, (err) => {
//             console.error('😥 Service worker registration failed: ', err);
//         });
//     }
// }


// document.addEventListener('DOMContentLoaded', init, false);

// function init() {
//     if ('serviceWorker' in navigator && navigator.onLine) {   //cek browser support serviceWorker
//         navigator.serviceWorker.register('/service-worker.js')
//         .then((reg) => {
//                 //Berhasil terdaftar
//                 console.log('Service worker registered! 😎' + reg.scope)
//             }).catch(function (error) {
//                 //Gagal Terdaftar
//                 console.log('😥 Service worker registration failed: ' + error)
//             });
//     };
// }




//   if ('serviceWorker' in navigator && navigator.onLine) {
//       navigator.serviceWorker.register('service-worker.js')
//           .then((reg) => {
//               console.log('Service worker registered! 😎', reg);
//           }, (err) => {
//               console.error('😥 Service worker registration failed: ', err);
//           });
//   }

// Tambah data ke Tabel Rating Kecocokan
document.addEventListener("DOMContentLoaded", function () {
    function tambahData() {
        //-------- Tabel Rating Kecocokan -------- 😎//
        var nama = document.getElementById("nama").value;
        var pilihan = [];
        var isPilihanValid = true;

        for (var i = 1; i <= 13; i++) {
            var pilihanValue = document.querySelector('input[name="pilihan' + i + '"]:checked');
            if (pilihanValue === null) {
                isPilihanValid = false;
                break;
            }
            pilihan.push(pilihanValue.value);
        }

        if (nama !== "" && isPilihanValid) {
            var table = document.getElementById("dataTable");
            var tbody = table.querySelector("tbody");

            if (!tbody) {
                tbody = document.createElement("tbody");
                table.appendChild(tbody);
            }

            var row = tbody.insertRow();
            var namaCell = row.insertCell(0);
            namaCell.innerHTML = nama;
            namaCell.classList.add("sticky-td");
            namaCell.classList.add("fw-bold");

            for (var j = 0; j < pilihan.length; j++) {
                var pilihanCell = row.insertCell(j + 1);
                pilihanCell.innerHTML = pilihan[j];
            }

            document.getElementById("nama").value = "";
            for (var k = 1; k <= 13; k++) {
                document.querySelector('input[name="pilihan' + k + '"]:checked').checked = false;
            }
        }
    }
    //-------- Tabel Rating Kecocokan -------- 😎//

    // Initialize counter
    let counter = 0;

    // Function to randomly select a radio button option
    function selectRandomOption() {
        const questionDivs = document.querySelectorAll(".question");
        questionDivs.forEach((questionDiv) => {
            const radioButtons = questionDiv.querySelectorAll(".form-check-input");
            // Generate a random index to select an option
            const randomIndex = Math.floor(Math.random() * radioButtons.length);
            // Check the radio button at the random index
            radioButtons[randomIndex].checked = true;
        });

        // Generate random name
        const names = ["Blok A", "Blok B", "Blok C", "Blok D", "Blok E", "Blok F", "Blok G", "Blok H", "Blok I", "Blok J"];

        // Get the current name based on the counter
        const currentName = names[counter];

        // Fill in the current name
        const namaInput = document.getElementById("nama");
        namaInput.value = currentName;

        // Increase the counter
        counter++;

        // Reset the counter if it reaches the last index
        if (counter >= names.length) {
            counter = 0;
        }
    }

    // Event listener for the random button
    document.getElementById("randomButtonPilihan").addEventListener("click", selectRandomOption);

    var tambahButton = document.getElementById("tambahButton");
    tambahButton.addEventListener("click", tambahData);

    //Hitung SAW
    function hitungData() {
        //-------- Tabel Normalisasi Matriks -------- 😎//
        // Mendapatkan nilai bobot dari elemen select
        var bobotValues = {};
        var elements = ["CurahHujan", "Ketinggian", "Topografi", "TeksturTanah", "KelasDrainase", "KeasamanTanah", "KedalamanEfektif", "Temperatur", "LebarJalan", "KualitasAir", "JarakdariPengolahan", "KondisiJalan", "HargaTanah"];

        elements.forEach(function (element) {
            bobotValues[element] = parseFloat(document.getElementById("bobot" + element).value);
        });

        // Mengambil referensi tabel Rating Kecocokan
        var tableRatingKecocokan = document.getElementById("dataTable");

        // Mendapatkan jumlah baris pada tabel Rating Kecocokan
        var rowCount = tableRatingKecocokan.rows.length;

        // Menghitung nilai maksimum dari setiap variabel bobot
        var maxValues = {};
        elements.forEach(function (element) {
            maxValues[element] = 0;
        });

        for (var i = 1; i < rowCount; i++) {
            elements.forEach(function (element) {
                var value = parseFloat(tableRatingKecocokan.rows[i].cells[elements.indexOf(element) + 1].innerHTML);
                if (value > maxValues[element]) {
                    maxValues[element] = value;
                }
            });
        }

        // Mengambil referensi tabel Normalisasi Matriks
        var tableNormalisasiMatriks = document.getElementById("dataTableNM");

        // Mendapatkan referensi elemen tbody pada tabel Normalisasi Matriks
        var tbody = tableNormalisasiMatriks.getElementsByTagName("tbody")[0];

        // Jika elemen <tbody> belum ada, tambahkan elemen <tbody> baru
        if (!tbody) {
            tbody = document.createElement("tbody");
            tableNormalisasiMatriks.appendChild(tbody);
        }

        // Menghitung nilai normalisasi untuk setiap baris pada tabel Rating Kecocokan
        for (var i = 1; i < rowCount; i++) {
            var row = tbody.insertRow();
            var namaCell = row.insertCell(0);
            namaCell.innerHTML = tableRatingKecocokan.rows[i].cells[0].innerHTML;
            namaCell.classList.add("sticky-td");
            namaCell.classList.add("fw-bold");

            elements.forEach(function (element) {
                var value = parseFloat(tableRatingKecocokan.rows[i].cells[elements.indexOf(element) + 1].innerHTML);
                var normalisasiValue = value / maxValues[element];
                var cell = row.insertCell(elements.indexOf(element) + 1);
                cell.innerHTML = normalisasiValue.toFixed(2);
            });
        }

        //-------- Tabel Normalisasi Matriks -------- 😎//

        //-------- Tabel Hasil Matriks R*Bobot -------- 😎//
        // Mengambil referensi tabel Rating Kecocokan dan Normalisasi Matriks
        var tableMRB = document.getElementById("dataTableMRB");

        // Mendapatkan referensi elemen tbody pada tabel
        var tbody = tableMRB.getElementsByTagName("tbody")[0];

        // Jika elemen <tbody> belum ada, tambahkan elemen <tbody> baru
        if (!tbody) {
            tbody = tableMRB.createTBody();
        }

        // Menghitung hasil perkalian dengan bobot preferensi
        for (var i = 1; i < rowCount; i++) {
            var row = tbody.insertRow();
            var namaCell = row.insertCell(0);
            namaCell.innerHTML = tableNormalisasiMatriks.rows[i].cells[0].innerHTML;
            namaCell.classList.add("sticky-td");
            namaCell.classList.add("fw-bold");

            for (var j = 1; j < elements.length + 1; j++) {
                var value = parseFloat(tableNormalisasiMatriks.rows[i].cells[j].innerHTML);
                var hasilValue = bobotValues[elements[j - 1]] * value;
                var cell = row.insertCell(j);
                cell.innerHTML = hasilValue.toFixed(2);
            }
        }

        //-------- Tabel Hasil Matriks R*Bobot -------- 😎//

        //-------- Tabel Hasil Perangkingan -------- 😎//
        // Mengambil referensi tabel Rating Kecocokan dan Normalisasi Matriks
        var tableR = document.getElementById("dataTableR");

        // Mendapatkan atau membuat elemen <tbody> pada tabel Normalisasi Matriks
        var tbody = tableR.querySelector("tbody") || tableR.createTBody();

        // Menyimpan hasil penjumlahan
        var hasilPenjumlahan = [];

        // Melakukan penjumlahan pada setiap baris Hasil Matriks R*Bobot
        for (var i = 1; i < tableMRB.rows.length; i++) {
            var total = 0;
            for (var j = 1; j < elements.length + 1; j++) {
                var value = parseFloat(tableMRB.rows[i].cells[j].innerHTML);
                total += value;
            }

            hasilPenjumlahan.push({
                nama: tableMRB.rows[i].cells[0].innerHTML,
                total: total,
            });
        }

        // Mengurutkan hasil penjumlahan dari yang terbesar ke terkecil
        hasilPenjumlahan.sort(function (a, b) {
            return b.total - a.total;
        });

        // Menampilkan hasil perangkingan pada tabel Hasil Perangkingan
        for (var i = 0; i < hasilPenjumlahan.length; i++) {
            var row = tbody.insertRow();
            var namaCell = row.insertCell(0);
            var rankingCell = row.insertCell(1);

            namaCell.innerHTML = hasilPenjumlahan[i].nama;
            namaCell.classList.add("sticky-td"); // Menambahkan kelas "sticky-td" pada elemen label nama
            namaCell.classList.add("fw-bold"); // Menambahkan kelas "fw-bold" ke elemen <td> untuk nama
            rankingCell.innerHTML = hasilPenjumlahan[i].total.toFixed(2);
        }

        //-------- Tabel Hasil Perangkingan -------- 😎//
    }

    // Function to randomly select an option for a select element
    function selectRandomBobot(selectId) {
        const selectElement = document.getElementById(selectId);
        const options = selectElement.options;
        const randomIndex = Math.floor(Math.random() * options.length);
        options[randomIndex].selected = true;
    }

    // Function to handle the random button click event
    function handleRandomButtonBobotClick() {
        selectRandomBobot("bobotCurahHujan");
        selectRandomBobot("bobotKetinggian");
        selectRandomBobot("bobotTopografi");
        selectRandomBobot("bobotTeksturTanah");
        selectRandomBobot("bobotKelasDrainase");
        selectRandomBobot("bobotKeasamanTanah");
        selectRandomBobot("bobotKedalamanEfektif");
        selectRandomBobot("bobotTemperatur");
        selectRandomBobot("bobotLebarJalan");
        selectRandomBobot("bobotKualitasAir");
        selectRandomBobot("bobotJarakdariPengolahan");
        selectRandomBobot("bobotKondisiJalan");
        selectRandomBobot("bobotHargaTanah");
    }

    // Event listener for the random button
    document.getElementById("randomButtonBobot").addEventListener("click", handleRandomButtonBobotClick);

    const table = document.getElementById("dataTable");
    const button = document.getElementById("hitungSAW");

    function checkTableData() {
        button.disabled = !table.querySelector("tbody tr");
    }

    const observer = new MutationObserver(checkTableData);
    observer.observe(table, { childList: true, subtree: true });

    checkTableData();

    // var hitungSAW = document.getElementById("hitungSAW");
    // hitungSAW.addEventListener("click", hitungData);

    const hitungButton = document.getElementById("hitungSAW");
    const resetButton = document.getElementById("reset");

    hitungButton.addEventListener("click", function () {
        hitungData();
        hitungButton.disabled = true;
    });

    resetButton.addEventListener("click", function () {
        resetAll();
        hitungButton.disabled = true;
    });

    // Function to scroll to the specified element
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Event listener for the "Clear All" button
    document.getElementById("reset").addEventListener("click", function () {
        scrollToElement("dataForm");
    });

    // tombol Detail
    const btnDetail = document.getElementById("btnDetail");

    btnDetail.addEventListener("click", function () {
        this.innerHTML = this.innerHTML === "Lihat Detail" ? "Sembunyikan Detail" : "Lihat Detail";
    });

    function resetAll() {
        hitungButton.disabled = true; // Menghapus atribut disabled pada tombol "Hitung"

        // Mereset nilai input teks
        document.getElementById("nama").value = "";

        // Menghapus pilihan radio pada form
        document.querySelectorAll('input[type="radio"]').forEach((input) => {
            input.checked = false;
        });

        // Array of table IDs
        const tableIds = ["dataTable", "dataTableNM", "dataTableMRB", "dataTableR"];

        // Menghapus semua baris pada tabel
        tableIds.forEach((tableId) => {
            const table = document.getElementById(tableId);
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
        });

        // Array of select element IDs
        const selectIds = [
            "bobotCurahHujan",
            "bobotKetinggian",
            "bobotTopografi",
            "bobotTeksturTanah",
            "bobotKelasDrainase",
            "bobotKeasamanTanah",
            "bobotKedalamanEfektif",
            "bobotTemperatur",
            "bobotLebarJalan",
            "bobotKualitasAir",
            "bobotJarakdariPengolahan",
            "bobotKondisiJalan",
            "bobotHargaTanah",
        ];

        // Mengatur nilai seleksi kembali ke nilai awal pada elemen <select>
        selectIds.forEach((selectId) => {
            const select = document.getElementById(selectId);
            select.selectedIndex = 0;
        });
    }
});

// var btnMineral = document.getElementById("btnMineral");
// var btnGambut = document.getElementById("btnGambut");
// var kontenMineral = document.getElementById("kontenMineral");
// var kontenGambut = document.getElementById("kontenGambut");

// btnMineral.addEventListener("click", function () {
//     kontenMineral.style.display = "block";
//     kontenGambut.style.display = "none";
//     btnMineral.classList.add("active", "btn-primary");
//     btnMineral.classList.remove("btn-light");
//     btnGambut.classList.remove("active", "btn-primary");
//     btnGambut.classList.add("btn-light");
// });

// btnGambut.addEventListener("click", function () {
//     kontenMineral.style.display = "none";
//     kontenGambut.style.display = "block";
//     btnMineral.classList.remove("active", "btn-primary");
//     btnMineral.classList.add("btn-light");
//     btnGambut.classList.add("active", "btn-primary");
//     btnGambut.classList.remove("btn-light");
// });

///////

// var btnMineral = document.getElementById("btnMineral");
// var btnGambut = document.getElementById("btnGambut");
// var kontenMineral = document.getElementById("kontenMineral");
// var kontenGambut = document.getElementById("kontenGambut");

// function toggleKonten(activeButton, activeKonten, inactiveButton, inactiveKonten) {
//   activeButton.classList.add("active", "btn-primary");
//   activeButton.classList.remove("btn-light");
//   activeKonten.style.display = "block";
//   inactiveButton.classList.remove("active", "btn-primary");
//   inactiveButton.classList.add("btn-light");
//   inactiveKonten.style.display = "none";
// }

////////

// function tambah() {
//     var number1 = parseInt(document.getElementById("number1").value);
//     var number2 = parseInt(document.getElementById("number2").value);
//     var result = number1 + number2;
//     document.getElementById("result").textContent = result;
//   }

//   function reset() {
//     document.getElementById("number1").value = "";
//     document.getElementById("number2").value = "";
//     document.getElementById("result").textContent = "";
//   }
// var btnMineral = document.getElementById("btnMineral");
// var btnGambut = document.getElementById("btnGambut");
//switch button using Bootstrap’s

// resetButton.addEventListener("click", function () {
//     resetAll();
// });

// btnMineral.addEventListener("click", function () {
//     resetAll();
//     checkTableData();
// });

// btnGambut.addEventListener("click", function () {
//     resetAll();
//     checkTableData();
// });
