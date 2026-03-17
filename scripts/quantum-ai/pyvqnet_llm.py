"""Call the OriginQC LLM service from Python.

Designed to be invoked by the ONBT miniapp API layer via subprocess,
following the same pattern as qpanda_task.py.

If pyvqnet ever ships a first-party LLM module it can be swapped in here
without touching the TypeScript layer.

Usage:
  python scripts/quantum-ai/pyvqnet_llm.py \\
    --report /tmp/onbt_llm_<id>.json \\
    --api-key <ORIGIN_PILOT_API> \\
    --base-url https://qcloud.originqc.com.cn/api/v1 \\
    --model Qwen2.5-72B-Instruct \\
    --messages-file /tmp/onbt_msgs_<id>.json \\
    --max-tokens 1400 \\
    --temperature 0.7
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any, Dict, List

# ---------------------------------------------------------------------------
# Optional: pyvqnet LLM integration (forward-compatible hook)
# ---------------------------------------------------------------------------
_PYVQNET_LLM_AVAILABLE = False
try:
    # pyvqnet 2.17.x is a QML framework; no LLM module exists yet.
    # If a future version adds one (e.g. pyvqnet.llm), it can be imported here.
    pass  # from pyvqnet.llm import OriginLLMClient  # noqa: E265
except Exception:
    pass

# ---------------------------------------------------------------------------
# HTTP fallback — standard OpenAI-compatible completions endpoint
# ---------------------------------------------------------------------------
try:
    import urllib.request
    import urllib.error
    _HTTP_AVAILABLE = True
except ImportError:
    _HTTP_AVAILABLE = False


def _write_report(path: str, payload: Dict[str, Any]) -> None:
    if not path:
        print(json.dumps(payload, ensure_ascii=True))
        return
    out_path = Path(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=True, indent=2), encoding="utf-8")
    # Print the path so the caller can confirm the file was written.
    print(str(out_path))


def _call_via_http(
    api_key: str,
    base_url: str,
    model: str,
    messages: List[Dict[str, str]],
    max_tokens: int,
    temperature: float,
) -> str:
    """POST to the OriginQC OpenAI-compatible completions endpoint.

    The OriginQC platform hosts an OpenAI-compatible LLM API at:
      https://qcloud.originqc.com.cn/api/v1/chat/completions

    Authentication is ``Authorization: Bearer <ORIGIN_PILOT_API>``.
    """
    import urllib.request
    import urllib.error

    url = base_url.rstrip("/") + "/chat/completions"

    body_data = json.dumps(
        {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=body_data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", errors="replace")
        try:
            err_body = json.loads(raw)
        except Exception:
            err_body = raw
        raise RuntimeError(
            f"OriginQC LLM HTTP {exc.code}: {err_body}"
        ) from exc

    data = json.loads(raw)

    # OpenAI-compatible response shape
    choices = data.get("choices") or []
    if not choices:
        raise RuntimeError(f"No choices in OriginQC response: {data}")

    content = choices[0].get("message", {}).get("content", "")
    return content


def main() -> int:
    parser = argparse.ArgumentParser(description="OriginQC LLM helper (pyvqnet-compatible)")
    parser.add_argument("--report", default="", help="Optional JSON output file path")
    parser.add_argument("--api-key", required=True, help="ORIGIN_PILOT_API bearer token")
    parser.add_argument(
        "--base-url",
        default="https://qcloud.originqc.com.cn/api/v1",
        help="OriginQC API base URL (no trailing slash)",
    )
    parser.add_argument("--model", default="Qwen2.5-72B-Instruct", help="LLM model name")
    parser.add_argument(
        "--messages-file",
        required=True,
        help="Path to a JSON file containing the messages array",
    )
    parser.add_argument("--max-tokens", type=int, default=1400, help="Max completion tokens")
    parser.add_argument("--temperature", type=float, default=0.7, help="Sampling temperature")

    args = parser.parse_args()

    # Load messages from the temp file (avoids shell quoting issues).
    try:
        msgs_text = Path(args.messages_file).read_text(encoding="utf-8")
        messages: List[Dict[str, str]] = json.loads(msgs_text)
    except Exception as exc:
        payload: Dict[str, Any] = {"ok": False, "error": f"Failed to read messages file: {exc}"}
        _write_report(args.report, payload)
        return 1

    try:
        if _PYVQNET_LLM_AVAILABLE:
            # Future: use pyvqnet native LLM client here
            raise NotImplementedError("pyvqnet LLM module not yet wired up")

        # Current: OpenAI-compatible HTTP call
        text = _call_via_http(
            api_key=args.api_key,
            base_url=args.base_url,
            model=args.model,
            messages=messages,
            max_tokens=args.max_tokens,
            temperature=args.temperature,
        )

        payload = {
            "ok": True,
            "text": text,
            "model": args.model,
            "backend": "http",
        }
        _write_report(args.report, payload)
        return 0

    except Exception as exc:
        payload = {
            "ok": False,
            "error": str(exc),
            "backend": "pyvqnet" if _PYVQNET_LLM_AVAILABLE else "http",
        }
        _write_report(args.report, payload)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
