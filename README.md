# SecureScan 🔐🧠

SecureScan is a full-stack file security analysis tool that scans uploaded files using VirusTotal API and generates an AI-powered security summary using Google Gemini.

## 🚀 Features

- Upload any file for malware analysis
- Scans using 60+ antivirus engines via VirusTotal API
- Real-time analysis status tracking
- AI-generated security summary (Gemini 2.5 Flash Lite)
- Visual breakdown using doughnut chart
- Vendor-wise detection report

## 🧠 Tech Stack

**Frontend:**
- React.js
- Axios
- Chart.js

**Backend:**
- Node.js
- Express.js
- Multer
- Axios

**APIs:**
- VirusTotal API
- Google Gemini API

## ⚙️ How It Works

1. User uploads a file
2. Backend sends file to VirusTotal API
3. Polling fetches analysis result
4. Result is processed and sent to Gemini AI
5. AI returns a simplified security summary
6. Frontend displays:
   - AI summary
   - Risk chart
   - Vendor breakdown

## 🧪 AI Summary Example

Gemini analyzes:
- malicious count
- suspicious count
- undetected engines

And returns:
- verdict
- explanation
- safety advice

## 📦 Setup

```bash
npm install
npm run dev
