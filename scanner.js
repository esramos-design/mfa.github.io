/**
 * MODULE: OPTICAL SCANNER & OCR
 * Version: 5.5 (ISOLATED PIPELINES)
 * Strategy: Separates Mining (Low Threshold) from Loadout (High Threshold)
 */

let scannerStream = null;

// --- 1. SCREEN CAPTURE (Common for all) ---
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
        await video.play(); // Force play to ensure metadata
        
        // UI Feedback
        if(indicator) indicator.classList.remove('hidden');
        if(btn) btn.classList.add('border-blue-500', 'bg-blue-900/20');

        // Wait for dimensions
        const checkReady = setInterval(async () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                clearInterval(checkReady);
                setTimeout(async () => {
                    await captureAndProcess(mode, 'stream');
                    stopScanner();
                }, 500);
            }
        }, 100);

        // Auto-stop handler
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
    if (!video || !canvas) return;
    if (video.videoWidth === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Route to specific isolated logic
    if (mode === 'mining') runMiningOCR(canvas, origin);
    else if (mode === 'loadout') runLoadoutOCR(canvas, origin);
    else runAutoOCR(canvas, origin); // For file uploads
}

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
                // Static file defaults to Auto
                runAutoOCR(canvas, 'file');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// =======================================================
// === 2. ISOLATED PIPELINE: MINING (Colored Text)     ===
// =======================================================

async function runMiningOCR(sourceCanvas, origin) {
    const loading = document.getElementById('ocr-loading');
    if(loading) loading.classList.remove('hidden');

    try {
        // Mining Specific Pre-process (Low Threshold for Colors)
        const processedImg = processForMining(sourceCanvas);
        
        const worker = await Tesseract.createWorker('eng');
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:%- '
        });

        const ret = await worker.recognize(processedImg);
        const text = ret.data.text;
        console.log("[MINING OCR] Raw:", text);
        await worker.terminate();

        parseMiningStats(text, origin);

    } catch (e) {
        console.error(e);
        triggerFeedback(origin, 'mining', false);
    } finally {
        if(loading) loading.classList.add('hidden');
    }
}

function processForMining(originalCanvas) {
    const w = originalCanvas.width;
    const h = originalCanvas.height;
    
    // Crop Right Side (Mining HUD)
    const cropX = w * 0.40; 
    const cropW = w * 0.60; 
    const cropY = h * 0.20; 
    const cropH = h * 0.70;

    const scale = 2.5;
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = cropW * scale;
    finalCanvas.height = cropH * scale;
    const ctx = finalCanvas.getContext('2d');

    ctx.drawImage(originalCanvas, cropX, cropY, cropW, cropH, 0, 0, finalCanvas.width, finalCanvas.height);

    const imageData = ctx.getImageData(0, 0, finalCanvas.width, finalCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // **CRITICAL FIX**: Threshold = 85. 
        // This keeps Red/Green/Orange text visible.
        // If we go higher (like 140), colored text disappears.
        const val = gray > 85 ? 0 : 255; 

        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
    }
    ctx.putImageData(imageData, 0, 0);
    return finalCanvas.toDataURL('image/jpeg', 1.0);
}

function parseMiningStats(text, origin) {
    // Clean common typos
    let cleanText = text
        .replace(/O/g, '0').replace(/[lI|]/g, '1')
        .replace(/S/g, '5').replace(/B/g, '8');

    // Robust Extractor (Handles "1 3" -> "13")
    const extract = (labels) => {
        const regex = new RegExp(`(?:${labels})[^0-9]*([0-9\\s\\.,]+)`, 'i');
        const match = cleanText.match(regex);
        if (match && match[1]) {
            // Remove spaces, fix commas
            let num = match[1].replace(/\s/g, '').replace(/,/g, '.');
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
    if (res !== null && !isNaN(res)) {
        if(res <= 100) { document.getElementById('resistance').value = res; updated = true; }
    }
    if (inst !== null && !isNaN(inst)) {
        if(inst <= 100) { document.getElementById('instability').value = inst; updated = true; }
    }

    if(updated && window.calculate) window.calculate();
    triggerFeedback(origin, 'mining', updated);
}

// =======================================================
// === 3. ISOLATED PIPELINE: LOADOUT (White Text)      ===
// =======================================================

async function runLoadoutOCR(sourceCanvas, origin) {
    const loading = document.getElementById('ocr-loading');
    if(loading) loading.classList.remove('hidden');

    try {
        // Loadout Specific Pre-process (High Threshold for Crisp White Text)
        const processedImg = processForLoadout(sourceCanvas);

        const worker = await Tesseract.createWorker('eng');
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:%- '
        });

        const ret = await worker.recognize(processedImg);
        const text = ret.data.text;
        console.log("[LOADOUT OCR] Raw:", text);
        await worker.terminate();

        parseLoadoutStats(text, origin);

    } catch (e) {
        console.error(e);
        triggerFeedback(origin, 'loadout', false);
    } finally {
        if(loading) loading.classList.add('hidden');
    }
}

function processForLoadout(originalCanvas) {
    const w = originalCanvas.width;
    const h = originalCanvas.height;

    // Loadouts can be anywhere, scan center 80%
    const cropX = w * 0.10; 
    const cropW = w * 0.80; 
    const cropY = h * 0.10; 
    const cropH = h * 0.80;

    const scale = 2.0;
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = cropW * scale;
    finalCanvas.height = cropH * scale;
    const ctx = finalCanvas.getContext('2d');

    ctx.drawImage(originalCanvas, cropX, cropY, cropW, cropH, 0, 0, finalCanvas.width, finalCanvas.height);

    const imageData = ctx.getImageData(0, 0, finalCanvas.width, finalCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // **CRITICAL**: Threshold = 140.
        // This ignores background noise and captures bright white text perfectly.
        const val = gray > 140 ? 0 : 255; 

        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
    }
    ctx.putImageData(imageData, 0, 0);
    return finalCanvas.toDataURL('image/jpeg', 1.0);
}

function parseLoadoutStats(text, origin) {
    const foundItems = [];
    const lowerText = text.toLowerCase();

    // Helper to search DB
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
        alert("Loadout Found: " + uniqueItems.join(", "));
        
        // Auto-Equip to first available ship
        const container = document.getElementById('multiShipContainer');
        if (container) {
            const card = container.querySelector('.ship-arm-card');
            if (card) {
                // Equip Laser
                const laser = uniqueItems.find(n => allLaserHeads.some(lh => lh.name === n));
                if (laser) {
                    const sel = card.querySelector('select[id$="-laser"]');
                    for(let i=0; i<sel.options.length; i++) {
                        if(sel.options[i].text.includes(laser)) sel.selectedIndex = i;
                    }
                }
                // Equip Modules
                const mods = uniqueItems.filter(n => n !== laser);
                const modSels = card.querySelectorAll('select[id*="-mod"]');
                mods.forEach((m, i) => {
                    if (modSels[i]) {
                        for(let k=0; k<modSels[i].options.length; k++) {
                            if(modSels[i].options[k].text.includes(m)) modSels[i].selectedIndex = k;
                        }
                    }
                });
                if (window.calculate) window.calculate();
            }
        }
        triggerFeedback(origin, 'loadout', true);
    } else {
        triggerFeedback(origin, 'loadout', false);
    }
}

// =======================================================
// === 4. AUTO (For File Uploads)                      ===
// =======================================================

async function runAutoOCR(canvas, origin) {
    // Try Mining logic first (low threshold)
    const processedImg = processForMining(canvas); 
    const worker = await Tesseract.createWorker('eng');
    await worker.setParameters({ tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:%- ' });
    
    const ret = await worker.recognize(processedImg);
    const text = ret.data.text;
    await worker.terminate();

    if (text.match(/Mass|Resistance|Instability/i)) {
        console.log("Auto-detected: Mining");
        parseMiningStats(text, origin);
    } else {
        console.log("Auto-detected: Loadout (Falling back)");
        // If mining failed, try loadout processing
        runLoadoutOCR(canvas, origin);
    }
}

// --- UTILS ---
function triggerFeedback(origin, mode, success) {
    if (origin === 'file') {
        const box = document.getElementById('fileInput').parentElement;
        const txt = box.querySelector('h3');
        const old = txt.innerText;
        txt.innerText = success ? "✅ DONE" : "❌ FAIL";
        setTimeout(() => txt.innerText = old, 2000);
    } else {
        const btn = document.getElementById(`btn-scan-${mode}`);
        if(btn) {
            const old = btn.innerHTML;
            btn.innerHTML = success ? "<span class='text-green-400'>✔ OK</span>" : "<span class='text-red-400'>❌ FAIL</span>";
            setTimeout(() => btn.innerHTML = old, 2000);
        }
    }
}