#!/usr/bin/env python3
"""
Batch-convert HEIC and JPG images to compressed, resized JPEG with orientation fix:
 g_1_1.jpg, g_1_2.jpg, ..., g_1_6.jpg, g_2_1.jpg, ...
Resizes images so neither side exceeds 1080px while maintaining aspect ratio.
"""
import os
import sys
import logging
from math import ceil

# Requires:
#   pip install Pillow pillow_heif
import pillow_heif
from PIL import Image, ImageOps

# Register HEIC opener for Pillow
def _register_heic():
    try:
        pillow_heif.register_heif_opener()
    except Exception as e:
        logging.warning(f"Could not register HEIC opener: {e}")


def convert_images(input_dir: str, output_dir: str, quality: int = 60, max_side: int = 1080) -> None:
    """
    Convert and resize all .heic, .jpg, .jpeg images in input_dir to compressed JPEG files in output_dir
    using naming pattern g_<group>_<index>.jpg (index 1–6), fixing EXIF orientation,
    resizing so the longest side is at most max_side, and compressing (quality default 60).
    """
    _register_heic()

    if not os.path.isdir(input_dir):
        raise ValueError(f"Input directory does not exist: {input_dir}")
    os.makedirs(output_dir, exist_ok=True)

    exts = ('.heic', '.jpg', '.jpeg')
    files = [f for f in os.listdir(input_dir)
             if os.path.isfile(os.path.join(input_dir, f))
             and f.lower().endswith(exts)]
    files.sort()

    total = len(files)
    if total == 0:
        print("No images found to convert.")
        return

    for idx, filename in enumerate(files, start=1):
        group = ceil(idx / 6)
        inner = (idx - 1) % 6 + 1
        new_name = f"g_{group}_{inner}.jpg"

        src_path = os.path.join(input_dir, filename)
        dst_path = os.path.join(output_dir, new_name)

        try:
            with Image.open(src_path) as img:
                # Fix orientation based on EXIF
                img = ImageOps.exif_transpose(img)

                # Resize: ensure max side <= max_side while keeping aspect ratio
                img.thumbnail((max_side, max_side), Image.LANCZOS)

                # Convert to RGB and save with compression
                rgb = img.convert('RGB')
                rgb.save(
                    dst_path,
                    format='JPEG',
                    quality=quality,
                    optimize=True,
                    progressive=True
                )
            print(f"Converted {filename} -> {new_name} (quality={quality}, max_side={max_side})")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

    print(f"Done! Converted {total} files into '{output_dir}'.")


if __name__ == '__main__':
    if len(sys.argv) < 3 or len(sys.argv) > 4:
        print(f"Usage: {sys.argv[0]} <input_dir> <output_dir> [quality]")
        sys.exit(1)

    inp, outp = sys.argv[1], sys.argv[2]
    q = int(sys.argv[3]) if len(sys.argv) == 4 else 60
    convert_images(inp, outp, quality=q)
