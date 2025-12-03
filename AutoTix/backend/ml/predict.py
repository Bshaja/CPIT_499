from backend.ml.model import tokenizer, model, department_to_id
import torch

def predict_department(text: str):
    encoded = tokenizer(
        text,
        padding=True,
        truncation=True,
        max_length=64,
        return_tensors="pt"
    )

    with torch.no_grad():
        logits = model(
            input_ids=encoded["input_ids"],
            attention_mask=encoded["attention_mask"]
        )

    pred_id = torch.argmax(logits, dim=1).item()

    # تحويل id → اسم القسم
    department = list(department_to_id.keys())[pred_id]

    return {
        "id": pred_id,
        "department": department
    }