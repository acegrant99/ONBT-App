"""Submit/query QPanda tasks using Origin Quantum PilotOS credentials.

This script is designed to be called by the ONBT miniapp API layer.
It supports:
1) submit: submit a Bell-state circuit (or custom OriginIR) to PilotOS
2) query: query a previously submitted task by task ID

Example:
  python scripts/quantum-ai/qpanda_task.py submit \
    --pilot-url https://your-pilot-host:port \
    --api-key <API_KEY> \
    --shots 1024

  python scripts/quantum-ai/qpanda_task.py query \
    --pilot-url https://your-pilot-host:port \
    --api-key <API_KEY> \
    --task-id <TASK_ID>
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict

from pyqpanda3.pilot_service.QPilotOSService import QPilotService


DEFAULT_BELL_ORIGIN_IR = "\n".join(
    [
        "QINIT 2",
        "CREG 2",
        "H q[0]",
        "CNOT q[0],q[1]",
        "MEASURE q[0],c[0]",
        "MEASURE q[1],c[1]",
    ]
)


def _write_report(path: str | None, payload: Dict[str, Any]) -> None:
    if not path:
        print(json.dumps(payload, ensure_ascii=True))
        return
    out_path = Path(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=True, indent=2), encoding="utf-8")
    print(str(out_path))


def _service(pilot_url: str, api_key: str) -> QPilotService:
    # log_cout=False keeps service output quieter for API usage.
    return QPilotService(pilot_url, False, api_key)


def _cmd_submit(args: argparse.Namespace) -> Dict[str, Any]:
    svc = _service(args.pilot_url, args.api_key)

    origin_ir = args.origin_ir or DEFAULT_BELL_ORIGIN_IR
    submit_kwargs = {
        "prog": origin_ir,
        "shot": int(args.shots),
        "chip_id": args.chip_id,
        "is_amend": bool(args.is_amend),
        "is_mapping": bool(args.is_mapping),
        "is_optimization": bool(args.is_optimization),
        "describe": args.describe,
    }

    if args.wait_result:
        result = svc.run(**submit_kwargs)
        return {
            "ok": True,
            "action": "submit",
            "mode": "sync",
            "shots": int(args.shots),
            "chipId": args.chip_id,
            "result": result,
        }

    task_id = svc.async_run(**submit_kwargs)
    return {
        "ok": True,
        "action": "submit",
        "mode": "async",
        "shots": int(args.shots),
        "chipId": args.chip_id,
        "taskId": str(task_id),
    }


def _cmd_query(args: argparse.Namespace) -> Dict[str, Any]:
    svc = _service(args.pilot_url, args.api_key)
    result = svc.query_result(args.task_id)
    return {
        "ok": True,
        "action": "query",
        "taskId": args.task_id,
        "result": result,
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="QPanda PilotOS task helper")
    parser.add_argument("--report", default="", help="Optional JSON output file path")

    sub = parser.add_subparsers(dest="command", required=True)

    submit = sub.add_parser("submit", help="Submit a quantum task")
    submit.add_argument("--pilot-url", required=True, help="PilotOS base URL")
    submit.add_argument("--api-key", required=True, help="PilotOS API key")
    submit.add_argument("--shots", type=int, default=1024, help="Measurement shots")
    submit.add_argument("--chip-id", default="", help="Target chip id")
    submit.add_argument("--origin-ir", default="", help="OriginIR source string")
    submit.add_argument("--describe", default="ONBT Bell-state check", help="Task description")
    submit.add_argument("--wait-result", action="store_true", help="Run synchronously and return result")

    submit.add_argument("--is-amend", dest="is_amend", action="store_true")
    submit.add_argument("--no-amend", dest="is_amend", action="store_false")
    submit.set_defaults(is_amend=True)

    submit.add_argument("--is-mapping", dest="is_mapping", action="store_true")
    submit.add_argument("--no-mapping", dest="is_mapping", action="store_false")
    submit.set_defaults(is_mapping=True)

    submit.add_argument("--is-optimization", dest="is_optimization", action="store_true")
    submit.add_argument("--no-optimization", dest="is_optimization", action="store_false")
    submit.set_defaults(is_optimization=True)

    query = sub.add_parser("query", help="Query a task result")
    query.add_argument("--pilot-url", required=True, help="PilotOS base URL")
    query.add_argument("--api-key", required=True, help="PilotOS API key")
    query.add_argument("--task-id", required=True, help="Task id to query")

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    try:
        if args.command == "submit":
            payload = _cmd_submit(args)
        elif args.command == "query":
            payload = _cmd_query(args)
        else:
            payload = {"ok": False, "error": f"Unknown command: {args.command}"}

        _write_report(args.report, payload)
        return 0 if payload.get("ok") else 1
    except Exception as exc:
        payload = {
            "ok": False,
            "command": getattr(args, "command", "unknown"),
            "error": str(exc),
        }
        _write_report(getattr(args, "report", ""), payload)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
