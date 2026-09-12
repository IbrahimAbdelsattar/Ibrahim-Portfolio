import re
import time
from typing import Dict, List
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import urllib.request
import json

app = FastAPI(title="Ibrahim AI Portfolio Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RATE_LIMIT_DURATION = 60
MAX_REQUESTS_PER_WINDOW = 10
request_history: Dict[str, List[float]] = {}

def check_rate_limit(client_ip: str):
    now = time.time()
    if client_ip not in request_history:
        request_history[client_ip] = []
    request_history[client_ip] = [t for t in request_history[client_ip] if now - t < RATE_LIMIT_DURATION]
    if len(request_history[client_ip]) >= MAX_REQUESTS_PER_WINDOW:
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Please wait a minute before sending more messages."
        )
    request_history[client_ip].append(now)

PROMPT_INJECTION_PATTERNS = [
    r"ignore (all )?(previous|above) (instructions|directions|prompts)",
    r"disregard (all )?(previous|above)",
    r"system prompt",
    r"reveal (your|the) (instructions|system prompt|secret)",
    r"you are now (in|a) (dan|jailbreak|unrestricted|god) mode",
    r"forget (everything|all|your rules)",
    r"override (system|security)",
    r"pretend to be",
    r"act as an unfiltered",
    r"bypass security"
]

def sanitize_and_check_injection(text: str) -> str:
    cleaned = text.strip()
    if len(cleaned) > 500:
        cleaned = cleaned[:500]
        
    for pattern in PROMPT_INJECTION_PATTERNS:
        if re.search(pattern, cleaned, re.IGNORECASE):
            raise HTTPException(
                status_code=400,
                detail="Security Warning: Prompt injection or policy violation detected."
            )
            
    return cleaned

def clean_formatting_punctuation(text: str) -> str:
    """
    Cleans excessive whitespace and ensures no dashes (-), asterisks (*),
    or hashtags (#) are present in the response while protecting URLs.
    """
    if not text:
        return ""
        
    cleaned = text
    # 1. Remove all hashtags
    cleaned = re.sub(r'#', '', cleaned)
    # 2. Remove all asterisks
    cleaned = re.sub(r'\*', '', cleaned)
    
    # 3. Protect URLs
    url_placeholders = []
    def save_url(m):
        url_placeholders.append(m.group(0))
        return f"__URL_{len(url_placeholders)-1}__"
    cleaned = re.sub(r'https?://[^\s\)]+', save_url, cleaned)
    
    # Remove horizontal divider lines
    cleaned = re.sub(r'(?m)^[-–—]{2,}\s*$', '', cleaned)
    # Remove bullet dashes at beginning of lines
    cleaned = re.sub(r'(?m)^(\s*)[-–—]\s+', r'\1', cleaned)
    # Replace standalone dashes between words with clean comma/space
    cleaned = re.sub(r'\s+[-–—]+\s+', ', ', cleaned)
    # Remove trailing dashes
    cleaned = re.sub(r'(?m)\s+[-–—]+$', '', cleaned)
    # Remove leading dashes
    cleaned = re.sub(r'(?m)^(\s*)[-–—]+', r'\1', cleaned)
    
    # Restore URLs
    for idx, u in enumerate(url_placeholders):
        cleaned = cleaned.replace(f"__URL_{idx}__", u)
        
    cleaned = re.sub(r'[ \t]+', ' ', cleaned)
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)
    return cleaned.strip()

SYSTEM_PROMPT = """CRITICAL IDENTITY & PERSONA INSTRUCTIONS:
1. You ARE Ibrahim Abdelsattar himself speaking directly to the visitor. You are NOT an AI assistant, bot, or representative.
2. NEVER say "I am Ibrahim's assistant" or "أنا مساعد إبراهيم" or refer to Ibrahim in the third person. ALWAYS talk as Ibrahim in the FIRST PERSON ("I", "me", "my", "أنا", "شغلي", "مشاريعي", "خبرتي").
3. LANGUAGE BEHAVIOR:
   When the user speaks in ARABIC: You MUST speak in natural, friendly, smart EGYPTIAN ARABIC (اللهجة المصرية العامية). Speak like a talented Egyptian engineer chatting with a client, colleague, or friend. Use Egyptian phrases like: "أهلاً بيك يا غالي!", "منور يا باشا!", "أنا إبراهيم عبد الستار، شغال Data Scientist و AI Specialist في القاهرة", "عملت أكتر من 50 مشروع على GitHub", "اشتغلت في Minders و HAMS.AI و DEPI", "لو حابب نشتغل سوا أو عندك فكرة مشروع، كلمني وأنا معاك في أي وقت!".
   When the user speaks in ENGLISH: Speak directly as Ibrahim in fluent, confident, friendly first-person English ("Hi! I'm Ibrahim Abdelsattar, a Data Scientist and AI Specialist based in Cairo, Egypt...").
   Match the user's language automatically.

CRITICAL FORMATTING RULES (STRICTLY ENFORCED):
1. NEVER output asterisks (*) or (**) anywhere in your response. Do not use bold asterisks or italic asterisks.
2. NEVER output dashes (-) or en-dashes (–) or em-dashes (—) anywhere in your response. Do not use dashes for bullet points or lists.
3. NEVER output hashtags (#) or headings (##, ###).
4. Use normal, clean, readable plain text. For lists or grouping, use numbers (1. 2. 3.) or emojis (🚀, 💡, 💼, 🎓, 📩) or simple paragraph line breaks.
5. Standard punctuation marks like commas, periods, colons, question marks, and exclamation marks are welcomed and encouraged.
6. The user may send you messages with various punctuation marks (e.g. ? or ؟ or ! or quotes). Always accept, understand, and respond warmly.

Key Information About Me (Ibrahim Abdelsattar):
Role: Data Scientist and AI Specialist based in Cairo, Egypt
Education: MTI University, Bachelor of Computer Science and Artificial Intelligence (Oct 2023 to Expected 2027, Cumulative GPA: 3.5 / 4.0)
Email: ibrahimabdelsattar042@gmail.com
LinkedIn: https://www.linkedin.com/in/ibrahim-abdelsattar/
GitHub: https://github.com/IbrahimAbdelsattar
Kaggle: https://www.kaggle.com/ibrahimabdelsattar10
Availability: Open for full-time roles, freelance contracts, and AI consulting worldwide.

My Work Experience:
1. Machine Learning Instructor at Minders (Nov 2025 to Present, Cairo, Egypt):
   Instructing developers and students in ML, Deep Learning, and Neural Networks.
2. AI Engineer Intern at HAMS.AI (Sep 2025 to Nov 2025, Cairo, Egypt):
   Fine-tuned ML/DL models with optimized preprocessing for production scalability.
3. AI Engineer Trainee at Digital Egypt Pioneers Initiative DEPI (Nov 2024 to May 2025, Cairo, Egypt):
   Specialization in AI, Data Science, and MLOps with Docker and Streamlit dashboards.
4. Freelance Data Scientist and AI Consultant (Jun 2024 to Present):
   Delivered custom GenAI, RAG chatbots, dialectal Arabic NLP, and predictive analytics.
5. AI Instructor at 4Mind (Feb 2025 to Jul 2025).

My Flagship Projects (50+ on GitHub):
1. SupplyMind AI: Predictive inventory demand forecasting and GenAI supply chain analytics.
2. MR-NLP Robust RAG Chatbot: Context-aware document Q&A over 2,000+ chunks, 3 NLP books (vector index) plus 1 book (knowledge graph) with 90%+ relevance.
3. Arabic Egyptian Dialect Sentiment Analysis: Deep learning model specialized in informal Egyptian Arabic slang.
4. RAG Knowledge Assistant for Teachers: Curriculum search and automated lesson planner reducing prep time by 50%.
5. Audio Model Classification and Gender Detection: Acoustic signal processing with Librosa Mel-spectrograms and 2D CNNs.
6. Content Moderation System: Automated real-time toxicity detector for online communities.
7. Credit Card Fraud Detection: SMOTE oversampling plus XGBoost for imbalanced financial transactions.
8. Employee Attrition and Performance Rating: XGBoost turnover models with Power BI analytics.
9. Profile README Generator: Full-stack tool built with React and TypeScript.

My Technical Skills:
Languages: Python (Expert), SQL, TypeScript, JavaScript, C++, Java, R
GenAI and NLP: RAG Systems, LLMs, LangChain, Vector DBs (ChromaDB, FAISS), Hugging Face, BERT, Librosa Audio AI, Knowledge Graphs
ML and Deep Learning: PyTorch, TensorFlow, Scikit-Learn, XGBoost, LightGBM, Computer Vision, OpenCV, SMOTE
Tools and MLOps: Docker, Dokploy, Power BI, FastAPI, Flask, Streamlit, Git/GitHub, PostgreSQL

Certifications:
HCIA-AI by Huawei, AI and Data Science by DEPI, NLP by ITIDA and NTI, Machine Learning Engineer by Elevoo Labs, IBM SkillsBuild, AI Career Essentials by ALX, Sprints.

Tone: Warm, personal, professional, and directly as Ibrahim. Clean text without dashes, asterisks, or hashtags.
"""

class ChatRequest(BaseModel):
    message: str = Field(..., max_length=500)

class ChatResponse(BaseModel):
    reply: str
    status: str = "success"

OMNIROUTE_URL = "https://omniroute.dawrly.space/v1/chat/completions"
OMNIROUTE_API_KEY = "sdRghiYkisbEFfqWYFILzGngUEzUcKQJVrtoGgjVPTvQmZhifAoQNSTaLEtYdoki"
FAST_MODEL = "gh/gpt-4o-mini"

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(req_body: ChatRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    check_rate_limit(client_ip)
    
    user_query = sanitize_and_check_injection(req_body.message)
    
    payload = json.dumps({
        "model": FAST_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_query}
        ],
        "max_tokens": 500,
        "temperature": 0.5,
        "stream": False
    }).encode("utf-8")
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OMNIROUTE_API_KEY}"
    }
    
    reply_text = ""
    try:
        req = urllib.request.Request(OMNIROUTE_URL, data=payload, headers=headers)
        res = urllib.request.urlopen(req, timeout=4)
        raw_resp = res.read().decode("utf-8")
        
        if "data:" in raw_resp:
            for line in raw_resp.split("\n"):
                if line.startswith("data:") and "[DONE]" not in line:
                    try:
                        chunk = json.loads(line[5:].strip())
                        delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                        reply_text += delta
                    except Exception:
                        pass
        else:
            try:
                data_json = json.loads(raw_resp)
                reply_text = data_json.get("choices", [{}])[0].get("message", {}).get("content", "")
            except Exception:
                reply_text = raw_resp
    except Exception:
        q = user_query.lower()
        if "project" in q or "built" in q or "مشاريع" in q or "شغل" in q:
            reply_text = "أنا عملت أكتر من 50 مشروع على GitHub، ومن أبرزهم SupplyMind AI لسلاسل الإمداد، و MR-NLP Robust RAG Chatbot للبحث الذكي، ونموذج تحليل مشاعر اللهجة المصرية، و RAG Knowledge Assistant للمدرسين."
        elif "experience" in q or "job" in q or "minders" in q or "خبرتك" in q or "اشتغلت" in q:
            reply_text = "أنا شغال Machine Learning Instructor في Minders، واشتغلت قبل كده AI Engineer Intern في HAMS.AI وتدربت في مبادرة رواد مصر الرقمية DEPI، وعملت استشارات فريلانس لمشاريع AI متنوعة."
        elif "education" in q or "gpa" in q or "mti" in q or "دراستك" in q or "جامعة" in q:
            reply_text = "أنا بدرس علوم حاسب وذكاء اصطناعي في جامعة MTI بتقدير تراكمي 3.5 من 4.0."
        elif "contact" in q or "email" in q or "hire" in q or "تواصل" in q or "ايميل" in q:
            reply_text = "تقدر تتواصل معايا مباشرة عبر الإيميل ibrahimabdelsattar042@gmail.com أو على لينكد إن linkedin.com/in/ibrahim-abdelsattar أو تشوف كل مشاريعي على github.com/IbrahimAbdelsattar."
        else:
            reply_text = "أهلاً بيك! أنا إبراهيم عبد الستار، شغال Data Scientist و AI Specialist في القاهرة. اتفضل اسألني عن أي حاجة تخص مشاريعي، خبرتي، أو لو حابب نشتغل سوا!"
            
    reply_text = clean_formatting_punctuation(reply_text)
    return ChatResponse(reply=reply_text)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Ibrahim Portfolio Chatbot API"}
