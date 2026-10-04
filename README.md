# Haez Expense Tracker

Live Demo: https://expense-tracker-7455.vercel.app/
Repo: https://github.com/Haez0004/expense-tracker

Expense tracker that works offline.

## Features
- ✅ Add / Edit / Delete transactions
- ✅ Search + Monthly Filter + Categories 
- ✅ PWA Offline - service-worker.js, works without internet
- ✅ Git Workflow - feature/edit branch -> merge to main
- ✅ Red Clear All button #ff0000 

## Tech
React + Vite + localStorage + PWA

## Run Locally (Termux)
cd ~/expense-tracker
npm install
npm run dev

## Git Commands Used
git checkout -b feature/edit
git commit -m "feature: clear all btn red #ff0000"
git checkout main
git merge feature/edit
git push origin main
git branch -d feature/edit

## Author
Haez0004 - Abuja, NG.
