"""Smoke test for pyqpanda3 + pyqpanda_alg in the Python 3.13 environment."""

from __future__ import annotations

import importlib
import sys

MODULES = ["pyqpanda3", "pyqpanda_alg"]


def check_modules() -> int:
    failed = []
    for name in MODULES:
        try:
            importlib.import_module(name)
            print(f"[OK] {name}")
        except Exception as exc:  # pragma: no cover - smoke test utility
            failed.append((name, exc))
            print(f"[FAIL] {name}: {exc}")

    if failed:
        print("\nResult: FAILED")
        return 1

    print("\nResult: PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(check_modules())
