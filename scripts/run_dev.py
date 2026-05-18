#!/usr/bin/env python3
"""
Start the Mridangam site (Vite) and the OllamaFreeAPI proxy together.

  python scripts/run_dev.py

Or from package.json: npm run dev
"""
from __future__ import annotations

import os
import signal
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROXY_SCRIPT = os.path.join(ROOT, "scripts", "ollamafree-proxy.py")
PROCESSES: list[subprocess.Popen] = []


def start_proxy() -> subprocess.Popen:
    print("[dev] Starting OllamaFreeAPI proxy on http://127.0.0.1:8000 ...")
    return subprocess.Popen(
        [sys.executable, PROXY_SCRIPT],
        cwd=ROOT,
    )


def start_vite() -> subprocess.Popen:
    print("[dev] Starting Vite (website) ...")
    shell = os.name == "nt"
    return subprocess.Popen(
        ["npm", "run", "dev:site"],
        cwd=ROOT,
        shell=shell,
    )


def shutdown(*_args):
    print("\n[dev] Shutting down...")
    for proc in PROCESSES:
        if proc.poll() is None:
            proc.terminate()
    for proc in PROCESSES:
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
    sys.exit(0)


def main():
    try:
        import fastapi  # noqa: F401
        import ollamafreeapi  # noqa: F401
    except ImportError:
        print(
            "\n[dev] Missing Python packages. Run once:\n"
            "  pip install -r scripts/requirements-ai.txt\n",
            file=sys.stderr,
        )
        sys.exit(1)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    PROCESSES.append(start_proxy())
    time.sleep(1.5)
    PROCESSES.append(start_vite())

    print("[dev] Ready. Open http://localhost:5173 → Korvai AI")
    print("[dev] Press Ctrl+C to stop both.\n")

    while True:
        for proc in PROCESSES:
            code = proc.poll()
            if code is not None and code != 0:
                print(f"[dev] A process exited with code {code}. Stopping.")
                shutdown()
        time.sleep(0.5)


if __name__ == "__main__":
    main()
