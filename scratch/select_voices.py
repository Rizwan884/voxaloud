import json
from collections import defaultdict

with open('voices_updated.json', 'r', encoding='utf-8') as f:
    voices = json.load(f)

# Group voices by country and gender
grouped = defaultdict(lambda: {"Male": [], "Female": []})
for v in voices:
    country = v["country"]
    gender = v["gender"]
    if gender in ["Male", "Female"]:
        grouped[country][gender].append(v)

# Sort countries by total available voices so we prioritize major countries
sorted_countries = sorted(
    grouped.keys(), 
    key=lambda c: len(grouped[c]["Male"]) + len(grouped[c]["Female"]), 
    reverse=True
)

selected_voices = []
pairs_needed = 50
pairs_selected = 0

for country in sorted_countries:
    if pairs_selected >= pairs_needed:
        break
        
    m_list = grouped[country]["Male"]
    f_list = grouped[country]["Female"]
    
    # Calculate how many pairs we can take from this country (max 3 pairs, i.e. 6 voices)
    max_possible_pairs = min(len(m_list), len(f_list), 3)
    
    if max_possible_pairs > 0:
        # Determine how many pairs we actually take (don't exceed what's needed)
        take_pairs = min(max_possible_pairs, pairs_needed - pairs_selected)
        
        # Take the first 'take_pairs' of males and females
        selected_voices.extend(m_list[:take_pairs])
        selected_voices.extend(f_list[:take_pairs])
        pairs_selected += take_pairs
        print(f"Selected {take_pairs * 2} voices (half M, half F) from {country}")

print(f"Total selected voices: {len(selected_voices)}")
assert len(selected_voices) == 100, "Should select exactly 100 voices"

# Write the 100 selected voices back to voices_updated.json
with open('voices_updated.json', 'w', encoding='utf-8') as f:
    json.dump(selected_voices, f, ensure_ascii=False, indent=2)

print("Successfully wrote 100 filtered voices to voices_updated.json")
