const WEATHER = {
    RAINY: "rainy",
    CLOUDY: "cloudy",
    SUNNY: "sunny",
    HEATWAVE: "heatwave"
}

const CELL = {
    EMPTY: 'empty',
    GRASS: 'grass',
    GRAZER: "grazer",
    PREDATOR: "predator",
    ALPHAMALE: "alphamale",
    BANELING: "baneling"
}

const WEATHER_COLOR = {
    [CELL.EMPTY]: { [WEATHER.RAINY]: "#52ffee", [WEATHER.CLOUDY]: "lightgrey", [WEATHER.SUNNY]: "white", [WEATHER.HEATWAVE]: "#472700" },
    [CELL.GRASS]: { [WEATHER.RAINY]: "#14ff6e", [WEATHER.CLOUDY]: "#0d6100", [WEATHER.SUNNY]: "#169400", [WEATHER.HEATWAVE]: "#91ff80" },
    [CELL.GRAZER]: { [WEATHER.RAINY]: "#dbdb00", [WEATHER.CLOUDY]: "#b8b800", [WEATHER.SUNNY]: "#ffff00", [WEATHER.HEATWAVE]: "#ffff52" },
    [CELL.PREDATOR]: { [WEATHER.RAINY]: "#e0004b", [WEATHER.CLOUDY]: "#ff6b6b", [WEATHER.SUNNY]: "red", [WEATHER.HEATWAVE]: "#ff6b6b" },
    [CELL.ALPHAMALE]: { [WEATHER.RAINY]: "#8900fa", [WEATHER.CLOUDY]: "#8600b3", [WEATHER.SUNNY]: "#bf00ff", [WEATHER.HEATWAVE]: "#d24dff" },
    [CELL.BANELING]: { [WEATHER.RAINY]: "#5c94a3", [WEATHER.CLOUDY]: "black", [WEATHER.SUNNY]: "black", [WEATHER.HEATWAVE]: "#bdbdbd" },
};

const WEATHER_DURATION = {
    [CELL.GRASS]: { [WEATHER.RAINY]: 1000, [WEATHER.CLOUDY]: 1200, [WEATHER.SUNNY]: 750, [WEATHER.HEATWAVE]: 1000 },
    [CELL.GRAZER]: { [WEATHER.RAINY]: 1500, [WEATHER.CLOUDY]: 1000, [WEATHER.SUNNY]: 1000, [WEATHER.HEATWAVE]: 1000 },
    [CELL.PREDATOR]: { [WEATHER.RAINY]: 1500, [WEATHER.CLOUDY]: 1000, [WEATHER.SUNNY]: 1000, [WEATHER.HEATWAVE]: 1000 },
    [CELL.ALPHAMALE]: { [WEATHER.RAINY]: 1500, [WEATHER.CLOUDY]: 1000, [WEATHER.SUNNY]: 1000, [WEATHER.HEATWAVE]: 1000 },
    [CELL.BANELING]: { [WEATHER.RAINY]: 1500, [WEATHER.CLOUDY]: 1000, [WEATHER.SUNNY]: 1000, [WEATHER.HEATWAVE]: 1000 },
}

module.exports = {
    CELL: CELL,
    WEATHER: WEATHER,
    WEATHER_COLOR: WEATHER_COLOR,
    WEATHER_DURATION: WEATHER_DURATION
}