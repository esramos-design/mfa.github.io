/**
 * MODULE: OPTICAL SCANNER & OCR (FINAL V19)
 * Role: File Upload OCR + Draggable Log.
 * STRICTLY NO HEADER INJECTION.
 */

// --- 1. DEPENDENCY CHECK ---
(function loadTesseract() {
    if (typeof Tesseract !== 'undefined') return;
    const script = document.createElement('script');
    script.src = "https://unpkg.com/tesseract.js@2.1.0/dist/tesseract.min.js";
    document.head.appendChild(script);
})();

// --- 2. DRAGGABLE LOGIC ---
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;
    handle.style.cursor = 'move';

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.tagName === 'BUTTON') return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// --- 3. DEBUG LOG WINDOW ---
window.createDebugWindow = function() {
    if (document.getElementById('ocr-debug-console')) {
        document.getElementById('ocr-debug-console').style.display = 'flex';
        return;
    }

    const logWin = document.createElement('div');
    logWin.id = 'ocr-debug-console';
    logWin.style.cssText = "position:fixed; bottom:20px; right:20px; width:450px; height:450px; background:rgba(13, 13, 13, 0.98); color:#F2F2F2; font-family:'JetBrains Mono', monospace; font-size:11px; padding:0; z-index:99999; border:1px solid #404040; border-radius:8px; display:flex; flex-direction:column; box-shadow: 0 10px 40px rgba(0,0,0,0.5);";
    
    logWin.innerHTML = `
        <div id="ocr-drag-header" style="background:linear-gradient(90deg, #404040, #0D0D0D); padding:10px; border-bottom:1px solid #404040; display:flex; justify-content:space-between; align-items:center; user-select:none; cursor:move; border-radius: 8px 8px 0 0;">
            <span style="font-weight:bold; color:#fff; letter-spacing:1px;">OCR INTELLIGENCE</span>
            <div style="display:flex; gap:5px;">
                <button onclick="window.copyLog()" style="cursor:pointer; background:#262626; color:#fff; border:1px solid #737373; padding:2px 8px; border-radius:4px; font-size:10px;">COPY</button>
                <button onclick="window.clearLog()" style="cursor:pointer; background:#262626; color:#fff; border:1px solid #737373; padding:2px 8px; border-radius:4px; font-size:10px;">CLR</button>
                <button onclick="document.getElementById('ocr-debug-console').style.display='none'" style="cursor:pointer; background:#522; color:#fff; border:1px solid #a33; padding:2px 8px; border-radius:4px; font-size:10px;">X</button>
            </div>
        </div>
        <div id="ocr-log-body" style="flex-grow:1; overflow-y:auto; padding:10px; user-select:text;"></div>
        <div id="ocr-preview-area" style="height:120px; border-top:1px solid #404040; background:#000; padding:5px; display:flex; justify-content:center; align-items:center;">
            <span style="color:#737373;">[IMAGE PREVIEW]</span>
        </div>
    `;

    document.body.appendChild(logWin);
    makeDraggable(logWin, document.getElementById('ocr-drag-header'));
}

window.log = function(msg) {
    if (!document.getElementById('ocr-debug-console')) window.createDebugWindow();
    const box = document.getElementById('ocr-log-body');
    const entry = document.createElement('div');
    entry.style.borderBottom = "1px solid #262626";
    entry.style.padding = "4px 0";
    entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    box.appendChild(entry);
    box.scrollTop = box.scrollHeight;
}
window.clearLog = function() { document.getElementById('ocr-log-body').innerHTML = ""; }
window.copyLog = function() {
    navigator.clipboard.writeText(document.getElementById('ocr-log-body').innerText).then(()=>alert("Copied!"));
}

// --- 4. FILE HANDLING ---
window.handleFileSelect = function(input) {
    window.createDebugWindow();
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                log(`Image Loaded: ${img.width}x${img.height}`);
                runOCR(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// --- 5. IMAGE PROCESSING (GREEN BINARIZATION) ---
function preprocessImage(imgElement) {
    const w = imgElement.width;
    const h = imgElement.height;
    const scale = 2.0; 
    
    // Crop: Left 35% + Right 35%, skip top 20%
    const panelW = w * 0.35; 
    const panelH = h * 0.70; 
    const topOffset = h * 0.20; 

    const canvas = document.createElement('canvas');
    canvas.width = (panelW * 2) * scale; 
    canvas.height = panelH * scale;
    
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false; // Sharp pixels for binary
    
    // Draw Left (Loadout)
    ctx.drawImage(imgElement, 0, topOffset, panelW, panelH, 0, 0, panelW * scale, panelH * scale);
    // Draw Right (Mining)
    ctx.drawImage(imgElement, w - panelW, topOffset, panelW, panelH, panelW * scale, 0, panelW * scale, panelH * scale);

    // Green Binarization Filter
    const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = id.data;
    
    for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i+1], b = d[i+2];
        const lum = 0.299*r + 0.587*g + 0.114*b;
        
        let val = 255; // White BG
        if (lum > 80) val = 0; // Black Text
        
        d[i] = val; d[i+1] = val; d[i+2] = val;
    }
    ctx.putImageData(id, 0, 0);

    // Update Preview
    const pArea = document.getElementById('ocr-preview-area');
    if(pArea) {
        pArea.innerHTML = '';
        const preview = document.createElement('img');
        preview.src = canvas.toDataURL();
        preview.style.height = '100%';
        preview.style.border = '1px solid #404040';
        pArea.appendChild(preview);
    }
    
    return canvas.toDataURL('image/jpeg', 1.0);
}

// --- 6. OCR EXECUTION ---
async function runOCR(imgElement) {
    const load = document.getElementById('ocr-loading');
    if(load) load.classList.remove('hidden');

    try {
        const processedUrl = preprocessImage(imgElement);
        log("Initializing Tesseract...");
        
        const worker = await Tesseract.createWorker('eng');
        await worker.setParameters({ 
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.- %:,|' 
        });
        
        log("Reading Text...");
        const ret = await worker.recognize(processedUrl);
        const text = ret.data.text;
        await worker.terminate();

        log(`Scan Complete. (${text.length} chars)`);
        log("--- RAW READ START ---");
        log(text.substring(0, 150).replace(/[\n\r]+/g, ' | '));
        log("--- RAW READ END ---");

        if (text.match(/Mass|Mss|Resist|Instab|Shale|Obsidian/i)) { 
            log("Context: MINING DATA"); 
            parseMiningStats(text); 
        } else { 
            log("Context: LOADOUT DATA"); 
            parseLoadoutStats(text); 
        }

    } catch (e) { log("OCR Error: " + e.message); }
    finally { if(load) load.classList.add('hidden'); }
}

// --- 7. PARSERS ---
function parseMiningStats(text) {
    let clean = text.replace(/O/g, '0').replace(/o/g, '0').replace(/[lI|]/g, '1').replace(/i/g, '1').replace(/S/g, '5').replace(/B/g, '8').replace(/Z/g, '2');
    
    const extract = (label) => {
        const regex = new RegExp(`(?:${label})[\\s\\S]{0,50}?([0-9,]+(?:\\.[0-9]+)?)`, 'i');
        const m = clean.match(regex);
        if(!m) return null;
        let numStr = m[1].replace(/\s/g, '').replace(/,/g, '.');
        if(numStr.endsWith('.')) numStr = numStr.slice(0, -1);
        return parseFloat(numStr);
    };

    const extractMass = () => {
        const m = clean.match(/(?:Mass|Mss|Weight)[^0-9]{0,50}?([0-9,]+)/i);
        if(m) return parseFloat(m[1].replace(/,/g, ''));
        return null;
    }

    const mass = extractMass();
    const res = extract('Resist|Res|Rest');
    const inst = extract('Instab|Inst|Stab');

    log(`> Mass: ${mass || 'N/A'}`);
    log(`> Res: ${res || 'N/A'}%`);
    log(`> Inst: ${inst || 'N/A'}%`);
    
    let updated = false;
    if (mass) { document.getElementById('rockMass').value = mass; updated = true; }
    if (res !== null) { document.getElementById('resistance').value = res; updated = true; }
    if (inst !== null) { document.getElementById('instability').value = inst; updated = true; }
    
    if (updated && window.calculate) {
        window.calculate();
        log("Simulation Updated.");
    } else {
        log("No valid data found.");
    }
}

function parseLoadoutStats(text) {
    const found = [];
    let all = [];
    if (typeof allLaserHeads !== 'undefined') all = all.concat(allLaserHeads);
    if (typeof powerModules !== 'undefined') all = all.concat(powerModules);
    if (typeof gadgets !== 'undefined') all = all.concat(gadgets);
    all.sort((a,b) => b.name.length - a.name.length);

    let scanText = text;
    all.forEach(item => {
        if(item.name === "None") return;
        let safe = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/I/g, '[I1l|]').replace(/[\s-]/g, '[\\s\\.\\-]*');
        const reg = new RegExp(safe, 'gi');
        if (scanText.match(reg)) {
            found.push(item.name);
            scanText = scanText.replace(reg, "###");
        }
    });

    log(`Items: ${found.join(', ') || 'None'}`);

    if (found.length > 0 && window.addShipLoadout) {
        const cont = document.getElementById('multiShipContainer');
        let card = cont.querySelector('.ship-arm-card');
        if(!card) { window.addShipLoadout(); card = cont.querySelector('.ship-arm-card'); }

        if(card) {
            const laser = found.find(n => allLaserHeads.some(lh => lh.name === n));
            if (laser) {
                const s = card.querySelector('select[id$="-laser"]');
                for(let opt of s.options) { if(opt.text.includes(laser)) { s.value = opt.value; break; } }
                s.dispatchEvent(new Event('change'));
            }
            const mods = found.filter(n => n !== laser);
            const mSels = card.querySelectorAll('select[id*="-mod"]');
            mods.forEach((m, i) => {
                if (mSels[i]) { mSels[i].value = m; mSels[i].dispatchEvent(new Event('change')); }
            });
            if(window.calculate) window.calculate();
            log("Loadout Updated.");
        }
    }
}