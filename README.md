# Mining Fracture Analyser (MFA) - Star Citizen

![Version](https://img.shields.io/badge/Version-4.1-blue) ![Status](https://img.shields.io/badge/UEX%20Data-Verified-green) ![AI](https://img.shields.io/badge/Powered%20By-Google%20Gemini-purple)

**The ultimate precision calculation engine for industrial mining crews.**

The **Mining Fracture Analyser (MFA)** is a web-based tool designed for *Star Citizen* players to calculate real-time mining fracture power, assess risk, and optimize loadouts. Now updated with a holographic UI, live video OCR scanning, and an integrated AI Foreman powered by Google Gemini.

---

## 🚀 Key Features

### 1. 🏭 Multi-Ship Fleet Configuration
* **Dynamic Fleet Assembly:** Assemble a complex mining fleet including the **Argo MOLE**, **MISC Prospector**, and the new **Drake Golem**.
* **Hardpoint Management:** Configure individual laser heads per ship arm.
* **Module Stacking:** Add up to 3 modules per laser (Surge, Brandt, Torrent, etc.) with support for **Active/Passive toggles**.
* **Drake Golem Support:** Includes specific logic for the Golem's fixed "Pitman" mining laser.

### 2. 🧠 AI Foreman Uplink (New!)
* **Powered by Google Gemini:** Connect your API key to unlock a senior mining AI.
* **Real-time Strategy:** The AI analyzes your specific rock mass, resistance, and current fleet power to provide tactical advice.
* **Capabilities:**
    * **Strategy:** Safety assessments and approach vectors.
    * **Risk Report:** Explosion probability analysis.
    * **Loadout Optimization:** Mathematical suggestions for modules.
    * **Crew Briefing:** Generates copy/paste orders for in-game chat.

### 3. 👁️ Live OCR & Telemetry
* **Live Video Scanning:** Uses `getDisplayMedia` to stream your Star Citizen window.
    * **Loadout Scan (Left):** Automatically detects installed lasers and modules from your VMA/Mobiglas.
    * **Mining Scan (Right):** Reads Rock Mass, Resistance, and Instability directly from the UI while you fly.
* **Static Upload:** Drag and drop screenshots for instant data parsing.
* **Privacy First:** All OCR processing is done client-side using **Tesseract.js**. No video leaves your browser.

### 4. 📊 Advanced Analytics
* **Power vs. Margin:** Visual bar charts comparing your output against the rock's requirement.
* **Risk Profile:** Doughnut charts visualizing Resistance vs. Instability vs. Safe Margin.
* **Resistance Curve:** A line graph projecting power requirements across various resistance levels.

### 5. 🎨 Immersive UI
* **Theme Engine:** Switch between "Deep Space Slate" (Dark Mode) and "Aerospace Platinum" (Light Mode).
* **Glassmorphism:** Modern, translucent panels with neon glow effects.
* **Reactive Layout:** Fully responsive grid system for desktops and tablets.

---

## 🛠️ How to Use

### Setup
1.  Open the application in a modern browser (Chrome/Edge/Firefox).
2.  *(Optional for AI)* Click **"Auth Key"** in the AI section and paste your [Google Gemini API Key](https://aistudio.google.com/app/apikey). The key is stored locally in your browser.

### Manual Calculation
1.  **Target Analysis:** Enter the Rock Mass, Resistance, and Instability manually.
2.  **Deploy Fleet:** Select a ship (e.g., MOLE) and click `+ Deploy`.
3.  **Configure Arms:**
    * Select the Laser Head (e.g., Helix II).
    * Add Modules (e.g., Surge, Rieger).
    * Toggle modules "Active" if they are currently activated.
4.  **Gadgets:** Select an active gadget (e.g., BoreMax) from the list.
5.  **Results:** View the "Telemetry" column for Success/Failure status and optimal loadout suggestions.

### Live Scanning (OCR)
1.  Click **Scan Mining (Right)** to track rock stats or **Scan Loadout (Left)** to track ship items.
2.  Select your Star Citizen window when prompted by the browser.
3.  The system will automatically parse text from the screen and update the input fields.
    * *Note: Ensure the game UI is clearly visible for best results.*

---

## 📦 Installation / Deployment

This is a client-side only application (HTML/JS/CSS). No backend server is required.

**Option 1: GitHub Pages**
Host directly from your repository settings.

**Option 2: Local Use**
1.  Clone the repository.
2.  Open `index.html` in your browser.

**Option 3: VS Code Live Server**
1.  Open the folder in VS Code.
2.  Right-click `index.html` -> "Open with Live Server".

---

## 🧮 Data & Mechanics

* **Game Version:** Star Citizen Alpha 4.4+ (Verified UEX Data v4.1).
* **Math:** Calculates `Total Effective Power` based on:
    * Laser Base Power.
    * Module Multipliers (Active/Passive).
    * Resistance Reduction (Global & Per-Arm).
    * Distance/Falloff (Simplified).
    * Gadget Modifiers (Additive/Multiplicative).

---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the Project.
2.  Create your Feature Branch.
3.  Commit your Changes.
4.  Open a Pull Request.

---

## 📄 Credits

* **Design & Code:** [esramos-design](https://github.com/esramos-design)
* **Mining Data:** Verified against [UEX Corp](https://uexcorp.space/) and in-game testing.
* **Libraries:**
    * [Tailwind CSS](https://tailwindcss.com/) - Styling.
    * [Chart.js](https://www.chartjs.org/) - Graphs.
    * [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR.
    * [Marked.js](https://marked.js.org/) - Markdown parsing.
