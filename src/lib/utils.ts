export function scaler(dMin: number, dMax: number, rMin: number, rMax: number) {
    const r = rMax - rMin;
    const d = dMax - dMin;
    const s = (x: number) => r * (x - dMin) / d + rMin;
    s.inverse = (x: number) => d * (x - rMin) / r + dMin;
    return s;
}

export function pick(o, ...keys) {
    return Object.keys(o)
        .filter(key => keys.includes(key))
        .reduce((a, k) => ({...a, [k]: o[k]}), {})
}