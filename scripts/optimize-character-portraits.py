#!/usr/bin/env python3
"""Resize character portraits for mobile without changing art style."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/characters"
OUT_WIDTH = 960
OUT_HEIGHT = 640
PNG_COMPRESS = 6


def fit_cover(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    resized = img.resize((int(src_w * scale), int(src_h * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def main() -> None:
    for path in sorted(OUT.glob("*.png")):
        before = path.stat().st_size
        img = Image.open(path).convert("RGB")
        img = fit_cover(img, (OUT_WIDTH, OUT_HEIGHT))
        img.save(path, format="PNG", optimize=True, compress_level=PNG_COMPRESS)
        after = path.stat().st_size
        print(f"{path.name}: {before // 1024} KB -> {after // 1024} KB")


if __name__ == "__main__":
    main()
