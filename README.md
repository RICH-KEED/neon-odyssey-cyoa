# ⚡ Neon Odyssey: Cyberpunk 2084

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2026-orange.svg)](https://hacktoberfest.com/)
[![Built With AI](https://img.shields.io/badge/Built%20with-AI%20Coding%20Assistant-brightgreen.svg)](#)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-yellow.svg)](https://www.python.org/)

> **An interactive, retro-futuristic "Choose Your Own Adventure" RPG application built with an AI Coding Assistant for the MLH Hacktoberfest Challenge.**

---

## 🎮 Overview

Set in the dystopian megalopolis of **Neo-Veridia Sector 7**, you play as a rogue netrunner on an urgent corporate heist. Hired by underground fixer **Nyx**, your objective is to infiltrate the heavily fortified Arasaka Sub-Grid and decide the fate of the prototype **Quantum Core**.

Every decision affects your **Health (HP)**, **Neural Energy**, **Credits**, and **Inventory**, leading to **multiple distinct endings**.

---

## ✨ Features

- **🌐 Dual Experiences**: Play right in your browser via the sleek **Web UI**, or inside your terminal via the **Python CLI edition** (`adventure.py`).
- **🕹️ Live Neural HUD**: Real-time progress bars for Health and Energy, dynamic Credit wallet, and inventory item tracking.
- **🔊 Real-time Web Audio Synthesizer**: Immersive 8-bit sound effects (typing, damage feedback, rewards, victory, and game over chimes) built natively using the **Web Audio API** (zero audio file dependencies).
- **📺 Retro CRT / Cyberpunk Aesthetic**: Scanlines, CRT curved glass vignette, pulsing status indicators, and dynamic ASCII art scenes.
- **🔀 Branching Narrative**: Over 15 distinct story nodes with branching paths, skill/inventory gates, and 3 major storyline conclusions (Digital Transcendence, Underworld Legend, Corporate Baron) plus a Game Over failure state.

---

## 🚀 How to Run

### 1. Web Edition (Browser)
No dependencies or build steps required!
- Double click or open `index.html` in any modern web browser, or serve it locally:
  ```bash
  # Using Python's built-in web server
  python -m http.server 8000
  ```
- Visit `http://localhost:8000` in your browser.

### 2. Command-Line Edition (Python CLI)
- Simply run:
  ```bash
  python adventure.py
  ```
- Follow the interactive prompts directly in your console.

---

## 🛠️ Technologies Used

- **HTML5 & CSS3**: Semantic layout, custom properties, glassmorphism, CRT scanline overlay, responsive flex/grid.
- **JavaScript (ES6+)**: Custom state machine, lifecycle hooks for story nodes, inventory system, and dynamic DOM rendering.
- **Web Audio API**: Procedural sound synthesis with oscillators and gain nodes.
- **Python 3**: Object-oriented command-line interactive adventure with ANSI formatting.
- **AI Coding Assistant**: Rapid prototyping, branching story design, and procedural audio synthesis.

---

## 📜 Story Endings

1. **Ghost in the Net (Ascension)**: Merge your human consciousness with the sentient Quantum Core and liberate cyberspace.
2. **The Street Legend (Mercenary)**: Complete the heist for Nyx, claim the 50,000 credit bounty, and become an underworld icon.
3. **The Corporate Baron (Tycoon)**: Betray your handlers to Arasaka High Command in exchange for executive power and immunity.
4. **Flatline (Defeat)**: Fall to corporate Black ICE or security drones in the dark alleys of Sector 7.

---

## 🤝 License
This project is open-source under the [MIT License](LICENSE).
