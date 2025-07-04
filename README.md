#  Diabetes Prediction System

A machine learning-based web application that predicts the likelihood of diabetes in a patient based on diagnostic inputs. Built using Flask, Scikit-learn, and deployed on Render.

---

##  Features

- Predicts diabetes based on health metrics using ML models
- Uses Random Forest Classifier
- Clean and minimalistic Flask web interface
- Deployable via Render or locally

---

##  Machine Learning Pipeline

- **Dataset**: diabetes_prediction_dataset(1).csv (already provided as a file)
- **Preprocessing**: StandardScaler
- **Model**: Logistic Regression (scikit-learn)
- **Serialized with**: `joblib`

---

##  Technologies Used

- **Frontend**: HTML, CSS
- **Backend**: Python, Flask
- **ML Libraries**: scikit-learn, pandas, joblib
- **Hosting**: Render

---

##  Deployment (on Render)

>  Make sure your `.pkl` files are trained using Python 3.13 to match Render’s default environment.

###  Files required:
- `app.py`
- `model.pkl`
- `scaler.pkl`
- `templates/` and `static/` folders
- `requirements.txt`
- `runtime.txt` (`python-3.13.0`)



