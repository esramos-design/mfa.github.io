/**
 * SENIOR FOREMAN AI MODULE
 * Version: 2.0 (Isolated)
 * Handles: Gemini API Communications, Key Management, and AI UI
 * Dependencies: Marked.js, script.js (reads currentSimState)
 */

// --- API KEY MANAGEMENT ---
function openApiModal() {
    const modal = document.getElementById('api-modal');
    const input = document.getElementById('api-key-input');
    const currentKey = localStorage.getItem('gemini_api_key');
    if(currentKey) input.value = currentKey;
    modal.style.display = 'flex';
    // Small delay to allow display:flex to apply before opacity transition
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeApiModal() {
    const m = document.getElementById('api-modal');
    m.classList.remove('show');
    // Wait for animation to finish
    setTimeout(() => m.style.display = 'none', 200);
}

function saveApiKey() {
    const key = document.getElementById('api-key-input').value.trim();
    if(key) { 
        localStorage.setItem('gemini_api_key', key); 
        closeApiModal(); 
        // Visual feedback in the AI console
        const aiContent = document.getElementById('ai-content');
        if(aiContent) aiContent.innerHTML = `<span class="text-green-400 font-bold">// KEY AUTHENTICATED. UPLINK ESTABLISHED.</span>`;
    } else {
        alert("Please enter a valid API key.");
    }
}

// --- AI INTERACTION ---
async function askAI(mode) {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    // Check if key exists
    if (!apiKey) { 
        openApiModal(); 
        return; 
    }

    const aiLoading = document.getElementById('ai-loading');
    const aiContent = document.getElementById('ai-content');
    const customInput = document.getElementById('ai-custom-input');
    
    // Check if simulation data exists (reads from global variable in script.js)
    if (typeof currentSimState === 'undefined' || currentSimState.power === 0) {
        aiContent.innerHTML = `<span class="text-yellow-500">// ERROR: No telemetry data found. Please run the simulation first.</span>`;
        return;
    }

    // UI Updates
    aiLoading.classList.remove('hidden');
    aiContent.innerHTML = ''; 

    // Prompt Construction
    let prompt = "";
    const rockDetails = `Rock Mass: ${currentSimState.mass}kg, Resistance: ${currentSimState.resistance.toFixed(1)}%, Instability: ${currentSimState.instability.toFixed(1)}%.`;
    const crewDetails = `Crew Power: ${currentSimState.power.toFixed(0)} MW from ${currentSimState.activeArms} active laser heads.`;
    const status = currentSimState.success ? "FRACTURE POSSIBLE" : "FRACTURE IMPOSSIBLE (Low Power)";

    if (mode === 'strategy') prompt = `You are a Mining Foreman. Analyze: ${rockDetails} ${crewDetails} Status: ${status}. Keep it brief. 1. Is it safe? 2. Modules?`;
    else if (mode === 'briefing') prompt = `You are a Commander. Generate a short tactical order for crew chat. Scenario: ${rockDetails} ${crewDetails}`;
    else if (mode === 'risk') prompt = `Safety Officer. Analyze risk for: ${rockDetails}. Assess explosion probability. Keep it brief.`;
    else if (mode === 'optimize') prompt = `Loadout Engineer. ${rockDetails} Power: ${currentSimState.power.toFixed(0)} MW. Suggest optimal modules.`;
    else if (mode === 'custom') {
        const query = customInput.value;
        if (!query) { 
            aiLoading.classList.add('hidden'); 
            aiContent.innerHTML = `<span class="text-purple-500/50 italic">// SYSTEM READY. AWAITING INPUT.</span>`;
            return; 
        }
        prompt = `Context: Mining. Rock: ${rockDetails} Crew: ${crewDetails} Question: "${query}"`;
    }

    // API Call
    try {
        const response = await callGemini(apiKey, prompt);
        aiContent.innerHTML = marked.parse(response);
    } catch (error) {
        console.error(error);
        aiContent.innerHTML = `<span class="text-red-500 font-bold">// UPLINK FAILURE</span><br><span class="text-red-400 text-[10px]">${error.message}</span><br><br><button onclick="openApiModal()" class="text-blue-400 underline">Update API Key</button>`;
    } finally {
        aiLoading.classList.add('hidden');
        if(mode === 'custom') customInput.value = '';
    }
}

async function callGemini(key, prompt) {
    // Using gemini-1.5-flash as it is fast and cost-effective for this tool
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    
    const payload = { 
        contents: [{ parts: [{ text: prompt }] }] 
    };

    const response = await fetch(url, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        let msg = `Error ${response.status}`;
        if(errData.error && errData.error.message) msg += `: ${errData.error.message}`;
        throw new Error(msg);
    }

    const data = await response.json();
    if(data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("AI returned no content.");
    }
}

// Auto-check for key on load
document.addEventListener('DOMContentLoaded', () => {
    const key = localStorage.getItem('gemini_api_key');
    const aiContent = document.getElementById('ai-content');
    if(key && aiContent) {
        aiContent.innerHTML = `<span class="text-purple-500/50 italic">// SYSTEM READY. KEY LOADED.</span>`;
    }
});