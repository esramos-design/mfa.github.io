<div align="center">
<h1 align="center">Mining Fracture Analyser (MFA) v5.24</h1>
<p align="center">
<strong>A real-time cooperative mining calculator & fleet manager for Star Citizen.</strong>
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
<a href="https://esramos-design.github.io/mfa.github.io/fleet.html" target="_blank">🚢 <strong>Fleet Roster</strong></a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
</p><br />
</div>

# **⛏️ Mining Fracture Analyser (MFA)**

**The ultimate tactical dashboard and calculation engine for industrial mining crews in Star Citizen.**

The **Mining Fracture Analyser (MFA)** is a web-based tool designed to remove guesswork from high-stakes mining operations. It calculates **Total Combined Effective Laser Power (MW)** in real-time, accounting for ship hulls, laser heads, active/passive modules, gadgets, and rock resistance.

**Version 5.24** introduces the **Fleet Roster System**, **Dynamic Module Slot Locking**, support for the **Drake Golem**, and a finalized **Optical Scanning Engine**.

---

## **🚀 Key Features (v5.24)**

### **🚢 Fleet Roster System (New!)**
A dedicated dashboard for managing your organization's industrial assets.
* **Live Manifest:** Tracks **Prospector**, **MOLE**, and **Drake Golem** fleets.
* **Advanced Telemetry:** View detailed component breakdowns (Shields, Coolers, Power Plants) and emissions data.
* **Command Dashboard:** Aggregates total cargo capacity, active mining heads, and fleet mass instantly.

### **🛠️ Strict Fleet Configuration**
* **Dynamic Slot Locking:** The module slots now automatically lock/unlock based on your chosen Laser Head.
* **Smart Filtering:** The ship selector strictly enforces hardpoint sizes (S1 for Prospector, S2 for MOLE).

### **🧠 Reactive Dynamic Loadouts**
The **Optimized Fleet Loadouts** panel reacts instantly to changes in Mass, Resistance, or Instability:
* **Granular MOLE Configs:** Automatically assigns specific loadouts for **Head 1 (Break)**, **Head 2 (Stability)**, and **Head 3 (Extraction)** based on rock difficulty.
* **Hazard Protocols:** Suggests "BoreMax" or "Lancet" builds if **Instability exceeds 60%**.

### **📷 Optical Scanner (OCR V28)**
* **Upload & Analyze:** Replaced the unstable video scanner with a robust **File Upload / Drag-and-Drop** system.
* **Smart Crop:** Automatically detects **Left (Loadout)** and **Right (Mining)** data panels.

### **🤖 AI Foreman 2.0**
* **Gemini 2.5 Flash Uplink:** Powered by Google's latest model for fast, context-aware tactical reasoning.

---

## **📖 How to Use**

### **1. Initialization**
1. Launch the dashboard.
2. Click **"AUTH KEY"** in the AI Foreman panel.
3. Paste your free **Google Gemini API Key**.

### **2. Input Data (Manual or Scan)**
* **Manual:** Enter Mass, Resistance, and Instability in the **Target Analysis** panel.
* **Optical Scan:** Click the **Camera Icon** to upload a screenshot of your mining HUD.
* **Gadgets:** Toggle any active gadgets attached to the rock.

### **3. Deploy Fleet**
* **Add Ships:** Use the **Fleet Config** panel to add ships.
* **Fit Loadouts:** Select Laser Heads and Modules.

### **4. Execute**
* **Check Telemetry:** If the banner is **GREEN**, you have enough power.
* **Consult AI:** Click **"🧠 STRATEGY"** for a second opinion on safety.

---

## **🛠️ Installation & Deployment**

### **🌐 Option 1: Live Web Version (Recommended)**
The tool is a Progressive Web App (PWA) compatible with any modern browser.
👉 [Launch MFA Dashboard](https://esramos-design.github.io/mfa.github.io/)

### **💻 Option 2: Standalone Windows App**
**2. Desktop App:** Get the updated standalone Windows executable.  
📥 [**DOWNLOAD MFA v5.24 EXE HERE**](https://github.com/esramos-design/Mining-Fracture-Analyser/releases/tag/v5.24-release)

---

## **🤝 Contributing Guidelines**

First off, thanks for taking the time to contribute! 🎉
The Mining Fracture Analyser is a community tool built for Star Citizen players. We welcome contributions from developers of all skill levels.

### **📂 Project Structure**
* **index.html**: Main Analyser dashboard.
* **fleet.html**: **NEW** Fleet Roster interface.
* **script.js**: **THE CORE ENGINE.** Database and Calculation Logic.
* **fleet.js**: **THE MANIFEST ENGINE.** Ship data and parser.
* **scanner.js**: **THE OPTICAL ENGINE.** Tesseract.js implementation.

### **🚀 How to Contribute**
1. **Reporting Bugs:** Include browser version and screen resolution.
2. **Pull Requests:** Fork the project, create a feature branch, and submit a PR.

---

## **⚖️ License & Credits**
* **Lead Developer:** [Esramos Design](https://github.com/esramos-design)
* **Mining Data:** Verified against [**Regolith.rocks**](https://regolith.rocks/) and [**UEXCorp**](https://uexcorp.space/).
* **UI Design:** Logofolio "Obsidian" Dark Mode.
* **AI Backend:** Powered by Google Gemini 2.5 Flash.

**Disclaimer:** This project is a fan-made tool and is not affiliated with Cloud Imperium Games (CIG) or Roberts Space Industries (RSI).

*Fly Safe. Crack Hard.*
