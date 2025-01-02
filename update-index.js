import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Dapatkan direktori file saat ini dalam ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke file `index.js`
const indexPath = path.join(__dirname, "index.js");

// Fungsi untuk memperbarui handler `app.get("/")` dalam `index.js`
const updateRootHandler = () => {
  const currentDateTime = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

  // String yang akan digunakan untuk respon dinamis
  const newHandler = `
app.get("/", (req, res) => {
    res.send(\`Service is running properly, Last Deploy: ${currentDateTime}\`);
});
`;

  // Baca isi file `index.js`
  let indexFileContent = fs.readFileSync(indexPath, "utf8");

  // Regex untuk menemukan `app.get("/")` lama
  const rootHandlerRegex = /app\.get\("\/",[\s\S]*?\}\);/;

  // Perbarui handler jika ditemukan
  if (rootHandlerRegex.test(indexFileContent)) {
    indexFileContent = indexFileContent.replace(rootHandlerRegex, newHandler);
    fs.writeFileSync(indexPath, indexFileContent, "utf8");
    console.log("Root handler updated successfully in index.js");
  } else {
    console.log("Root handler not found in index.js");
  }
};

// Jalankan fungsi
updateRootHandler();