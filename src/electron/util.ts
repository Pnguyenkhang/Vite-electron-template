export function isDev(): boolean {
    console.log('isDev', process.env.NODE_ENV);
    return process.env.NODE_ENV === 'development';
}