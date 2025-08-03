# Diabetes Prediction System

An intelligent, user-friendly web application that predicts the likelihood of diabetes in a user based on health-related inputs. Built with a question-by-question form flow, the app combines a clean frontend (hosted on Vercel) with a Flask-based machine learning backend (hosted on Render).

---

## Features

- Predicts diabetes risk using diagnostic inputs like age, gender, BMI, glucose, HbA1c, etc.
- Auto-calculates BMI and estimates HbA1c from blood glucose if user doesn't know them
- Uses Random Forest Classifier for robust prediction
- Question-by-question UX similar to medical assessments
- Clean and responsive interface with visual cues
- Frontend-backend separation (Vercel + Render)

---

## Machine Learning Pipeline

- **Dataset**: `diabetes_prediction_dataset(1).csv`
- **Preprocessing**: Missing value handling, encoding, `StandardScaler`
- **Models Tried**: Logistic Regression, Decision Tree, Random Forest
- **Final Model**: `RandomForestClassifier` (chosen based on accuracy/performance)
- **Serialization**: `joblib` for model + scaler

---

## Technologies Used

| Layer       | Stack                                 |
|-------------|----------------------------------------|
| Frontend    | HTML, CSS, JavaScript                 |
| Backend     | Python, Flask                         |
| ML          | scikit-learn, pandas, joblib          |
| Hosting     | Frontend on [Vercel](https://vercel.com) <br> Backend on [Render](https://render.com) |
| Others      | Gunicorn, Flask-CORS                  |

---

## Deployment Instructions

### Backend (Flask API) on Render

> Push the backend code (including ML model files) to a GitHub repo.

#### Required Files:
- `app.py`
- `model.pkl`, `scaler.pkl`
- `requirements.txt`
- `Procfile` – contains: `web: gunicorn app:app`
- `runtime.txt` – specify version like `python-3.10.12`
- `static/` and `templates/` folders

#### Steps:
1. Create a new Web Service on [Render](https://render.com/)
2. Link your GitHub repo
3. Set:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
4. Enable CORS in `app.py` using:
   ```python
   from flask_cors import CORS
   CORS(app)
