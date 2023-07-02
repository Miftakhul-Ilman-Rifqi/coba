if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/coba/service-worker.js", { scope: "/coba/" })
    .then(function (reg) {
      // Berhasil terdaftar
      console.log("Terdaftar pada scope " + reg.scope);
    })
    .catch(function (error) {
      // Gagal Terdaftar
      console.log("Gagal: " + error);
    });
}

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

  function selectExcelRadio() {
    const namesArray = ["Lahan A", "Lahan B", "Lahan C"];
    const choicesArray1 = [2, 4, 6, 8, 2, 4, 6, 8, 2, 4, 6, 4, 8];
    const choicesArray2 = [8, 6, 4, 2, 8, 6, 4, 2, 8, 6, 4, 6, 2];
    const choicesArray3 = [4, 6, 2, 6, 6, 2, 8, 4, 6, 2, 4, 8, 2];

    const nameInput = document.getElementById("nama");
    const currentName = namesArray[counter];
    nameInput.value = currentName;

    const questionDivs = document.querySelectorAll(".question");

    let currentChoicesArray;
    if (counter === 0) {
      currentChoicesArray = choicesArray1;
    } else if (counter === 1) {
      currentChoicesArray = choicesArray2;
    } else {
      currentChoicesArray = choicesArray3;
    }

    questionDivs.forEach((questionDiv, index) => {
      const radioButtons = questionDiv.querySelectorAll(".form-check-input");
      const currentChoice = currentChoicesArray[index];

      radioButtons.forEach((radioButton) => {
        radioButton.checked = parseInt(radioButton.value) === currentChoice;
      });
    });

    counter = (counter + 1) % namesArray.length;
  }

  document.getElementById("excelButtonPilihan").addEventListener("click", selectExcelRadio);

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

  // Fungsi untuk menghitung SAW
  function hitungData() {
    tableNormalisasiMatriks();
    hitungMatriksBobot();
    perangkingan();
  }

  // Fungsi untuk menghasilkan Tabel Normalisasi Matriks
  //-------- Tabel Normalisasi Matriks -------- 😎//
  function tableNormalisasiMatriks() {
    var tableRatingKecocokan = document.getElementById("dataTable");
    var tableNormalisasiMatriks = document.getElementById("dataTableNM");
    var rowCount = tableRatingKecocokan.rows.length;

    var tbody = tableNormalisasiMatriks.getElementsByTagName("tbody")[0];
    if (!tbody) {
      tbody = document.createElement("tbody");
      tableNormalisasiMatriks.appendChild(tbody);
    }

    var maxValues = {};
    var minValues = {};

    for (var i = 1; i < rowCount; i++) {
      for (var j = 1; j <= 13; j++) {
        var value = parseFloat(tableRatingKecocokan.rows[i].cells[j].innerHTML);
        var element = tableRatingKecocokan.rows[0].cells[j].innerHTML;

        if (j <= 10) {
          if (!maxValues[element] || value > maxValues[element]) {
            maxValues[element] = value;
          }
        } else {
          if (!minValues[element] || value < minValues[element]) {
            minValues[element] = value;
          }
        }
      }
    }

    for (var i = 1; i < rowCount; i++) {
      var row = tbody.insertRow();
      var namaCell = row.insertCell(0);
      namaCell.innerHTML = tableRatingKecocokan.rows[i].cells[0].innerHTML;
      namaCell.classList.add("sticky-td");
      namaCell.classList.add("fw-bold");

      for (var j = 1; j <= 13; j++) {
        var value = parseFloat(tableRatingKecocokan.rows[i].cells[j].innerHTML);
        var element = tableRatingKecocokan.rows[0].cells[j].innerHTML;
        var normalisasiValue;

        if (j <= 10) {
          normalisasiValue = value / maxValues[element];
        } else {
          normalisasiValue = minValues[element] / value;
        }

        var cell = row.insertCell(j);
        cell.innerHTML = isNaN(normalisasiValue) ? "0,00" : normalisasiValue.toFixed(2).replace(".", ",");
      }
    }
    //-------- Tabel Normalisasi Matriks -------- 😎//
  }

  // Fungsi untuk menghasilkan Tabel Hasil Matriks R*Bobot
  //-------- Tabel Hasil Matriks R*Bobot -------- 😎//
  function hitungMatriksBobot() {
    // Mengambil referensi tabel Rating Kecocokan dan Normalisasi Matriks
    var tableMRB = document.getElementById("dataTableMRB");
    var tableNormalisasiMatriks = document.getElementById("dataTableNM");

    // Mendapatkan referensi elemen tbody pada tabel
    var tbody = tableMRB.getElementsByTagName("tbody")[0];

    // Jika elemen <tbody> belum ada, tambahkan elemen <tbody> baru
    if (!tbody) {
      tbody = tableMRB.createTBody();
    }

    // Mendapatkan rowCount dari properti tbody
    var rowCount = tableNormalisasiMatriks.rows.length;

    // Mendapatkan nilai bobot dari elemen select
    var bobotValues = {};
    var elements = ["CurahHujan", "Ketinggian", "Topografi", "TeksturTanah", "KelasDrainase", "KeasamanTanah", "KedalamanEfektif", "Temperatur", "LebarJalan", "KualitasAir", "JarakdariPengolahan", "KondisiJalan", "HargaTanah"];

    elements.forEach(function (element) {
      bobotValues[element] = parseFloat(document.getElementById("bobot" + element).value.replace(",", "."));
    });

    // Menghitung hasil perkalian dengan bobot preferensi
    for (var i = 1; i < rowCount; i++) {
      var row = tbody.insertRow();
      var namaCell = row.insertCell(0);
      namaCell.innerHTML = tableNormalisasiMatriks.rows[i].cells[0].innerHTML;
      namaCell.classList.add("sticky-td");
      namaCell.classList.add("fw-bold");

      for (var j = 1; j < elements.length + 1; j++) {
        var value = parseFloat(tableNormalisasiMatriks.rows[i].cells[j].innerHTML.replace(",", "."));
        var hasilValue = bobotValues[elements[j - 1]] * value;
        var cell = row.insertCell(j);
        cell.innerHTML = hasilValue.toFixed(2).replace(".", ",");
      }
    }
    //-------- Tabel Hasil Matriks R*Bobot -------- 😎//
  }

  // Fungsi untuk menghasilkan Tabel Hasil Perangkingan
  //-------- Tabel Hasil Perangkingan -------- 😎//
  function perangkingan() {
    // Mengambil referensi tabel Rating Kecocokan dan Normalisasi Matriks
    var tableR = document.getElementById("dataTableR");
    var tableMRB = document.getElementById("dataTableMRB");

    // Mendapatkan atau membuat elemen <tbody> pada tabel Normalisasi Matriks
    var tbody = tableR.querySelector("tbody") || tableR.createTBody();

    // Menyimpan hasil penjumlahan
    var hasilPenjumlahan = [];

    var bobotValues = {};
    var elements = ["CurahHujan", "Ketinggian", "Topografi", "TeksturTanah", "KelasDrainase", "KeasamanTanah", "KedalamanEfektif", "Temperatur", "LebarJalan", "KualitasAir", "JarakdariPengolahan", "KondisiJalan", "HargaTanah"];

    elements.forEach(function (element) {
      bobotValues[element] = parseFloat(document.getElementById("bobot" + element).value.replace(",", "."));
    });

    // Melakukan penjumlahan pada setiap baris Hasil Matriks R*Bobot
    for (var i = 1; i < tableMRB.rows.length; i++) {
      var total = 0;
      for (var j = 1; j < elements.length + 1; j++) {
        var value = parseFloat(tableMRB.rows[i].cells[j].innerHTML.replace(",", "."));
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
      rankingCell.innerHTML = hasilPenjumlahan[i].total.toFixed(2).replace(".", ",");
    }
    //-------- Tabel Hasil Perangkingan -------- 😎//
  }

  function selectExcelBobot() {
    const choicesArrayBobot = [2, 1, 1, 2, 2, 3, 2, 2, 1, 2, 1, 2, 3];

    const selectElements = document.getElementsByTagName("select");

    for (let i = 0; i < selectElements.length; i++) {
      const selectElement = selectElements[i];
      const choice = choicesArrayBobot[i];

      for (let j = 0; j < selectElement.options.length; j++) {
        const option = selectElement.options[j];
        if (option.value === choice.toString()) {
          option.selected = true;
          break;
        }
      }
    }
  }
  document.getElementById("excelButtonBobot").addEventListener("click", selectExcelBobot);

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
