import  config  from 'config';

const NODE_ENV : string = config.get('server.NODE_ENV') ?? 'development';
const PORT : number = config.get('server.PORT') ?? 5001;

export const Config = {NODE_ENV,PORT}