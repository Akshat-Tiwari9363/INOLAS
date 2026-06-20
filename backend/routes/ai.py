import os
from pathlib import Path

import httpx
from fastapi import APIRouter, HTTPException, status
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

router = APIRouter()

def _get_ai_api_key() -> str | None:
    candidates = [
        os.getenv("OPENAI_API_KEY"),
        os.getenv("AI_API_KEY"),
    ]

    for candidate in candidates:
        if not candidate:
            continue
        value = candidate.strip()
        if not value or "your_ai_api_key_here" in value or "your_openai_api_key_here" in value:
            continue
        return value

    return None


AI_API_KEY = _get_ai_api_key()
AI_MODEL = os.getenv("AI_MODEL", "gpt-4o-mini")
AI_BASE_URL = os.getenv("AI_BASE_URL", "https://api.openai.com/v1")
OPENAI_RESPONSES_URL = f"{AI_BASE_URL.rstrip('/')}/responses"

class ChatRequest(BaseModel):
    message: str
    role: str = "general"


def _build_system_prompt(role: str) -> str:
    return (
        "You are INOLAS AI Assistant, a concise and helpful guide for the INOLAS platform. "
        f"The current user role is '{role}'. "
        "Give practical, direct answers with a supportive tone. "
        "When useful, tailor advice to internships, startup growth, freelancing, investing, or mentorship."
    )


def _extract_reply(data: dict) -> str:
    output_text = data.get("output_text")
    if isinstance(output_text, str) and output_text.strip():
        return output_text.strip()

    output = data.get("output")
    if isinstance(output, list):
        for item in output:
            if not isinstance(item, dict):
                continue
            content = item.get("content")
            if not isinstance(content, list):
                continue
            for part in content:
                if not isinstance(part, dict):
                    continue
                text = part.get("text")
                if isinstance(text, str) and text.strip():
                    return text.strip()

    return "I could not generate a response right now."


@router.post("/chat")
async def ai_chat(request: ChatRequest):
    if not AI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="AI API key is not configured. Set OPENAI_API_KEY in backend/.env.",
        )

    payload = {
        "model": AI_MODEL,
        "input": [
            {
                "role": "system",
                "content": [
                    {
                        "type": "input_text",
                        "text": _build_system_prompt(request.role),
                    }
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": request.message,
                    }
                ],
            },
        ],
    }

    headers = {
        "Authorization": f"Bearer {AI_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                OPENAI_RESPONSES_URL,
                headers=headers,
                json=payload,
            )
        response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        detail = exc.response.text
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI API request failed: {detail}",
        ) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not reach the AI API.",
        ) from exc

    return {"reply": _extract_reply(response.json())}

@router.get("/suggestions")
async def ai_suggestions(role: str):
    suggestions = {
        "student": "Consider taking the React Performance Audit course.",
        "startup": "You have a marketing budget that could be re-allocated to hiring a UX designer.",
        "professional": "Refresh your portfolio with recent outcomes and client metrics.",
        "investor": "Review capital-efficient startups with strong month-over-month traction.",
        "mentor": "Follow up with mentees who have upcoming milestones this week.",
    }
    return {"suggestion": suggestions.get(role, "Optimize your profile for better matches!")}
