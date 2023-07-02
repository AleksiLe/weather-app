/* export interface WeatherStatus {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;

    hourly_units: {
        time: string;
        temperature_2m: string;
        relativehumidity_2m: string;
    }
    hourly: {
        time: Array<Date>;
        temperature_2m: Array<number>;
        relativehumidity_2m: Array<number>;
    }[]
    } */

export interface WeatherStatus {
    time: Array<String>;
    temperature_2m: Array<number>;
}