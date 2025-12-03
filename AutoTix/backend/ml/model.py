import torch
import json
from transformers import BertTokenizerFast, BertConfig, BertModel
import os

MODEL_PATH = "backend/ml/bert_ticket_model_builtin_tokenizer.pt"
LABEL_PATH = "backend/ml/department_to_id.json"

# -----------------------------
# 1) Load tokenizer
# -----------------------------
tokenizer = BertTokenizerFast.from_pretrained("bert-base-uncased")

# -----------------------------
# 2) Load label mapping
# -----------------------------
with open(LABEL_PATH, "r", encoding="utf-8") as f:
    department_to_id = json.load(f)

# Reverse map → id to name
id_to_department = {v: k for k, v in department_to_id.items()}

# -----------------------------
# 3) Create same BERT model class
# -----------------------------
class TicketBertClassifier(torch.nn.Module):
    def __init__(self, config, num_labels):
        super().__init__()
        self.bert = BertModel(config)
        self.dropout = torch.nn.Dropout(0.3)
        self.classifier = torch.nn.Linear(config.hidden_size, num_labels)

    def forward(self, input_ids, attention_mask=None):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs.pooler_output
        pooled_output = self.dropout(pooled_output)
        logits = self.classifier(pooled_output)
        return logits

# -----------------------------
# 4) Load model
# -----------------------------
config = BertConfig(
    vocab_size=tokenizer.vocab_size,
    hidden_size=256,
    num_hidden_layers=4,
    num_attention_heads=4,
    intermediate_size=1024,
    max_position_embeddings=128
)

model = TicketBertClassifier(config, len(department_to_id))
model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
model.eval()

# -----------------------------
# 5) Prediction function
# -----------------------------
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
    pred_label = list(department_to_id.keys())[list(department_to_id.values()).index(pred_id)]

    return {
        "id": pred_id,
        "department": pred_label
    }