# Speedcube Timer

## 📌 Overview
A web-based speedcubing timer inspired by CSTimer with the following features:

## Core Functionalities

# 🎯 WCA-Compliant Scramble Generator

Our scramble generation feature follows the **WCA (World Cube Association) guidelines** for random-state scrambling, ensuring fair and competition-grade practice conditions.

- Implements **random-state** scrambles as used in official competitions.
- Avoids redundant or repeated face moves.
- Generates valid cube states using [`cubejs`](https://github.com/ldez/cubejs), which adheres to WCA scramble logic.
- Scramble notation uses official face turns: `U`, `D`, `L`, `R`, `F`, `B` with modifiers (`'`, `2`).

> This design is inspired by the **TNoodle** scrambling engine used in official WCA competitions.

🔗 [WCA Scramble Regulations](https://www.worldcubeassociation.org/regulations/#scrambling)
 
# Timer Functionality

The timer is designed for **accurate and responsive cube timing**, inspired by tools like CSTimer. It supports standard cubing workflows and aligns with expectations for competition-style practice.

- Starts and stops using the spacebar, mimicking physical stackmat behavior.
- Supports **15-second inspection mode** with automatic countdown.
- Provides real-time display of solve time in milliseconds.
- Optimized for low-latency key events to ensure timing precision.

This feature ensures a **realistic and consistent timing experience** for speedcubers training for WCA competitions.

# Solve History

The solve history feature automatically records each solve, providing a detailed log for performance tracking and analysis.

- Displays a list of all recorded solve times in chronological order.
- Includes metadata such as inspection penalties (+2) or DNFs (Did Not Finish).
- Automatically calculates key statistics like average of 5 (ao5) and average of 12 (ao12).
- Allows users to clear history or export solve data for review.

This feature helps speedcubers identify trends, monitor progress, and improve through consistent feedback.


## 🚀 Features
- Random scramble generation (3x3)
- Timer with inspection mode
- Solve history with average calculations

## 🛠️ Tech Stack
React, HTML/CSS, cubejs for scrambles

## 📦 Getting Started
1. Clone the repo
2. Run `npm install`
3. Run `npm start`

## 🤝 Contributing


## 📜 License
MIT
