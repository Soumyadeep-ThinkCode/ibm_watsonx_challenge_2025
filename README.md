# ConsultX FX Agent

IBM ConsultX FX Insight Engine - A Node.js application that fetches EUR/USD exchange rate data and generates AI-powered consulting reports for client presentations.

## Features

- 📊 **Real-time FX Data**: Fetches EUR/USD exchange rates from Alpha Vantage API
- 🤖 **AI-Powered Consulting**: Uses IBM Watson AI to generate business-focused pitch content
- 📄 **Client HTML Reports**: Generates beautiful, branded HTML slides with client information
- 📋 **Professional PDF Reports**: Creates client-ready PDF reports for presentations
- 🎨 **Modern UI**: Clean, gradient design optimized for business presentations
- 🏦 **Client-Focused**: Tailored insights for specific banks and regions

## Generated Files

The application creates two types of client-ready reports:

1. **HTML Slide** (`fx-insight-[client-name]-YYYY-MM-DD.html`)
   - Interactive web-based report
   - Client and region-specific branding
   - Professional gradient design
   - Can be opened in any web browser
   - Print-ready layout

2. **PDF Report** (`fx-insight-[client-name]-YYYY-MM-DD.pdf`)
   - Professional PDF document
   - Optimized for client presentations
   - Includes all FX data and AI-generated pitch content

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Environment Variables

Create a `.env` file with:

```
ALPHA_VANTAGE_KEY=your_api_key
WATSONX_API_KEY=your_watson_api_key
WATSONX_PROJECT_ID=your_project_id
```

## Output Example

```
📊 IBM ConsultX – FX Insight Report
Client: Deutsche Bank
Region: Germany
Date: 2025-07-14
Open: 1.16730
Close: 1.16630

🤖 AI-Generated Pitch Content:
[AI-generated consulting insights tailored for the client]

============================================================
✅ HTML slide generated: fx-insight-deutsche-bank-2025-07-14.html
🔄 Generating PDF report...
✅ PDF report generated: fx-insight-deutsche-bank-2025-07-14.pdf

📄 Reports Generated:
   • HTML Slide: fx-insight-deutsche-bank-2025-07-14.html
   • PDF Report: fx-insight-deutsche-bank-2025-07-14.pdf
```

## Dependencies

- `axios` - HTTP client for API requests
- `dotenv` - Environment variable management
- `puppeteer` - PDF generation from HTML

## Report Features

### HTML Report Includes:
- 📅 Trading date
- 🏦 Client name (customizable)
- 🌍 Region (customizable)
- 🔓 Opening price
- 🔒 Closing price
- 📈 Daily change with percentage and color coding
- 🤖 AI-generated pitch content tailored for the client
- 💎 Professional gradient design
- 📱 Responsive layout

### PDF Report Includes:
- Same data as HTML version
- Professional formatting optimized for presentations
- Print-ready layout
- Chart placeholder for future enhancements
- Client-specific branding

## Customization

The application currently targets **Deutsche Bank** in **Germany**. To customize for different clients:

1. Edit the `targetBank` and `region` variables in `app.js`
2. Modify the AI prompt to include client-specific context
3. The filenames will automatically reflect the client name

---

Created by Soumyadeep Ghosh (IBM) for the IBM Watson Challenge 2025
