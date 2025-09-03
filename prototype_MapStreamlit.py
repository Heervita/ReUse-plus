import streamlit as st
import requests
import folium
from streamlit_folium import st_folium

# ========== CONFIG ==========
CLIENT_ID = "96dHZVzsAus10cOECrGf6AjpAe9jU-Um5vUFhr0h0t5P3PET5LhZwwAu2xLenRKXT22OqDIAv4qtS_lIAnr2Bw=="
CLIENT_SECRET = "lrFxI-iSEg_K3SioGQ59-H1U8IY2mc7rjuBznYPVrOgbD8TSpNRG4RYOwWMt5CO3WIpiLP56HqfvvD7ntngtgGhqfIbW6OOK"
latitude, longitude = 30.4180, 77.9670  # UPES Dehradun
radius = 5000  # meters
# ============================

# Step 1: Get OAuth Token
token_url = "https://outpost.mapmyindia.com/api/security/oauth/token"
payload = {
    "grant_type": "client_credentials",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET
}
res = requests.post(token_url, data=payload)
st.write("OAuth Response:", res.json())
access_token = res.json().get("access_token", None)

if access_token:
    # Step 2: Call Nearby Search API
    url = f"https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy,medical,chemist&refLocation={latitude},{longitude}&radius={radius}"
    headers = {"Authorization": f"Bearer {access_token}"}
    res = requests.get(url, headers=headers)
    places = res.json().get("suggestedLocations", [])

    st.title("💊 Nearby Pharmacies around UPES Dehradun")
    st.write(f"Found {len(places)} pharmacies within {radius/1000} km")

    # Create map
    m = folium.Map(location=[latitude, longitude], zoom_start=14)
    folium.Marker([latitude, longitude], popup="UPES University", icon=folium.Icon(color="blue")).add_to(m)

    for place in places:
        lat = place.get("latitude") or place.get("placeLatitude")
        lng = place.get("longitude") or place.get("placeLongitude")

        if lat and lng:  # only add if coords exist
            folium.Marker(
                [lat, lng],
                popup=f"{place.get('placeName', 'Unknown')} - {place.get('placeAddress', 'No Address')}",
                tooltip=place.get("placeName", "Pharmacy"),
                icon=folium.Icon(color="red")
            ).add_to(m)


    st_folium(m, width=700, height=500)
    st.subheader("📋 Pharmacy List")
    for p in places:
        st.write(f"**{p['placeName']}** - {p['placeAddress']}")
else:
    st.error("❌ Failed to get access token. Check Client ID/Secret")
