"""Smoke test for pyvqnet in the Python 3.12 environment."""

from __future__ import annotations

import importlib
import os
import sys


def check_pyvqnet() -> int:
    # Keep initialization minimal and CPU-oriented for portability.
    os.environ.setdefault("CUDA_VISIBLE_DEVICES", "")

    try:
        importlib.import_module("pyvqnet")
        print("[OK] pyvqnet")
        print("\nResult: PASSED")
        return 0
    except Exception as exc:  # pragma: no cover - smoke test utility
        print(f"[FAIL] pyvqnet: {exc}")
        print("\nResult: FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(check_pyvqnet())
