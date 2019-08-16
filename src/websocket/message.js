export const generateTickerMessage = ({ symbol }) => {
    return { 
        event: 'subscribe', 
        channel: 'ticker', 
        symbol, 
    }
}