// =========================================
// 1. INISIALISASI ANIMASI (AOS)
// =========================================
AOS.init({ 
    duration: 1500, 
    once: true,
    mirror: false 
});

// =========================================
// 2. LOGIKA NAMA TAMU (URL PARAMETER)
// =========================================
const urlParams = new URLSearchParams(window.location.search);
const to = urlParams.get('to');
if (to) { 
    // Mengganti tanda + atau %20 menjadi spasi agar nama rapi
    document.getElementById('guestName').innerText = decodeURIComponent(to); 
}

// =========================================
// 3. FUNGSI BUKA UNDANGAN (OPENING)
// =========================================
function startInvitation() {
    const opening = document.getElementById('opening');
    const bgMusic = document.getElementById('bgMusic');
    
    // Transisi menghilang (Sesuai dengan durasi CSS)
    opening.style.opacity = '0';
    setTimeout(() => { 
        opening.style.visibility = 'hidden'; 
    }, 1500);

    // Putar musik & izinkan scroll
    if (bgMusic) {
        bgMusic.play().catch(error => {
            console.log("Autoplay dicegah browser, musik aktif setelah interaksi.");
        });
    }
    document.body.style.overflow = 'auto';
}

// Kunci scroll saat pertama kali dibuka (di screen opening)
document.body.style.overflow = 'hidden';

// =========================================
// 4. COUNTDOWN TIMER (WAKTU MUNDUR)
// =========================================
const weddingDate = new Date("Dec 10, 2026 08:00:00").getTime();

const countdownTask = setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    
    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    } else {
        clearInterval(countdownTask);
        if(document.querySelector('.countdown-container')) {
            document.querySelector('.countdown-container').innerHTML = "<h3>Acara Sedang/Sudah Berlangsung</h3>";
        }
    }
}, 1000);

// =========================================
// 5. RSVP VIA WHATSAPP
// =========================================
function sendRSVP() {
    const name = document.getElementById('rsvp_name').value;
    const status = document.getElementById('rsvp_status').value;
    const message = document.getElementById('rsvp_message').value;
    const phone = "6281233551798"; 
    
    if (!name || !status) { 
        alert("Mohon isi Nama dan Status Kehadiran Anda."); 
        return; 
    }
    
    const text = `Assalamu'alaikum Putri & Dwi,%0A%0ASaya *${name}* ingin mengonfirmasi bahwa saya *${status}* di acara pernikahan kalian.%0A%0AUcapan & Doa: ${message}`;
    
    window.open(`https://api.whatsapp.com/send?phone=${phone}?text=${text}`, '_blank');
}

// =========================================
// 6. SALIN NOMOR REKENING (MANDIRI)
// =========================================
function copyRek() {
    const norekElement = document.getElementById('norek');
    const btn = document.querySelector('.btn-copy-alt');
    
    // Menghapus spasi agar murni angka saat disalin
    const norekText = norekElement.innerText.replace(/\s/g, ''); 
    
    navigator.clipboard.writeText(norekText).then(() => {
        const originalText = btn.innerText;
        
        // Feedback Visual
        btn.innerText = "BERHASIL DISALIN!";
        btn.style.background = "#c5a358";
        btn.style.color = "#000";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ""; // Kembali ke CSS asal
            btn.style.color = "";      // Kembali ke CSS asal
        }, 2000);
    }).catch(err => {
        alert("Gagal menyalin, silakan salin secara manual.");
    });
}

// =========================================
// 7. KONTROL MUSIK (PLAY/PAUSE)
// =========================================
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (music.paused) { 
        music.play(); 
        btn.innerText = "♫";
        btn.classList.remove('paused');
    } else { 
        music.pause(); 
        btn.innerText = "🔇";
        btn.classList.add('paused');
    }
}
