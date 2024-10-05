from transformers import AutoTokenizer, AutoModelForCausalLM
import os
import sys
import json

# Load the Hugging Face API key from environment variables
huggingface_api_key = os.getenv("HF_TOKEN")

model_name = "SweatyCrayfish/llama-3-8b-quantized"
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=huggingface_api_key)
model = AutoModelForCausalLM.from_pretrained(model_name, use_auth_token=huggingface_api_key)

def summarize(text):
    input_ids = tokenizer.encode(text, return_tensors="pt")
    output_ids = model.generate(input_ids, max_length=200, temperature=0.5)
    summary = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return summary

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    text = input_data['text']
    summary = summarize(text)
    print(json.dumps({"summary": summary}))
