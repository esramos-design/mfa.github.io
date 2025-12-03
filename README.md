<div align="center">
<h1 align="center">Mining Fracture Analyser (MFA) v5.15</h1>
<p align="center">
<strong>A real-time cooperative mining calculator for Star Citizen.</strong>
<br />
Stop Guessing. Start Fracturing.
<br />
<br />
<a href="https://github.com/esramos-design/mfa.github.io/blob/main/LICENSE" target="_blank">
<img alt="License: GPL-3.0" src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" />
</a>
<img alt="Status: Active" src="https://img.shields.io/badge/status-active-success.svg" />
<img alt="Game: Star Citizen" src="https://img.shields.io/badge/Star%20Citizen-4.4+-orange" />
<br />
<br />
<a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">🔴 <strong>Launch Live Demo</strong></a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">✨ Request Feature</a>
</p><br />
</div>

# **⛏️ Mining Fracture Analyser (MFA)**

**The ultimate tactical dashboard and calculation engine for industrial mining crews in Star Citizen.**

The **Mining Fracture Analyser (MFA)** is a web-based tool designed to remove guesswork from high-stakes mining operations. It calculates **Total Combined Effective Laser Power (MW)** in real-time, accounting for ship hulls, laser heads, active/passive modules, gadgets, and rock resistance.

**Version 5.15** introduces a split-code architecture for better performance, **Reactive Loadout Strategies**, and **OCR 4.0** with high-resolution scaling.

## **🚀 Key Features (v5.15)**

### **🧠 Reactive Dynamic Loadouts**

The **Optimized Fleet Loadouts** panel (Column 4\) is no longer static. It reacts instantly to changes in Mass, Resistance, or Instability:

* **Granular MOLE Configs:** Automatically assigns specific loadouts for **Head 1 (Break)**, **Head 2 (Stability)**, and **Head 3 (Extraction)** based on rock difficulty.  
* **Hazard Protocols:** Automatically suggests "BoreMax" or "Lancet" builds if **Instability exceeds 60%**.  
* **Power Protocols:** Switches to "Surge" patterns if **Resistance exceeds 40%** or fleet power is insufficient.  
* **Eco / Standard:** Suggests balanced loadouts for standard rocks.

### **📷 OCR 4.0 & Live Scanning**

* **High-Res Scaling:** The scanner now applies a **2.5x upscale filter** and high-contrast binarization to accurately read pixelated, glowing UI text from Star Citizen HUDs.  
* **Context Aware:** Automatically detects if you are scanning a **Rock** (Mass/Res/Inst) or a **Ship Loadout**.  
* **Smart Regex:** Intelligently handles OCR errors (e.g., correcting "l" or "I" to "1" in numbers) and reads full values including spaces.

### **🤖 AI Foreman 2.0**

* **Gemini 2.5 Flash Uplink:** Powered by Google's latest model for faster, more accurate tactical reasoning with reduced hallucination rates.  
* **Pre-Deployment Strategy:** Query the AI before you even undock. Input a rock's stats to get optimal ship/module recommendations.  
* **Command Uplink:** Generates roleplay-ready tactical orders for in-game chat.  
* **Robust Auth:** Includes memory fallback systems to keep your API session active.

### **🎯 Target Analysis & Fleet Config**

* **Full Database:** Includes **800+ lines** of verified data for every laser, module, and gadget in the game (Verified against Regolith/UEXCorp).  
* **Full Gadget Telemetry:** Toggle switches for all mining gadgets are now fully visible.  
* **Detailed Module Specs:** Dropdowns display **ALL** technical specifications (Duration, Extraction Rate, Charge Rate, etc.).  
* **Multi-Ship Support:** Coordinate fleets mixing **Argo MOLEs**, **MISC Prospectors**, and **Drake Golems**.

### **📊 Advanced Telemetry**

* **Power vs. Margin:** Visual bar graph comparing your fleet's output against the rock's break threshold.  
* **Risk Profile:** Doughnut chart visualizing the danger zone (Resistance vs. Instability).  
* **Resistance Curve:** Line graph tracking power requirements across the heating phase.  
* **Dynamic Feedback:** Instant "Success/Failure" banners with exact mass over/under calculations.

## **📖 How to Use**

### **1\. Initialization**

1. Launch the dashboard.  
2. Click **"AUTH KEY"** in the AI Foreman panel (Col 4).  
3. Paste your free **Google Gemini API Key** (Get one directly via the link in the modal).

### **2\. Input Data (Manual or Scan)**

* **Manual:** Enter Mass, Resistance, and Instability in the **Target Analysis** panel.  
* **Scan:** Click **"SCAN MINING ROCK"** and select your game window to auto-fill data. Alternatively, upload a screenshot.  
* **Gadgets:** Toggle any active gadgets attached to the rock.

### **3\. Deploy Fleet**

* **Add Ships:** Use the **Fleet Config** panel to add ships to your operation.  
* **Fit Loadouts:** Select Laser Heads and Modules.  
  * *Tip:* Toggle Active Modules (e.g., Surge) On/Off to simulate cooldowns.

### **4\. Execute**

* **Check Telemetry:** If the banner is **GREEN**, you have enough power.  
* **Consult AI:** Click **"🧠 STRATEGY"** for a second opinion on safety, or **"🔧 LOADOUT"** for optimization tips.

## **🛠️ Installation & Deployment**

### **🌐 Option 1: Live Web Version (Recommended)**

The tool is a Progressive Web App (PWA) compatible with any modern browser.  
👉 Launch MFA Dashboard

### **💻 Option 2: Standalone Windows App**

Run MFA as a native desktop application to avoid browser clutter.

1. **Install Python:** Download from [python.org](https://www.python.org/).  
2. **Clone/Download:** Get the index.html, style.css, script.js, scanner.js, and run\_app.py files.  
3. **Install Dependency:**  
   pip install pywebview

4. **Launch:** Double-click run\_app.py.

## **🤝 Credits & Data Sources**

* **Lead Developer:** [Esramos Design](https://github.com/esramos-design)  
* **Mining Data:** Verified against [**Regolith.rocks**](https://regolith.rocks/) and [**UEXCorp**](https://uexcorp.space/) (v3.24+ Data Standards).  
* **UI Design:** Glassmorphism interface inspired by Star Citizen's MFDs.  
* **AI Backend:** Powered by Google Gemini 2.5 Flash.

## **⚠️ Disclaimer**

This project is a fan-made tool and is not affiliated with Cloud Imperium Games (CIG) or Roberts Space Industries (RSI). Star Citizen®, Squadron 42®, and related trademarks are property of Cloud Imperium Games.

*The "AI Foreman" provides advice based on probabilistic models; always use your own judgement when cracking high-instability rocks\!*

### **📄 Credits**

* **Design & Code:** [esramos-design](https://github.com/esramos-design)  
* **Libraries:**  
  * [Tailwind CSS](https://tailwindcss.com/) \- Styling.  
  * [Chart.js](https://www.chartjs.org/) \- Graphs.  
  * [Tesseract.js](https://tesseract.projectnaptha.com/) \- OCR.  
  * [Marked.js](https://marked.js.org/) \- Markdown parsing.

*Pull requests and feature suggestions are welcome\! Please open an issue to discuss proposed changes.*

*Fly Safe. Crack Hard.*
