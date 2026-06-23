#!/usr/bin/env python3
"""Generate app icon assets from the Ramayana splash artwork."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets/splash/ramayana.png"
ASSETS = ROOT / "assets"

# Warm parchment matching app theme (#fdf8f7)
BG_RGB = (253, 248, 247)
ACCENT_RGB = (24, 21, 18)


def crop_icon_subject(img: Image.Image) -> Image.Image:
    """Square crop centered on young Rama with bow (left of landscape frame)."""
    width, height = img.size
    side = min(width, height)
    left = max(0, int(width * 0.06))
    if left + side > width:
        left = width - side
    return img.crop((left, 0, left + side, side))


def save_ios_icon(subject: Image.Image) -> None:
    icon = subject.resize((1024, 1024), Image.Resampling.LANCZOS)
    icon = ImageEnhance.Sharpness(icon).enhance(1.08)
    icon = ImageEnhance.Color(icon).enhance(1.05)
    icon.convert("RGB").save(ASSETS / "icon.png", optimize=True)


def save_android_foreground(subject: Image.Image) -> None:
    """Foreground fits Android adaptive safe zone (~66% diameter)."""
    canvas = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    inner = 672
    resized = subject.convert("RGBA").resize((inner, inner), Image.Resampling.LANCZOS)
    offset = (1024 - inner) // 2
    canvas.paste(resized, (offset, offset), resized if resized.mode == "RGBA" else None)
    canvas.save(ASSETS / "android-icon-foreground.png", optimize=True)


def save_android_background() -> None:
    bg = Image.new("RGB", (1024, 1024), BG_RGB)
    # Subtle warm vignette for depth
    vignette = Image.new("L", (1024, 1024), 0)
    for y in range(1024):
        for x in range(1024):
            dx = (x - 512) / 512
            dy = (y - 512) / 512
            dist = min(1.0, (dx * dx + dy * dy) ** 0.5)
            vignette.putpixel((x, y), int(255 * (1 - dist * 0.12)))
    warm = Image.new("RGB", (1024, 1024), (245, 235, 225))
    bg = Image.composite(warm, bg, vignette)
    bg.save(ASSETS / "android-icon-background.png", optimize=True)


def save_android_monochrome(subject: Image.Image) -> None:
    """Single-color silhouette for Android 13+ themed icons."""
    inner = 620
    resized = subject.convert("L").resize((inner, inner), Image.Resampling.LANCZOS)
    resized = ImageEnhance.Contrast(resized).enhance(1.35)
    resized = resized.filter(ImageFilter.GaussianBlur(radius=0.6))
    resized = resized.point(lambda p: 255 if p > 118 else 0)

    canvas = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    mono = Image.new("RGBA", (inner, inner), (*ACCENT_RGB, 255))
    mono.putalpha(resized)
    offset = (1024 - inner) // 2
    canvas.paste(mono, (offset, offset), mono)
    canvas.save(ASSETS / "android-icon-monochrome.png", optimize=True)


def save_play_store_icon(subject: Image.Image) -> None:
    """Google Play store listing icon — 512x512 PNG, no transparency."""
    icon = subject.resize((1024, 1024), Image.Resampling.LANCZOS)
    icon = ImageEnhance.Sharpness(icon).enhance(1.08)
    icon = ImageEnhance.Color(icon).enhance(1.05)
    icon.convert("RGB").resize((512, 512), Image.Resampling.LANCZOS).save(
        ASSETS / "play-store-icon.png",
        optimize=True,
    )


def save_favicon(subject: Image.Image) -> None:
    icon = subject.resize((1024, 1024), Image.Resampling.LANCZOS)
    icon.resize((48, 48), Image.Resampling.LANCZOS).save(ASSETS / "favicon.png", optimize=True)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source image: {SRC}")

    source = Image.open(SRC).convert("RGB")
    subject = crop_icon_subject(source)

    save_ios_icon(subject)
    save_play_store_icon(subject)
    save_android_foreground(subject)
    save_android_background()
    save_android_monochrome(subject)
    save_favicon(subject)

    print("Generated:")
    for name in (
        "icon.png",
        "play-store-icon.png",
        "android-icon-foreground.png",
        "android-icon-background.png",
        "android-icon-monochrome.png",
        "favicon.png",
    ):
        path = ASSETS / name
        print(f"  {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
