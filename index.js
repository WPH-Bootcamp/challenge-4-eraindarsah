/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('9. Statistik Kelas');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Siswa Baru ---');
  // TODO: Lengkapi implementasi
  try {
    const id = readlineSync.question('ID Siswa: ');
    if (!id.trim()) {
      console.log('❌ ID tidak boleh kosong!');
      return;
    }

    // Cek apakah ID sudah ada
    if (manager.findStudent(id)) {
      console.log('❌ ID sudah digunakan!');
      return;
    }

    const name = readlineSync.question('Nama Siswa: ');
    if (!name.trim()) {
      console.log('❌ Nama tidak boleh kosong!');
      return;
    }

    const studentClass = readlineSync.question('Kelas (contoh: 10A): ');
    if (!studentClass.trim()) {
      console.log('❌ Kelas tidak boleh kosong!');
      return;
    }

    const student = new Student(id, name, studentClass);
    const success = manager.addStudent(student);

    if (success) {
      console.log('✅ Siswa berhasil ditambahkan!');
    } else {
      console.log('❌ Gagal menambahkan siswa!');
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  // Implementasi di sini
  console.log('\n--- Daftar Semua Siswa ---');
  // TODO: Lengkapi implementasi
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  // Implementasi di sini
  console.log('\n--- Cari Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');

  const student = manager.findStudent(id);
  if (student) {
    console.log('\n=== HASIL PENCARIAN ===');
    student.displayInfo();
  } else {
    console.log('❌ Siswa tidak ditemukan!');
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa yang akan diupdate: ');

  const student = manager.findStudent(id);
  if (!student) {
    console.log('❌ Siswa tidak ditemukan!');
    return;
  }

  console.log('\nData saat ini:');
  student.displayInfo();

  console.log('\nMasukkan data baru (kosongkan jika tidak ingin mengubah):');
  const newName = readlineSync.question(`Nama baru [${student.name}]: `);
  const newClass = readlineSync.question(`Kelas baru [${student.class}]: `);

  const updateData = {};
  if (newName.trim()) updateData.name = newName;
  if (newClass.trim()) updateData.class = newClass;

  if (Object.keys(updateData).length === 0) {
    console.log('❌ Tidak ada data yang diubah!');
    return;
  }

  const success = manager.updateStudent(id, updateData);
  if (success) {
    console.log('✅ Data siswa berhasil diupdate!');
  } else {
    console.log('❌ Gagal mengupdate data siswa!');
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa yang akan dihapus: ');

  const student = manager.findStudent(id);
  if (!student) {
    console.log('❌ Siswa tidak ditemukan!');
    return;
  }

  console.log('\nData siswa yang akan dihapus:');
  student.displayInfo();

  const confirm = readlineSync.question('Yakin ingin menghapus? (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    const success = manager.removeStudent(id);
    if (success) {
      console.log('✅ Siswa berhasil dihapus!');
    } else {
      console.log('❌ Gagal menghapus siswa!');
    }
  } else {
    console.log('❌ Penghapusan dibatalkan!');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Nilai Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ');

  const student = manager.findStudent(id);
  if (!student) {
    console.log('❌ Siswa tidak ditemukan!');
    return;
  }

  console.log('\nData siswa:');
  student.displayInfo();

  const subject = readlineSync.question('Mata Pelajaran: ');
  if (!subject.trim()) {
    console.log('❌ Nama mata pelajaran tidak boleh kosong!');
    return;
  }
  const scoreInput = readlineSync.question('Nilai (0-100): ');
  const score = parseFloat(scoreInput);

  if (isNaN(score) || score < 0 || score > 100) {
    console.log('❌ Nilai harus berupa angka antara 0-100!');
    return;
  }

  try {
    student.addGrade(subject, score);
    console.log('✅ Nilai berhasil ditambahkan!');
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  // Implementasi di sini
  console.log('\n--- Top 3 Siswa ---');
  // TODO: Lengkapi implementasi

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('Belum ada data nilai siswa.');
    return;
  }

  console.log('\n=== TOP 3 SISWA BERDASARKAN NILAI ===');
  topStudents.forEach((student, index) => {
    console.log(`\n🏆 Peringkat ${index + 1}:`);
    student.displayInfo();
  });
}

/**
 * BONUS: Handler untuk statistik kelas
 */
function viewClassStatistics() {
  console.log('\n--- Statistik Kelas ---');
  const className = readlineSync.question(
    'Masukkan nama kelas (contoh: 10A): '
  );

  const statistics = manager.getClassStatistics(className);

  console.log(`\n=== STATISTIK KELAS ${className} ===`);
  console.log(`Total Siswa: ${statistics.totalStudents}`);
  console.log(`Rata-rata Kelas: ${statistics.averageScore.toFixed(2)}`);
  console.log(`Lulus: ${statistics.passed} siswa`);
  console.log(`Tidak Lulus: ${statistics.failed} siswa`);
  console.log(`Tingkat Kelulusan: ${statistics.passRate.toFixed(2)}%`);
}

/**
 * Validasi input menu
 */
function validateMenuInput(input) {
  const choice = parseInt(input);
  return !isNaN(choice) && choice >= 1 && choice <= 9;
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  // TODO: Implementasikan loop utama program
  let running = true;

  while (running) {
    // Tampilkan menu
    displayMenu();

    // Baca pilihan user
    const choiceInput = readlineSync.question('Pilih menu (1-9): ');
    // Jalankan action sesuai pilihan
    if (!validateMenuInput(choiceInput)) {
      console.log('❌ Pilihan tidak valid! Silakan pilih 1-9.');
      continue;
    }
    // TODO: Lengkapi implementasi
    // Hint: gunakan switch-case untuk handle berbagai pilihan
    const choice = parseInt(choiceInput);

    switch (choice) {
      case 1:
        addNewStudent();
        break;
      case 2:
        viewAllStudents();
        break;
      case 3:
        searchStudent();
        break;
      case 4:
        updateStudent();
        break;
      case 5:
        deleteStudent();
        break;
      case 6:
        addGradeToStudent();
        break;
      case 7:
        viewTopStudents();
        break;

      case 8:
        running = false;
        break;
      case 9:
        viewClassStatistics();
        break;
      default:
        console.log('❌ Pilihan tidak valid!');
    }

    if (running && choice !== 9) {
      readlineSync.question('\nTekan Enter untuk melanjutkan...');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
