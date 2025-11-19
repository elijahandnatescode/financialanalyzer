#!/bin/bash

echo "══════════════════════════════════════════════════════════════════════════════"
echo "                                                                          "
echo "              Quick Fix: Vercel Upload Issues                             "
echo "                                                                          "
echo "══════════════════════════════════════════════════════════════════════════════"
echo ""

echo "🔧 This script will push the fixed files to resolve upload errors"
echo ""

# Check if in git repo
if [ ! -d .git ]; then
    echo "❌ Error: Not in a git repository"
    echo "💡 Run this from your financialanalyzer folder"
    exit 1
fi

echo "📋 Files that will be updated:"
echo "   - index.html (fixed version)"
echo "   - financial-analyzer.html (fixed version)"
echo "   - vercel.json (configuration)"
echo "   - VERCEL-TROUBLESHOOTING.md (new guide)"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

echo ""
echo "➕ Adding files..."
git add index.html financial-analyzer.html vercel.json VERCEL-TROUBLESHOOTING.md

echo "💾 Committing..."
git commit -m "Fix: Enhanced error handling and library checks for Vercel upload issues"

echo "🚀 Pushing to GitHub..."
git push

echo ""
echo "══════════════════════════════════════════════════════════════════════════════"
echo "                                                                          "
echo "                         ✅ PUSHED! ✅                                    "
echo "                                                                          "
echo "══════════════════════════════════════════════════════════════════════════════"
echo ""
echo "⏳ Vercel is now redeploying (1-2 minutes)..."
echo ""
echo "🔄 What changed:"
echo "   ✓ Better CDN loading checks"
echo "   ✓ Detailed error messages"
echo "   ✓ Console logging for debugging"
echo "   ✓ Library loading verification"
echo ""
echo "🧪 To test:"
echo "   1. Wait 2 minutes for deployment"
echo "   2. Open your Vercel URL"
echo "   3. Press F12 to open console"
echo "   4. Try uploading a file"
echo "   5. Check console for detailed logs"
echo ""
echo "📖 For troubleshooting, see: VERCEL-TROUBLESHOOTING.md"
echo ""
