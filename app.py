from flask import Flask, render_template, request, redirect, url_for, session
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
app.secret_key = 'ntcc-final-project-2025'

# Load model and full preprocessor
model = joblib.load('model.pkl')
preprocessor = joblib.load('preprocessor.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get form inputs
    gender = request.form['gender']
    age = float(request.form['age'])
    hypertension = int(request.form['hypertension'])
    heart_disease = int(request.form['heart_disease'])
    smoking_history = request.form['smoking_history']
    bmi = float(request.form['bmi'])
    hba1c = float(request.form['HbA1c_level'])
    glucose = float(request.form['blood_glucose_level'])

    # Convert to DataFrame
    raw_input = pd.DataFrame([{
        'gender': gender,
        'age': age,
        'hypertension': hypertension,
        'heart_disease': heart_disease,
        'smoking_history': smoking_history,
        'bmi': bmi,
        'HbA1c_level': hba1c,
        'blood_glucose_level': glucose
    }])

    # Preprocess + predict
    processed = preprocessor.transform(raw_input)
    prediction = model.predict(processed)[0]

    result = "Diabetic" if prediction == 1 else "Not Diabetic"

    # Store result in session
    session['prediction'] = result

    # Redirect to result page
    return redirect(url_for('result_page'))

@app.route('/result')
def result_page():
    result = session.get('prediction', None)
    return render_template('result.html', prediction_text=result)


if __name__ == '__main__':
    app.run(debug=True)
