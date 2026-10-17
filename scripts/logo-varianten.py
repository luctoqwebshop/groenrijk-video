# Maakt van public/logo-groenrijk.png een transparante en een witte variant.
import numpy as np
from PIL import Image

img = np.asarray(Image.open("public/logo-groenrijk.png").convert("RGB")).astype(np.float64) / 255

# Color-to-alpha tegen wit: kleinste alpha waarmee de pixel als mengsel met wit te schrijven is
alpha = np.max(1 - img, axis=2)
safe = np.where(alpha > 0, alpha, 1)[..., None]
kleur = np.clip(1 - (1 - img) / safe, 0, 1)

def opslaan(rgb, a, pad):
    out = np.dstack([rgb, a])
    ys, xs = np.where(a > 0.01)
    pad_px = 8
    out = out[max(ys.min() - pad_px, 0):ys.max() + pad_px, max(xs.min() - pad_px, 0):xs.max() + pad_px]
    Image.fromarray((out * 255).round().astype(np.uint8), "RGBA").save(pad)

opslaan(kleur, alpha, "public/logo-groenrijk-transparant.png")

# Witte variant: donkergroen -> wit, limoen blijft limoen (mengverhouding per pixel)
donker = np.array([0x00, 0x56, 0x34]) / 255
limoen = np.array([0x91, 0xBE, 0x06]) / 255
richting = limoen - donker
t = np.clip(((kleur - donker) @ richting) / (richting @ richting), 0, 1)[..., None]
wit = (1 - t) * np.ones(3) + t * limoen
opslaan(wit, alpha, "public/logo-groenrijk-wit.png")
print("klaar")

# Varianten zonder slogan (voor het kleine watermerk en voor naast de Caveat-slogan)
for naam in ["transparant", "wit"]:
    im = np.asarray(Image.open(f"public/logo-groenrijk-{naam}.png")).copy()
    a = im[..., 3].astype(float)
    # De slogan staat onder het woordmerk, links van het icoon
    rij_rand = 140
    icoon_x = 735
    im[rij_rand:, :icoon_x, 3] = 0
    ys, xs = np.where(im[..., 3] > 2)
    im = im[max(ys.min() - 8, 0):ys.max() + 8, max(xs.min() - 8, 0):xs.max() + 8]
    Image.fromarray(im, "RGBA").save(f"public/logo-groenrijk-{naam}-zonder-slogan.png")
print("klaar zonder slogan")

# Alleen het icoon (cirkel met blad), voor de intro-animatie en als stapicoon
im = np.asarray(Image.open("public/logo-groenrijk-transparant.png")).copy()
im = im[:, 735:]
ys, xs = np.where(im[..., 3] > 2)
im = im[max(ys.min() - 4, 0):ys.max() + 4, max(xs.min() - 4, 0):xs.max() + 4]
Image.fromarray(im, "RGBA").save("public/logo-icoon.png")
print("klaar icoon")

# Lagen voor de intro-animatie: logo zonder icoon en alleen het icoon, op hetzelfde canvas
# zodat ze precies over elkaar vallen
for naam in ["transparant", "wit"]:
    im = np.asarray(Image.open(f"public/logo-groenrijk-{naam}.png")).copy()
    zonder_icoon = im.copy()
    zonder_icoon[:, 735:, 3] = 0
    alleen_icoon = im.copy()
    alleen_icoon[:, :735, 3] = 0
    Image.fromarray(zonder_icoon, "RGBA").save(f"public/intro/logo-{naam}-woordmerk.png")
    Image.fromarray(alleen_icoon, "RGBA").save(f"public/intro/logo-{naam}-icoon.png")
    ys, xs = np.where(alleen_icoon[..., 3] > 2)
    print(naam, "icoon-midden in %:", round((xs.min() + xs.max()) / 2 / im.shape[1] * 100, 2),
          round((ys.min() + ys.max()) / 2 / im.shape[0] * 100, 2))
