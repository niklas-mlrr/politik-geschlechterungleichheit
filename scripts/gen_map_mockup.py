#!/usr/bin/env python3
"""Large detailed warm-humanist mockup with a real choropleth world map."""
import json, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

FD = "/usr/share/fonts/truetype/dejavu/"
def F(n,s): return ImageFont.truetype(FD+n, s)
SANS  = lambda s: F("DejaVuSans.ttf", s)
SANSB = lambda s: F("DejaVuSans-Bold.ttf", s)
SERIF = lambda s: F("DejaVuSerif.ttf", s)
SERIFB= lambda s: F("DejaVuSerif-Bold.ttf", s)
MONO  = lambda s: F("DejaVuSansMono.ttf", s)

def hx(h):
    h=h.lstrip("#"); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def lerp(a,b,t): return tuple(int(round(a[i]+(b[i]-a[i])*t)) for i in range(3))

# warm palette
SAND=hx("#F1E8DA"); INK=hx("#3B2F26"); SUBT=hx("#8A7A66")
CLAY=hx("#AE6A52"); OCHER=hx("#CBA46F"); SAGE=hx("#5C7A6B")
SURF=hx("#E8DAC6"); OCEAN=hx("#E3DDCF"); BORDER=hx("#F1E8DA")

# diverging scale low->mid->high
def scale(v):
    t=max(0.0,min(1.0,(v-55)/(93-55)))
    stops=[(0.0,hx("#A8473B")),(0.5,hx("#CD9A63")),(1.0,hx("#4F7A66"))]
    for i in range(len(stops)-1):
        t0,c0=stops[i]; t1,c1=stops[i+1]
        if t<=t1:
            return lerp(c0,c1,(t-t0)/(t1-t0))
    return stops[-1][1]

# --- gender gap values (% closed), curated 2025 approximations ---
EXACT={"ISL":92.6,"FIN":87.9,"NOR":86.3,"GBR":83.8,"NZL":82.7,"SWE":81.7,"NAM":81.1,
"DEU":80.3,"IRL":80.1,"PAK":56.7,"SDN":57.0,"TCD":57.1,"IRN":58.3,"AFG":55.0,
"DNK":78.5,"NLD":77.8,"ESP":79.0,"FRA":79.0,"CHE":77.0,"BEL":77.5,"AUT":76.0,"LUX":78.0,
"USA":74.7,"CAN":77.0,"AUS":77.8,"PHL":78.1,"MEX":76.0,"ARG":76.2,"BRA":74.0,"CHL":75.0,
"RWA":79.0,"ZAF":78.0,"MOZ":72.0,"GIN":60.0,"COD":62.0,"NER":60.5,"DZA":64.0,"MLI":62.0,
"EGY":63.0,"YEM":58.0,"SYR":60.0,"IRQ":62.0,"SAU":64.5,"IND":64.1,"CHN":68.0,"JPN":66.6,
"KOR":69.6,"TUR":62.0,"RUS":71.0}
REGION={"WN_EU":80,"SE_EU":72,"NAM":75,"LATAM":72,"E_ASIA":69,"SE_ASIA":71,"S_ASIA":64,
"C_ASIA":69,"MENA":62,"SSA":67,"OCE":75}
WN_EU={"ISL","FIN","NOR","GBR","SWE","IRL","DNK","NLD","BEL","DEU","AUT","CHE","FRA","LUX"}
SE_EU={"ESP","PRT","ITA","GRC","MLT","CYP","POL","CZE","SVK","SVN","HRV","HUN","ROU","BGR",
"EST","LVA","LTU","SRB","BIH","MKD","MNE","ALB","MDA","UKR","BLR"}
NAMER={"USA","CAN","GRL","BMU"}
LATAM={"MEX","GTM","BLZ","SLV","HND","NIC","CRI","PAN","COL","VEN","ECU","PER","BOL","BRA",
"PRY","URY","ARG","CHL","CUB","DOM","HTI","JAM","TTO","GUY","SUR","PRI","BHS","GUF"}
E_ASIA={"CHN","JPN","KOR","PRK","TWN","MNG"}
SE_ASIA={"THA","VNM","LAO","KHM","MMR","MYS","IDN","PHL","BRN","TLS","PNG"}
S_ASIA={"IND","BGD","LKA","NPL","BTN","PAK","AFG"}
C_ASIA={"KAZ","UZB","TKM","KGZ","TJK"}
MENA={"SAU","ARE","QAT","KWT","OMN","YEM","IRQ","IRN","SYR","JOR","LBN","ISR","PSE","EGY",
"LBY","TUN","DZA","MAR","ESH","TUR"}
OCE={"AUS","NZL","FJI","SLB","VUT","NCL"}
def region_default(iso):
    if iso in WN_EU: return REGION["WN_EU"]
    if iso in SE_EU: return REGION["SE_EU"]
    if iso in NAMER: return REGION["NAM"]
    if iso in LATAM: return REGION["LATAM"]
    if iso in E_ASIA: return REGION["E_ASIA"]
    if iso in SE_ASIA: return REGION["SE_ASIA"]
    if iso in S_ASIA: return REGION["S_ASIA"]
    if iso in C_ASIA: return REGION["C_ASIA"]
    if iso in MENA: return REGION["MENA"]
    if iso in OCE: return REGION["OCE"]
    return REGION["SSA"]
def gg(iso):
    return EXACT.get(iso, region_default(iso))

# ---- canvas ----
W,H = 1640, 2680
img = Image.new("RGBA",(W,H), SAND+(255,))
d = ImageDraw.Draw(img)
def rr(box,r,fill=None,outline=None,width=1): d.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=width)
def tc(cx,y,s,f,fill):
    w=d.textlength(s,font=f); d.text((cx-w/2,y),s,font=f,fill=fill)

PAD=80

# ===== browser chrome =====
rr((0,0,W,64),0,fill=hx("#E0D6C5")+(255,))
for i,c in enumerate(["#D98C7A","#E3C07A","#8FB89E"]):
    d.ellipse((28+i*30,24,48+i*30,44),fill=hx(c)+(255,))
rr((150,16,W-40,48),16,fill=SAND+(255,))
d.text((176,24),"gleichstellung-weltweit.netlify.app",font=SANS(20),fill=SUBT)

# ===== nav =====
ny=92
rr((PAD,ny,PAD+250,ny+50),25,fill=CLAY+(255,))
d.text((PAD+24,ny+13),"GLEICHSTELLUNG",font=SANSB(20),fill=(255,255,255))
for i,l in enumerate(["Weltkarte","Vorbilder","Daten","Zeitstrahl","Stimmen"]):
    d.text((PAD+330+i*150,ny+14),l,font=SANS(21),fill=INK)
d.text((W-PAD-44,ny+14),"DE",font=SANSB(21),fill=CLAY)

# ===== hero =====
hy=210
d.text((PAD,hy),"WELTWEITER GENDER GAP · WEF 2025",font=SANSB(24),fill=CLAY)
big=SERIFB(220)
d.text((PAD-8,hy+38),"132",font=big,fill=CLAY)
nw=d.textlength("132",font=big)
d.text((PAD+nw+30,hy+120),"Jahre",font=SERIFB(78),fill=INK)
d.text((PAD,hy+300),"bis zur globalen Gleichstellung",font=SERIFB(56),fill=INK)
d.text((PAD,hy+385),"Beim heutigen Tempo dauert es noch rund fünf Generationen, bis die",font=SANS(26),fill=SUBT)
d.text((PAD,hy+422),"weltweite Geschlechterkluft geschlossen ist. Kein Land hat sie erreicht.",font=SANS(26),fill=SUBT)
# buttons
by=hy+490
rr((PAD,by,PAD+290,by+62),31,fill=CLAY+(255,))
d.text((PAD+44,by+18),"Karte erkunden",font=SANSB(24),fill=(255,255,255))
rr((PAD+312,by,PAD+560,by+62),31,fill=None,outline=INK+(255,),width=2)
d.text((PAD+356,by+18),"Zu den Daten",font=SANSB(24),fill=INK)

# ===== MAP SECTION =====
sec_y=by+150
d.text((PAD,sec_y),"GESCHLECHTERGERECHTIGKEIT WELTWEIT",font=SANSB(24),fill=CLAY)
d.text((PAD,sec_y+34),"Jedes Land eingefärbt nach geschlossenem Gender Gap",font=SERIFB(40),fill=INK)

map_box=(PAD, sec_y+110, W-PAD, sec_y+110+760)
mx0,my0,mx1,my1=map_box
mw,mh=mx1-mx0,my1-my0
rr(map_box,28,fill=OCEAN+(255,))
# clip layer for map
mlayer=Image.new("RGBA",(mw,mh),(0,0,0,0))
md=ImageDraw.Draw(mlayer)
LAT_T,LAT_B=83.0,-56.0
LON_L,LON_R=-169.0,190.0
def proj(lon,lat):
    x=(lon-LON_L)/(LON_R-LON_L)*mw
    y=(LAT_T-lat)/(LAT_T-LAT_B)*mh
    return (x,y)
geo=json.load(open("data/world.geo.json"))
def draw_poly(coords,color):
    for ring_i,ring in enumerate(coords):
        if ring_i>0: continue  # exterior only
        pts=[proj(lon,lat) for lon,lat in ring]
        if len(pts)>=3:
            md.polygon(pts,fill=color+(255,),outline=hx("#EDE6D7")+(255,))
for f in geo["features"]:
    iso=f.get("id")
    if iso in ("ATA","-99","ATF","FLK") or iso is None: continue
    col=scale(gg(iso))
    g=f["geometry"]
    if g["type"]=="Polygon": draw_poly(g["coordinates"],col)
    else:
        for poly in g["coordinates"]: draw_poly(poly,col)
# round mask
mask=Image.new("L",(mw,mh),0)
ImageDraw.Draw(mask).rounded_rectangle([0,0,mw-1,mh-1],radius=28,fill=255)
img.paste(mlayer,(mx0,my0),Image.composite(mlayer.split()[3],Image.new("L",(mw,mh),0),mask))

# marker pins + callouts
def pin(lon,lat,color):
    x,y=proj(lon,lat); x+=mx0; y+=my0
    d.ellipse((x-9,y-9,x+9,y+9),fill=color+(255,),outline=(255,255,255,255),width=3)
    return x,y
def callout(ax,ay,cx,cy,title,rank,val,note,color):
    cw,ch=344,150
    # nearest card anchor to pin
    anchor=(min(max(ax,cx),cx+cw), min(max(ay,cy),cy+ch))
    d.line([(ax,ay),anchor],fill=color+(255,),width=3)
    d.ellipse((anchor[0]-5,anchor[1]-5,anchor[0]+5,anchor[1]+5),fill=color+(255,))
    sh=Image.new("RGBA",(W,H),(0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle((cx+5,cy+8,cx+cw+5,cy+ch+8),18,fill=(60,40,20,60))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(10)))
    rr((cx,cy,cx+cw,cy+ch),18,fill=(255,255,255,255))
    rr((cx,cy,cx+10,cy+ch),18,fill=color+(255,))
    d.text((cx+30,cy+18),title,font=SERIFB(30),fill=INK)
    d.text((cx+30,cy+64),rank,font=SANS(20),fill=SUBT)
    vw=d.textlength(val,font=SERIFB(34))
    d.text((cx+cw-24-vw,cy+58),val,font=SERIFB(34),fill=color)
    d.text((cx+30,cy+104),note,font=SANS(20),fill=SUBT)

# pins first (so lines/cards sit on top)
pI=pin(-19,64,scale(92.6))
pP=pin(69,30,scale(56.7))
pD=pin(10,51,scale(80.3))
callout(*pI, mx0+34, my0+150, "Island","Platz 1 / 148","92,6%","Spitze seit 16 Jahren",SAGE)
callout(*pD, mx1-368, my0+34, "Deutschland","Platz 9 / 148","80,3%","Nachholbedarf im Beruf",SAGE)
callout(*pP, mx1-368, my0+470, "Pakistan","Platz 148 / 148","56,7%","Geringste Teilhabe",CLAY)

# legend
lgx,lgy=mx0+30,my1-58
lg=np.zeros((26,360,3),np.uint8)
for i in range(360):
    lg[:,i]=scale(55+(93-55)*i/359)
img.paste(Image.fromarray(lg,"RGB"),(lgx,lgy))
d.rectangle((lgx,lgy,lgx+360,lgy+26),outline=hx("#D8CDBA")+(255,),width=1)
for frac,lab in [(0,"56%"),(0.5,"74%"),(1.0,"93%")]:
    d.text((lgx+360*frac-12,lgy+32),lab,font=MONO(17),fill=INK)
d.text((lgx,lgy-26),"Gender Gap geschlossen",font=SANSB(18),fill=INK)

# ===== KPI strip =====
ky=map_box[3]+60
kpis=[("132","Jahre bis zur Gleichstellung"),("68,5%","Weltweiter Durchschnitt"),
("8 / 10","Top-Länder liegen in Europa"),("148","ausgewertete Länder")]
kw=(W-2*PAD-3*24)/4
for i,(num,lab) in enumerate(kpis):
    kx=PAD+i*(kw+24)
    rr((kx,ky,kx+kw,ky+150),20,fill=SURF+(255,))
    d.text((kx+26,ky+24),num,font=SERIFB(52),fill=CLAY)
    d.text((kx+26,ky+100),lab,font=SANS(20),fill=SUBT)

# ===== two columns vorbilder / schlusslichter =====
cy=ky+210
colw=(W-2*PAD-30)/2
def country_panel(px,title,accent,rows):
    rr((px,cy,px+colw,cy+360),24,fill=SURF+(255,))
    d.text((px+30,cy+26),title,font=SANSB(22),fill=accent)
    yy=cy+74
    mx=max(v for _,v in rows)
    for name,v in rows:
        d.text((px+30,yy),name,font=SERIF(24),fill=INK)
        d.text((px+colw-118,yy),f"{v:.1f}%".replace('.',','),font=SANSB(22),fill=accent)
        bx0,bx1=px+30,px+colw-130
        rr((bx0,yy+34,bx1,yy+46),6,fill=hx("#D9CBB6")+(255,))
        rr((bx0,yy+34,bx0+(bx1-bx0)*(v/100),yy+46),6,fill=accent+(255,))
        yy+=62
country_panel(PAD,"VORBILDER · TOP 5",SAGE,
    [("Island",92.6),("Finnland",87.9),("Norwegen",86.3),("Großbritannien",83.8),("Schweden",81.7)])
country_panel(PAD+colw+30,"SCHLUSSLICHTER · BOTTOM 5",CLAY,
    [("Pakistan",56.7),("Sudan",57.0),("Tschad",57.1),("Iran",58.3),("Algerien",64.0)])

# ===== timeline =====
ty=cy+420
d.text((PAD,ty),"MEILENSTEINE",font=SANSB(24),fill=CLAY)
d.text((PAD,ty+34),"Wichtige Etappen der Gleichstellung",font=SERIFB(40),fill=INK)
line_y=ty+150
d.line([(PAD+10,line_y),(W-PAD-10,line_y)],fill=hx("#D2C4AE")+(255,),width=4)
events=[("1893","Neuseeland: Frauen-\nwahlrecht, weltweit 1."),
("1979","UN-Frauenrechts-\nkonvention (CEDAW)"),
("2009","Island wählt erste\noffen lesbische Premier"),
("2025","Noch 132 Jahre bis\nzur globalen Parität")]
n=len(events); seg=(W-2*PAD-20)/(n-1)
for i,(yr,txt) in enumerate(events):
    ex=PAD+10+i*seg
    d.ellipse((ex-12,line_y-12,ex+12,line_y+12),fill=CLAY+(255,),outline=(255,255,255,255),width=3)
    d.text((ex-30,line_y-70),yr,font=SERIFB(34),fill=INK)
    for j,ln in enumerate(txt.split("\n")):
        d.text((ex-30,line_y+26+j*26),ln,font=SANS(19),fill=SUBT)

# ===== quote =====
qy=line_y+170
rr((PAD,qy,W-PAD,qy+230),24,fill=SAGE+(255,))
d.text((PAD+40,qy+6),"“",font=SERIFB(150),fill=(255,255,255,90))
q1="„Kultur macht keine Menschen."
q2="Menschen machen Kultur.“"
d.text((PAD+150,qy+50),q1,font=SERIFB(42),fill=(255,255,255))
d.text((PAD+150,qy+108),q2,font=SERIFB(42),fill=(255,255,255))
d.text((PAD+150,qy+172),"— Chimamanda Ngozi Adichie, Schriftstellerin (Nigeria)",font=SANS(22),fill=hx("#DDE7E0"))

# ===== footer =====
fy=qy+280
d.line([(PAD,fy),(W-PAD,fy)],fill=hx("#D2C4AE")+(255,),width=1)
d.text((PAD,fy+20),"Quelle: WEF Global Gender Gap Report 2025 · Karte vereinfacht, Werte teils gerundet",font=SANS(20),fill=SUBT)
d.text((W-PAD-330,fy+20),"Astro · Leaflet · Chart.js",font=MONO(18),fill=SUBT)

img.convert("RGB").save("/home/openclaw/projects/politik/mockup_warm_map.png","PNG")
print("done", img.size)
