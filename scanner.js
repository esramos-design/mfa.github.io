/**
 * MODULE: OPTICAL SCANNER & OCR
 * Version: 4.0 (Logic Repair & UI Consistency)
 * Handles: Screen Capture, Image Processing, and Tesseract.js interaction
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
        
        if(indicator) indicator.classList.remove('hidden');
        if(btn) btn.classList.add('border-blue-500', 'bg-blue-900/20');

        // Wait for stream to stabilize
        setTimeout(async () => {
            // Pass 'stream' as origin to know which button to update
            await captureAndProcess(mode, 'stream');
            stopScanner();
        }, 1000);

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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

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
                
                // Pass 'file' as origin to update the Upload Box instead of the buttons
                runOCR(canvas, 'auto', 'file');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// --- IMAGE PRE-PROCESSING ---
function preprocessImage(originalCanvas) {
    // 1. SCALE UP (2.0x is usually enough, 2.5x for safety)
    const scaleFactor = 2.0; 
    const w = originalCanvas.width * scaleFactor;
    const h = originalCanvas.height * scaleFactor;

    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = w;
    scaledCanvas.height = h;
    const ctx = scaledCanvas.getContext('2d');
    
    ctx.drawImage(originalCanvas, 0, 0, originalCanvas.width, originalCanvas.height, 0, 0, w, h);

    // 2. CONTRAST FILTER (Invert Dark Mode to Light Mode)
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        
        // Threshold adjusted for glowing UI text
        const val = gray > 90 ? 0 : 255; 

        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
    }

    ctx.putImageData(imageData, 0, 0);
    return scaledCanvas.toDataURL('image/jpeg', 0.9);
}

// --- CORE OCR LOGIC ---
async function runOCR(sourceCanvas, mode, origin) {
    const loading = document.getElementById('ocr-loading');
    if(loading) loading.classList.remove('hidden');

    try {
        const processedImageIdx = preprocessImage(sourceCanvas);
        const worker = await Tesseract.createWorker('eng');
        
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:%- '
        });

        const ret = await worker.recognize(processedImageIdx);
        const text = ret.data.text;
        console.log("OCR Raw:", text);
        
        await worker.terminate();

        // Routing Logic
        if (mode === 'mining') parseMiningStats(text, origin);
        else if (mode === 'loadout') parseLoadoutStats(text, origin);
        else if (mode === 'auto') {
            // Check keywords to decide parser
            if (text.match(/Mass|Res|Inst/i)) parseMiningStats(text, origin);
            else parseLoadoutStats(text, origin);
        }

    } catch (e) {
        console.error("OCR Failed:", e);
        alert("Scan Error: " + e.message);
    } finally {
        if(loading) loading.classList.add('hidden');
    }
}

// --- UI FEEDBACK HELPER ---
function triggerFeedback(origin, mode, success = true) {
    let targetId = "";
    
    if (origin === 'file') {
        // Find the upload box (using the h3 text as reference or the parent of input)
        const uploadBox = document.getElementById('fileInput').parentElement;
        const originalHtml = uploadBox.innerHTML;
        
        if(success) {
            uploadBox.classList.add('border-green-500', 'bg-green-900/20');
            uploadBox.querySelector('h3').innerText = "✅ FILE PROCESSED";
        } else {
            uploadBox.classList.add('border-red-500', 'bg-red-900/20');
            uploadBox.querySelector('h3').innerText = "❌ SCAN FAILED";
        }

        setTimeout(() => {
            uploadBox.innerHTML = originalHtml;
            uploadBox.classList.remove('border-green-500', 'bg-green-900/20', 'border-red-500', 'bg-red-900/20');
        }, 2500);

    } else {
        // Stream Buttons
        if (mode === 'mining' || (mode === 'auto' && origin !== 'file')) targetId = 'btn-scan-mining';
        else if (mode === 'loadout') targetId = 'btn-scan-loadout';

        const btn = document.getElementById(targetId);
        if(btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = success ? 
                `<span class='text-green-400 font-bold animate-pulse'>✔ DATA SYNCED</span>` : 
                `<span class='text-red-400 font-bold'>❌ NO DATA</span>`;
            
            setTimeout(() => btn.innerHTML = originalText, 2500);
        }
    }
}

// --- PARSER: MINING ROCK ---
function parseMiningStats(text, origin) {
    // 1. Sanitize: Convert O->0, l/I->1, fix spaced dots " . "
    const cleanText = text.replace(/(\d)\s+\.\s+(\d)/g, '$1.$2') // "201 . 25" -> "201.25"
                          .replace(/O/g, '0')
                          .replace(/[lI]/g, '1');

    // 2. Robust Regex: Capture EVERYTHING after the label until a newline or letter
    // This fixes the "4 digit truncation" by grabbing spaces/commas too: ([\d,\. ]+)
    const massRegex = /(?:MASS|MSS)[\s:.]*([\d,\. ]+)/i;
    const resRegex = /(?:RES|REST|RESISTANCE)[\s:.]*([\d\.]+)/i;
    const instRegex = /(?:INST|STAB|ABILITY)[\s:.]*([\d\.]+)/i;

    const massMatch = cleanText.match(massRegex);
    const resMatch = cleanText.match(resRegex);
    const instMatch = cleanText.match(instRegex);

    let updated = false;

    // Process Mass: Remove non-digits to fix "28 952" -> "28952"
    if (massMatch && massMatch[1]) {
        const rawMass = massMatch[1].replace(/[^0-9.]/g, ''); 
        if(rawMass.length > 0) {
            document.getElementById('rockMass').value = parseFloat(rawMass);
            updated = true;
        }
    }

    if (resMatch && resMatch[1]) {
        document.getElementById('resistance').value = parseFloat(resMatch[1]);
        updated = true;
    }

    if (instMatch && instMatch[1]) {
        document.getElementById('instability').value = parseFloat(instMatch[1]);
        updated = true;
    }

    if (updated) {
        if (typeof window.calculate === 'function') window.calculate();
        triggerFeedback(origin, 'mining', true);
    } else {
        alert("Scan finished but no clear data found.\nDetected: " + text.substring(0, 100));
        triggerFeedback(origin, 'mining', false);
    }
}

// --- PARSER: SHIP LOADOUT ---
function parseLoadoutStats(text, origin) {
    let detectedLasers = [];
    let detectedModules = [];
    let detectedGadgets = [];

    const findIn = (arr, txt) => arr.filter(item => item.name !== "None" && txt.toLowerCase().includes(item.name.toLowerCase()));

    // Ensure databases exist (from script.js)
    if (typeof allLaserHeads !== 'undefined') detectedLasers = findIn(allLaserHeads, text);
    if (typeof powerModules !== 'undefined') detectedModules = findIn(powerModules, text);
    if (typeof gadgets !== 'undefined') detectedGadgets = findIn(gadgets, text);

    if (detectedLasers.length === 0 && detectedModules.length === 0 && detectedGadgets.length === 0) {
        // Silent fail or alert depending on preference
        if(origin === 'file') alert("No loadout items found in image.");
        triggerFeedback(origin, 'loadout', false);
        return;
    }

    // Since we don't auto-equip loadouts (too complex/risky), we just confirm scan
    let msg = "SCANNED ITEMS:\n";
    if(detectedLasers.length) msg += "Lasers: " + detectedLasers.map(x=>x.name).join(", ") + "\n";
    if(detectedModules.length) msg += "Modules: " + detectedModules.map(x=>x.name).join(", ") + "\n";
    
    console.log(msg); // Log to console for debugging
    triggerFeedback(origin, 'loadout', true);
    
    // Optional: Alert the user what was found
    // alert(msg); 
}