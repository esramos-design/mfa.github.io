// --- API KEY MANAGEMENT ---
function openApiModal() {
    const modal = document.getElementById('api-modal');
    const input = document.getElementById('api-key-input');
    const currentKey = localStorage.getItem('gemini_api_key');
    if(currentKey) input.value = currentKey;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeApiModal() {
    const modal = document.getElementById('api-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 200);
}

function saveApiKey() {
    const input = document.getElementById('api-key-input');
    const key = input.value.trim();
    if(key) {
        localStorage.setItem('gemini_api_key', key);
        closeApiModal();
        alert("API Key Saved! The AI Foreman is ready.");
    } else {
        alert("Please enter a valid API key.");
    }
}

// --- THEME MANAGEMENT ---
function initTheme() {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateThemeIcon(storedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    if (currentSimState.power > 0) calculate();
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (theme === 'light') {
        icon.textContent = '🌙'; text.textContent = 'Dark Mode';
    } else {
        icon.textContent = '☀️'; text.textContent = 'Light Mode';
    }
}

// --- SIMULATION LOGIC ---
let currentSimState = { mass: 0, resistance: 0, instability: 0, power: 0, success: false, activeArms: 0 };

async function askAI(mode) {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) { openApiModal(); return; }
    const aiLoading = document.getElementById('ai-loading');
    const aiContent = document.getElementById('ai-content');
    const customInput = document.getElementById('ai-custom-input');
    
    if (currentSimState.power === 0) {
        aiContent.innerHTML = `<span class="text-yellow-500">// ERROR: No simulation data. Please run the simulation first.</span>`;
        return;
    }
    aiLoading.classList.remove('hidden');
    aiContent.innerHTML = ''; 

    let prompt = "";
    const rockDetails = `Rock Mass: ${currentSimState.mass}kg, Resistance: ${currentSimState.resistance.toFixed(1)}%, Instability: ${currentSimState.instability.toFixed(1)}%.`;
    const crewDetails = `Crew Power: ${currentSimState.power.toFixed(0)} MW from ${currentSimState.activeArms} active laser heads.`;
    const status = currentSimState.success ? "FRACTURE POSSIBLE" : "FRACTURE IMPOSSIBLE (Low Power)";

    if (mode === 'strategy') {
        prompt = `You are an expert Senior Mining Foreman in Star Citizen. Analyze: ${rockDetails} ${crewDetails} Status: ${status}. Provide a short, strategic assessment (max 100 words). 1. Is this safe? 2. Suggest specific Modules. 3. Use sci-fi terminology.`;
    } else if (mode === 'briefing') {
         prompt = `You are a Mining Crew Commander. Generate a short, tactical 'Copy/Paste' order for crew chat. Scenario: ${rockDetails} ${crewDetails} Format: "/// COMMAND UPLINK /// ... "`;
    } else if (mode === 'risk') {
        prompt = `Act as a Safety Officer. Analyze ONLY risk for: ${rockDetails}. Assess explosion probability based on Instability. Recommend safety protocols. Keep it brief.`;
    } else if (mode === 'optimize') {
        prompt = `Act as a Loadout Engineer. ${rockDetails} Current Power: ${currentSimState.power.toFixed(0)} MW. Suggest optimal modules (Surge, Brandt, Stampede) and explain why.`;
    } else if (mode === 'custom') {
        const query = customInput.value;
        if (!query) { aiLoading.classList.add('hidden'); return; }
        prompt = `Context: Star Citizen Mining. Rock: ${rockDetails} Crew: ${crewDetails} User Question: "${query}" Answer specifically as a Foreman.`;
    }

    try {
        const response = await callGemini(apiKey, prompt);
        aiContent.innerHTML = marked.parse(response);
    } catch (error) {
        aiContent.innerHTML = `<span class="text-red-500">// COMM LINK FAILURE: ${error.message}</span>`;
    } finally {
        aiLoading.classList.add('hidden');
        if(mode === 'custom') customInput.value = '';
    }
}

async function callGemini(key, prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    let attempts = 0;
    while (attempts < 3) {
        try {
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (e) {
            attempts++;
            if (attempts >= 3) throw e;
            await new Promise(r => setTimeout(r, 1000 * attempts));
        }
    }
}

let powerChart = null; let modChart = null; let resistanceChart = null;

// =========================================================
// === USER VERIFIED DATA (REGOLITH / UEXCORP) ===
// =========================================================

const ships = [
    { id: "mole", name: "Argo MOLE", arms: 3, maxLaserSize: 2, defaultLaser: 4080, moduleSlots: 3, isFixedLaser: false }, 
    { id: "prospector", name: "MISC Prospector", arms: 1, maxLaserSize: 1, defaultLaser: 3150, moduleSlots: 2, isFixedLaser: false }, 
    { id: "golem", name: "Drake Golem", arms: 1, maxLaserSize: 1, defaultLaser: 2700, moduleSlots: 2, isFixedLaser: true, fixedLaserName: "Pitman (~3150 MW)" } 
];

const allLaserHeads = [
    // Size 0
    { name: "Arbor MHV", size: 0, power: 1890, moduleSlots: 1, resistanceEffect: 15, instabilityEffect: 0, optimalWindow: 1.0, shatterDamage: 50, extractionRate: 1.0, inertFiltering: 0.0, optimalChargeRate: 1.0, overchargeRate: 1.0, optimalRange: 15, miningLaserPower: "189-1890", optimalChargeWindowSize: 0, optimalChargeWindowRate: 0, extractionLaserPower: 0, laserInstability: 0 }, 
    { name: "S0 Helix", size: 0, power: 1000, moduleSlots: 0, resistanceEffect: 0, instabilityEffect: 0, optimalWindow: 0.6, shatterDamage: 80, extractionRate: 1.2, inertFiltering: -0.1, optimalChargeRate: 1.2, overchargeRate: 1.2, optimalRange: 30, miningLaserPower: "0.15-1", optimalChargeWindowSize: -40, optimalChargeWindowRate: 20, extractionLaserPower: 5, laserInstability: 0 }, 
    { name: "S00 Hofstede", size: 0, power: 500, moduleSlots: 0, resistanceEffect: 35, instabilityEffect: 30, optimalWindow: 1.4, shatterDamage: 40, extractionRate: 1.0, inertFiltering: 0.0, optimalChargeRate: 2.0, overchargeRate: 1.0, optimalRange: 30, miningLaserPower: "", optimalChargeWindowSize: 40, optimalChargeWindowRate: 20, extractionLaserPower: 4, laserInstability: 30 }, 
    { name: "Lawson", size: 0, power: 1890, moduleSlots: 0, resistanceEffect: 35, instabilityEffect: 30, optimalWindow: 1.4, shatterDamage: 50, extractionRate: 1.0, inertFiltering: 0.0, optimalChargeRate: 1.0, overchargeRate: 1.0, optimalRange: 25, miningLaserPower: "", optimalChargeWindowSize: 40, optimalChargeWindowRate: 0, extractionLaserPower: 4, laserInstability: 30 },
    { name: "Pitman", size: 1, power: 3150, moduleSlots: 2, resistanceEffect: 25, instabilityEffect: 35, optimalWindow: 1.4, shatterDamage: 0, extractionRate: 0.7, inertFiltering: -40.0, optimalChargeRate: 1.1, overchargeRate: 1.3, optimalRange: 40, miningLaserPower: "630-3150", optimalChargeWindowSize: 40, optimalChargeWindowRate: -40, extractionLaserPower: 1295, laserInstability: 35 }, 
    // Size 1
    { name: "Arbor MH1", size: 1, power: 1890, moduleSlots: 1, resistanceEffect: 25, instabilityEffect: -35, optimalWindow: 1.4, shatterDamage: 0, extractionRate: 1.0, inertFiltering: -30.0, optimalChargeRate: 1.0, overchargeRate: 1.0, optimalRange: 60, miningLaserPower: "189-1890", optimalChargeWindowSize: 40, optimalChargeWindowRate: 0, extractionLaserPower: 1850, laserInstability: -35 },
    { name: "Helix I", size: 1, power: 3150, moduleSlots: 2, resistanceEffect: -30, instabilityEffect: 0.0, optimalWindow: 0.6, shatterDamage: -10, extractionRate: 1.0, inertFiltering: -30.0, optimalChargeRate: 1.2, overchargeRate: 1.5, optimalRange: 15, miningLaserPower: "630-3150", optimalChargeWindowSize: -40, optimalChargeWindowRate: 0, extractionLaserPower: 1850, laserInstability: 0 },
    { name: "Hofstede-S1", size: 1, power: 2100, moduleSlots: 1, resistanceEffect: -30, instabilityEffect: 10, optimalWindow: 1.0, shatterDamage: 0, extractionRate: 0.7, inertFiltering: -30.0, optimalChargeRate: 2.0, overchargeRate: 1.0, optimalRange: 45, miningLaserPower: "105-2100", optimalChargeWindowSize: 0, optimalChargeWindowRate: 20, extractionLaserPower: 1295, laserInstability: 10 },
    { name: "Impact I", size: 1, power: 2100, moduleSlots: 2, resistanceEffect: 10, instabilityEffect: -10, optimalWindow: 1.2, shatterDamage: 0, extractionRate: 1.5, inertFiltering: -30.0, optimalChargeRate: 1.3, overchargeRate: 1.1, optimalRange: 45, miningLaserPower: "420-2100", optimalChargeWindowSize: 20, optimalChargeWindowRate: -40, extractionLaserPower: 2775, laserInstability: -10 },
    { name: "Klein-S1", size: 1, power: 2220, moduleSlots: 1, resistanceEffect: -45, instabilityEffect: 35, optimalWindow: 1.2, shatterDamage: 0, extractionRate: 1.2, inertFiltering: -30.0, optimalChargeRate: 1.5, overchargeRate: 1.2, optimalRange: 45, miningLaserPower: "378-2220", optimalChargeWindowSize: 20, optimalChargeWindowRate: 0, extractionLaserPower: 2220, laserInstability: 35 },
    { name: "Lancet MH1", size: 1, power: 2520, moduleSlots: 1, resistanceEffect: 0, instabilityEffect: -10, optimalWindow: 0.4, shatterDamage: 0, extractionRate: 1.0, inertFiltering: -30.0, optimalChargeRate: 0.5, overchargeRate: 0.5, optimalRange: 30, miningLaserPower: "504-2520", optimalChargeWindowSize: -60, optimalChargeWindowRate: 40, extractionLaserPower: 1850, laserInstability: -10 },
    // Size 2
    { name: "Arbor MH2", size: 2, power: 2400, moduleSlots: 2, resistanceEffect: 25, instabilityEffect: -35, optimalWindow: 1.4, shatterDamage: 0, extractionRate: 1.4, inertFiltering: -40.0, optimalChargeRate: 1.0, overchargeRate: 1.0, optimalRange: 90, miningLaserPower: "480-2400", optimalChargeWindowSize: 40, optimalChargeWindowRate: 0, extractionLaserPower: 2590, laserInstability: -35 },
    { name: "Helix II", size: 2, power: 4080, moduleSlots: 3, resistanceEffect: -30, instabilityEffect: 0.0, optimalWindow: 0.6, shatterDamage: -10, extractionRate: 1.4, inertFiltering: -40.0, optimalChargeRate: 1.2, overchargeRate: 1.5, optimalRange: 30, miningLaserPower: "1020-4080", optimalChargeWindowSize: -40, optimalChargeWindowRate: 0, extractionLaserPower: 2590, laserInstability: 0 },
    { name: "Hofstede-S2", size: 2, power: 3360, moduleSlots: 2, resistanceEffect: -30, instabilityEffect: 10, optimalWindow: 1.6, shatterDamage: 0, extractionRate: 0.7, inertFiltering: -40.0, optimalChargeRate: 2.0, overchargeRate: 1.0, optimalRange: 60, miningLaserPower: "336-3360", optimalChargeWindowSize: 60, optimalChargeWindowRate: 20, extractionLaserPower: 1295, laserInstability: 10 },
    { name: "Impact II", size: 2, power: 3360, moduleSlots: 3, resistanceEffect: 10, instabilityEffect: -10, optimalWindow: 1.2, shatterDamage: 0, extractionRate: 1.7, inertFiltering: -40.0, optimalChargeRate: 1.3, overchargeRate: 1.1, optimalRange: 60, miningLaserPower: "840-3360", optimalChargeWindowSize: 20, optimalChargeWindowRate: -40, extractionLaserPower: 3145, laserInstability: -10 },
    { name: "Klein-S2", size: 2, power: 3600, moduleSlots: 2, resistanceEffect: -45, instabilityEffect: 35, optimalWindow: 1.2, shatterDamage: 0, extractionRate: 1.5, inertFiltering: -40.0, optimalChargeRate: 1.5, overchargeRate: 1.2, optimalRange: 60, miningLaserPower: "720-3600", optimalChargeWindowSize: 20, optimalChargeWindowRate: 0, extractionLaserPower: 2775, laserInstability: 35 },
    { name: "Lancet MH2", size: 2, power: 3600, moduleSlots: 2, resistanceEffect: 0, instabilityEffect: -10, optimalWindow: 0.4, shatterDamage: 0, extractionRate: 1.4, inertFiltering: -40.0, optimalChargeRate: 0.5, overchargeRate: 0.5, optimalRange: 45, miningLaserPower: "900-3600", optimalChargeWindowSize: -60, optimalChargeWindowRate: 40, extractionLaserPower: 2590, laserInstability: -10 },
].sort((a, b) => {
    if (b.size !== a.size) return b.size - a.size;
    return a.name.localeCompare(b.name);
});

const powerModules = [
    { name: "Surge", multiplier: 1.50, resistanceEffect: -15, instabilityEffect: 10, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 15, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 150 },
    { name: "Brandt", multiplier: 1.35, resistanceEffect: 15, instabilityEffect: 0.0, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: -30, duration: 60, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 135 },
    { name: "Stampede", multiplier: 1.35, resistanceEffect: 0.0, instabilityEffect: -10, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: -10, duration: 30, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 135 },
    { name: "Forel", multiplier: 1.00, resistanceEffect: 15, instabilityEffect: 0, activation: 'Active', windowEffect: 15, extractionEffect: 50, inertEffect: 0, shatterDamage: 0, duration: 60, catastrophicChargeRate: -60, extractionLaserPower: 150, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "Lifeline", multiplier: 1.00, resistanceEffect: -15, instabilityEffect: -20.0, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 15, catastrophicChargeRate: 60, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "Torpid", multiplier: 0.60, resistanceEffect: 40.0, instabilityEffect: 0.0, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: 40, duration: 60, catastrophicChargeRate: -60, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 60 }, 
    { name: "Rime", multiplier: 0.85, resistanceEffect: -25, instabilityEffect: 0.0, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: -10, duration: 20, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 85 },
    { name: "Optimum", multiplier: 0.85, resistanceEffect: 0.0, instabilityEffect: -10.0, activation: 'Active', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 60, catastrophicChargeRate: -80, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 85 },
    { name: "Rieger-C3", multiplier: 1.25, resistanceEffect: 0.0, instabilityEffect: 0, activation: 'Passive', windowEffect: -1, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: -1, miningLaserPower: 125 },
    { name: "Rieger-C2", multiplier: 1.20, resistanceEffect: 0.0, instabilityEffect: 0, activation: 'Passive', windowEffect: -3, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: -3, miningLaserPower: 120 },
    { name: "Rieger", multiplier: 1.15, resistanceEffect: 0.0, instabilityEffect: 0, activation: 'Passive', windowEffect: -10, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: -10, miningLaserPower: 115 },
    { name: "Focus III", multiplier: 0.95, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 40, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 40, miningLaserPower: 95 },
    { name: "Focus II", multiplier: 0.90, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 37, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 37, miningLaserPower: 90 },
    { name: "Focus", multiplier: 0.85, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 30, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 30, miningLaserPower: 85 },
    { name: "Torrent III", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0, activation: 'Passive', windowEffect: -1, extractionEffect: 0, inertEffect: 0, chargeRate: 40, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 40, optimalChargeWindowSize: -1, miningLaserPower: 0 }, 
    { name: "Torrent II", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0, activation: 'Passive', windowEffect: -3, extractionEffect: 0, inertEffect: 0, chargeRate: 35, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 35, optimalChargeWindowSize: -3, miningLaserPower: 0 }, 
    { name: "Torrent", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0, activation: 'Passive', windowEffect: -10, extractionEffect: 0, inertEffect: 0, chargeRate: 30, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 30, optimalChargeWindowSize: -10, miningLaserPower: 0 }, 
    { name: "XTR-XL", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 25, extractionEffect: -5, inertEffect: 6, inertMaterialLevel: -6, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 95, optimalChargeRate: 0, optimalChargeWindowSize: 25, miningLaserPower: 0 },
    { name: "XTR-L", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 22, extractionEffect: -10, inertEffect: 6, inertMaterialLevel: -5.7, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 90, optimalChargeRate: 0, optimalChargeWindowSize: 22, miningLaserPower: 0 }, 
    { name: "XTR", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 15, extractionEffect: -15, inertEffect: 5, inertMaterialLevel: -5, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 85, optimalChargeRate: 0, optimalChargeWindowSize: 15, miningLaserPower: 0 },
    { name: "Vaux-C3", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 0, extractionEffect: 25, inertEffect: 0, chargeRate: -5, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 125, optimalChargeRate: -5, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "Vaux-C2", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 0, extractionEffect: 20, inertEffect: 0, chargeRate: -15, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 120, optimalChargeRate: -15, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "Vaux", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 0, extractionEffect: 15, inertEffect: 0, chargeRate: -20, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 115, optimalChargeRate: -20, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "FLTR-XL", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 0, extractionEffect: 95, inertEffect: 24, inertMaterialLevel: -24, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 95, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "FLTR-L", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 0, extractionEffect: 90, inertEffect: 23, inertMaterialLevel: -23, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 90, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "FLTR", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Passive', windowEffect: 0, extractionEffect: 85, inertEffect: 20, inertMaterialLevel: -20, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 85, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 0 },
    { name: "None", multiplier: 1.00, resistanceEffect: 0.0, instabilityEffect: 0.0, activation: 'Default', windowEffect: 0, extractionEffect: 0, inertEffect: 0, shatterDamage: 0, duration: 0, catastrophicChargeRate: 0, extractionLaserPower: 0, optimalChargeRate: 0, optimalChargeWindowSize: 0, miningLaserPower: 0 },
]; 
function sortModules(modules) {
    return modules.sort((a, b) => {
        if (a.name === 'None') return -1; if (b.name === 'None') return 1;
        if (a.activation === 'Active' && b.activation === 'Passive') return -1;
        if (a.activation === 'Passive' && b.activation === 'Active') return 1;
        if (a.multiplier !== b.multiplier) return b.multiplier - a.multiplier;
        return a.name.localeCompare(b.name);
    });
}
const sortedModules = sortModules([...powerModules]); 

const gadgets = [
    { name: "Sabir", reduction: -50.0, instabilityEffect: 15, type: 'Multiplicative', desc: "Reduces Resistance massively but increases Instability.", clusterModifier: 0, laserInstability: 0, optimalChargeWindowRate: 0, optimalChargeWindowSize: 0, resistance: -50 }, 
    { name: "OptiMax", reduction: -30.0, instabilityEffect: 0.0, type: 'Multiplicative', desc: "Reduces Resistance but shrinks the Green Zone.", clusterModifier: 60, laserInstability: 0, optimalChargeWindowRate: 0, optimalChargeWindowSize: -30, resistance: -30 },
    { name: "BoreMax", reduction: 10.0, instabilityEffect: -70, type: 'Additive', desc: "Massively reduces Instability but increases Resistance slightly.", clusterModifier: 30, laserInstability: -70, optimalChargeWindowRate: 0, optimalChargeWindowSize: 0, resistance: 10 }, 
    { name: "Waveshift", reduction: 0.0, instabilityEffect: -35, type: 'Utility', desc: "Doubles the Green Zone size but slows charge rate.", clusterModifier: 0, laserInstability: -35, optimalChargeWindowRate: -30, optimalChargeWindowSize: 100, resistance: 0 }, 
    { name: "Stalwart", reduction: 0.0, instabilityEffect: -35, type: 'Utility', desc: "Stabilizes laser and increases charge rate, shrinks window.", clusterModifier: 30, laserInstability: -35, optimalChargeWindowRate: 50, optimalChargeWindowSize: 50, resistance: 0 }, 
    { name: "Okunis", reduction: 0.0, instabilityEffect: 0.0, type: 'Utility', desc: "Maximizes charge speed and window size.", clusterModifier: -20, laserInstability: 0, optimalChargeWindowRate: 100, optimalChargeWindowSize: 50, resistance: 0 },
    { name: "None", reduction: 0.0, instabilityEffect: 0.0, type: 'None', desc: "No Gadget Attached", clusterModifier: 0, laserInstability: 0, optimalChargeWindowRate: 0, optimalChargeWindowSize: 0, resistance: 0 }, 
].sort((a, b) => {
    if (a.name === "None") return -1;
    if (b.name === "None") return 1;
    return a.name.localeCompare(b.name);
});

// =========================================================

// --- COMPACT TEXT FORMATTER ---
function getFormattedStats(item, type) {
    let stats = [];
    if (type === 'laser') {
        if (item.power) stats.push(`${item.power}W`);
        if (item.resistanceEffect !== 0) stats.push(`${item.resistanceEffect > 0 ? '+' : ''}${item.resistanceEffect}%Res`);
        if (item.instabilityEffect !== 0) stats.push(`${item.instabilityEffect > 0 ? '+' : ''}${item.instabilityEffect}%Inst`);
    } else if (type === 'module') {
        if (item.multiplier !== 1.0) {
            const val = Math.round((item.multiplier - 1.0) * 100);
            stats.push(`Pwr${val > 0 ? '+' : ''}${val}%`);
        }
        if (item.resistanceEffect !== 0) stats.push(`Res${item.resistanceEffect > 0 ? '+' : ''}${item.resistanceEffect}%`);
        if (item.windowEffect !== 0) stats.push(`Win${item.windowEffect > 0 ? '+' : ''}${item.windowEffect}%`);
    } else if (type === 'gadget') {
        // Gadget data uses either 'reduction' or 'resistance' field depending on entry
        let r = item.reduction !== 0 ? item.reduction : (item.resistance || 0);
        if (r !== 0) stats.push(`Res${r > 0 ? '+' : ''}${r}%`);
    }
    if (stats.length === 0) return "";
    return ` (${stats.join(' ')})`; 
}

function assessDifficulty(instability, resistance) {
    let difficultyScore = resistance * 1.5 + instability;
    if (difficultyScore >= 100) return { text: "EXTREME: Very high instability/resistance.", color: "text-red-500" };
    else if (difficultyScore >= 60) return { text: "HARD: High instability/resistance.", color: "text-orange-400" };
    else if (difficultyScore >= 30) return { text: "MODERATE: Average difficulty.", color: "text-yellow-500" };
    else return { text: "EASY: Low difficulty.", color: "text-green-500" };
}

function displayResult(message, className) {
    document.getElementById('results').innerHTML = `<p class="text-center mt-4 ${className} font-bold text-lg">${message}</p>`;
}

function updateCharts(effectivePower, requiredPower, finalResistance, finalInstability, rockMass) {
    const powerCanvas = document.getElementById('powerChart');
    const modCanvas = document.getElementById('modChart');
    const resistanceCanvas = document.getElementById('resistanceChart');
    if (!powerCanvas || !modCanvas || !resistanceCanvas) return;

    const style = getComputedStyle(document.body);
    const gridColor = style.getPropertyValue('--chart-grid').trim();
    const textColor = style.getPropertyValue('--chart-text').trim();

    const powerCtx = powerCanvas.getContext('2d');
    const modCtx = modCanvas.getContext('2d');
    const resistanceCtx = resistanceCanvas.getContext('2d');
    
    if (powerChart) powerChart.destroy();
    if (modChart) modChart.destroy();
    if (resistanceChart) resistanceChart.destroy();

    const margin = effectivePower - requiredPower;
    const success = margin >= 0;
    const totalMax = Math.max(effectivePower, requiredPower) * 1.1; 
    
    powerChart = new Chart(powerCtx, {
        type: 'bar',
        data: {
            labels: ['Team Power', 'Required'],
            datasets: [{
                label: 'Power',
                data: [effectivePower/1000, requiredPower/1000],
                backgroundColor: [success ? '#10b981' : '#f87171', '#3b82f6'],
                borderWidth: 0, borderRadius: 4
            }]
        },
        options: {
            responsive: true, indexAxis: 'y', maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { min: 0, max: totalMax/1000, ticks: { color: textColor }, grid: { color: gridColor } },
                y: { ticks: { color: textColor }, grid: { display: false } }
            }
        }
    });

    let safeMargin = 100 - (finalResistance + finalInstability);
    if (safeMargin < 0) safeMargin = 0; 
    modChart = new Chart(modCtx, {
        type: 'doughnut',
        data: {
            labels: [`Res (${finalResistance.toFixed(0)}%)`, `Inst (${finalInstability.toFixed(0)}%)`, `Safe (${safeMargin.toFixed(0)}%)`],
            datasets: [{
                data: [finalResistance, finalInstability, safeMargin],
                backgroundColor: ['#ef4444', '#eab308', '#374151'],
                borderWidth: 0,
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: textColor, font: { size: 10 } } } }, cutout: '60%' }
    });

    const resLabels = []; const reqData = []; const myPowerData = [];
    for(let i=0; i<=100; i+=10) {
        resLabels.push(i + '%');
        let decimal = i / 100.0;
        let req = (rockMass * (1.0 - decimal)) / 5.0;
        reqData.push(req / 1000); myPowerData.push(effectivePower / 1000); 
    }
    resistanceChart = new Chart(resistanceCtx, {
        type: 'line',
        data: {
            labels: resLabels,
            datasets: [
                { label: 'Team', data: myPowerData, borderColor: '#3b82f6', backgroundColor: '#3b82f6', borderWidth: 2, pointRadius: 0 },
                { label: 'Req', data: reqData, borderColor: '#fbbf24', backgroundColor: '#fbbf24', borderWidth: 2, borderDash: [5, 5], pointRadius: 0 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
            plugins: { legend: { labels: { color: textColor, font: { size: 9 } } } },
            scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } }
        }
    });
}

function generateSmartLoadouts(mass, res, inst, reqPwr, currentPwr) {
    const calcLoadout = (laser, activeM, passiveM1, passiveM2) => {
        const modules = [activeM, passiveM1, passiveM2].filter(Boolean);
        let pwrMult = 1.0; let resEff = laser.resistanceEffect; let instEff = laser.instabilityEffect;
        modules.forEach(m => { pwrMult *= m.multiplier; resEff += m.resistanceEffect; instEff += m.instabilityEffect; });
        return { laser: laser, modules: modules, stats: { power: laser.power * pwrMult, resistanceRed: resEff, instability: instEff } };
    };

    const s2 = allLaserHeads.filter(h => h.size === 2);
    const s1 = allLaserHeads.filter(h => h.size === 1);
    const golemH = allLaserHeads.find(h => h.name.includes("Pitman"));
    const surge = powerModules.find(m => m.name.includes("Surge"));
    const brandt = powerModules.find(m => m.name.includes("Brandt"));
    const rieger = powerModules.find(m => m.name.includes("Rieger-C3"));
    const focus = powerModules.find(m => m.name.includes("Focus III"));
    const torrent = powerModules.find(m => m.name.includes("Torrent III"));
    
    let extraShipRec = null;
    if (reqPwr > currentPwr) {
        const deficit = reqPwr - currentPwr;
        extraShipRec = { primary: { count: Math.ceil(deficit / 4700), type: "Prospector" }, secondary: { count: Math.ceil(deficit / 4000), type: "Golem" }, tertiary: { count: Math.ceil(deficit / 12000), type: "MOLE" } };
    }

    return {
        mole: [
            { role: "BREAKER", ...calcLoadout(s2.find(h=>h.name.includes("Helix"))||s2[0], surge, rieger, rieger), desc: "MAX POWER" },
            { role: "STABILITY", ...calcLoadout(s2.find(h=>h.name.includes("Lancet"))||s2[0], brandt, focus, focus), desc: "SAFETY" },
            { role: "VACUUM", ...calcLoadout(s2.find(h=>h.name.includes("Impact"))||s2[0], null, torrent, torrent), desc: "SPEED" }
        ],
        prospector: { role: "SOLO", ...calcLoadout(s1.find(h=>h.name.includes("Helix"))||s1[0], surge, rieger, null), desc: "BALANCED" },
        golem: { role: "PITMAN", ...calcLoadout(golemH, surge, rieger, null), desc: "FIXED" }, 
        extra: extraShipRec
    };
}

function calculate() {
    const resultsContainer = document.getElementById('results');
    const allArms = document.querySelectorAll('.ship-arm-card');
    
    if (allArms.length === 0) {
        displayResult('No mining lasers. Deploy ship first.', 'text-[var(--text-muted)]');
        return;
    }

    let totalPwr = 0; let totalRes = 1.0; let totalInst = 1.0; let activeCount = 0;
    allArms.forEach(arm => {
        if (!document.getElementById(`${arm.id}-enable`).checked) return;
        const laserSelect = document.getElementById(`${arm.id}-laser`);
        if (!laserSelect || laserSelect.selectedIndex === -1) return;
        activeCount++;
        
        const opt = laserSelect.options[laserSelect.selectedIndex];
        const basePwr = parseFloat(laserSelect.value || '0');
        let armRes = 1.0 + (parseFloat(opt.getAttribute('data-resistance'))||0)/100;
        let armInst = 1.0 + (parseFloat(opt.getAttribute('data-instability'))||0)/100;
        let modPwr = 1.0;

        for (let i = 1; i <= 3; i++) {
            const modSel = document.getElementById(`${arm.id}-mod${i}`);
            if (modSel && !modSel.disabled && modSel.value !== 'None') {
                const mod = powerModules.find(m => m.name === modSel.value);
                const toggle = document.getElementById(`${arm.id}-mod${i}-active-toggle`);
                const isActive = (!mod.activation || mod.activation !== 'Active') || (toggle ? toggle.checked : true);
                if (isActive) {
                    modPwr *= mod.multiplier;
                    armRes *= (1 + (mod.resistanceEffect / 100));
                    armInst *= (1 + (mod.instabilityEffect / 100));
                }
            }
        }
        totalRes *= armRes; totalInst *= armInst; totalPwr += basePwr * modPwr;
    });

    if (activeCount > 0) {
        totalRes = Math.pow(totalRes, 1.0/activeCount);
        totalInst = Math.pow(totalInst, 1.0/activeCount);
    }

    const baseRes = parseFloat(document.getElementById('resistance').value);
    const baseInst = parseFloat(document.getElementById('instability').value);
    const rockMass = parseFloat(document.getElementById('rockMass').value);
    const gadget = gadgets.find(g => g.name === document.getElementById('gadgetSelect').value);
    if(gadget) { 
        // Handle gadget logic based on either 'reduction' or 'resistance' existing in the data object
        let gadgRes = gadget.reduction !== 0 ? gadget.reduction : (gadget.resistance || 0);
        totalRes *= (1 + gadgRes/100); 
        totalInst *= (1 + gadget.instabilityEffect/100); 
    }

    let finalRes = baseRes * totalRes; if(finalRes < 0) finalRes = 0;
    let finalInst = baseInst * totalInst; if(finalInst < 0) finalInst = 0;

    let reqPwr = 0;
    if (finalRes/100 < 1.0) reqPwr = (rockMass * (1.0 - finalRes/100)) / 5;
    
    const isSuccess = (totalPwr * 5 / (1.0 - finalRes/100)) >= rockMass;
    currentSimState = { mass: rockMass, resistance: finalRes, instability: finalInst, power: totalPwr, success: isSuccess, activeArms: activeCount };
    
    const formattedPwr = totalPwr.toLocaleString(undefined, { maximumFractionDigits: 0 });
    const diff = assessDifficulty(finalInst, finalRes);

    resultsContainer.innerHTML = `
        <div class="space-y-4 text-[var(--text-main)] text-center">
            <div class="grid grid-cols-2 gap-2">
                <div class="p-2 bg-[var(--bg-card)] rounded border border-[var(--border-main)]"><p class="text-[9px] uppercase">Resistance</p><p class="text-xl font-bold text-red-400">${finalRes.toFixed(1)}%</p></div>
                <div class="p-2 bg-[var(--bg-card)] rounded border border-[var(--border-main)]"><p class="text-[9px] uppercase">Instability</p><p class="text-xl font-bold text-purple-400">${finalInst.toFixed(1)}%</p></div>
            </div>
            <div class="p-2 bg-[var(--bg-card)] rounded border border-blue-500/30"><p class="text-[9px] uppercase">Total Power</p><p class="text-3xl font-bold text-yellow-500">${formattedPwr} MW</p></div>
            <div class="p-3 rounded font-bold text-white ${isSuccess ? 'bg-green-700' : 'bg-red-700'}"><p>${isSuccess ? 'SUCCESS' : 'FAILURE'}</p><p class="text-xs opacity-70">REQ: ${reqPwr.toFixed(0)} MW</p></div>
            <p class="${diff.color} text-xs font-bold">${diff.text}</p>
        </div>`;

    const recs = generateSmartLoadouts(rockMass, baseRes, baseInst, reqPwr, totalPwr);
    const renderCard = (r, c) => `
        <div class="p-2 mb-2 rounded bg-[var(--bg-card)] border border-[var(--border-main)]">
            <div class="flex justify-between"><span class="text-[10px] font-bold ${c}">${r.role}</span><span class="text-[9px] opacity-60">${r.laser.name}</span></div>
            <div class="text-[9px] opacity-50 truncate">${r.modules.map(m=>m.name.split('(')[0]).join('+')}</div>
        </div>`;
    
    document.getElementById('configs').innerHTML = `
        ${renderCard(recs.mole[0], 'text-red-400')}
        ${renderCard(recs.mole[1], 'text-blue-400')}
        ${renderCard(recs.prospector, 'text-green-400')}`;
    
    updateCharts(totalPwr, reqPwr, finalRes, finalInst, rockMass);
}

// --- UI GENERATION ---
let armIdCounter = 0; 
function createArmConfigHtml(armIndex, ship) {
    armIdCounter++; 
    const armId = `arm-${ship.id}-${armIdCounter}`;
    const heads = allLaserHeads.filter(h => ship.id === 'golem' ? h.name.includes('Pitman') : !h.name.includes('Pitman') && h.size <= ship.maxLaserSize);

    const laserOpts = heads.map(h => {
        let sel = (ship.id==='mole'&&h.name.includes('Helix II')) || (ship.id==='prospector'&&h.name.includes('Helix I')) || (ship.id==='golem'&&h.name.includes('Pitman'));
        return `<option value="${h.power}" data-slots="${h.moduleSlots}" data-resistance="${h.resistanceEffect}" data-instability="${h.instabilityEffect}" ${sel?'selected':''}>${h.name}${getFormattedStats(h,'laser')}</option>`;
    }).join('');

    let modHtml = '';
    const maxSlots = ship.isFixedLaser ? 2 : ship.moduleSlots; // Approx logic
    const modOpts = `<option value="None">None</option>` + sortedModules.map(m => `<option value="${m.name}">${m.name}${getFormattedStats(m,'module')}</option>`).join('');

    for(let i=1; i<=3; i++) {
        const dis = i > maxSlots;
        modHtml += `<div class="flex gap-1 mb-1"><select id="${armId}-mod${i}" class="w-full text-[10px] p-1 bg-[var(--bg-input)] border border-[var(--border-main)] rounded" onchange="checkMod(this,'${armId}-m${i}-tog');calculate()" ${dis?'disabled':''}>${dis?`<option>Locked</option>`:modOpts}</select>
        <div id="${armId}-m${i}-tog" class="hidden"><input type="checkbox" id="${armId}-mod${i}-active-toggle" checked onchange="calculate()"></div></div>`;
    }

    return `<div id="${armId}" class="p-3 mb-2 rounded bg-[var(--bg-card)] border border-[var(--border-main)] ship-arm-card" data-ship="${ship.id}">
        <div class="flex justify-between items-center mb-1"><span class="text-xs font-bold text-[var(--text-main)]">${ship.name} #${armIndex}</span>
        <input type="checkbox" id="${armId}-enable" checked onchange="calculate()"></div>
        <select id="${armId}-laser" class="w-full text-[10px] p-2 mb-2 bg-[var(--bg-input)] border border-[var(--border-main)] rounded" onchange="updateLaser(this,'${armId}');calculate()">${laserOpts}</select>
        ${modHtml}
        <button onclick="this.parentElement.remove();calculate()" class="text-[9px] text-red-400 mt-1 w-full text-right">REMOVE</button>
    </div>`;
}

function updateLaser(sel, armId) {
    const opt = sel.options[sel.selectedIndex];
    const slots = parseInt(opt.getAttribute('data-slots'));
    for(let i=1; i<=3; i++) {
        const m = document.getElementById(`${armId}-mod${i}`);
        if(i > slots) { m.disabled = true; m.innerHTML = '<option>Locked</option>'; }
        else if (m.disabled) { m.disabled = false; m.innerHTML = `<option value="None">None</option>` + sortedModules.map(mod => `<option value="${mod.name}">${mod.name}${getFormattedStats(mod,'module')}</option>`).join(''); }
    }
}

function checkMod(sel, togId) {
    const m = powerModules.find(x => x.name === sel.value);
    const t = document.getElementById(togId);
    if(m && m.activation === 'Active') { t.classList.remove('hidden'); } else { t.classList.add('hidden'); }
}

function addShipLoadout() {
    const ship = ships.find(s => s.id === document.getElementById('shipSelectToAdd').value);
    const cont = document.getElementById('multiShipContainer');
    document.getElementById('empty-state-msg')?.remove();
    for(let i=1; i<=ship.arms; i++) cont.insertAdjacentHTML('beforeend', createArmConfigHtml(i, ship));
    calculate();
}

function populateGadgetList() {
    const c = document.getElementById('gadget-list-container');
    c.innerHTML = gadgets.map((g,i) => `
        <div class="flex justify-between p-2 mb-1 bg-[var(--bg-input)] rounded border border-[var(--border-main)] cursor-pointer" onclick="document.getElementById('gr-${i}').click()">
            <div>
                <div class="flex items-center gap-2">
                     <span class="text-[10px] font-bold ${g.name==='None'?'':'text-blue-300'}">${g.name}</span>
                </div>
                <div class="text-[9px] opacity-60">${g.desc || ''} ${getFormattedStats(g,'gadget')}</div>
            </div>
            <input type="radio" name="gadg" id="gr-${i}" value="${g.name}" ${g.name==='None'?'checked':''} onchange="document.getElementById('gadgetSelect').value=this.value;calculate()">
        </div>`).join('');
}

// --- MULTI-MODE SCANNER LOGIC ---
let streamInterval = null; let streamTrack = null;
let scanState = { mining: false, loadout: false };

async function toggleScan(mode) {
    const btnMin = document.getElementById('btn-scan-mining');
    const btnLoad = document.getElementById('btn-scan-loadout');
    scanState[mode] = !scanState[mode];
    
    if (mode === 'mining') {
        if(scanState.mining) { btnMin.classList.add('border-blue-500'); document.getElementById('indicator-mining').classList.remove('hidden'); }
        else { btnMin.classList.remove('border-blue-500'); document.getElementById('indicator-mining').classList.add('hidden'); }
    }
    if (mode === 'loadout') {
        if(scanState.loadout) { btnLoad.classList.add('border-purple-500'); document.getElementById('indicator-loadout').classList.remove('hidden'); }
        else { btnLoad.classList.remove('border-purple-500'); document.getElementById('indicator-loadout').classList.add('hidden'); }
    }

    if (scanState.mining || scanState.loadout) {
        if (!streamTrack) await startStream();
    } else {
        stopStream();
    }
}

async function startStream() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "never" }, audio: false });
        const vid = document.getElementById('stream-video');
        vid.srcObject = stream;
        streamTrack = stream.getVideoTracks()[0];
        streamTrack.onended = () => stopStream();
        streamInterval = setInterval(captureAndProcess, 3000);
    } catch (e) { console.error(e); stopStream(); }
}

function stopStream() {
    if (streamTrack) { streamTrack.stop(); streamTrack = null; }
    if (streamInterval) { clearInterval(streamInterval); streamInterval = null; }
    document.getElementById('stream-video').srcObject = null;
    scanState = { mining: false, loadout: false };
    document.getElementById('btn-scan-mining').classList.remove('border-blue-500');
    document.getElementById('btn-scan-loadout').classList.remove('border-purple-500');
    document.getElementById('indicator-mining').classList.add('hidden');
    document.getElementById('indicator-loadout').classList.add('hidden');
}

async function captureAndProcess() {
    const vid = document.getElementById('stream-video');
    const cvs = document.getElementById('stream-canvas');
    const ctx = cvs.getContext('2d');
    if (vid.readyState !== vid.HAVE_ENOUGH_DATA) return;
    cvs.width = vid.videoWidth; cvs.height = vid.videoHeight;
    
    if (scanState.mining) {
        // Capture Right Side (Rock Stats)
        ctx.drawImage(vid, vid.videoWidth*0.65, vid.videoHeight*0.2, vid.videoWidth*0.35, vid.videoHeight*0.6, 0, 0, vid.videoWidth*0.35, vid.videoHeight*0.6);
        cvs.toBlob(b => runOCR(b, 'mining'));
    }
    if (scanState.loadout) {
        // Capture Left Side (Loadout)
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.drawImage(vid, 0, vid.videoHeight*0.3, vid.videoWidth*0.35, vid.videoHeight*0.7, 0, 0, vid.videoWidth*0.35, vid.videoHeight*0.7);
        cvs.toBlob(b => runOCR(b, 'loadout'));
    }
}

async function runOCR(blob, mode) {
    if(!blob) return;
    try {
        const worker = await Tesseract.createWorker();
        if(mode === 'mining') await worker.setParameters({ tessedit_char_whitelist: '0123456789.,MassResistanceInstability%kg ' });
        const ret = await worker.recognize(blob);
        const text = ret.data.text;
        if(mode === 'mining') applyMiningData(text);
        if(mode === 'loadout') applyLoadoutData(text);
        await worker.terminate();
    } catch(e) {}
}

function applyMiningData(text) {
    const m = text.match(/(?:Mass|Mas|M)[\s:.]*([\d][\d\s,.]*)/i);
    const r = text.match(/(?:Res|Resist)[\s:.]*([\d][\d\s,.]*)/i);
    const i = text.match(/(?:Inst|Stab)[\s:.]*([\d][\d\s,.]*)/i);
    let up = false;
    if(m) { document.getElementById('rockMass').value = parseFloat(m[1].replace(/[^\d.]/g,'')); up=true; }
    if(r) { document.getElementById('resistance').value = parseFloat(r[1].replace(/[^\d.]/g,'')); up=true; }
    if(i) { document.getElementById('instability').value = parseFloat(i[1].replace(/[^\d.]/g,'')); up=true; }
    if(up) calculate();
}

function applyLoadoutData(text) {
    const head = allLaserHeads.find(h => text.includes(h.name));
    if(head) {
        const arm = document.querySelector('.ship-arm-card');
        if(arm) {
            const sel = document.getElementById(`${arm.id}-laser`);
            if(sel) { sel.value = head.power; updateLaser(sel, arm.id); calculate(); }
        }
    }
}

function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        document.getElementById('ocr-loading').classList.remove('hidden');
        runOCR(input.files[0], 'mining').then(() => document.getElementById('ocr-loading').classList.add('hidden'));
    }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const s = document.getElementById('shipSelectToAdd');
    s.innerHTML = ships.map(x => `<option value="${x.id}">${x.name}</option>`).join('');
    populateGadgetList();
    calculate();
});