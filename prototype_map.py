import requests
CLIENT_ID = "96dHZVzsAus10cOECrGf6AjpAe9jU-Um5vUFhr0h0t5P3PET5LhZwwAu2xLenRKXT22OqDIAv4qtS_lIAnr2Bw=="
CLIENT_SECRET = "lrFxI-iSEg_K3SioGQ59-H1U8IY2mc7rjuBznYPVrOgbD8TSpNRG4RYOwWMt5CO3WIpiLP56HqfvvD7ntngtgGhqfIbW6OOK"

token_url = "https://outpost.mapmyindia.com/api/security/oauth/token"
payload = {
    "grant_type": "client_credentials",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET
}

res = requests.post(token_url, data=payload)
token = res.json()["access_token"]

print("Access Token:", token)


latitude, longitude = 30.4180, 77.9670
url = f"https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy&refLocation={latitude},{longitude}&radius=2000"

headers = {
    "Authorization": f"Bearer {token}"
}

res = requests.get(url, headers=headers)
places = res.json()

# Print pharmacies
for place in places.get("suggestedLocations", []):
    print(place["placeName"], "-", place["placeAddress"])
