import urllib.request
import re
import json

url = "https://drive.google.com/drive/folders/1aAKq94qIRq4-nvpQWwL0aLC5CiBFtCq2"
try:
    with urllib.request.urlopen(url) as response:
        html = response.read().decode('utf-8')

    # Look for file IDs in the JSON data embedded in the page
    matches = re.findall(r'\["([a-zA-Z0-9_-]{25,})","([^"]+)"', html)

    files = []
    for file_id, name in matches:
        if ".mp4" in name.lower():
            files.append({
                "name": name,
                "link": f"https://drive.google.com/file/d/{file_id}/view"
            })

    # Remove duplicates
    seen = set()
    unique_files = []
    for f in files:
        if f["link"] not in seen:
            unique_files.append(f)
            seen.add(f["link"])

    print(json.dumps(unique_files, indent=2, ensure_ascii=False))
except Exception as e:
    print(f"Error: {e}")
