# Inventory Management Backend

Ini adalah API backend untuk mengelola inventory dengan autentikasi pengguna, dibuat menggunakan Node.js, Express, Prisma, dan JWT untuk autentikasi berbasis token. Aplikasi ini terhubung ke database PostgreSQL dan menggunakan Prisma ORM untuk interaksi dengan database.

## Daftar Isi

- [Fitur](#fitur)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Folder](#struktur-folder)
- [API Endpoints](#api-endpoints)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur

- **Registrasi Pengguna**: Memungkinkan pengguna baru untuk mendaftar dengan username, email, dan password.
- **Login Pengguna**: Memungkinkan pengguna untuk login dan mendapatkan token JWT untuk permintaan API selanjutnya.
- **Autentikasi JWT**: Melindungi endpoint API dengan memverifikasi JSON Web Tokens (JWT).
- **Integrasi PostgreSQL**: Menggunakan PostgreSQL sebagai database untuk menyimpan informasi pengguna.
- **Prisma ORM**: Menyediakan antarmuka sederhana dan efisien untuk operasi database.

## Instalasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/user/inventory-management-backend.git
   ```
2. **Masuk Direktori project**:
   ```bash
   cd inventory-management-backend
   ```
3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Siapkan Database PostgreSql**:
   Pastikan PostgreSQL sudah terinstall dan berjalan di mesin kamu. Perbarui DATABASE_URL di file .env dengan kredensial database kamu.

5. **Jalankan Migrasi Prisma**:

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Jalankan APlikasi**:
   ```bash
   npm start
   ```
   Aplikasi akan berjalan di port yan telah ditentukan di file `.env` file (default `3000`).

## Penggunaan

### Register Pengguna Baru:

Kirim permintaan `POST` ke `/api/auth/register` dengan payload berikut:

```json
{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}
```

### Login

Kirim permintaan `POST` ke `/api/auth/login` dengan payload berikut:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

Jika login berhasil, kamu akan menerima token yang dapat digunakan untuk mengakses endpoint yang dilindungi.

### Struktur Folder

```bash
├── node_modules/
├── prisma/
│   └── schema.prisma          # File skema Prisma untuk definisi database
├── src/
│   ├── app.js                 # File aplikasi utama
│   ├── auth/
│   │   ├── auth.controller.js  # Mengelola rute registrasi dan login pengguna
│   │   ├── auth.repository.js  # Mengelola interaksi database terkait pengguna
│   │   └── auth.service.js     # Berisi logika bisnis untuk autentikasi
│   ├── db/
│   │   └── index.js            # Pengaturan dan ekspor Prisma client
├── .env                        # Konfigurasi variabel lingkungan
├── .gitignore                  # File yang diabaikan dalam Git
├── package.json                # Metadata proyek dan dependensi
├── package-lock.json           # Pohon dependensi
└── README.md                   # Dokumentasi proyek
```

### API EndPoints

`POST` `/api/auth/register`

- Mendaftarkan pengguna baru.
- Request Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

- Response:

```json
{
  "data": {
    "username": "string",
    "email": "string"
  },
  "message": "Registration Success!"
}
```

`POST` `/api/auth/login`

- Login user.
- Request Body:

```json
{
  "username": "string",
  "email": "string"
}
```

- Response:

```json
{
  "data": {
    "username": "string",
    "token": "jwt_token",
    "role": "string"
  },
  "message": "Login Success!"
}
```

### Vatriabel Lingkungan

Perlu membuat file `.env` di root proyek dan mendefinisikan variabel lingkungan yang berisi

- variabel port
- database_url
- jwt_secret.

### Implementasi JWT

- JWT digunakan untuk autentikasi setelah login.
- Token dibuat menggunakan `jsonwebtoken` library.
- Secret key disimpan di `.env` file sebagai `JWT_SECRET`.
- Token berisi informasi user (userId, username, email, role) dan berlaku selama 1 jam.

### Keamanan

- Password di-hash menggunakan bcrypt sebelum disimpan di database.
- Validasi input dilakukan di level service.
- Penggunaan environment variables untuk menyimpan informasi sensitif.

### Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini.
2. Buat branch baru `(git checkout -b feature-branch).`
3. Lakukan perubahan dan commit `(git commit -m 'Tambah fitur baru').`
4. Push ke branch `(git push origin feature-branch).`
5. Buat pull request.

### Lisensi

Proyek ini dilisensikan di bawah Lisensi [MIT]. Lihat file [LICENSE] untuk informasi lebih lanjut.
