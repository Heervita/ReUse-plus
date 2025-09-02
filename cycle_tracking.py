from datetime import datetime, timedelta
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import warnings
warnings.filterwarnings("ignore")

# Setup Embedding Model + Vector DB
model = SentenceTransformer("all-MiniLM-L6-v2")  # lightweight embedding model

# FAISS index (vector database)
dimension = 384  # embedding dimension for MiniLM
index = faiss.IndexFlatL2(dimension)
stored_notes = []  # keeps metadata (notes)

# Period Prediction Functions
def predict_cycle(last_period_str, cycle_length=28, period_length=5):
    last_period_date = datetime.strptime(last_period_str, "%Y-%m-%d")
    next_start = last_period_date + timedelta(days=cycle_length)
    next_end = next_start + timedelta(days=period_length)
    fertile_start = next_start - timedelta(days=14)
    fertile_end = fertile_start + timedelta(days=4)

    return {
        "next_period_start": next_start.date(),
        "next_period_end": next_end.date(),
        "fertile_window": (fertile_start.date(), fertile_end.date())
    }

# Store Notes in Vector DB
def store_notes(user_note):
    if not user_note.strip():
        return
    embedding = model.encode([user_note])
    index.add(np.array(embedding, dtype="float32"))
    stored_notes.append(user_note)

# Main Program
if __name__ == "__main__":
    print("ReUse+ Period Tracker\n")

    # Step 1: Get user input
    cycle_length = int(input("Enter average cycle length: ") or 28)
    period_length = int(input("Enter average period length: ") or 5)
    last_period = input("Enter last period start date (YYYY-MM-DD): ")

    # Step 2: Prediction
    predictions = predict_cycle(last_period, cycle_length, period_length)
    print("\nPeriod Predictions:")
    print(f"Next Period Start: {predictions['next_period_start']}")
    print(f"Expected to End: {predictions['next_period_end']}")
    print(f"Fertile Window: {predictions['fertile_window'][0]} to {predictions['fertile_window'][1]}")

    # Step 3: Add health notes
    while True:
        note = input("\nAdd a health note/symptom (or press Enter to skip): ")
        if note.strip() == "":
            break
        store_notes(note)
        print("\nNote stored with AI embedding.")
