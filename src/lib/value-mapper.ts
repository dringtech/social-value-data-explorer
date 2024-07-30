export class ValueMapper {
    private _domain: { min: number, size: number };
    private _range: { min: number, size: number };

    constructor(opts: { domain?: [number, number], range?: [number, number]} = {}) {
        const { domain, range } = opts;
        if (domain) this.domain(...domain);
        if (range) this.domain(...range);
    }

    domain(min: number, max: number) {
        this._domain = { min, size: max - min };
    }

    range(min: number, max: number) {
        this._range = { min, size: max - min };
    }

    map(value: number) {
        if (this._range && this._domain) {
            return ((value - this._domain.min) * this._range.size / this._domain.size) + this._range.min;
        }
        console.warn('Domain or range not set');
        return 0;
    }
}