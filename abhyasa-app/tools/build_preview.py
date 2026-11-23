"""Bundle the app into one self-contained HTML file (handy for sharing a preview).

Usage: python tools/build_preview.py   ->  writes dist/abhyasa-preview.html
The preview has no offline mode or install prompt; use the real site for that.
"""
import pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "css/app.css").read_text(encoding="utf-8")
js = (root / "js/content.js").read_text(encoding="utf-8") + "\n" + (root / "js/app.js").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="css/app.css">', f"<style>\n{css}\n</style>")
html = re.sub(r'<script src="js/content.js"></script>\s*<script src="js/app.js"></script>', lambda m: f"<script>\n{js}\n</script>", html)
out = root / "dist"; out.mkdir(exist_ok=True)
(out / "abhyasa-preview.html").write_text(html, encoding="utf-8")
print("Wrote dist/abhyasa-preview.html")
