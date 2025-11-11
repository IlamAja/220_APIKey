// index.js: Logika untuk API Key Generator (Generasi Instan)

document.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan elemen-elemen DOM
    const resultArea = document.getElementById('result-area');
    const keyValueSpan = document.getElementById('key-value');
    const copyButton = document.getElementById('copy-btn');
    const alertBox = document.getElementById('alert-box');

    /**
     * Menampilkan pesan notifikasi kustom.
     * @param {string} message - Pesan yang akan ditampilkan.
     * @param {('success'|'error')} type - Tipe pesan (untuk styling).
     */
    function showMessage(message, type = 'success') {
        alertBox.textContent = message;
        // Reset class dan hapus 'hidden'
        alertBox.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800'); 
        if (type === 'error') {
            alertBox.classList.add('bg-red-100', 'text-red-800');
        } else {
            alertBox.classList.add('bg-green-100', 'text-green-800');
        }
    }

    /**
     * Menghasilkan API Key yang kuat menggunakan Web Crypto API (browser crypto).
     * @returns {string} - API Key yang dihasilkan.
     */
    function generateApiKey() {
        // Bagian UUID untuk keunikan
        const uuidPart = crypto.randomUUID().replace(/-/g, '').toUpperCase();
        
        // Bagian random bytes untuk kekuatan kriptografi (32 byte = 64 hex chars)
        const randomBytesPart = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
            
        // Menggabungkan dan memberikan prefiks
        return `API_KEY_${randomBytesPart}${uuidPart.substring(0, 16)}`.toUpperCase();
    }

    // --- Eksekusi Kunci Secara Instan ---
    try {
        // 1. Generate Key
        const newApiKey = generateApiKey();

        // 2. Tampilkan Hasil di UI
        keyValueSpan.textContent = newApiKey;
        resultArea.classList.remove('hidden'); // Tampilkan area hasil

        console.log(`--- API Key Generated Instantly ---`);
        console.log(`API Key: ${newApiKey}`);
        
    } catch (error) {
        console.error("Error generating key:", error);
        showMessage("Gagal membuat API Key. Pastikan browser Anda mendukung Web Crypto API.", 'error');
        resultArea.classList.remove('hidden');
        keyValueSpan.textContent = "GENERATION FAILED";
    }

    // --- Copy to Clipboard Handler ---
    copyButton.addEventListener('click', () => {
        const keyText = keyValueSpan.textContent;
        
        if (navigator.clipboard) {
            // Menyalin menggunakan API modern
            navigator.clipboard.writeText(keyText).then(() => {
                showMessage('API Key berhasil disalin ke clipboard!', 'success');
            }).catch(err => {
                console.error('Could not copy text: ', err);
                showMessage('Gagal menyalin. Silakan salin teks secara manual.', 'error');
            });
        } else {
            // Fallback untuk browser lama
            document.execCommand('copy');
            showMessage('API Key berhasil disalin (metode lama)!', 'success');
        }
    });
});