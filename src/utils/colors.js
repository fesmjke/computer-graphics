function rgb2cmyk(rgb) {
    const { R, G, B } = rgb;
    
    let c = 1 - (R / 255);
    let m = 1 - (G / 255);
    let y = 1 - (B / 255);
    let k = Math.min(c, Math.min(m, y));
  
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
  
    c = Number.isNaN(c) ? 0 : c;
    m = Number.isNaN(m) ? 0 : m;
    y = Number.isNaN(y) ? 0 : y;
    k = Number.isNaN(k) ? 0 : k;
  
    return {
      C: c,
      M: m,
      Y: y,
      K: k,
    };
}

function rgb2hsv(rgb) {
    let {R,G,B} = rgb;
    
    let r = R / 255; 
    let g = G / 255;
    let b = B / 255;
  
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, v = max;
  
    let d = max - min;
    s = max == 0 ? 0 : d / max;
  
    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return { H: h, S: s, V: v };
  }

function hsv2rgb(HSV) {
    const {H, S, V} = HSV;
    let r, g, b, i, f, p, q, t;

    i = Math.floor(H * 6);
    f = H * 6 - i;
    p = V * (1 - S);
    q = V * (1 - f * S);
    t = V * (1 - (1 - f) * S);
    
    switch (i % 6) {
        case 0: {r = V; g = t; b = p; break;}
        case 1: {r = q; g = V; b = p; break;}
        case 2: {r = p; g = V; b = t; break;}
        case 3: {r = p; g = q; b = V; break;}
        case 4: {r = t; g = p; b = V; break;}
        case 5: {r = V; g = p; b = q; break;}
    }
    return {
        R: Math.round(r * 255),
        G: Math.round(g * 255),
        B: Math.round(b * 255)
    };
}

export {
    rgb2cmyk,
    rgb2hsv,
    hsv2rgb
}