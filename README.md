<div align="center">
<h1 align="center">Mining Fracture Analyser (MFA) v5.18</h1>
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
<a href="https://github.com/esramos-design/Mining-Fracture-Analyser/releases/tag/v5.18-release" target="_blank">📥 <strong>Download Desktop App (.exe)</strong></a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
</p><br />
</div>

# **⛏️ Mining Fracture Analyser (MFA)**

**The ultimate tactical dashboard and calculation engine for industrial mining crews in Star Citizen.**

The **Mining Fracture Analyser (MFA)** is a web-based tool designed to remove guesswork from high-stakes mining operations. It calculates **Total Combined Effective Laser Power (MW)** in real-time, accounting for ship hulls, laser heads, active/passive modules, gadgets, and rock resistance.

**Version 5.18** introduces a High-Contrast Technical Light Mode, "Chrome" UI aesthetics, refined Logic Strategies, and a finalized **Upload-Only OCR Scanner**.

## **🚀 Key Features (v5.18)**

### **🧠 Dynamic Logic Engine**
The **Optimized Fleet Loadouts** panel (Column 2) has been rewritten for context-aware decision making:
* **Smart Separation:** Gadgets (e.g., BoreMax) are no longer suggested for ship slots. The logic now strictly recommends **Modules** for ships and **Gadgets** for the rock.
* **Safety Priority:** The decision tree now prioritizes **Instability (Safety)** over Resistance (Power) to prevent catastrophic overcharges.
* **Deficit Awareness:** If the fleet lacks raw power, the system forces "Resistance Breaker" loadouts automatically.

### **📷 Optical Scanner (OCR V30)**
* **Nuclear Binarization:** New image filtering aggressively removes starfields and background noise, isolating text with high precision.
* **Smart Parsing:** Specifically tuned to correct common OCR errors (e.g., reading "96" instead of "16%" on Instability labels).
* **Upload & Analyze:** Drag-and-drop screenshots for instant data entry.

### **🎨 UI & UX Overhaul**
* **Technical Light Mode:** A complete redesign of the Light Theme using High-Contrast Slate/White tones for better readability in bright environments.
* **Chrome Headers:** New metallic gradient typography for a premium industrial feel.
* **Strict Filtering:** Ship selector strictly enforces hardpoint sizes (Prospector S1, MOLE S2).

### **🤖 AI Foreman 2.0**
* **Gemini 2.5 Flash Uplink:** Powered by Google's latest model for fast, context-aware tactical reasoning.
* **Pre-Deployment Strategy:** Query the AI before you undock.
* **Command Uplink:** Generates roleplay-ready tactical orders for in-game chat.

## **📖 How to Use**

### **1. Initialization**
1. Launch the dashboard (Web or EXE).
2. Click **"AUTH KEY"** in the AI Foreman panel.
3. Paste your free **Google Gemini API Key**.

### **2. Input Data (Manual or Scan)**
* **Manual:** Enter Mass, Resistance, and Instability in the **Target Analysis** panel.
* **Optical Scan:** Click the **Camera Icon** to upload a screenshot of your mining HUD.
* **Gadgets:** Toggle any active gadgets attached to the rock.

### **3. Deploy Fleet**
* **Add Ships:** Use the **Fleet Config** panel to add ships to your operation.
* **Fit Loadouts:** Select Laser Heads and Modules.

### **4. Execute**
* **Check Telemetry:** If the banner is **GREEN**, you have enough power.
* **Consult AI:** Click **"🧠 STRATEGY"** for a second opinion on safety.

## **🛠️ Installation & Deployment**

### **🌐 Option 1: Live Web Version (PWA)**
Compatible with any modern browser.
👉 [Launch MFA Dashboard](https://esramos-design.github.io/mfa.github.io/)

### **💻 Option 2: Standalone Desktop App (Recommended)**
Run MFA as a native Windows application to avoid browser clutter and ensure maximum performance.

1.  **Download:** Go to the [**v5.18 Release Page**](https://github.com/esramos-design/Mining-Fracture-Analyser/releases/tag/v5.18-release).
2.  **Get the File:** Download `MFA_v5.18.exe`.
3.  **Run:** Double-click to launch. (No installation required).

## **🤝 Credits & Data Sources**
* **Lead Developer:** [Esramos Design](https://github.com/esramos-design)
* **Mining Data:** Verified against [**Regolith.rocks**](https://regolith.rocks/) and [**UEXCorp**](https://uexcorp.space/).
* **AI Backend:** Powered by Google Gemini 2.5 Flash.

## **⚠️ Disclaimer**
This project is a fan-made tool and is not affiliated with Cloud Imperium Games (CIG) or Roberts Space Industries (RSI).

*Fly Safe. Crack Hard.*
