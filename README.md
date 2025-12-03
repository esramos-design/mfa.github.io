<div align="center">
<h1 align="center">Mining Fracture Analyser v5.12</h1>
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
</p>
</div>


# **⛏️ Mining Fracture Analyser (MFA)**

**The ultimate tactical dashboard and calculation engine for industrial mining crews in Star Citizen.**

The **Mining Fracture Analyser (MFA)** is a single-file, web-based tool designed to remove guesswork from high-stakes mining operations. It calculates **Total Combined Effective Laser Power (MW)** in real-time, accounting for ship hulls, laser heads, active/passive modules, gadgets, and rock resistance.

Now featuring **Senior Foreman AI 2.0**, powered by Google's **Gemini 2.5 Flash**, offering pre-deployment strategy, risk assessment, and dynamic tactical orders.

## **🚀 Key Features (v5.12)**

### **🤖 Senior Foreman AI 2.0**

* **Pre-Deployment Strategy:** Query the AI before you even undock. Input a rock's Mass/Resistance/Instability to get optimal ship and module recommendations without needing to deploy a fleet first.  
* **Gemini 2.5 Flash Uplink:** Upgraded neural model for faster, more accurate tactical analysis with reduced hallucination rates.  
* **Tactical Orders:** Generate roleplay-ready "Command Uplink" text blocks to copy/paste into in-game chat.  
* **Robust Auth:** Includes memory fallback systems to keep your API session active even if browser local storage is restricted.

### **🧠 Dynamic Loadout Strategy**

* **Context-Aware Recommendations:** The **Optimized Fleet Loadouts** panel is no longer static. It dynamically adapts based on your specific scan data:  
  * **High Instability:** Automatically suggests stability-focused loadouts (e.g., *Lancet MH2 \+ Focus III*).  
  * **High Resistance / Low Power:** Automatically suggests power-focused loadouts (e.g., *Helix II \+ Surge*).  
  * **Standard:** Suggests balanced "Meta" loadouts.

### **🎯 Target Analysis**

* **Full Gadget Telemetry:** Toggle switches for all mining gadgets (BoreMax, Sabir, Optimax, etc.) are now fully visible without scrolling.  
* **Deep-Dive Stats:** Gadget stats include verified modifiers for Cluster, Laser Instability, and Charge Window Rates.  
* **Optical Scan (OCR):** *Experimental* feature to scan game screenshots and auto-fill rock parameters directly from your HUD.

### **🚢 Fleet Configuration**

* **Detailed Module Specs:** Dropdowns now display **ALL** technical specifications for modules, including:  
  * **Duration** (for active modules)  
  * **Extraction Rate** & **Inert Filtering**  
  * **Charge Rate** & **Catastrophic Charge Rate**  
* **Multi-Ship Support:** Coordinate fleets mixing **Argo MOLEs**, **MISC Prospectors**, and **Drake Golems**.  
* **Visual Toggles:** Instantly enable/disable specific laser arms to simulate component failure or repositioning.

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

### **2\. Input Data**

* **Scan the Rock:** Enter Mass, Resistance, and Instability in the **Target Analysis** panel.  
* **Select Gadgets:** Toggle any active gadgets attached to the rock.

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
2. **Clone/Download:** Get the index.html, style.css, script.js and run\_app.py files.  
3. **Install Dependency:**  
   pip install pywebview

4. **Launch:** Double-click run\_app.py.

## **🤝 Credits & Data Sources**

* **Mining Data:** All laser, module, and gadget statistics are verified against [**Regolith.rocks**](https://regolith.rocks/) and [**UEXCorp**](https://uexcorp.space/) (v3.24+ Data Standards).  
* **UI Design:** Glassmorphism interface inspired by Star Citizen's MFDs (Multi-Function Displays).  
* **AI Backend:** Powered by Google Gemini 2.5 Flash.

## **⚠️ Disclaimer**

This project is a fan-made tool and is not affiliated with Cloud Imperium Games (CIG) or Roberts Space Industries (RSI). Star Citizen®, Squadron 42®, and related trademarks are property of Cloud Imperium Games.

*The "AI Foreman" provides advice based on probabilistic models; always use your own judgement when cracking high-instability rocks\!*

### **👥 Contributors & Developers**

* **Lead Developer:** [Esramos Design](https://github.com/esramos-design)  
* **AI Co-Pilot:** Google Gemini

### **📄 Credits**

* **Design & Code:** [esramos-design](https://github.com/esramos-design)  
* **Mining Data:** Verified against [UEX Corp](https://uexcorp.space/), [regolith.rocks](https://regolith.rocks/) and in-game testing.  
* **Libraries:**  
  * [Tailwind CSS](https://tailwindcss.com/) \- Styling.  
  * [Chart.js](https://www.chartjs.org/) \- Graphs.  
  * [Tesseract.js](https://tesseract.projectnaptha.com/) \- OCR.  
  * [Marked.js](https://marked.js.org/) \- Markdown parsing.

*Pull requests and feature suggestions are welcome\! Please open an issue to discuss proposed changes.*

*Fly Safe. Crack Hard.*
