/**
 * MODULE: OPTICAL SCANNER & OCR
 * Version: 5.15 (Fixes: 3x Duplicate Detection & Regex Noise)
 * Strategy: "Wildcard" matching to catch "Rieger.C3" or "Rieger_C3".
 * Strict UI matching to prevent dropdown errors.
 */

let scannerStream = null;

// --- SCREEN CAPTURE ---
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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(video, 0, 0);
    runOCR(canvas, mode, origin);
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
                runOCR(canvas, 'auto', 'file');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// --- IMAGE PROCESSING (v5.11 Geometry) ---
function preprocessImage(originalCanvas, mode) {
    const w = originalCanvas.width;
    const h = originalCanvas.height;

    let cropX = 0, cropY = 0, cropW = w, cropH = h;

    if (mode === 'mining') {
        cropX = w * 0.50; cropW = w * 0.50; 
        cropY = h * 0.20; cropH = h * 0.60; 
    } else if (mode === 'loadout') {
        cropX = 0; cropW = w * 0.40; 
        cropY = h * 0.15; cropH = h * 0.70;
    }

    const scaleFactor = 2.0; 
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = cropW * scaleFactor;
    scaledCanvas.height = cropH * scaleFactor;
    const ctx = scaledCanvas.getContext('2d');
    
    ctx.drawImage(originalCanvas, cropX, cropY, cropW, cropH, 0, 0, scaledCanvas.width, scaledCanvas.height);

    const imageData = ctx.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]; const g = data[i + 1]; const b = data[i + 2];
        const brightness = Math.max(r, g, b);
        const val = brightness > 90 ? 0 : 255; 
        data[i] = val; data[i + 1] = val; data[i + 2] = val;
    }

    ctx.putImageData(imageData, 0, 0);
    return scaledCanvas.toDataURL('image/jpeg', 1.0);
}

// --- CORE OCR ---
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
        
        console.log("OCR RAW:", text);
        await worker.terminate();

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
    const btn = document.getElementById(mode === 'mining' ? 'btn-scan-mining' : 'btn-scan-loadout');
    if(btn) {
        const old = btn.innerHTML;
        btn.innerHTML = success ? "<span class='text-green-400'>✔ OK</span>" : "<span class='text-red-400'>❌ FAIL</span>";
        setTimeout(() => btn.innerHTML = old, 2000);
    }
}

// --- MINING PARSER ---
function parseMiningStats(text, origin) {
    let cleanText = text
        .replace(/O/g, '0').replace(/[lI|]/g, '1')
        .replace(/S/g, '5').replace(/B/g, '8').replace(/Z/g, '2');

    const extract = (labels) => {
        const regex = new RegExp(`(?:${labels})[^0-9]*([0-9\\s\\.,]+)`, 'i');
        const match = cleanText.match(regex);
        if (match && match[1]) {
            let num = match[1].replace(/\s/g, '').replace(/,/g, '.');
            if(num.endsWith('.')) num = num.slice(0, -1);
            return parseFloat(num);
        }
        return null;
    };

    const mass = extract('Mass|Mss|Weight|M4ss');
    const res = extract('Resistance|Res|Rest|Rcs');
    const inst = extract('Instability|Inst|Stab|1nst|In5t');

    let updated = false;
    if (mass !== null && !isNaN(mass)) { document.getElementById('rockMass').value = mass; updated = true; }
    if (res !== null && !isNaN(res)) { document.getElementById('resistance').value = res; updated = true; }
    if (inst !== null && !isNaN(inst)) { document.getElementById('instability').value = inst; updated = true; }

    if(updated && window.calculate) window.calculate();
    triggerFeedback(origin, 'mining', updated);
}

// --- LOADOUT PARSER (WILDCARD REGEX & STRICT UI) ---
function parseLoadoutStats(text, origin) {
    const foundItems = [];
    let processingText = text; // Keep casing for now

    let allItems = [];
    if (typeof allLaserHeads !== 'undefined') allItems = allItems.concat(allLaserHeads);
    if (typeof powerModules !== 'undefined') allItems = allItems.concat(powerModules);
    if (typeof gadgets !== 'undefined') allItems = allItems.concat(gadgets);

    // Sort: Longest First ("Rieger-C3" before "Rieger")
    allItems.sort((a, b) => b.name.length - a.name.length);

    allItems.forEach(item => {
        if (item.name === "None") return;
        
        // --- WILDCARD REGEX ---
        // Converts "Rieger-C3" -> /Rieger.{0,4}C3/gi
        // This matches: "Rieger C3", "Rieger.C3", "Rieger  C3", "Rieger_C3"
        let safeName = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Replace non-word chars (like dashes/spaces) with a greedy dot-match
        // We match any separator character (dash, space, underscore) OR up to 3 garbage chars
        let patternStr = safeName.replace(/[\s-]/g, '.{0,4}'); 
        
        const regex = new RegExp(patternStr, 'gi');

        // MATCH & COUNT
        const matches = processingText.match(regex);
        if (matches && matches.length > 0) {
            // Push 1 item for EVERY match found (e.g. 3 times)
            matches.forEach(() => foundItems.push(item.name));
            // Erase matches from text so they aren't counted again by shorter names
            processingText = processingText.replace(regex, (m) => '#'.repeat(m.length));
        }
    });

    if (foundItems.length > 0) {
        alert("Scanner Found (" + foundItems.length + "): " + foundItems.join(", "));
        
        const container = document.getElementById('multiShipContainer');
        if(container) {
            let card = container.querySelector('.ship-arm-card');
            if(!card && window.addShipLoadout) {
                window.addShipLoadout();
                card = container.querySelector('.ship-arm-card');
            }
            if(card) {
                const laser = foundItems.find(n => allLaserHeads.some(lh => lh.name === n));
                if (laser) {
                    const sel = card.querySelector('select[id$="-laser"]');
                    selectOptionByValue(sel, laser);
                }
                
                const mods = foundItems.filter(n => n !== laser);
                const modSels = card.querySelectorAll('select[id*="-mod"]');
                
                mods.forEach((m, i) => {
                    if (modSels[i]) {
                        // Use STRICT Value matching
                        selectOptionByValue(modSels[i], m);
                        
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

// Helper: Select by VALUE (Exact Match) not TEXT (Partial)
function selectOptionByValue(selectElement, val) {
    if(!selectElement) return;
    for(let i=0; i<selectElement.options.length; i++) {
        // Strict ID check: "Rieger" will NOT match "Rieger-C3"
        if(selectElement.options[i].value === val) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}