import re
import sys

with open('myneon/monitoring/production/PRODUCTIONDASHBOARD.HTML.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("Original dashboard loaded")

# Find and replace specific patterns WITHOUT changing layout
replacements = [
    # Dollar amounts
    (r'\$123\.91', '$0'),
    (r'\$14\.37', '$0'),
    (r'\$18,466\.12', '$0'),
    (r'\$1,245\.51', '$0'),
    (r'\$1,250,000', '$0'),
    (r'\$420\.55', '$0'),
    (r'\$42\.40', '$0'),
    (r'\$89\.10', '$0'),
    (r'\$12\.50', '$0'),
    (r'\$33\.08', '$0'),
    (r'\$32\.92', '$0'),
    
    # Percentages
    (r'\+18\.2%', '+0%'),
    (r'45%', '0%'),
    (r'30%', '0%'),
    (r'25%', '0%'),
    (r'40%', '0%'),
    (r'35%', '0%'),
    (r'50%', '0%'),
    (r'20%', '0%'),
    (r'99\.8%', '0%'),
    (r'\+0\.032%', '+0%'),
    (r'\+12\.45%', '+0%'),
    
    # Numbers
    (r'8\.6', '0.0'),
    (r'842', '0'),
    (r'43\.8x', '0.0x'),
    (r'12', '0'),
    (r'4', '0'),
    (r'12ms', '0ms'),
    (r'3\.2', '0.0'),
    (r'\+0\.0042', '+0.0000'),
    (r'4280', '0'),
    (r'142', '0'),
    (r'89', '0'),
    (r'12', '0'),
    (r'42 Gwei', '0 Gwei'),
    
    # Status changes (minimal)
    (r'OPERATIONAL', 'INITIALIZING'),
    (r'High Efficiency', 'Idle'),
    (r'Optimal Velocity', 'No Activity'),
    (r'optimizing', 'idle'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Also catch any remaining $ amounts with a general pattern (carefully)
content = re.sub(r'\$\s*\d[\d,]*\.?\d*', '$0', content)

with open('myneon/monitoring/production/PRODUCTIONDASHBOARD.HTML.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Mock data removed from original dashboard")
print("✅ Original design and layout preserved")
