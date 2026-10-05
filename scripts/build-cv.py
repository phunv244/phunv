#!/usr/bin/env python3
"""Render cv-nguyen-van-phu.md into public/cv/nguyen-van-phu-cv-{en,vi}.pdf (Oxford-style layout).

Usage: python3 scripts/build-cv.py   (needs google-chrome on PATH)
"""
import html, re, subprocess, tempfile, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'cv-nguyen-van-phu.md'
OUT = ROOT / 'public' / 'cv'

CSS = """
@page { size: A4; margin: 16mm 18mm; }
body { font: 10.5pt/1.4 Georgia, 'Times New Roman', serif; color: #111; margin: 0; }
h1 { font-size: 20pt; letter-spacing: .08em; text-align: center; margin: 0 0 4px; }
.contact { text-align: center; font-size: 9.5pt; margin: 0 0 10px; }
h2 { font-size: 11pt; letter-spacing: .06em; border-bottom: 1px solid #111; padding-bottom: 2px; margin: 14px 0 6px; }
p { margin: 0 0 6px; }
ul { margin: 0 0 8px; padding-left: 18px; }
li { margin: 0 0 3px; }
a { color: inherit; text-decoration: none; }
"""


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    return re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', text)


def render(md):
    out, items = [], []
    for block in md.strip().split('\n\n'):
        lines = block.splitlines()
        if lines[0].startswith('- '):
            out.append('<ul>' + ''.join(f'<li>{inline(l[2:])}</li>' for l in lines) + '</ul>')
        elif block.startswith('### '):
            out.append(f'<h2>{inline(block[4:])}</h2>')
        elif re.fullmatch(r'\*\*[^*]+\*\*', block) and not out:
            out.append(f'<h1>{html.escape(block[2:-2])}</h1>')
        elif len(out) == 1:
            out.append(f'<p class="contact">{inline(block)}</p>')
        else:
            out.append(f'<p>{inline(block)}</p>')
    return '\n'.join(out)


def main():
    # "## English CV" and "## CV tiếng Việt" sections, in that order
    parts = re.split(r'^## .+$', SRC.read_text(), flags=re.M)[1:]
    OUT.mkdir(parents=True, exist_ok=True)
    for lang, md in zip(('en', 'vi'), parts):
        doc = f'<!doctype html><html lang="{lang}"><meta charset="utf-8"><style>{CSS}</style><body>{render(md)}</body></html>'
        with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False) as f:
            f.write(doc)
        pdf = OUT / f'nguyen-van-phu-cv-{lang}.pdf'
        subprocess.run(['google-chrome', '--headless', '--disable-gpu', '--no-pdf-header-footer',
                        f'--print-to-pdf={pdf}', f'file://{f.name}'], check=True, capture_output=True)
        print(pdf.relative_to(ROOT))


if __name__ == '__main__':
    main()
