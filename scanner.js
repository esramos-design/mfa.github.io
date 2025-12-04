/**
 * MODULE: OPTICAL SCANNER & OCR
 * Version: 5.2-Refined (Fixes: "13" vs "1" Bug, Red Text, & Thresholds)
 * Based on the stable 403-line version you requested.
 */

let scannerStream = null;

// --- SCREEN CAPTURE (Live Stream) ---
window.toggleScan = async function(mode) {
    if (window.location.protocol === 'file:') {
        alert("Security Block: Scanner requires HTTPS or Localhost.");
        return;
    }

    const btn = document.getElementById(`btn-scan-${mode}`);
    const indicator = document.getElementById(`indicator-${mode}`);
    const video = document.getElementById('stream-video');

    if (scannerStream) {
        stopScanner();
        return;
    }

    try {
        scannerStream = await navigator.mediaDevices.getDisplayMedia({
            video: { cursor: "never" },
            audio: false
        });

        video.srcObject = scannerStream;
        await video.play(); 
        
        if(indicator) indicator.classList.remove('hidden');
        if(btn) btn.classList.add('border-blue-500', 'bg-blue-900/20');

        // Wait 500ms for stream to stabilize
        const checkReady = setInterval(async () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                clearInterval(checkReady);
                setTimeout(async () => {
                    await captureAndProcess(mode, 'stream');
                    stopScanner();
                }, 500);
            }
        }, 100);

        scannerStream.getVideoTracks()[0].onended = () => {
            stopScanner();
        };

    } catch (err) {
        console.error("Scanner Error:", err);
        stopScanner();
    }
};

function stopScanner() {
    const video = document.getElementById('stream-video');
    const indicators = document.querySelectorAll('[id^="indicator-"]');
    const btns = document.querySelectorAll('[id^="btn-scan-"]');

    if (scannerStream) {
        scannerStream.getTracks().forEach(track => track.stop());
        scannerStream = null;
    }
    if (video) video.srcObject = null;

    indicators.forEach(el => el.classList.add('hidden'));
    btns.forEach(el => el.classList.remove('border-blue-500', 'bg-blue-900/20'));
}

async function captureAndProcess(mode, origin) {
    const video = document.getElementById('stream-video');
    const canvas = document.getElementById('stream-canvas');
    if (!video || !canvas || video.videoWidth === 0) return;

    // Set canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Draw full frame
    ctx.drawImage(video, 0, 0);

    // Pass to OCR
    runOCR(canvas, mode, origin);
}

// --- FILE INPUT HANDLER ---
window.handleFileSelect = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('stream-canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                runOCR(canvas, 'auto', 'file');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// --- IMAGE PRE-PROCESSING ---
function preprocessImage(originalCanvas, mode) {
    const w = originalCanvas.width;
    const h = originalCanvas.height;

    // 1. DEFINE CROP REGION
    let cropX = 0, cropY = 0, cropW = w, cropH = h;

    if (mode === 'mining') {
        // Scan Right Side (40% width to be safe)
        cropX = w * 0.40; 
        cropW = w * 0.60; 
        cropY = h * 0.20; 
        cropH = h * 0.70; 
    } 
    // Else: Loadout scans the whole image (v5.2 behavior)

    // 2. SCALE UP
    const scaleFactor = 2.5; 
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = cropW * scaleFactor;
    scaledCanvas.height = cropH * scaleFactor;
    const ctx = scaledCanvas.getContext('2d');
    
    ctx.drawImage(originalCanvas, cropX, cropY, cropW, cropH, 0, 0, scaledCanvas.width, scaledCanvas.height);

    // 3. BRIGHTNESS FILTER (The Fix)
    const imageData = ctx.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // FIX 1: Use MAX brightness instead of average grayscale.
        // This ensures RED (255,0,0) is seen as Brightness 255.
        // Standard grayscale sees Red as dark (~54), which gets filtered out.
        const brightness = Math.max(r, g, b);

        // FIX 2: Threshold 90.
        // 140 (new versions) was too high for Loadout blue text.
        // 90 (old version) was good for Loadouts.
        // Combined with 'Max Brightness', this works for Mining Red text too.
        const val = brightness > 90 ? 0 : 255; 

        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
    }

    ctx.putImageData(imageData, 0, 0);
    return scaledCanvas.toDataURL('image/jpeg', 1.0);
}

// --- CORE OCR LOGIC ---
async function runOCR(sourceCanvas, mode, origin) {
    const loading = document.getElementById('ocr-loading');
    if(loading) loading.classList.remove('hidden');

    try {
        const processedImageIdx = preprocessImage(sourceCanvas, mode);
        
        const worker = await Tesseract.createWorker('eng');
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:%- '
        });

        const ret = await worker.recognize(processedImageIdx);
        const text = ret.data.text;
        console.log("OCR Output:", text); // Debug
        
        await worker.terminate();

        // Routing Logic
        if (mode === 'mining') parseMiningStats(text, origin);
        else if (mode === 'loadout') parseLoadoutStats(text, origin);
        else if (mode === 'auto') {
            if (text.match(/Mass|Resistance|Instability/i)) parseMiningStats(text, origin);
            else parseLoadoutStats(text, origin);
        }

    } catch (e) {
        console.error("OCR Failed:", e);
        alert("Scan Error: " + e.message);
    } finally {
        if(loading) loading.classList.add('hidden');
    }
}

function triggerFeedback(origin, mode, success) {
    if (origin === 'file') {
        const h3 = document.querySelector('#fileInput + div h3') || document.querySelector('h3'); // Fallback
        if(h3) {
            const old = h3.innerText;
            h3.innerText = success ? "✅ SUCCESS" : "❌ FAILED";
            setTimeout(() => h3.innerText = old, 2000);
        }
    } else {
        const btn = document.getElementById(mode === 'mining' ? 'btn-scan-mining' : 'btn-scan-loadout');
        if(btn) {
            const old = btn.innerHTML;
            btn.innerHTML = success ? "<span class='text-green-400'>✔ OK</span>" : "<span class='text-red-400'>❌ FAIL</span>";
            setTimeout(() => btn.innerHTML = old, 2000);
        }
    }
}

// --- PARSER 1: MINING ROCK (Enhanced Regex) ---
function parseMiningStats(text, origin) {
    let cleanText = text
        .replace(/O/g, '0').replace(/[lI|]/g, '1')
        .replace(/S/g, '5').replace(/B/g, '8');

    // Robust Regex (Fixes "1 3" -> "13")
    const extract = (labels) => {
        const regex = new RegExp(`(?:${labels})[^0-9]*([0-9\\s\\.,]+)`, 'i');
        const match = cleanText.match(regex);
        if (match && match[1]) {
            let num = match[1].replace(/\s/g, '').replace(/,/g, '.'); // Remove spaces, fix commas
            if(num.endsWith('.')) num = num.slice(0, -1);
            return parseFloat(num);
        }
        return null;
    };

    const mass = extract('Mass|Mss|Weight|M4ss');
    const res = extract('Resistance|Res|Rest|Rcs');
    const inst = extract('Instability|Inst|Stab|1nst');

    let updated = false;

    if (mass !== null && !isNaN(mass)) {
        document.getElementById('rockMass').value = mass;
        updated = true;
    }
    if (res !== null && !isNaN(res) && res <= 100) {
        document.getElementById('resistance').value = res;
        updated = true;
    }
    if (inst !== null && !isNaN(inst) && inst <= 100) {
        document.getElementById('instability').value = inst;
        updated = true;
    }

    if(updated && window.calculate) window.calculate();
    triggerFeedback(origin, 'mining', updated);
}

// --- PARSER 2: SHIP LOADOUT ---
function parseLoadoutStats(text, origin) {
    const foundItems = [];
    const lowerText = text.toLowerCase();

    const searchDB = (db) => {
        db.forEach(item => {
            if (item.name !== "None" && lowerText.includes(item.name.toLowerCase())) {
                foundItems.push(item.name);
            }
        });
    };

    if (typeof allLaserHeads !== 'undefined') searchDB(allLaserHeads);
    if (typeof powerModules !== 'undefined') searchDB(powerModules);
    if (typeof gadgets !== 'undefined') searchDB(gadgets);

    if (foundItems.length > 0) {
        const uniqueItems = [...new Set(foundItems)];
        alert("Found: " + uniqueItems.join(", "));

        // Auto-Equip Logic (Original v5.2 logic)
        const container = document.getElementById('multiShipContainer');
        if(container) {
            let card = container.querySelector('.ship-arm-card');
            
            // Auto-Add ship if missing
            if(!card && window.addShipLoadout) {
                window.addShipLoadout();
                card = container.querySelector('.ship-arm-card');
            }

            if(card) {
                const laser = uniqueItems.find(n => allLaserHeads.some(lh => lh.name === n));
                if (laser) {
                    const sel = card.querySelector('select[id$="-laser"]');
                    for(let i=0; i<sel.options.length; i++) {
                        if(sel.options[i].text.includes(laser)) sel.selectedIndex = i;
                    }
                }
                const mods = uniqueItems.filter(n => n !== laser);
                const modSels = card.querySelectorAll('select[id*="-mod"]');
                mods.forEach((m, i) => {
                    if (modSels[i]) {
                        for(let k=0; k<modSels[i].options.length; k++) {
                            if(modSels[i].options[k].text.includes(m)) modSels[i].selectedIndex = k;
                        }
                        // Toggle active check
                        if(window.togCheck) {
                             const parts = modSels[i].id.split('-');
                             window.togCheck(parts.slice(0,3).join('-'), parts[3].replace('mod',''));
                        }
                    }
                });
                if(window.calculate) window.calculate();
            }
        }
        triggerFeedback(origin, 'loadout', true);
    } else {
        triggerFeedback(origin, 'loadout', false);
    }
}