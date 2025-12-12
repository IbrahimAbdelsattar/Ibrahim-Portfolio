import gradio as gr
import pandas as pd
import numpy as np
import pickle

# Load the trained Lasso Regression model
model = pickle.load(open("Lasso Regression.pkl", "rb"))

def predict_final_grade(school, sex, age, address, famsize, Pstatus, Medu, Fedu, Mjob, Fjob, reason, guardian, traveltime, studytime, failures, schoolsup, famsup, paid, activities, nursery, higher, internet, romantic, famrel, freetime, goout, Dalc, Walc, health, absences, G1, G2):
    input_data = pd.DataFrame({
        'school': [school],
        'sex': [sex],
        'age': [age],
        'address': [address],
        'famsize': [famsize],
        'Pstatus': [Pstatus],
        'Medu': [Medu],
        'Fedu': [Fedu],
        'Mjob': [Mjob],
        'Fjob': [Fjob],
        'reason': [reason],
        'guardian': [guardian],
        'traveltime': [traveltime],
        'studytime': [studytime],
        'failures': [failures],
        'schoolsup': [schoolsup],
        'famsup': [famsup],
        'paid': [paid],
        'activities': [activities],
        'nursery': [nursery],
        'higher': [higher],
        'internet': [internet],
        'romantic': [romantic],
        'famrel': [famrel],
        'freetime': [freetime],
        'goout': [goout],
        'Dalc': [Dalc],
        'Walc': [Walc],
        'health': [health],
        'absences': [absences],
        'G1': [G1],
        'G2': [G2]
    })
    prediction = model.predict(input_data)[0]
    return round(prediction, 2)

# Define Gradio interface inputs (same as notebook)
inputs = [
    gr.Dropdown(["GP", "MS"], label="School"),
    gr.Dropdown(["F", "M"], label="Sex"),
    gr.Number(label="Age"),
    gr.Dropdown(["U", "R"], label="Address"),
    gr.Dropdown(["LE3", "GT3"], label="Family Size"),
    gr.Dropdown(["T", "A"], label="Parent Status"),
    gr.Number(label="Mother's Education (0-4)"),
    gr.Number(label="Father's Education (0-4)"),
    gr.Dropdown(["teacher", "health", "services", "at_home", "other"], label="Mother's Job"),
    gr.Dropdown(["teacher", "health", "services", "at_home", "other"], label="Father's Job"),
    gr.Dropdown(["home", "reputation", "course", "other"], label="Reason"),
    gr.Dropdown(["mother", "father", "other"], label="Guardian"),
    gr.Number(label="Travel Time (1-4)"),
    gr.Number(label="Study Time (1-4)"),
    gr.Number(label="Failures (0-3)"),
    gr.Dropdown(["yes", "no"], label="School Support"),
    gr.Dropdown(["yes", "no"], label="Family Support"),
    gr.Dropdown(["yes", "no"], label="Paid Classes"),
    gr.Dropdown(["yes", "no"], label="Activities"),
    gr.Dropdown(["yes", "no"], label="Nursery"),
    gr.Dropdown(["yes", "no"], label="Wants Higher Education"),
    gr.Dropdown(["yes", "no"], label="Internet"),
    gr.Dropdown(["yes", "no"], label="Romantic Relationship"),
    gr.Number(label="Family Relationship (1-5)"),
    gr.Number(label="Free Time (1-5)"),
    gr.Number(label="Go Out (1-5)"),
    gr.Number(label="Workday Alcohol (1-5)"),
    gr.Number(label="Weekend Alcohol (1-5)"),
    gr.Number(label="Health (1-5)"),
    gr.Number(label="Absences"),
    gr.Number(label="G1 (First Period Grade)"),
    gr.Number(label="G2 (Second Period Grade)")
]

output = gr.Number(label="Predicted Final Grade (G3)")

demo = gr.Interface(
    fn=predict_final_grade,
    inputs=inputs,
    outputs=output,
    title="📊 Student Final Grade Predictor",
    description="Predict the final grade (G3) for a student based on their information."
)

def main():
    demo.launch()

if __name__ == "__main__":
    main() 