import json

mapping = {
    "Afghanistan": "🇦🇫", "Albania": "🇦🇱", "Algeria": "🇩🇿", "Argentina": "🇦🇷", "Australia": "🇦🇺",
    "Austria": "🇦🇹", "Azerbaijan": "🇦🇿", "Bahrain": "🇧🇭", "Bangladesh": "🇧🇩", "Belgium": "🇧🇪",
    "Bolivia": "🇧🇴", "Bosnia and Herzegovina": "🇧🇦", "Brazil": "🇧🇷", "Bulgaria": "🇧🇬", "Cambodia": "🇰🇭",
    "Canada": "🇨🇦", "Chile": "🇨🇱", "China": "🇨🇳", "Colombia": "🇨🇴", "Costa Rica": "🇨🇷",
    "Croatia": "🇭🇷", "Cuba": "🇨🇺", "Czech Republic": "🇨🇿", "Denmark": "🇩🇰", "Dominican Republic": "🇩🇴",
    "Ecuador": "🇪🇨", "Egypt": "🇪🇬", "El Salvador": "🇸🇻", "Equatorial Guinea": "🇬🇶", "Estonia": "🇪🇪",
    "Ethiopia": "🇪🇹", "Finland": "🇫🇮", "France": "🇫🇷", "Georgia": "🇬🇪", "Germany": "🇩🇪",
    "Greece": "🇬🇷", "Guatemala": "🇬🇹", "Honduras": "🇭🇳", "Hong Kong": "🇭🇰", "Hungary": "🇭🇺",
    "Iceland": "🇮🇸", "India": "🇮🇳", "Indonesia": "🇮🇩", "Iran": "🇮🇷", "Iraq": "🇮🇶",
    "Ireland": "🇮🇪", "Israel": "🇮🇱", "Italy": "🇮🇹", "Japan": "🇯🇵", "Jordan": "🇯🇴",
    "Kazakhstan": "🇰🇿", "Kenya": "🇰🇪", "Kuwait": "🇰🇼", "Laos": "🇱🇦", "Latvia": "🇱🇻",
    "Lebanon": "🇱🇧", "Libya": "🇱🇾", "Lithuania": "🇱🇹", "Malaysia": "🇲🇾", "Malta": "🇲🇹",
    "Mexico": "🇲🇽", "Mongolia": "🇲🇳", "Morocco": "🇲🇦", "Myanmar": "🇲🇲", "Nepal": "🇳🇵",
    "Netherlands": "🇳🇱", "New Zealand": "🇳🇿", "Nicaragua": "🇳🇮", "Nigeria": "🇳🇬", "North Macedonia": "🇲🇰",
    "Norway": "🇳🇴", "Oman": "🇴🇲", "Pakistan": "🇵🇰", "Panama": "🇵🇦", "Paraguay": "🇵🇾",
    "Peru": "🇵🇪", "Philippines": "🇵🇭", "Poland": "🇵🇱", "Portugal": "🇵🇹", "Puerto Rico": "🇵🇷",
    "Qatar": "🇶🇦", "Romania": "🇷🇴", "Russia": "🇷🇺", "Saudi Arabia": "🇸🇦", "Serbia": "🇷🇸",
    "Singapore": "🇸🇬", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮", "Somalia": "🇸🇴", "South Africa": "🇿🇦",
    "South Korea": "🇰🇷", "Spain": "🇪🇸", "Sri Lanka": "🇱🇰", "Sweden": "🇸🇪", "Switzerland": "🇨🇭",
    "Syria": "🇸🇾", "Taiwan": "🇹🇼", "Tanzania": "🇹🇿", "Thailand": "🇹🇭", "Tunisia": "🇹🇳",
    "Turkey": "🇹🇷", "Ukraine": "🇺🇦", "United Arab Emirates": "🇦🇪", "United Kingdom": "🇬🇧", "United States": "🇺🇸",
    "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿", "Venezuela": "🇻🇪", "Vietnam": "🇻🇳", "Yemen": "🇾🇪"
}

with open('voices_raw.json', 'r') as f:
    data = json.load(f)

for item in data:
    country = item.get('country', '')
    item['flag'] = mapping.get(country, "🌐")

with open('voices_updated.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
