# Financial Statement Analyzer - User Guide

## Overview
A powerful, AI-powered financial statement analyzer with a sleek dark theme interface. Upload any financial document and get instant analysis, health scores, and personalized investment recommendations.

## Features

### 🎨 Beautiful Dark Theme Interface
- Lando Norris-inspired sleek design
- Smooth animations and transitions
- Gradient buttons with hover effects
- Professional card-based layout

### 📄 Multi-Format Support
Upload any of these file formats:
- **PDF** - Annual reports, 10-K, 10-Q filings
- **DOCX/DOC** - Microsoft Word documents
- **XLSX/XLS** - Excel spreadsheets
- **CSV** - Comma-separated value files
- **TXT** - Plain text files
- **XBRL/XML** - XBRL financial data formats

### 📊 Comprehensive Analysis
- **Company Name** - Automatically extracted
- **Health Score** - 0-100 score with visual ring indicator
- **Key Metrics** - Revenue, Profit, Assets, Debt, Ratios
- **3 Key Insights** - Plain English analysis
- **Investment Recommendation** - Based on your risk profile

### 🎯 Personalized Investment Recommendations
Adjust two key factors:
- **Risk Tolerance** (1-10) - Conservative to Aggressive
- **Growth Expectation** (1-10) - Stable to High Growth

Get tailored recommendations:
- ✓ INVEST - Strong buy signals
- ⏸ WAIT - Hold and monitor
- ⊘ PASS - Skip this opportunity
- ⚠ CAUTION - High risk consideration
- ✗ AVOID - Not recommended

### 🤖 AI Chat Assistant
- Ask questions about the financial statement
- Get answers in plain English
- Full conversation history maintained
- Powered by Claude AI

## How to Use

### Step 1: Open the Application
Simply open `financial-analyzer.html` in any modern web browser:
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Step 2: Upload a Financial Document
- **Drag and drop** your file onto the upload zone, or
- **Click** the upload area to browse your files
- The analyzer supports all major financial document formats

### Step 3: Review the Analysis
After a few seconds, you'll see:
- Company health score with visual indicator
- Key financial metrics in organized cards
- Three main insights about the company's financial health

### Step 4: Adjust Your Investment Profile
Use the sliders to set:
- Your **Risk Tolerance** (1 = very conservative, 10 = very aggressive)
- Your **Growth Expectation** (1 = stable returns, 10 = high growth)

The system will automatically generate a personalized recommendation.

### Step 5: Ask Questions (Optional)
Use the AI Chat Assistant to:
- Clarify specific metrics
- Understand financial terms
- Get deeper insights
- Ask "what-if" scenarios

Example questions:
- "What is the company's debt situation?"
- "Is the revenue growing?"
- "What are the main risks?"
- "How does the profit margin compare to industry average?"

### Step 6: Analyze Another Document
Click "Analyze Another Document" at the bottom to start over.

## Understanding the Health Score

The health score is calculated based on multiple factors:

- **80-100** - Excellent financial health (Green)
- **60-79** - Good financial health (Yellow)
- **40-59** - Fair financial health (Orange)
- **0-39** - Poor financial health (Red)

## Investment Recommendation Logic

The recommendation combines three factors:

1. **Health Score** - Company's financial strength
2. **Risk Tolerance** - Your willingness to take risks
3. **Growth Expectation** - Your investment timeline and goals

Examples:
- High health score + High risk tolerance = Strong Buy
- Medium health score + Low risk tolerance = Pass/Wait
- Low health score + High risk tolerance = Speculative/Avoid

## Troubleshooting

### File Won't Upload
- **Check file format** - Ensure it's one of the supported formats
- **File size** - Very large files (>50MB) may take longer
- **File corruption** - Try opening the file in its native app first
- **Password protection** - Remove password protection from PDFs

### Analysis Failed
- **Insufficient data** - File may not contain enough text
- **Wrong file type** - Ensure it's a financial statement, not a general document
- **Corrupted file** - Try re-downloading or re-saving the file
- **Network issue** - Check your internet connection

### Chat Not Responding
- **Check internet** - AI assistant requires internet connection
- **Wait for analysis** - Chat only works after document is analyzed
- **Reload page** - Refresh the browser if chat becomes unresponsive

### Metrics Show "N/A"
- **Missing data** - Document may not contain that specific metric
- **Format issue** - Data may be in an unrecognizable format
- **Non-financial document** - File may not be a proper financial statement

## Tips for Best Results

### Document Quality
- ✅ Use official financial statements (10-K, 10-Q, annual reports)
- ✅ Ensure text is readable (not scanned images without OCR)
- ✅ Use recent documents (within last 2 years)
- ❌ Avoid heavily formatted or encrypted PDFs
- ❌ Don't use partial or incomplete statements

### Analysis Accuracy
- Upload complete financial statements
- Include balance sheet, income statement, and cash flow
- Quarterly or annual reports work best
- SEC filings (10-K, 10-Q) are ideal

### Investment Decisions
- ⚠️ This tool provides analysis, not financial advice
- ⚠️ Always do additional research
- ⚠️ Consult with a financial advisor for major decisions
- ⚠️ Consider multiple factors beyond the health score

## Privacy & Security

- **No data stored** - All processing happens in your browser
- **No uploads to external servers** - Files stay on your device
- **API calls** - Only analysis requests sent to Claude AI
- **No personal information collected**

## Sample Data

A sample financial statement (`sample-financial-statement.txt`) is included for testing:
- ACME Corporation example
- Contains all major financial statements
- Realistic metrics and ratios
- Perfect for testing the analyzer

## Technical Requirements

- Modern web browser with JavaScript enabled
- Internet connection (for AI analysis)
- Minimum screen resolution: 1024x768
- Recommended: Desktop or laptop (tablet works too)

## Keyboard Shortcuts

- **Enter** in chat box - Send message
- **Drag and Drop** - Upload file
- **Click anywhere** in upload zone - Browse files

## Support

If you encounter issues:

1. **Refresh the page** - Solves most temporary issues
2. **Try a different file** - Verify the document is valid
3. **Check console** - Open browser developer tools for error messages
4. **Use sample data** - Test with the included sample file

## Credits

Built with:
- React - UI framework
- Claude AI - Financial analysis
- Tailwind CSS - Styling
- PDF.js - PDF processing
- Mammoth - DOCX processing
- SheetJS - Excel processing

---

**Disclaimer**: This tool is for informational purposes only. It does not constitute financial advice, investment recommendations, or an offer to buy or sell securities. Always consult with qualified financial professionals before making investment decisions.
