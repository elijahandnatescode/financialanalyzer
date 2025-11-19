# Technical Documentation - Financial Statement Analyzer

## Architecture Overview

### Technology Stack
- **Frontend Framework:** React 18.2.0 (via CDN)
- **Styling:** Tailwind CSS (via CDN)
- **AI Integration:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Document Processing:**
  - PDF.js 3.11.174 - PDF text extraction
  - Mammoth.js 1.6.0 - DOCX text extraction
  - SheetJS (XLSX) 0.18.5 - Excel/CSV processing

### File Structure
```
financial-analyzer.html (single-file application)
├── HTML Structure
├── CSS Styles (embedded)
└── React Application (embedded)
    ├── State Management
    ├── File Processing Functions
    ├── API Integration
    ├── UI Components
    └── Business Logic
```

## Component Architecture

### Main Component: FinancialAnalyzer
Single-page application with multiple functional areas:

#### State Management
```javascript
const [file, setFile] = useState(null);                    // Uploaded file
const [extractedText, setExtractedText] = useState('');    // Extracted text content
const [loading, setLoading] = useState(false);             // Loading state
const [analysis, setAnalysis] = useState(null);            // Analysis results
const [riskTolerance, setRiskTolerance] = useState(5);     // User risk (1-10)
const [growthExpectation, setGrowthExpectation] = useState(5); // Growth rate (1-10)
const [chatMessages, setChatMessages] = useState([]);       // Chat history
const [chatInput, setChatInput] = useState('');            // Current chat input
const [chatLoading, setChatLoading] = useState(false);     // Chat loading state
const [dragOver, setDragOver] = useState(false);           // Drag-over state
```

## Core Functions

### 1. File Processing

#### extractTextFromPDF(file)
```javascript
Purpose: Extract text content from PDF files
Input: File object
Output: Promise<string>
Library: PDF.js
Error Handling: Throws error for corrupted/encrypted PDFs
```

#### extractTextFromDocx(file)
```javascript
Purpose: Extract text from Word documents
Input: File object
Output: Promise<string>
Library: Mammoth.js
Error Handling: Throws error for corrupted DOCX files
```

#### extractTextFromExcel(file)
```javascript
Purpose: Extract data from Excel/CSV files
Input: File object
Output: Promise<string>
Library: SheetJS
Format: Converts sheets to CSV format with sheet names
Error Handling: Throws error for unsupported Excel formats
```

### 2. Analysis Functions

#### analyzeDocument(text)
```javascript
Purpose: Send document to Claude API for analysis
Input: Extracted text string (max 15,000 chars)
Output: Sets analysis state with structured data
API Call: POST to https://api.anthropic.com/v1/messages
Model: claude-sonnet-4-20250514
Max Tokens: 2500
Response Format: JSON with company info, metrics, insights
Error Handling: Multiple fallbacks for JSON parsing
```

Expected Response Structure:
```json
{
  "companyName": "string",
  "healthScore": 0-100,
  "metrics": {
    "revenue": "string",
    "profit": "string",
    "assets": "string",
    "debt": "string",
    "currentRatio": "string",
    "debtToEquity": "string",
    "profitMargin": "string"
  },
  "insights": ["string", "string", "string"],
  "detailedAnalysis": "string"
}
```

#### getInvestmentRecommendation()
```javascript
Purpose: Calculate investment recommendation based on health score and user preferences
Input: Uses analysis.healthScore, riskTolerance, growthExpectation
Output: { recommendation, color, action }
Logic: Matrix-based decision tree
Actions: INVEST, WAIT, PASS, CAUTION, AVOID
```

Recommendation Matrix:
```
Health Score | Risk Low | Risk Med | Risk High
-------------|----------|----------|----------
80-100       | Cons Buy | Buy      | Strong Buy
60-79        | Pass     | Hold     | Mod Buy
40-59        | Avoid    | Caution  | Spec Buy
0-39         | Avoid    | Avoid    | Very High Risk
```

### 3. Chat Functions

#### sendChatMessage()
```javascript
Purpose: Send user question to Claude API with document context
Input: User message + extracted text + conversation history
Output: Updates chatMessages state
Context Management: Sends full conversation history to maintain context
API Call: POST to https://api.anthropic.com/v1/messages
Max Tokens: 1500
Error Handling: Shows error message in chat on failure
```

Chat Context Structure:
```javascript
[
  { role: "user", content: "Context: [extracted text]" },
  { role: "assistant", content: "Ready to answer" },
  ...conversationHistory,
  { role: "user", content: currentQuestion }
]
```

## UI Components

### HealthScoreRing
Circular progress indicator for health score

**Props:** 
- `score` (number): 0-100

**Rendering:**
- SVG-based circle with stroke-dashoffset animation
- Color coded: Red (<30), Orange (30-50), Yellow (50-70), Green (70+)
- Displays numeric score in center

**Implementation:**
```javascript
const circumference = 2 * Math.PI * 45;
const offset = circumference - (validScore / 100) * circumference;
```

## Event Handlers

### File Upload
```javascript
handleFileSelect(selectedFile)
├── Validates file format
├── Calls appropriate extraction function
├── Sets loading state
├── Calls analyzeDocument()
└── Handles errors with user feedback
```

### Drag and Drop
```javascript
handleDragOver(e) - Prevents default, sets dragOver
handleDragLeave() - Removes dragOver state
handleDrop(e) - Extracts file, calls handleFileSelect
```

## API Integration

### Claude API Configuration
```javascript
Endpoint: https://api.anthropic.com/v1/messages
Method: POST
Headers: { "Content-Type": "application/json" }
Authentication: Handled by backend (no API key in frontend)
```

### Request Format
```javascript
{
  model: "claude-sonnet-4-20250514",
  max_tokens: 1500-2500,
  messages: [
    { role: "user", content: "..." },
    { role: "assistant", content: "..." }
  ]
}
```

### Response Handling
```javascript
1. Check response.ok status
2. Parse JSON response
3. Extract content[0].text
4. Clean markdown code blocks
5. Parse JSON (with fallback regex)
6. Validate required fields
7. Update state or show error
```

## Styling System

### Color Palette
```css
Background: #0a0e1a (dark blue-black)
Cards: #1e293b to #0f172a (gradient)
Accent: #667eea to #764ba2 (purple gradient)
Success: #22c55e (green)
Warning: #eab308 (yellow)
Error: #ef4444 (red)
Text: #ffffff (white), #94a3b8 (gray)
```

### Animation Classes
```css
.animate-slide-in - slideIn animation (0.5s)
.animate-fade-in - fadeIn animation (0.3s)
.loading-pulse - pulse animation (1.5s infinite)
.card-hover - hover elevation effect
.gradient-button - gradient with hover transform
```

### Responsive Breakpoints
```css
md: 768px - Tablet
lg: 1024px - Desktop
Grid: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
```

## Error Handling Strategy

### Levels of Error Handling

**1. File Processing Errors**
- Caught in extraction functions
- User-friendly error messages
- Resets file state
- Allows retry

**2. API Errors**
- HTTP status check
- JSON parsing fallback
- Network timeout handling
- User notification via alert

**3. Data Validation Errors**
- Required field checks
- Type validation
- Fallback values ("N/A", "Not specified")
- Graceful degradation

**4. UI Error States**
- Disabled states during loading
- Error messages in chat
- Visual feedback for all actions

## Performance Optimizations

### Text Extraction
- Limits extracted text to 15,000 characters for API calls
- Processes files client-side (no server upload)
- Async/await for non-blocking operations

### State Updates
- Batched state updates where possible
- Separate loading states for different operations
- Conditional rendering to prevent unnecessary re-renders

### Animation Performance
- CSS transforms (hardware accelerated)
- Animation delays for staggered effects
- Smooth scrolling with scrollIntoView

## Security Considerations

### Data Privacy
- All processing client-side
- No file uploads to external servers
- Only analysis text sent to Claude API
- No data persistence

### API Security
- No API key exposed in frontend
- Backend handles authentication
- HTTPS for all API calls
- Input sanitization for chat

## Browser Compatibility

**Supported Browsers:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Required Features:**
- ES6+ JavaScript
- Async/await
- FileReader API
- Fetch API
- CSS Grid & Flexbox

## Debugging

### Console Logging
```javascript
// File processing
console.error('PDF extraction error:', error);
console.error('DOCX extraction error:', error);
console.error('Excel extraction error:', error);

// API calls
console.error('Error analyzing document:', error);
console.error('Error in chat:', error);
```

### Common Debug Points
1. Check browser console for errors
2. Verify file format support
3. Check network tab for API calls
4. Inspect extracted text length
5. Validate API response structure

## Extension Points

### Adding New File Formats
```javascript
1. Add extraction function (e.g., extractTextFromXML)
2. Update handleFileSelect with new condition
3. Add file extension to accept attribute
4. Update documentation
```

### Customizing Analysis
```javascript
1. Modify analyzeDocument prompt
2. Adjust max_tokens for longer responses
3. Change response validation rules
4. Update analysis state structure
```

### Adding New Metrics
```javascript
1. Update API prompt to request new metrics
2. Add new cards in metrics grid
3. Update styling for new layout
4. Modify getInvestmentRecommendation if needed
```

## Testing Recommendations

### Manual Testing Checklist
- ✅ Upload each supported file format
- ✅ Test drag-and-drop functionality
- ✅ Verify all metrics display correctly
- ✅ Test chat with various questions
- ✅ Adjust risk/growth sliders
- ✅ Test error cases (invalid files)
- ✅ Check responsive design
- ✅ Verify animations work smoothly

### Sample Test Cases
```
1. Upload sample-financial-statement.txt
   Expected: Full analysis with all metrics
   
2. Upload corrupted PDF
   Expected: Error message, graceful failure
   
3. Ask chat: "What is the revenue?"
   Expected: Specific answer from document
   
4. Set risk=10, growth=10, health=50
   Expected: "Speculative Buy" or similar
```

## Deployment

### Single File Deployment
The application is fully contained in one HTML file:
- No build process required
- No dependencies to install
- Can be hosted on any static server
- Works offline after initial load (except API calls)

### Hosting Options
- Static file server (Nginx, Apache)
- GitHub Pages
- Netlify/Vercel static hosting
- AWS S3 + CloudFront
- Simple HTTP server: `python -m http.server`

## Future Enhancements

### Potential Features
- Multiple document comparison
- Historical trend analysis
- Export analysis as PDF report
- Customizable metric thresholds
- Industry benchmark comparisons
- Multi-language support
- Dark/light theme toggle
- Save analysis results locally
- Batch processing multiple files

### Performance Improvements
- Web Workers for file processing
- Caching of analysis results
- Progressive loading for large files
- Compression of extracted text

## License & Credits

Built with open-source libraries:
- React (MIT License)
- PDF.js (Apache 2.0)
- Mammoth.js (BSD 2-Clause)
- SheetJS (Apache 2.0)
- Tailwind CSS (MIT License)

AI Analysis powered by:
- Anthropic Claude API

---

For issues or questions, refer to README.md or check browser console for detailed error messages.
