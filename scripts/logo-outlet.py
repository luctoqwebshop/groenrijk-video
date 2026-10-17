# Maakt van public/merken/outlet/logo-origineel.jpg een transparante en een witte variant.
import numpy as np
from PIL import Image

img = np.asarray(Image.open("public/merken/outlet/logo-origineel.jpg").convert("RGB")).astype(np.float64) / 255
blauw = np.array([0x2F, 0x65, 0xB0]) / 255

# Hoeveel "blauw" zit er in elke pixel (0 = wit, 1 = volledig blauw)
alpha = np.clip(np.max((1 - img) / (1 - blauw), axis=2), 0, 1)

def opslaan(rgb, a, pad):
    out = np.dstack([np.broadcast_to(rgb, img.shape), a])
    ys, xs = np.where(a > 0.05)
    out = out[max(ys.min() - 4, 0):ys.max() + 4, max(xs.min() - 4, 0):xs.max() + 4]
    Image.fromarray((out * 255).round().astype(np.uint8), "RGBA").save(pad)
    print(pad, out.shape[1], out.shape[0])

# Op lichte achtergrond: blauw met transparant wit
opslaan(blauw, alpha, "public/merken/outlet/logo-op-licht.png")
# Op blauwe achtergrond / video: wit (blauwe vlakken worden wit, witte letters worden transparant)
opslaan(np.ones(3), alpha, "public/merken/outlet/logo-op-donker.png")
