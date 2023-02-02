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
    [CELL.EMPTY]: { [WEATHER.RAINY]: "#acacac", [WEATHER.CLOUDY]: "darkblue", [WEATHER.SUNNY]: "white", [WEATHER.HEATWAVE]: "lightgrey" },
    [CELL.GRASS]: { [WEATHER.RAINY]: "lightblue", [WEATHER.CLOUDY]: "darkblue", [WEATHER.SUNNY]: "green", [WEATHER.HEATWAVE]: "lightgrey" },
    [CELL.GRAZER]: { [WEATHER.RAINY]: "lightblue", [WEATHER.CLOUDY]: "darkblue", [WEATHER.SUNNY]: "yellow", [WEATHER.HEATWAVE]: "lightgrey" },
    [CELL.PREDATOR]: { [WEATHER.RAINY]: "lightblue", [WEATHER.CLOUDY]: "darkblue", [WEATHER.SUNNY]: "red", [WEATHER.HEATWAVE]: "lightgrey" },
    [CELL.ALPHAMALE]: { [WEATHER.RAINY]: "lightblue", [WEATHER.CLOUDY]: "darkblue", [WEATHER.SUNNY]: "purple", [WEATHER.HEATWAVE]: "lightgrey" },
    [CELL.BANELING]: { [WEATHER.RAINY]: "lightblue", [WEATHER.CLOUDY]: "darkblue", [WEATHER.SUNNY]: "black", [WEATHER.HEATWAVE]: "lightgrey" },

};

module.exports = {
    CELL: CELL,
    WEATHER: WEATHER,
    WEATHER_COLOR: WEATHER_COLOR
}