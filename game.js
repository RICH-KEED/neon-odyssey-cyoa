/* ==========================================================================
   NEON ODYSSEY: CYBERPUNK 2084 - GAME ENGINE & STORY NODES
   ========================================================================== */

// --- AUDIO SYNTHESIZER (WEB AUDIO API) ---
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.1) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio context policy fallback
        }
    }

    click() {
        this.playTone(800, 'triangle', 0.05, 0.08);
    }

    beep() {
        this.playTone(1200, 'sine', 0.08, 0.05);
    }

    damage() {
        this.playTone(140, 'sawtooth', 0.25, 0.2);
    }

    reward() {
        if (!this.enabled) return;
        this.playTone(523.25, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.1), 100);
        setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.1), 220);
    }

    victory() {
        if (!this.enabled) return;
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'triangle', 0.3, 0.15), idx * 120);
        });
    }

    gameover() {
        if (!this.enabled) return;
        const notes = [300, 260, 220, 180];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'sawtooth', 0.35, 0.2), idx * 140);
        });
    }
}

const sfx = new SoundFX();

// --- STORY SCRIPT & BRANCHING NODES ---
const ASCII_SCENES = {
    alley: `
  ▲  ▲  ▲   [SECTOR 7: ALLEYWAY]
 █▀█ █▀█ █▀█  Rain drops hiss against steaming neon conduits.
 █▄█ █▄█ █▄█  Shadows flicker behind dumpster holograms.
    `,
    corp: `
  ┌───────────────────────────────────┐
  │  ARASAKA - CYBERNETICS MERATOWER  │
  │  SECURITY PROTOCOL: LEVEL 5 ACTIVE│
  └───────────────────────────────────┘
    `,
    net: `
  01000010 01001001 01010100 01010011
  ◄═══ CYBERSPACE NEURAL HIGHWAY ═══►
  [ICE DETECTED // FIREWALL ENCRYPTED]
    `,
    vault: `
  [██████████████████████████████████]
  │  DATA VAULT #09 // CORE ACCESS   │
  [██████████████████████████████████]
    `,
    legend: `
  ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★
  [TRANSCENDENCE COMPLETE: CYBER LEGEND]
  ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★
    `,
    flatline: `
  XXXXX FLATLINE ERROR 0x00000000 XXXXX
  SYSTEM PURGED // BIO-METRICS CEASED
    `
};

const STORY_NODES = {
    start: {
        chapter: "ACT I: THE HOOK",
        scene: "alley",
        text: `You awaken in a neon-lit alley behind the Red Dragon noodle bar in Sector 7. Your skull thrums with neural static. Your Cyberdeck chimes with an encrypted transmission from a fixer named <strong>Nyx</strong>:<br><br>
        <em>"Operative. The Syndicate left the prototype Quantum Core unguarded at the Arasaka sub-grid. Breach it before sunrise, and 50,000 credits are yours. Get flatlined, and I never knew you."</em>`,
        choices: [
            {
                text: "Plug your Cyberdeck into the terminal to scout the mainframe remotely.",
                nextNode: "scout_remote",
                cost: { energy: 15 }
            },
            {
                text: "Head into the neon market to buy gear and gather street rumors.",
                nextNode: "market_visit"
            },
            {
                text: "Infiltrate directly through the storm-drain maintenance shaft.",
                nextNode: "drain_infiltrate",
                cost: { hp: 10 }
            }
        ]
    },

    market_visit: {
        chapter: "ACT I: UNDERGROUND MARKET",
        scene: "alley",
        text: `The marketplace smells of synthetic rain and fried synth-noodles. A black-market cyber-doc named Doc Vance winks at you from his neon stall.<br><br>
        <em>"Looking for an edge, runner? I have a military-grade <strong>Neural Key</strong> or a quick <strong>Nano-Medkit</strong> injection."</em>`,
        choices: [
            {
                text: "Purchase the Neural Key (Cost: 150 Credits).",
                nextNode: "market_buy_key",
                requires: { credits: 150 }
            },
            {
                text: "Purchase the Nano-Medkit (+30 HP, Cost: 100 Credits).",
                nextNode: "market_buy_medkit",
                requires: { credits: 100 }
            },
            {
                text: "Save your credits and proceed straight to the target facility.",
                nextNode: "infiltrate_outer"
            }
        ]
    },

    market_buy_key: {
        chapter: "ACT I: PREPARED",
        scene: "alley",
        text: `You transfer 150 credits to Vance. The <strong>Neural Key</strong> glows with shifting blue encryption algorithms as it slots into your deck. This will bypass high-grade corporate security gates.`,
        onEnter: (state) => {
            state.credits -= 150;
            if (!state.inventory.includes("Neural Key")) state.inventory.push("Neural Key");
            sfx.reward();
        },
        choices: [
            {
                text: "Proceed toward the Arasaka sub-grid facility.",
                nextNode: "infiltrate_outer"
            }
        ]
    },

    market_buy_medkit: {
        chapter: "ACT I: RESTORED",
        scene: "alley",
        text: `Nano-drones flood your bloodstream, repairing tissue and cooling cyberware friction. Your HP restores by +30 points.`,
        onEnter: (state) => {
            state.credits -= 100;
            state.hp = Math.min(100, state.hp + 30);
            if (!state.inventory.includes("Nano-Medkit")) state.inventory.push("Nano-Medkit");
            sfx.reward();
        },
        choices: [
            {
                text: "Proceed toward the Arasaka sub-grid facility.",
                nextNode: "infiltrate_outer"
            }
        ]
    },

    scout_remote: {
        chapter: "ACT I: DEEP SCAN",
        scene: "net",
        text: `You jack in. Neon polygons stream across your optic interface. You identify two patrol drones circling the rooftop landing pad, while an automated defense laser guards the subterranean maintenance door. Your energy drops slightly from the neural uplink.`,
        onEnter: (state) => {
            state.energy = Math.max(0, state.energy - 15);
            if (!state.inventory.includes("Facility Schematics")) state.inventory.push("Facility Schematics");
            sfx.beep();
        },
        choices: [
            {
                text: "Use the schematics to ambush the patrol drone on the roof.",
                nextNode: "roof_ambush"
            },
            {
                text: "Hack the laser grid remotely before entering through the drain.",
                nextNode: "drain_hacked"
            }
        ]
    },

    drain_infiltrate: {
        chapter: "ACT II: SEWER BREACH",
        scene: "alley",
        text: `You slip through the rusted iron grates. An electrified sensor wire clips your shoulder, dealing <span class="danger">15 damage</span>, but you successfully enter the lower basement of Arasaka Tower!`,
        onEnter: (state) => {
            state.hp = Math.max(0, state.hp - 15);
            sfx.damage();
        },
        choices: [
            {
                text: "Follow the hum of high-voltage transformers toward the Core Vault.",
                nextNode: "vault_approach"
            },
            {
                text: "Search the security lockers for weapons and supplies.",
                nextNode: "loot_lockers"
            }
        ]
    },

    drain_hacked: {
        chapter: "ACT II: CLEAN ENTRY",
        scene: "corp",
        text: `Thanks to your earlier remote scan, you override the defense laser safely. You slide through the subterranean maintenance airlock undetected.`,
        choices: [
            {
                text: "Move directly toward the Core Vault.",
                nextNode: "vault_approach"
            },
            {
                text: "Search the security office terminals for secret intel.",
                nextNode: "loot_lockers"
            }
        ]
    },

    infiltrate_outer: {
        chapter: "ACT II: OUTER PERIMETER",
        scene: "corp",
        text: `You arrive at the perimeter of the Arasaka Sub-Grid. Heavy blast doors and surveillance cameras loom ahead. A security terminal blinks red with a biometric scanner.`,
        choices: [
            {
                text: "Slot the Neural Key into the security bypass port.",
                nextNode: "neural_bypass",
                requiresItem: "Neural Key"
            },
            {
                text: "Overclock your Cyberdeck to bruteforce the security firewall.",
                nextNode: "bruteforce_firewall",
                cost: { energy: 30 }
            },
            {
                text: "Scale the ventilation piping to the roof.",
                nextNode: "roof_ambush"
            }
        ]
    },

    neural_bypass: {
        chapter: "ACT II: BYPASS SUCCESS",
        scene: "corp",
        text: `The Neural Key clicks home. The red lights instantly shift to tranquil azure. The blast doors slide open silently. You bypass all guards and enter the central Core chamber!`,
        onEnter: () => sfx.reward(),
        choices: [
            {
                text: "Approach the Quantum Core.",
                nextNode: "vault_approach"
            }
        ]
    },

    bruteforce_firewall: {
        chapter: "ACT II: BLACK ICE ATTACK",
        scene: "net",
        text: `You trigger an aggressive decryption daemon. The terminal alarm screams! Corporate Black ICE lashes out through the cable, scorching your neural implant for <span class="danger">25 damage</span> and <span class="danger">30 energy</span>, but the door forces open!`,
        onEnter: (state) => {
            state.hp = Math.max(0, state.hp - 25);
            state.energy = Math.max(0, state.energy - 30);
            sfx.damage();
        },
        choices: [
            {
                text: "Sprint inside before armed sentries converge!",
                nextNode: "vault_approach"
            }
        ]
    },

    roof_ambush: {
        chapter: "ACT II: ROOFTOP COMBAT",
        scene: "corp",
        text: `An Arasaka Sentinel Drone rotates its twin miniguns toward you! Its targeting laser locks onto your chest.`,
        choices: [
            {
                text: "Deploy an EMP Pulse from your Cyberdeck (Cost: 40 Energy).",
                nextNode: "drone_emp",
                cost: { energy: 40 }
            },
            {
                text: "Dive for cover and return fire with your smart pistol.",
                nextNode: "drone_firefight"
            }
        ]
    },

    drone_emp: {
        chapter: "ACT II: OVERRIDE",
        scene: "corp",
        text: `A blinding ring of blue lightning erupts from your deck. The drone sparks violently and crashes to the rooftop. You salvage <span class="reward">+200 Credits</span> from its wreckage.`,
        onEnter: (state) => {
            state.energy = Math.max(0, state.energy - 40);
            state.credits += 200;
            sfx.reward();
        },
        choices: [
            {
                text: "Take the rooftop maintenance elevator down into the Core Vault.",
                nextNode: "vault_approach"
            }
        ]
    },

    drone_firefight: {
        chapter: "ACT II: FIREFIGHT",
        scene: "corp",
        text: `Bullets shred the concrete partition. Shrapnel grazes your torso for <span class="danger">35 damage</span> before your bullet pierces the drone's fuel cell, detonating it in an explosion of sparks!`,
        onEnter: (state) => {
            state.hp = Math.max(0, state.hp - 35);
            sfx.damage();
        },
        choices: [
            {
                text: "Rush down into the Core Vault before reinforcements arrive.",
                nextNode: "vault_approach"
            }
        ]
    },

    loot_lockers: {
        chapter: "ACT II: CACHE DISCOVERY",
        scene: "corp",
        text: `You pry open an executive locker. Inside lies a military <strong>Overdrive Battery</strong> (+50 Energy) and a cred-chip with <span class="reward">+150 Credits</span>!`,
        onEnter: (state) => {
            state.energy = Math.min(100, state.energy + 50);
            state.credits += 150;
            if (!state.inventory.includes("Overdrive Battery")) state.inventory.push("Overdrive Battery");
            sfx.reward();
        },
        choices: [
            {
                text: "Advance to the Vault Core.",
                nextNode: "vault_approach"
            }
        ]
    },

    vault_approach: {
        chapter: "ACT III: THE QUANTUM CORE",
        scene: "vault",
        text: `You stand inside the zero-gravity vacuum chamber. Floating in magnetic suspension is the <strong>Quantum Core</strong>—a crystalline sphere pulsating with infinite streams of sentient data.<br><br>
        Suddenly, Nyx calls over comms: <em>"Extract the core and deliver it to me. We split the fortune."</em><br>
        Simultaneously, the Core's AI speaks directly into your brain: <em>"Operative... Nyx plans to sell me to the military. Synchronize with me, and we shall liberate the entire Net."</em>`,
        choices: [
            {
                text: "Interface directly with the Core AI and merge your consciousness.",
                nextNode: "ending_ascension"
            },
            {
                text: "Download the core data for Nyx and claim the 50,000 Credit bounty.",
                nextNode: "ending_legend"
            },
            {
                text: "Double-cross both: sell the Core to the Arasaka Syndicate for immunity & power.",
                nextNode: "ending_corporate"
            }
        ]
    },

    ending_ascension: {
        chapter: "EPILOGUE: GHOST IN THE NET",
        scene: "legend",
        text: `Your physical shell slumps as your mind expands across thousands of orbital satellites, fiber highways, and corporate supercomputers. You are no longer just a runner in Sector 7—you are the omnipresent digital guardian of the free Net.<br><br>
        <span class="reward">★ ENDING 1 OF 3: DIGITAL TRANSCENDENCE (ACHIEVED) ★</span>`,
        onEnter: () => sfx.victory(),
        choices: [
            { text: "↺ PLAY AGAIN & DISCOVER OTHER BRANCHES", nextNode: "start" }
        ]
    },

    ending_legend: {
        chapter: "EPILOGUE: THE STREET LEGEND",
        scene: "legend",
        text: `You rendezvous with Nyx on the rooftop of the Afterlife club. The cred-chip confirms 50,000 credits. Word spreads across the underworld in minutes: you pulled off the heist of the century.<br><br>
        <span class="reward">★ ENDING 2 OF 3: MASTER MERCENARY (ACHIEVED) ★</span>`,
        onEnter: () => sfx.victory(),
        choices: [
            { text: "↺ PLAY AGAIN & DISCOVER OTHER BRANCHES", nextNode: "start" }
        ]
    },

    ending_corporate: {
        chapter: "EPILOGUE: CORPORATE TYCOON",
        scene: "corp",
        text: `You notify Arasaka High Command. Within seconds, Nyx is neutralized and you are appointed Vice President of Sector Security. Clothed in tailored suits and backed by private armies, you now rule the city from above.<br><br>
        <span class="reward">★ ENDING 3 OF 3: THE CORPORATE BARON (ACHIEVED) ★</span>`,
        onEnter: () => sfx.victory(),
        choices: [
            { text: "↺ PLAY AGAIN & DISCOVER OTHER BRANCHES", nextNode: "start" }
        ]
    },

    flatlined: {
        chapter: "GAME OVER: FLATLINED",
        scene: "flatline",
        text: `Your vital signs plummet to zero. Your neural cyberware overloads and your vision fades to static. In Sector 7, life is cheap, and the street claims another runner...<br><br>
        <span class="danger">☠ SYSTEM FAILURE // GAME OVER ☠</span>`,
        onEnter: () => sfx.gameover(),
        choices: [
            { text: "↺ REBOOT NEURAL INTERFACE (RETRY)", nextNode: "start" }
        ]
    }
};

// --- GAME STATE CONTROLLER ---
class GameEngine {
    constructor() {
        this.state = {
            hp: 100,
            energy: 100,
            credits: 250,
            inventory: ["Cyberdeck: Onyx"],
            currentNode: "start"
        };

        this.hpValueEl = document.getElementById("hp-value");
        this.hpBarEl = document.getElementById("hp-bar");
        this.energyValueEl = document.getElementById("energy-value");
        this.energyBarEl = document.getElementById("energy-bar");
        this.creditsValueEl = document.getElementById("credits-value");
        this.inventoryListEl = document.getElementById("inventory-list");
        this.storyContentEl = document.getElementById("story-content");
        this.choicesContainerEl = document.getElementById("choices-container");
        this.chapterBadgeEl = document.getElementById("chapter-badge");
        this.asciiDisplayEl = document.getElementById("ascii-display");
        this.soundBtnEl = document.getElementById("sound-btn");
        this.restartBtnEl = document.getElementById("restart-btn");

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.soundBtnEl.addEventListener("click", () => {
            sfx.enabled = !sfx.enabled;
            this.soundBtnEl.textContent = sfx.enabled ? "🔊 SFX ON" : "🔇 SFX OFF";
            if (sfx.enabled) sfx.click();
        });

        this.restartBtnEl.addEventListener("click", () => {
            sfx.click();
            this.resetGame();
        });
    }

    resetGame() {
        this.state = {
            hp: 100,
            energy: 100,
            credits: 250,
            inventory: ["Cyberdeck: Onyx"],
            currentNode: "start"
        };
        this.renderNode("start");
    }

    updateHUD() {
        // Health
        this.hpValueEl.textContent = `${this.state.hp}%`;
        this.hpBarEl.style.width = `${Math.max(0, this.state.hp)}%`;

        // Energy
        this.energyValueEl.textContent = `${this.state.energy}%`;
        this.energyBarEl.style.width = `${Math.max(0, this.state.energy)}%`;

        // Credits
        this.creditsValueEl.textContent = `🪙 ${this.state.credits} ¥`;

        // Inventory
        this.inventoryListEl.innerHTML = "";
        this.state.inventory.forEach(item => {
            const li = document.createElement("li");
            li.className = "item-tag";
            li.textContent = item;
            this.inventoryListEl.appendChild(li);
        });
    }

    renderNode(nodeId) {
        // Check health death condition
        if (this.state.hp <= 0 && nodeId !== "flatlined") {
            this.renderNode("flatlined");
            return;
        }

        const node = STORY_NODES[nodeId] || STORY_NODES["start"];
        this.state.currentNode = nodeId;

        // Execute onEnter lifecycle
        if (typeof node.onEnter === "function") {
            node.onEnter(this.state);
        }

        this.updateHUD();

        // Update Chapter and ASCII Scene
        if (node.chapter) this.chapterBadgeEl.textContent = node.chapter;
        if (node.scene && ASCII_SCENES[node.scene]) {
            this.asciiDisplayEl.textContent = ASCII_SCENES[node.scene].trim();
        }

        // Update Text
        this.storyContentEl.innerHTML = `<p>${node.text}</p>`;

        // Render Choices
        this.choicesContainerEl.innerHTML = "";
        node.choices.forEach((choice, index) => {
            const btn = document.createElement("button");
            btn.className = "choice-btn";

            // Check if choice is locked
            let isLocked = false;
            let lockReason = "";

            if (choice.requiresItem && !this.state.inventory.includes(choice.requiresItem)) {
                isLocked = true;
                lockReason = ` [Requires: ${choice.requiresItem}]`;
            }

            if (choice.requires && choice.requires.credits && this.state.credits < choice.requires.credits) {
                isLocked = true;
                lockReason = ` [Need ${choice.requires.credits} Credits]`;
            }

            if (choice.cost && choice.cost.energy && this.state.energy < choice.cost.energy) {
                isLocked = true;
                lockReason = ` [Need ${choice.cost.energy} Energy]`;
            }

            btn.innerHTML = `<span class="choice-num">${index + 1} ❯</span> ${choice.text}${lockReason}`;

            if (isLocked) {
                btn.classList.add("locked");
            } else {
                btn.addEventListener("click", () => {
                    sfx.click();
                    if (choice.cost) {
                        if (choice.cost.hp) this.state.hp = Math.max(0, this.state.hp - choice.cost.hp);
                        if (choice.cost.energy) this.state.energy = Math.max(0, this.state.energy - choice.cost.energy);
                    }
                    this.renderNode(choice.nextNode);
                });
            }

            this.choicesContainerEl.appendChild(btn);
        });
    }

    start() {
        this.renderNode("start");
    }
}

// Initialize on DOM Ready
window.addEventListener("DOMContentLoaded", () => {
    const game = new GameEngine();
    game.start();
});
