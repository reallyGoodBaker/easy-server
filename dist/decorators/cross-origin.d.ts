export interface CrossOriginConf {
    allowOrigin: string | string[];
    allowMethods: string | string[];
    allowHeaders: string | string[];
    allowCredentials: boolean;
    exposeHeaders: string | string[];
    maxAge: number;
}
export interface CrossOriginFilterConf {
    origin: string;
    requestMethod: string;
    requestHeaders: string | string[];
}
export declare const Cors: (corsConf: CrossOriginConf) => ParameterDecorator;
export declare const CorsFilter: (corsFilterConf: CrossOriginFilterConf) => ParameterDecorator;
