#!/bin/bash
echo "=== Verifying mock data removal ==="
grep -n "\$[1-9]" myneon/monitoring/production/PRODUCTIONDASHBOARD.HTML.html && echo "❌ Still has dollar values!" || echo "✅ All dollar values set to \$0"
grep -n "[1-9][0-9]*%" myneon/monitoring/production/PRODUCTIONDASHBOARD.HTML.html && echo "❌ Still has percentage values!" || echo "✅ All percentages set to 0%"
echo "=== Sample of fixed dashboard ==="
grep -A2 -B2 "Profit / Hour\|Engine Status\|Total Profit" myneon/monitoring/production/PRODUCTIONDASHBOARD.HTML.html | head -20
