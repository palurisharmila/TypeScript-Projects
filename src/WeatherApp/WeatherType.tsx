 export interface WeatherType {
    name:string,
    weather:{
        description:string
    }[],
    main:{
        temp:number,
        humidity:number,
    }
}