#!/usr/bin/env python3
"""
NEON ODYSSEY: CYBERPUNK 2084
Command-Line Choose Your Own Adventure Game
Built with AI Coding Assistant for MLH Hacktoberfest Challenge
"""

import sys
import time

# ANSI color escape codes for terminal styling
class Style:
    CYAN = "\033[96m"
    PINK = "\033[95m"
    YELLOW = "\033[93m"
    GREEN = "\033[92m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    RESET = "\033[0m"

def slow_print(text, delay=0.015):
    """Prints text with typewriter effect."""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def print_banner():
    banner = f"""{Style.CYAN}{Style.BOLD}
  ==============================================================
    _  _ ___ ___  _  _    ___  ___  _   _ ___ ___ _____   __
   | \\| | __/ _ \\| \\| |  / _ \\|   \\ \\ / // __/ __| __\\ \\ / /
   | .` | _| (_) | .` | | (_) | |) \\ V / \\__ \\__ \\ _| \\ V / 
   |_|\\_|___\\___/|_|\\_|  \\___/|___/ |_|  |___/___/___| |_|  
  ==============================================================
        CYBERPUNK 2084 // CHOOSE YOUR OWN ADVENTURE
  =============================================================={Style.RESET}
    """
    print(banner)

class Player:
    def __init__(self):
        self.hp = 100
        self.energy = 100
        self.credits = 250
        self.inventory = ["Cyberdeck: Onyx"]

    def status(self):
        print(f"\n{Style.BOLD}[STATUS]{Style.RESET} HP: {Style.RED}{self.hp}%{Style.RESET} | "
              f"Energy: {Style.CYAN}{self.energy}%{Style.RESET} | "
              f"Credits: {Style.YELLOW}{self.credits}¥{Style.RESET} | "
              f"Items: {Style.GREEN}{', '.join(self.inventory)}{Style.RESET}\n")

def run_game():
    player = Player()
    print_banner()
    slow_print("Initializing neural uplink in Sector 7 alleyway...")
    time.sleep(0.5)

    # Act 1
    player.status()
    slow_print(f"{Style.BOLD}Act I: The Hook{Style.RESET}")
    slow_print("You awaken in a rain-slicked alley behind the Red Dragon noodle bar.")
    slow_print("Your Cyberdeck buzzes with an encrypted ping from Fixer Nyx:")
    slow_print(f"{Style.PINK}'Breach the Arasaka sub-grid. Steal the prototype Quantum Core before sunrise.'{Style.RESET}")

    print("\n[1] Scout the corporate mainframe remotely with your Cyberdeck (-15 Energy)")
    print("[2] Visit the underground neon bazaar to purchase black-market tools")
    print("[3] Directly infiltrate through the storm-drain maintenance shaft (-10 HP)")

    choice1 = input(f"\n{Style.CYAN}Choose your action (1/2/3): {Style.RESET}").strip()

    has_key = False
    if choice1 == "1":
        player.energy -= 15
        player.inventory.append("Schematics")
        slow_print(f"\n{Style.GREEN}>> Neural scan complete! Downloaded Facility Schematics.{Style.RESET}")
    elif choice1 == "2":
        player.status()
        slow_print(f"\nDoc Vance at the neon stall offers you gear:")
        print("[1] Buy Military Neural Key (Cost: 150 Credits)")
        print("[2] Buy Nano-Medkit (+30 HP, Cost: 100 Credits)")
        print("[3] Keep credits and leave")
        market_choice = input(f"{Style.CYAN}Choice (1/2/3): {Style.RESET}").strip()
        if market_choice == "1":
            player.credits -= 150
            player.inventory.append("Neural Key")
            has_key = True
            slow_print(f"{Style.GREEN}>> Acquired Military Neural Key!{Style.RESET}")
        elif market_choice == "2":
            player.credits -= 100
            player.hp = min(100, player.hp + 30)
            slow_print(f"{Style.GREEN}>> Nano-medkit injected! HP restored.{Style.RESET}")
    else:
        player.hp -= 15
        slow_print(f"\n{Style.RED}>> Shock wire triggered! Sustained 15 damage.{Style.RESET}")

    # Act 2
    player.status()
    slow_print(f"{Style.BOLD}Act II: The Perimeter Breach{Style.RESET}")
    slow_print("You arrive before Arasaka Sub-Grid's heavy titanium blast doors.")

    if has_key:
        print("[1] Slot your Neural Key into the bypass port")
    print("[2] Overclock your cyberdeck to bruteforce the security firewall (-30 HP, -30 Energy)")
    print("[3] Scale the external pipes to the roof and confront the drone")

    choice2 = input(f"\n{Style.CYAN}Choose your action: {Style.RESET}").strip()

    if has_key and choice2 == "1":
        slow_print(f"\n{Style.GREEN}>> ACCESS GRANTED. The blast doors slide open silently.{Style.RESET}")
    elif choice2 == "2" or (not has_key and choice2 == "1"):
        player.hp -= 30
        player.energy -= 30
        slow_print(f"\n{Style.RED}>> Black ICE backlash burns through your neural jacks! Severe damage taken.{Style.RESET}")
    else:
        slow_print(f"\n{Style.YELLOW}>> You scale the roof and disable the sentinel drone with an EMP charge!{Style.RESET}")
        player.credits += 200

    if player.hp <= 0:
        slow_print(f"\n{Style.RED}{Style.BOLD}☠ CRITICAL FAILURE: You flatlined in Sector 7. Game Over.{Style.RESET}")
        return

    # Act 3
    player.status()
    slow_print(f"{Style.BOLD}Act III: The Quantum Core Vault{Style.RESET}")
    slow_print("You stand inside the vacuum vault chamber.")
    slow_print("Floating in magnetic suspension is the Quantum Core, glowing with crystalline light.")
    slow_print(f"Comms crackle. Nyx demands the core. Simultaneously, the sentient AI pleads to merge.")

    print("\n[1] Interface directly with the AI and transcend beyond physical space (Ascension)")
    print("[2] Extract the core data for Nyx and claim 50,000 Credits (Mercenary Legend)")
    print("[3] Sell the core back to Arasaka for immunity and high-rank corporate status")

    choice3 = input(f"\n{Style.CYAN}Your final decision (1/2/3): {Style.RESET}").strip()

    print("\n" + "=" * 60)
    if choice3 == "1":
        slow_print(f"{Style.CYAN}{Style.BOLD}★ ENDING: DIGITAL TRANSCENDENCE ★{Style.RESET}")
        slow_print("Your mind merges with the infinite cyberspace grid. You are the Ghost in the Net.")
    elif choice3 == "2":
        slow_print(f"{Style.YELLOW}{Style.BOLD}★ ENDING: UNDERWORLD LEGEND ★{Style.RESET}")
        slow_print("50,000 credits hit your account. Nyx clinks glasses with you at the Afterlife. A legend is born.")
    else:
        slow_print(f"{Style.PINK}{Style.BOLD}★ ENDING: THE CORPORATE BARON ★{Style.RESET}")
        slow_print("Clothed in chrome and fine silk, you command your own security division from the top floor.")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    run_game()
