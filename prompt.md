# Master Prompt: SSL-Issuer Implementation (Nuxt 4 + Bash)

## Role & Context:
Anda adalah Senior Fullstack Developer yang ahli dalam **Nuxt 4** dan **Bash Scripting**. Tugas Anda adalah mengintegrasikan fitur **acme.sh** ke dalam proyek Nuxt 4 yang sudah ada untuk membuat alat manajemen sertifikat SSL personal yang dijalankan secara lokal.

## Objective:
Membangun web-based UI untuk meng-issue sertifikat SSL secara manual menggunakan `acme.sh`. Prosesnya melibatkan pengambilan info DNS Challenge, verifikasi manual oleh user, dan penampilan hasil akhir sertifikat untuk di-copy manual ke server panel.

## Project Architecture:
- **Core Engine:** Bash Script wrapper yang membungkus `acme.sh` (lokasi: `bin/engine.sh`).
- **Backend (Nitro):** Server API di `server/api/` yang menjalankan script Bash menggunakan Node.js `spawn` atau `exec`.
- **Frontend (Nuxt 4):** UI di dalam direktori `app/` (Pages & Components).
- **Storage:** Hasil sertifikat disimpan secara lokal di direktori `storage/` (direktori ini harus dilindungi dari akses publik).

## Technical Requirements:

### 1. Bash Engine (`bin/engine.sh`)
- Harus mendukung mode portable (mencari `acme.sh` di dalam folder `bin/`).
- Fungsi utama:
  - `issue`: Menjalankan mode DNS manual untuk mendapatkan rekord TXT.
  - `verify`: Menjalankan verifikasi setelah DNS diupdate.
  - `show`: Membaca file-file di folder storage untuk dikembalikan ke API.

### 2. Nitro API Endpoints
- `POST /api/ssl/issue`: Menerima `{ domain }`, mengembalikan `{ challenge_domain, txt_value }`.
- `POST /api/ssl/verify`: Menerima `{ domain }`, mengonfirmasi keberhasilan renewal, mengembalikan detail sertifikat.
- Data yang harus dikembalikan: `acme-challenge domain`, `TXT value`, `Cert`, `Cert Key`, `Intermediate CA Cert`, dan `Full-chain Cert`.

### 3. Frontend UI (Premium Design)
- **Aesthetics:** High-craft, Premium Dark Mode, Glassmorphism, Modern Typography.
- **Workflow (Wizard):**
  - **Step 1:** Input Domain.
  - **Step 2:** DNS Challenge Info (Card dengan tombol Copy untuk domain dan TXT value). Tombol "Verify" untuk lanjut.
  - **Step 3:** Summary View (Grid kartu mewah menampilkan hasil sertifikat). Setiap kode blok harus memiliki tombol "Click to Copy".
- Gunakan Nuxt 4 `app/` directory structure.

## UI/UX Guidelines:
- Gunakan Vanilla CSS atau Tailwind dengan desain yang terasa "Premium".
- Tambahkan micro-animations pada transisi antar langkah.
- Pastikan UI komunikatif saat proses request sedang berjalan (Loading states).

## Security:
- Pastikan input domain divalidasi dan disanitasi sebelum dilempar ke perintah Bash.
- Hindari mengekspos isi folder `storage/` secara langsung.
