export type ChartData = {
    [k: string]: number,
}[]

export type ChartSeries = {
    x: string;
    y: string;
    colour: string;
}

export type Range = {
    min: number;
    max: number;
};

export type AxisConfig = {
    min?: number;
    max?: number;
}