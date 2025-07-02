# jilpadl

**jilpadl** adalah module Node.js untuk scraping data dari video TikTok dan Instagram secara langsung menggunakan teknik web scraping dengan bantuan `axios` dan `cheerio`.

## ✨ Fitur

- Mengambil informasi detail video TikTok.
- Mengambil informasi detail video Instagram.

## 📦 Instalasi

```bash
npm install jilpadl
```

## 🔧 Penggunaan

```javascript
const JilpaDl = require('jilpadl');

(async () => {
  const url = 'https://www.tiktok.com/@username/video/1234567890';
  const result = await JilpaDl.tiktok(url);

  console.log(result);
})();
```

## ⚠️ Catatan

- Hasil scraping bisa gagal jika TikTok mengubah struktur HTML atau JSON mereka.
- Pastikan URL yang digunakan adalah URL video TikTok publik.

## 📚 Dependensi

- [`axios`](https://www.npmjs.com/package/axios)
- [`cheerio`](https://www.npmjs.com/package/cheerio)
- [`qs`](https://www.npmjs.com/package/qs)

## 🧑‍💻 Author

Zilfa Ardiansyah

## 📄 Lisensi

[MIT](LICENSE)
