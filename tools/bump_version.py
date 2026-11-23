"""Bump the app version everywhere it appears, and add a CHANGELOG entry.

Usage (from the project folder):
    python tools/bump_version.py 1.1.0 "Added the Spirit path"

Changing the version is what tells installed phones that an update exists.
"""
import re, sys, datetime, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
if len(sys.argv) < 2 or not re.fullmatch(r"\d+\.\d+\.\d+", sys.argv[1]):
    sys.exit('Usage: python tools/bump_version.py 1.1.0 "What changed"')
new, note = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "Updates")

for rel, pattern in [("js/app.js", r'const APP_VERSION="[^"]+"'), ("sw.js", r'const VERSION = "[^"]+"')]:
    p = root / rel
    text = p.read_text(encoding="utf-8")
    repl = f'const APP_VERSION="{new}"' if rel == "js/app.js" else f'const VERSION = "{new}"'
    text, n = re.subn(pattern, repl, text, count=1)
    if n != 1:
        sys.exit(f"Could not find the version in {rel}")
    p.write_text(text, encoding="utf-8")

log = root / "CHANGELOG.md"
today = datetime.date.today().strftime("%d.%m.%Y")
old = log.read_text(encoding="utf-8")
head, rest = old.split("\n", 1)
log.write_text(f"{head}\n\n## {new} · {today}\n- {note}\n{rest}", encoding="utf-8")
print(f"Version is now {new}. Commit and push to publish it.")
