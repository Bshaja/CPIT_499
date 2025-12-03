from fastapi import APIRouter
from backend.ml.predict import predict_department   # نستخدم الدالة اللي سويناها

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/predict")
def predict_ticket(data: dict):
    """
    data = {
        "text": "the ticket text"
    }
    """

    if "text" not in data:
        return {"error": "Missing 'text' field"}

    result = predict_department(data["text"])
    return result