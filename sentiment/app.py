import streamlit as st
import torch
from transformers import BertForSequenceClassification, BertTokenizer

# Load the model and tokenizer
@st.cache_resource  # Cache the model and tokenizer to avoid reloading on every request
def load_model_and_tokenizer():
    model = BertForSequenceClassification.from_pretrained("sentiment_model")
    tokenizer = BertTokenizer.from_pretrained("sentiment_model")
    return model, tokenizer

model, tokenizer = load_model_and_tokenizer()

# Move model to GPU if available, otherwise use CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()  # Set model to evaluation mode

# Define the prediction function
def predict_sentiment(text):
    # Tokenize the input text
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )
    # Move inputs to the correct device
    inputs = {key: val.to(device) for key, val in inputs.items()}

    # Make prediction
    with torch.no_grad():
        outputs = model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=1).item()

    # Map prediction to label
    label_mapping = {0: "negative",1:"nuetral", 2: "positive"}  # Adjust based on your label mapping
    return label_mapping.get(prediction, "unknown")

# Streamlit UI
st.title("Sentiment Analysis with BERT")
st.write("Enter a piece of text to predict its sentiment (positive or negative).")

# Text input
user_input = st.text_area("Input Text", "I love this product, it's amazing!")

# Predict button
if st.button("Predict"):
    if user_input.strip() == "":
        st.error("Please enter some text to analyze.")
    else:
        with st.spinner("Analyzing sentiment..."):
            prediction = predict_sentiment(user_input)
            st.success(f"Predicted Sentiment: **{prediction}**")

# Example texts
st.write("### Try Some Examples")
examples = [
    "I absolutely love this product, it's amazing!",
    "This is the worst experience I've ever had.",
    "The movie was okay, nothing special.",
    "I'm so happy with my purchase!",
    "I hate how slow this service is."
]

for example in examples:
    if st.button(f"Predict: '{example}'"):
        prediction = predict_sentiment(example)
        st.write(f"Text: {example}")
        st.write(f"Predicted Sentiment: **{prediction}**")

# Add some information about the app
st.write("---")
st.write("This app uses a fine-tuned BERT model to predict sentiment (positive or negative) from text input. The model was trained on a sentiment analysis dataset and deployed using Streamlit.")
