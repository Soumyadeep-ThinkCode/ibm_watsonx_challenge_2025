const getFXData = require('./fxFetcher');
const summarizeFXData = require('./watsonxPrompt');
const fs = require('fs');
const puppeteer = require('puppeteer');

function generateHTMLSlide(fx, summary, targetBank, region) {
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>FX Report - IBM ConsultX</title>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #333;
        margin: 0;
        min-height: 100vh;
      }
      .container {
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        max-width: 800px;
        margin: 0 auto;
      }
      .header {
        border-bottom: 3px solid #667eea;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #667eea;
        margin: 0;
        font-size: 2.5em;
      }
      .header .subtitle {
        color: #666;
        font-size: 1.2em;
        margin-top: 10px;
      }
      .data-section {
        background: #f8f9ff;
        padding: 25px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 5px solid #667eea;
      }
      .data-row {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        font-size: 1.1em;
      }
      .data-label {
        font-weight: bold;
        color: #333;
      }
      .data-value {
        color: #667eea;
        font-weight: 600;
      }
      .insight-section {
        background: #fff8e1;
        padding: 25px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 5px solid #ffa726;
      }
      .insight-title {
        color: #f57c00;
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .insight-text {
        line-height: 1.6;
        font-size: 1.1em;
        color: #333;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        color: #666;
        font-size: 0.9em;
      }
      @media print {
        body { background: white; }
        .container { box-shadow: none; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📊 IBM ConsultX – FX Insight Report</h1>
        <div class="subtitle">Client: ${targetBank} | Region: ${region}</div>
      </div>
      
      <div class="data-section">
        <div class="data-row">
          <span class="data-label">📅 Date:</span>
          <span class="data-value">${fx.date}</span>
        </div>
        <div class="data-row">
          <span class="data-label">🏦 Client:</span>
          <span class="data-value">${targetBank}</span>
        </div>
        <div class="data-row">
          <span class="data-label">🌍 Region:</span>
          <span class="data-value">${region}</span>
        </div>
        <div class="data-row">
          <span class="data-label">🔓 Opening Price:</span>
          <span class="data-value">${fx.open} USD</span>
        </div>
        <div class="data-row">
          <span class="data-label">🔒 Closing Price:</span>
          <span class="data-value">${fx.close} USD</span>
        </div>
        <div class="data-row">
          <span class="data-label">📈 Daily Change:</span>
          <span class="data-value" style="color: ${(fx.close - fx.open) >= 0 ? '#4caf50' : '#f44336'}">
            ${(fx.close - fx.open) >= 0 ? '+' : ''}${(fx.close - fx.open).toFixed(5)} USD 
            (${(((fx.close - fx.open) / fx.open) * 100).toFixed(3)}%)
          </span>
        </div>
      </div>
      
      <div class="insight-section">
        <div class="insight-title">🤖 AI-Generated Pitch Content</div>
        <div class="insight-text">${summary}</div>
      </div>
      
      <div class="footer">
        Generated on ${new Date().toLocaleString()} by IBM ConsultX – FX Insight Engine
      </div>
    </div>
  </body>
</html>
`;
  
  const filename = `fx-insight-${targetBank.replace(/\s+/g, '-').toLowerCase()}-${fx.date}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ HTML slide generated: ${filename}`);
  return filename;
}

async function generatePDFReport(fx, summary, targetBank, region) {
  try {
    console.log("🔄 Generating PDF report...");
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Generate the same HTML content but optimized for PDF
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>FX Report - IBM ConsultX</title>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 30px;
        color: #333;
        margin: 0;
        background: white;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
      }
      .header {
        border-bottom: 3px solid #667eea;
        padding-bottom: 20px;
        margin-bottom: 30px;
        text-align: center;
      }
      .header h1 {
        color: #667eea;
        margin: 0;
        font-size: 2.5em;
      }
      .header .subtitle {
        color: #666;
        font-size: 1.2em;
        margin-top: 10px;
      }
      .data-section {
        background: #f8f9ff;
        padding: 25px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 5px solid #667eea;
      }
      .data-row {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        font-size: 1.1em;
      }
      .data-label {
        font-weight: bold;
        color: #333;
      }
      .data-value {
        color: #667eea;
        font-weight: 600;
      }
      .insight-section {
        background: #fff8e1;
        padding: 25px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 5px solid #ffa726;
      }
      .insight-title {
        color: #f57c00;
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .insight-text {
        line-height: 1.6;
        font-size: 1.1em;
        color: #333;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        color: #666;
        font-size: 0.9em;
        page-break-inside: avoid;
      }
      .chart-placeholder {
        background: #f0f2f5;
        border: 2px dashed #ccc;
        padding: 40px;
        text-align: center;
        margin: 20px 0;
        border-radius: 10px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📊 IBM ConsultX – FX Insight Report</h1>
        <div class="subtitle">Client: ${targetBank} | Region: ${region}</div>
      </div>
      
      <div class="data-section">
        <div class="data-row">
          <span class="data-label">📅 Date:</span>
          <span class="data-value">${fx.date}</span>
        </div>
        <div class="data-row">
          <span class="data-label">🏦 Client:</span>
          <span class="data-value">${targetBank}</span>
        </div>
        <div class="data-row">
          <span class="data-label">🌍 Region:</span>
          <span class="data-value">${region}</span>
        </div>
        <div class="data-row">
          <span class="data-label">🔓 Opening Price:</span>
          <span class="data-value">${fx.open} USD</span>
        </div>
        <div class="data-row">
          <span class="data-label">🔒 Closing Price:</span>
          <span class="data-value">${fx.close} USD</span>
        </div>
        <div class="data-row">
          <span class="data-label">📈 Daily Change:</span>
          <span class="data-value" style="color: ${(fx.close - fx.open) >= 0 ? '#4caf50' : '#f44336'}">
            ${(fx.close - fx.open) >= 0 ? '+' : ''}${(fx.close - fx.open).toFixed(5)} USD 
            (${(((fx.close - fx.open) / fx.open) * 100).toFixed(3)}%)
          </span>
        </div>
      </div>

      <div class="chart-placeholder">
        📈 Chart visualization would appear here in full implementation
      </div>
      
      <div class="insight-section">
        <div class="insight-title">🤖 AI-Generated Pitch Content</div>
        <div class="insight-text">${summary}</div>
      </div>
      
      <div class="footer">
        Generated on ${new Date().toLocaleString()} by IBM ConsultX – FX Insight Engine<br>
        <small>This is an AI-powered consulting report based on real-time FX data analysis</small>
      </div>
    </div>
  </body>
</html>
`;

    await page.setContent(html);
    
    const pdfFilename = `fx-insight-${targetBank.replace(/\s+/g, '-').toLowerCase()}-${fx.date}.pdf`;
    await page.pdf({
      path: pdfFilename,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });
    
    await browser.close();
    console.log(`✅ PDF report generated: ${pdfFilename}`);
    return pdfFilename;
    
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
    return null;
  }
}

async function main() {
  try {
    const fx = await getFXData();
    const targetBank = "Deutsche Bank";
    const region = "Germany";

    const prompt = `
        Generate 3 consulting insights for ${targetBank} in ${region} based on today's EUR/USD FX rate movement.
        Open: ${fx.open}, Close: ${fx.close}.
        Include:
        1. Risk impact of FX movement on cross-border transactions.
        2. Strategic recommendation for treasury teams.
        3. How IBM Forrix FX Engine can help.
        Make the tone business-consulting-friendly, slide-ready, and focused on helping IBM win the deal.
    `;
    const summary = await summarizeFXData(prompt);
    
    console.log(`
📊 IBM ConsultX – FX Insight Report
Client: ${targetBank}
Region: ${region}
Date: ${fx.date}
Open: ${fx.open}
Close: ${fx.close}

🤖 AI-Generated Pitch Content:
${summary}
`);
    
    console.log("=".repeat(60));
    
    // Generate HTML slide
    const htmlFile = generateHTMLSlide(fx, summary, targetBank, region);
    
    // Generate PDF report
    const pdfFile = await generatePDFReport(fx, summary, targetBank, region);
    
    console.log("\n📄 Reports Generated:");
    console.log(`   • HTML Slide: ${htmlFile}`);
    if (pdfFile) {
      console.log(`   • PDF Report: ${pdfFile}`);
    }
    
  } catch (err) {
    console.error("Application error:", err.message);
  }
}

main();
