/**
 * MODULE: OPTICAL SCANNER & OCR
 * Version: 5.22 (GREEN CHANNEL ISOLATION)
 * Fix: Targets the GREEN color channel to equalize brightness 
 * between Cyan (Prospector), Orange (Mole), and White text.
 */

let scannerStream = null;

// --- VISUAL LOGGER SYSTEM ---
window.createDebugWindow = function() {
    let div = document.getElementById('ocr-debug-console');
    if (div) { div.style.display = 'block'; return; }

    div = document.createElement('div');
    div.id = 'ocr-debug-console';
    div.style.cssText = "position:fixed; bottom:10px; right:10px; width:450px; height:350px; background:rgba(0,0,0,0.95); color:#0f0; font-family:'Consolas', monospace; font-size:11px; padding:0; z-index:9999; border:2px solid #0f0; border-radius:4px; display:flex; flex-direction:column; resize:both; overflow:hidden;";

    div.innerHTML = `
        <div style="background:#003300; padding:5px; border-bottom:1px solid #0f0; display:flex; justify-content:space-between;">
            <span style="font-weight:bold; color:#fff;">SCANNER LOG v5.22</span>
            <div>
                <button onclick="window.copyLog()" style="cursor:pointer; background:#0f0; border:none;">COPY</button>
                <button onclick="window.clearLog()" style="cursor:pointer; background:#444; color:#fff; border:none;">CLEAR</button>
                <button onclick="window.closeLog()" style="cursor:pointer; background:#f00; color:#fff; border:none;">X</button>
            </div>
        </div>
        <div id="ocr-log-body" style="flex-grow:1; overflow-y:auto; padding:10px; user-select:text;"></div>
    `;
    document.body.appendChild(div);
    log("/// GREEN CHANNEL SCANNER READY ///");
}

window.log = function(msg) {
    if (!document.getElementById('ocr-debug-console')) window.createDebugWindow();
    const box = document.getElementById('ocr-log-body');
    if (box) {
        const entry = document.createElement('div');
        entry.style.borderBottom = "1px solid #004400";
        entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
        box.appendChild(entry);
        box.scrollTop = box.scrollHeight;
    }
    console.log(msg); 
}

window.copyLog = function() {
    navigator.clipboard.writeText(document.getElementById('ocr-log-body').innerText)
        .then(() => alert("Log Copied!"))
        .catch(e => alert("Copy Failed: " + e));
}
window.clearLog = function() { document.getElementById('ocr-log-body').innerHTML = ""; }
window.closeLog = function() { document.getElementById('ocr-debug-console').style.display = 'none'; }

// --- SCREEN CAPTURE ---
window.toggleScan = async function(mode) {
    window.createDebugWindow();
    log(`>>> INIT SCAN: ${mode.toUpperCase()} <<<`);

    if (window.location.protocol === 'file:') {
        alert("Security Block: Scanner requires HTTPS or Localhost.");
        return;
    }

    if (scannerStream) {
        stopScanner();
        return;
    }

    try {
        scannerStream = await navigator.mediaDevices.getDisplayMedia({
            video: { cursor: "never" },
            audio: false
        });

        const video = document.getElementById('stream-video');
        video.srcObject = scannerStream;
        await video.play(); 
        
        const checkReady = setInterval(async () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                clearInterval(checkReady);
                log(`Resolution: ${video.videoWidth} x ${video.videoHeight}`);
                setTimeout(async () => {
                    await captureAndProcess(mode, 'stream');
                    stopScanner();
                }, 500);
            }
        }, 100);

        scannerStream.getVideoTracks()[0].onended = () => stopScanner();

    } catch (err) {
        log("ERROR: " + err.message);
        stopScanner();
    }
};

function stopScanner() {
    const video = document.getElementById('stream-video');
    if (scannerStream) {
        scannerStream.getTracks().forEach(track => track.stop());
        scannerStream = null;
    }
    if (video) video.srcObject = null;
    log("Scanner Stopped.");
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

window.handleFileSelect = function(input) {
    window.createDebugWindow();
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
                log(`File Loaded: ${img.width}x${img.height}`);
                runOCR(canvas, 'auto', 'file');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// --- IMAGE PROCESSING (GREEN ISOLATION) ---
function preprocessImage(originalCanvas, mode) {
    const w = originalCanvas.width;
    const h = originalCanvas.height;
    let cropX = 0, cropY = 0, cropW = w, cropH = h;

    if (mode === 'mining') {
        // Mining: Right 50%
        cropX = w * 0.50; cropW = w * 0.50; 
        cropY = h * 0.20; cropH = h * 0.60; 
        log("Crop: Right 50%");
    } else if (mode === 'loadout') {
        // Loadout: Full Left Half (0-50%)
        // Safety Catch: Captures Far-Left (Mole) and Center-Left (Prospector)
        cropX = 0; 
        cropW = w * 0.50; 
        cropY = h * 0.15; 
        cropH = h * 0.70;
        log("Crop: Full Left Half (0-50%)");
    }

    const scaleFactor = 3.5; 
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = cropW * scaleFactor;
    scaledCanvas.height = cropH * scaleFactor;
    const ctx = scaledCanvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(originalCanvas, cropX, cropY, cropW, cropH, 0, 0, scaledCanvas.width, scaledCanvas.height);

    const imageData = ctx.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height);
    const data = imageData.data;

    log("Filter: Green Channel Isolation + Threshold 70");

    for (let i = 0; i < data.length; i += 4) {
        // R=i, G=i+1, B=i+2
        const green = data[i + 1]; // Only listen to Green Channel

        // Threshold 70 on Green Channel
        // If Green > 70 (Text is present), make Black (0)
        // If Green < 70 (Background), make White (255)
        const val = green > 70 ? 0 : 255; 

        data[i] = val; 
        data[i + 1] = val; 
        data[i + 2] = val;
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
        
        log("Loading Tesseract...");
        const worker = await Tesseract.createWorker('eng');
        await worker.setParameters({
            // Optimized whitelist: Caps, numbers, dash, space, dot
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.- '
        });

        log("Reading...");
        const ret = await worker.recognize(processedImageIdx);
        const text = ret.data.text;
        
        await worker.terminate();
        log("OCR DONE. Length: " + text.length);
        log("SAMPLE: " + text.substring(0, 100).replace(/[\n\r]+/g, ' '));

        if (mode === 'mining') parseMiningStats(text, origin);
        else if (mode === 'loadout') parseLoadoutStats(text, origin);
        else if (mode === 'auto') {
            if (text.match(/Mass|Resistance|Instability/i)) {
                log("Detected: Mining");
                parseMiningStats(text, origin);
            } else {
                log("Detected: Loadout");
                parseLoadoutStats(text, origin);
            }
        }

    } catch (e) {
        log("EXCEPTION: " + e.message);
    } finally {
        if(loading) loading.classList.add('hidden');
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

    log(`Mining Data -> Mass:${mass} Res:${res} Inst:${inst}`);

    let updated = false;
    if (mass !== null && !isNaN(mass)) { document.getElementById('rockMass').value = mass; updated = true; }
    if (res !== null && !isNaN(res)) { document.getElementById('resistance').value = res; updated = true; }
    if (inst !== null && !isNaN(inst)) { document.getElementById('instability').value = inst; updated = true; }

    if(updated && window.calculate) window.calculate();
    log(updated ? "SUCCESS" : "NO MATCHES");
}

// --- LOADOUT PARSER (GREEN FILTER ENABLED) ---
function parseLoadoutStats(text, origin) {
    const foundItems = [];
    let processingText = text; 

    let allItems = [];
    if (typeof allLaserHeads !== 'undefined') allItems = allItems.concat(allLaserHeads);
    if (typeof powerModules !== 'undefined') allItems = allItems.concat(powerModules);
    if (typeof gadgets !== 'undefined') allItems = allItems.concat(gadgets);

    allItems.sort((a, b) => b.name.length - a.name.length);

    log("DB Size: " + allItems.length);

    allItems.forEach(item => {
        if (item.name === "None") return;
        
        let safeName = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Loose Regex: spaces, dashes, dots allowed between parts
        let patternStr = safeName.replace(/[\s-]/g, '[\\s\\.\\-]*'); 
        const regex = new RegExp(patternStr, 'gi');

        const matches = processingText.match(regex);
        if (matches && matches.length > 0) {
            matches.forEach(() => foundItems.push(item.name));
            processingText = processingText.replace(regex, (m) => '#'.repeat(m.length));
        }
    });

    log(`Matches: ${foundItems.length} -> [${foundItems.join(', ')}]`);

    if (foundItems.length > 0) {
        const container = document.getElementById('multiShipContainer');
        if(container) {
            let card = container.querySelector('.ship-arm-card');
            
            if(!card && window.addShipLoadout) {
                log("Auto-Deploying Ship...");
                window.addShipLoadout();
                card = container.querySelector('.ship-arm-card');
            }

            if(card) {
                const laser = foundItems.find(n => allLaserHeads.some(lh => lh.name === n));
                if (laser) {
                    const sel = card.querySelector('select[id$="-laser"]');
                    selectOptionByValue(sel, laser);
                    log("Laser: " + laser);
                }
                
                const mods = foundItems.filter(n => n !== laser);
                const modSels = card.querySelectorAll('select[id*="-mod"]');
                
                mods.forEach((m, i) => {
                    if (modSels[i]) {
                        selectOptionByValue(modSels[i], m);
                        log(`Mod ${i+1}: ${m}`);
                        if(window.togCheck) {
                             const parts = modSels[i].id.split('-');
                             window.togCheck(parts.slice(0,3).join('-'), parts[3].replace('mod',''));
                        }
                    }
                });
                if(window.calculate) window.calculate();
            }
        }
    } else {
        log("No matches found.");
    }
}

function selectOptionByValue(selectElement, val) {
    if(!selectElement) return;
    for(let i=0; i<selectElement.options.length; i++) {
        if(selectElement.options[i].value === val) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}