#!/usr/bin/env python3
"""Generate 5 design proposal boards for the 'Gleichstellung' interactive website."""
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

FD = "/usr/share/fonts/truetype/dejavu/"
def F(name, size):
    return ImageFont.truetype(FD + name, size)

SANS   = lambda s: F("DejaVuSans.ttf", s)
SANSB  = lambda s: F("DejaVuSans-Bold.ttf", s)
SERIF  = lambda s: F("DejaVuSerif.ttf", s)
SERIFB = lambda s: F("DejaVuSerif-Bold.ttf", s)
MONO   = lambda s: F("DejaVuSansMono.ttf", s)
MONOB  = lambda s: F("DejaVuSansMono-Bold.ttf", s)

def hx(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def lerp(a, b, t):
    return tuple(int(round(a[i] + (b[i]-a[i])*t)) for i in range(3))

def grad(size, c1, c2, angle_deg=90):
    """Linear gradient RGBA image."""
    w, h = size
    ang = math.radians(angle_deg)
    dx, dy = math.cos(ang), math.sin(ang)
    xs = np.linspace(0, 1, w)[None, :]
    ys = np.linspace(0, 1, h)[:, None]
    t = xs*dx + ys*dy
    t = (t - t.min()) / (t.max() - t.min())
    c1 = np.array(c1); c2 = np.array(c2)
    img = (c1[None, None, :] + (c2-c1)[None, None, :] * t[:, :, None]).astype(np.uint8)
    a = np.full((h, w, 1), 255, np.uint8)
    return Image.fromarray(np.concatenate([img, a], axis=2), "RGBA")

def grad3(size, cols, angle_deg=120):
    w, h = size
    base = grad(size, cols[0], cols[1], angle_deg)
    top = grad(size, cols[1], cols[2], angle_deg)
    arr_b = np.asarray(base).astype(float)
    arr_t = np.asarray(top).astype(float)
    ang = math.radians(angle_deg)
    dx, dy = math.cos(ang), math.sin(ang)
    xs = np.linspace(0, 1, w)[None, :]
    ys = np.linspace(0, 1, h)[:, None]
    t = xs*dx + ys*dy
    t = (t - t.min())/(t.max()-t.min())
    mix = np.clip((t-0.5)*2, 0, 1)[:, :, None]
    out = (arr_b*(1-mix) + arr_t*mix).astype(np.uint8)
    return Image.fromarray(out, "RGBA")

def rrect(draw, box, r, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def text_center(d, cx, y, s, font, fill):
    w = d.textlength(s, font=font)
    d.text((cx - w/2, y), s, font=font, fill=fill)

# ---- design configs ----
STYLES = [
 dict(idx="01", name="LIQUID GLASS", tag="Frosted Glassmorphism, lebendiger Verlauf",
      panel="grad3", grad=[hx("#2A1259"), hx("#7A3BA8"), hx("#C84B8C")], ang=125,
      text="#FFFFFF", subt="#E4D9F7", accent="#FF6FB5", accent2="#8B6CFF",
      card="glass", radius=30,
      palette=["#1E0B3B","#5B2A86","#8B6CFF","#FF6FB5","#FFD166","#F4F0FF"],
      disp=("DejaVu Sans Bold","sans"), body="DejaVu Sans",
      chips=["Glas-Effekt","Verlauf","Vibrant"]),
 dict(idx="02", name="EDITORIAL", tag="Datenjournalismus, Serif, viel Weißraum",
      panel="solid", base="#FBF8F4",
      text="#1A1A1A", subt="#6B6B6B", accent="#C8102E", accent2="#3C6E71",
      card="flat", radius=8,
      palette=["#FBF8F4","#1A1A1A","#C8102E","#3C6E71","#E4B7B2","#D9D9D9"],
      disp=("DejaVu Serif Bold","serif"), body="DejaVu Sans",
      chips=["Serif-Titel","Weißraum","Zeitungs-Look"]),
 dict(idx="03", name="DARK DATA", tag="Dashboard, Neon-Akzente, technisch",
      panel="grad", grad=[hx("#0A0F1F"), hx("#0F1B33")], ang=90,
      text="#E8EEF7", subt="#8A97AD", accent="#22E1B3", accent2="#3B82F6",
      card="dark", radius=16,
      palette=["#0A0F1F","#13203A","#3B82F6","#22E1B3","#F2C14E","#E8EEF7"],
      disp=("DejaVu Sans Mono Bold","mono"), body="DejaVu Sans",
      chips=["Dark Mode","Neon","Daten-Fokus"]),
 dict(idx="04", name="WARM HUMANIST", tag="Empathisch, Sand & Terrakotta",
      panel="solid", base="#F1E8DA",
      text="#3B2F26", subt="#857562", accent="#AE6A52", accent2="#5C7A6B",
      card="soft", radius=26,
      palette=["#F1E8DA","#3B2F26","#AE6A52","#CBA46F","#5C7A6B","#E7D8C4"],
      disp=("DejaVu Serif Bold","serif"), body="DejaVu Sans",
      chips=["Warm","Menschlich","Sanft gerundet"]),
 dict(idx="05", name="NORDIC MINIMAL", tag="Bauhaus-Raster, Hochkontrast",
      panel="grid", base="#F4F4F1",
      text="#111111", subt="#555555", accent="#0057B8", accent2="#E63946",
      card="grid", radius=3,
      palette=["#F4F4F1","#111111","#0057B8","#E63946","#F1C40F","#DADAD5"],
      disp=("DejaVu Sans Bold","sans"), body="DejaVu Sans",
      chips=["Raster","Hochkontrast","Geometrisch"]),
]

W, H = 1200, 1560
M = 64
CHROME = hx("#EDEDEA")
INK = hx("#1A1A1A")
GRAY = hx("#8A8A86")

def make_panel_bg(s, size):
    if s["panel"] == "grad3":
        return grad3(size, s["grad"], s["ang"])
    if s["panel"] == "grad":
        return grad(size, s["grad"][0], s["grad"][1], s["ang"])
    base = hx(s["base"])
    img = Image.new("RGBA", size, base + (255,))
    if s["panel"] == "grid":
        d = ImageDraw.Draw(img)
        line = lerp(base, INK, 0.10)
        step = 56
        for x in range(0, size[0], step):
            d.line([(x,0),(x,size[1])], fill=line+(255,), width=1)
        for y in range(0, size[1], step):
            d.line([(0,y),(size[0],y)], fill=line+(255,), width=1)
    return img

def card(panel, box, s):
    """Draw a card onto panel image according to style."""
    x0,y0,x1,y1 = box
    r = s["radius"]
    text = hx(s["text"]); accent2 = hx(s["accent2"])
    if s["card"] == "glass":
        region = panel.crop(box).filter(ImageFilter.GaussianBlur(14))
        # brighten
        region = Image.blend(region, Image.new("RGBA", region.size, (255,255,255,255)), 0.18)
        mask = Image.new("L", region.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle([0,0,x1-x0-1,y1-y0-1], radius=r, fill=255)
        panel.paste(region, (x0,y0), mask)
        ov = Image.new("RGBA", panel.size, (0,0,0,0))
        d = ImageDraw.Draw(ov)
        rrect(d, box, r, fill=(255,255,255,30), outline=(255,255,255,90), width=2)
        panel.alpha_composite(ov)
    else:
        ov = Image.new("RGBA", panel.size, (0,0,0,0))
        d = ImageDraw.Draw(ov)
        if s["card"] == "soft":
            sh = Image.new("RGBA", panel.size, (0,0,0,0))
            ds = ImageDraw.Draw(sh)
            rrect(ds, (x0+6,y0+10,x1+6,y1+12), r, fill=(60,40,20,45))
            sh = sh.filter(ImageFilter.GaussianBlur(12))
            panel.alpha_composite(sh)
            rrect(d, box, r, fill=hx("#E7D8C4")+(255,))
        elif s["card"] == "dark":
            surf = lerp(hx("#0A0F1F"), (255,255,255), 0.07)
            rrect(d, box, r, fill=surf+(255,), outline=accent2+(70,), width=1)
        elif s["card"] == "flat":
            rrect(d, box, r, fill=(255,255,255,255), outline=INK+(255,), width=2)
        elif s["card"] == "grid":
            rrect(d, box, r, fill=(255,255,255,255), outline=INK+(255,), width=2)
        panel.alpha_composite(ov)

def draw_mockup(s):
    pw, ph = W-2*M, 880
    panel = make_panel_bg(s, (pw, ph))
    d = ImageDraw.Draw(panel)
    text = hx(s["text"]); subt = hx(s["subt"]); accent = hx(s["accent"]); accent2 = hx(s["accent2"])
    dispname, dispkind = s["disp"]
    DISP = {"sans":SANSB,"serif":SERIFB,"mono":MONOB}[dispkind]
    BODY = SANS
    pad = 54

    # top nav
    nav_y = 42
    rrect(d, (pad, nav_y, pad+250, nav_y+44), 22,
          fill=(accent+( (40,) if s["card"]=="glass" else (255,)))[:4] if False else None)
    # brand pill
    if s["card"]=="glass":
        rrect(d,(pad,nav_y,pad+232,nav_y+46),23, fill=(255,255,255,28), outline=(255,255,255,80), width=1)
    else:
        rrect(d,(pad,nav_y,pad+232,nav_y+46),23, fill=accent+(255,))
    bcol = text if s["card"]=="glass" else ((255,255,255) if dispkind!="serif" or s["idx"]=="04" else (255,255,255))
    d.text((pad+22, nav_y+12), "GLEICHSTELLUNG", font=SANSB(18), fill=(255,255,255))
    for i,(lbl) in enumerate(["Welt","Vorbilder","Daten","Stimmen"]):
        x = pad+300+i*128
        d.text((x, nav_y+13), lbl, font=BODY(20), fill=subt)

    # hero
    hy = 150
    d.text((pad, hy), "WELTWEITER GENDER GAP", font=SANSB(22), fill=accent)
    big = DISP(190)
    d.text((pad-6, hy+30), "132", font=big, fill=accent)
    nw = d.textlength("132", font=big)
    yrs = DISP(64)
    d.text((pad+nw+24, hy+96), "Jahre", font=yrs, fill=text)
    claim = "bis zur globalen Gleichstellung"
    d.text((pad, hy+250), claim, font=DISP(46), fill=text)
    d.text((pad, hy+320), "Noch 31,5 % des Gap sind offen — kein Land hat ihn geschlossen.",
           font=BODY(24), fill=subt)

    # ---- lower row: map grid (left) + cards (right)
    row_y = hy+390
    map_box = (pad, row_y, pad+560, row_y+300)
    card(panel, map_box, s)
    d.text((map_box[0]+26, map_box[1]+22), "Interaktive Weltkarte", font=SANSB(22),
           fill=text if s["card"] in ("glass","dark") else INK)
    # choropleth dots
    gx0, gy0 = map_box[0]+28, map_box[1]+70
    cols, rows = 11, 5
    cw = (map_box[2]-map_box[0]-56)/cols
    chr_y = map_box[3]-26
    for ry in range(rows):
        for rx in range(cols):
            v = 0.5 + 0.5*math.sin(rx*0.6 + ry*0.9) * math.cos(rx*0.3)
            v = max(0.05, min(1, v))
            lo = lerp(accent2, (255,255,255) if s["card"] in("glass","dark") else hx("#FFFFFF"), 0.0)
            col = lerp(accent2, accent, v)
            cx = gx0 + rx*cw
            cy = gy0 + ry*38
            rrect(d, (cx, cy, cx+cw-8, cy+30), 7, fill=col+(235,))

    # right column: country card + bar chart
    cc = (pad+584, row_y, pad+pw-2*pad+ (pad), row_y+138)
    right_x1 = pw - pad
    cc = (pad+584, row_y, right_x1, row_y+138)
    card(panel, cc, s)
    tc = text if s["card"] in ("glass","dark") else INK
    d.text((cc[0]+24, cc[1]+20), "Island", font=DISP(34), fill=tc)
    d.text((cc[0]+24, cc[1]+70), "Platz 1 · Gender Gap", font=BODY(20), fill=subt)
    d.text((cc[2]-150, cc[1]+24), "92,6%", font=DISP(40), fill=accent)
    # progress
    pbx0, pbx1 = cc[0]+24, cc[2]-24
    pby = cc[3]-30
    rrect(d, (pbx0, pby, pbx1, pby+12), 6, fill=(subt+(90,)) if s["card"] in("glass","dark") else lerp(hx(s.get("base","#EDEDEA")),INK,0.12)+(255,))
    rrect(d, (pbx0, pby, pbx0+(pbx1-pbx0)*0.926, pby+12), 6, fill=accent+(255,))

    bc = (pad+584, row_y+154, right_x1, row_y+300)
    card(panel, bc, s)
    d.text((bc[0]+24, bc[1]+18), "Top 5 · % geschlossen", font=SANSB(20), fill=tc)
    vals = [0.926,0.879,0.863,0.838,0.827]
    bx0 = bc[0]+28; bx1 = bc[2]-28
    n = len(vals); gap=14
    bw = (bx1-bx0 - gap*(n-1))/n
    base_b = bc[3]-26; top_b = bc[1]+62
    for i,v in enumerate(vals):
        h = (base_b-top_b)*((v-0.78)/0.16)
        x = bx0+i*(bw+gap)
        col = accent if i==0 else accent2
        rrect(d, (x, base_b-h, x+bw, base_b), 5, fill=col+(255,))

    # footer
    fy = ph-46
    d.line([(pad, fy),(pw-pad, fy)], fill=(subt+(120,)) if s["card"] in ("glass","dark") else GRAY+(160,), width=1)
    d.text((pad, fy+12), "Quelle: WEF Global Gender Gap Report 2025", font=BODY(18), fill=subt)
    d.text((pw-pad-90, fy+12), "Astro · Leaflet", font=MONO(16), fill=subt)

    # round panel corners
    mask = Image.new("L", (pw,ph), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,pw-1,ph-1], radius=26, fill=255)
    panel.putalpha(mask)
    return panel

def build(s, path):
    img = Image.new("RGBA", (W,H), CHROME+(255,))
    d = ImageDraw.Draw(img)
    accent = hx(s["accent"])
    # header
    d.text((M, 40), s["idx"], font=SANSB(40), fill=accent)
    d.text((M+78, 46), s["name"], font=SANSB(34), fill=INK)
    d.text((M+78, 90), s["tag"], font=SANS(20), fill=GRAY)
    rlabel = "DESIGNVORSCHLAG"
    d.text((W-M-d.textlength(rlabel, font=SANSB(18)), 50), rlabel, font=SANSB(18), fill=GRAY)

    # panel
    panel = draw_mockup(s)
    # soft shadow
    sh = Image.new("RGBA", (W,H), (0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle([M, 134, M+panel.width, 130+panel.height+8], radius=26, fill=(0,0,0,70))
    sh = sh.filter(ImageFilter.GaussianBlur(16))
    img.alpha_composite(sh)
    img.alpha_composite(panel, (M, 130))

    # palette
    py = 130 + panel.height + 40
    d.text((M, py), "FARBPALETTE", font=SANSB(20), fill=INK)
    sw_y = py+34
    n = len(s["palette"])
    sw_w = (W-2*M - (n-1)*14)/n
    for i,c in enumerate(s["palette"]):
        x = M + i*(sw_w+14)
        rrect(d, (x, sw_y, x+sw_w, sw_y+92), 12, fill=hx(c)+(255,),
              outline=hx("#D8D8D4")+(255,), width=1)
        d.text((x+4, sw_y+100), c.upper(), font=MONO(16), fill=INK)

    # typography + chips
    ty = sw_y+150
    d.text((M, ty), "TYPOGRAFIE", font=SANSB(20), fill=INK)
    d.text((M, ty+30), f"Display: {s['disp'][0]}", font=SANSB(24), fill=INK)
    d.text((M, ty+64), f"Text: {s['body']}", font=SANS(22), fill=hx("#444444"))
    # chips
    cx = M
    cyy = ty+108
    for ch in s["chips"]:
        w = d.textlength(ch, font=SANSB(18)) + 36
        rrect(d, (cx, cyy, cx+w, cyy+40), 20, fill=hx(s["accent"])+(255,))
        d.text((cx+18, cyy+9), ch, font=SANSB(18), fill=(255,255,255))
        cx += w + 14

    img.convert("RGB").save(path, "PNG")
    print("wrote", path)

for s in STYLES:
    build(s, f"/tmp/design_{s['idx']}_{s['name'].split()[0].lower()}.png")
print("done")
