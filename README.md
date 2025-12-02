# ⛏️ Mining Fracture Analyser (MFA)

![Version](https://img.shields.io/badge/version-4.3%20Stable-blue) ![Game](https://img.shields.io/badge/Star%20Citizen-Mining%20Tool-orange) ![Status](https://img.shields.io/badge/System-Operational-green)

**Precision calculation engine for industrial mining crews in Star Citizen.**

The **Mining Fracture Analyser (MFA)** is a web-based tactical dashboard designed for multi-crew mining operations. It calculates **Total Combined Effective Laser Power (MW)** in real-time, accounting for laser heads, active/passive modules, gadgets, and rock resistance.

It features an integrated **AI Foreman** (powered by Google Gemini) to provide real-time strategic advice, risk assessments, and loadout optimizations.

## 🚀 Features

### 🎯 Target Analysis
* **Manual Input:** Input Rock Mass, Resistance, and Instability directly from your scanning UI.
* **Active Gadgetry:** Toggle switches for all mining gadgets (BoreMax, Sabir, Optimax, etc.) with verified stat modifiers (Regolith/UEXCorp verified).
* **Optical Scan (OCR):** *Experimental* feature to scan game screenshots and auto-fill rock parameters.

### 🚢 Fleet Configuration
* **Multi-Ship Support:** Deploy **Argo MOLEs**, **MISC Prospectors**, and **Drake Golems**.
* **Hardpoint Management:** Configure individual laser heads (Size 1 & 2) with up to 3 module slots.
* **Visual Toggles:** Instantly enable/disable specific arms to see how losing a laser affects the fracture.
* **Rich UI:** Card-based interface with toggle switches for Active Modules.

### 📊 Advanced Telemetry (Column 3)
* **Real-Time Charts:**
    * **Power vs. Margin:** Visual bar graph comparing your team's output against the rock's requirement.
    * **Risk Profile:** Doughnut chart visualizing Resistance vs. Instability vs. Safe Zone.
    * **Resistance Curve:** Line graph showing power requirements across the heating phase.
* **Success/Failure Prediction:** Instant visual feedback on whether your current setup can break the rock.

### 🧠 Tactical Command (Column 4)
* **Minimum Crew Calculator:** Automatically calculates exactly how many extra MOLEs, Prospectors, or Golems are needed if your power is short.
* **Gadget Strategy:** Dynamic recommendation engine that suggests the best gadget based on the rock's specific resistance/instability profile.
* **Optimized Loadouts:** Reference guide for "Meta" loadouts (Breaker, Stabilizer, Extraction).

### 🤖 AI Foreman
* **Strategic Advice:** Ask the AI for a "Go/No-Go" assessment.
* **Risk Reports:** Get a safety briefing on explosion probability.
* **Crew Orders:** Generate roleplay-ready tactical orders to paste into in-game chat.

## 📖 How to Use

### **Step 1: Initialization**
1.  Open the dashboard.
2.  Click the **"AUTH KEY"** button in the top-right "Senior Foreman AI" panel.
3.  Paste your **Google Gemini API Key**. (This is stored locally in your browser for the AI features to work).

### **Step 2: Input Rock Data**
1.  Scan a rock in-game.
2.  Enter the **Resistance**, **Instability**, and **Rock Mass** into the "Target Analysis" column (Col 1).
3.  *(Optional)* Select an **Active Gadget** if you plan to attach one.

### **Step 3: Deploy Fleet**
1.  Go to the "Fleet Config" column (Col 2).
2.  Select a ship (e.g., **Argo MOLE**) from the dropdown.
3.  Click **+ DEPLOY**.
4.  Configure the **Laser Head** (e.g., Helix II) and **Modules**.
5.  *Tip:* Use the toggle switches to turn Active Modules (like Surge/Stampede) on or off to simulate cooldowns.

### **Step 4: Analyze**
1.  Check the **Telemetry** column (Col 3).
    * **Green Banner:** Fracture is possible.
    * **Red Banner:** Power is insufficient.
2.  Review the **Tactical Command** column (Col 4).
    * See exactly how many more ships you need.
    * Check the "Gadget Strategy" for the best gadget to apply.

## 🛠️ Installation

### **Option 1: Live Version (Recommended)**
Access the latest stable build here:
👉 **[Launch MFA Dashboard](https://esramos-design.github.io/mfa.github.io/)**

### **Option 2: Run Locally**
1.  Clone this repository:
    ```bash
    git clone [https://github.com/esramos-design/mfa.github.io.git](https://github.com/esramos-design/mfa.github.io.git)
    ```
2.  Navigate to the folder.
3.  Open `index.html` in any modern web browser (Chrome, Firefox, Edge).
    * *Note: The OCR Scanner feature requires HTTPS or Localhost to work due to browser security.*

## 🤝 Credits & Data Sources

* **Mining Data:** All laser, module, and gadget statistics are verified against **[Regolith.rocks](https://regolith.rocks/)** and **[UEXCorp](https://uexcorp.space/)** (v3.24+ Data Standards).
* **UI Design:** Glassmorphism interface inspired by Star Citizen's MFDs (Multi-Function Displays).
* **OCR Engine:** Powered by [Tesseract.js](https://tesseract.projectnaptha.com/).
* **AI Backend:** Powered by Google Gemini Pro.

## ⚠️ Disclaimer

This project is a fan-made tool and is not affiliated with Cloud Imperium Games (CIG) or Roberts Space Industries (RSI). Star Citizen®, Squadron 42®, and related trademarks are property of Cloud Imperium Games.

The "AI Foreman" provides advice based on prompts and game data; always use your own judgement when cracking high-instability rocks!

## 👥 Contributors & Developers

* **Lead Developer:** [Esramos Design](https://github.com/esramos-design)
* **AI Co-Pilot:** Google Gemini

## 📄 Credits

* **Design & Code:** [esramos-design](https://github.com/esramos-design)
* **Mining Data:** Verified against [UEX Corp](https://uexcorp.space/) and in-game testing.
* **Libraries:**
    * [Tailwind CSS](https://tailwindcss.com/) - Styling.
    * [Chart.js](https://www.chartjs.org/) - Graphs.
    * [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR.
    * [Marked.js](https://marked.js.org/) - Markdown parsing.
 

*Pull requests and feature suggestions are welcome! Please open an issue to discuss proposed changes.*

![Version](https://img.shields.io/badge/version-4.3%20Stable-blue) ![Game](https://img.shields.io/badge/Star%20Citizen-Mining%20Tool-orange) ![Status](https://img.shields.io/badge/System-Operational-green)
