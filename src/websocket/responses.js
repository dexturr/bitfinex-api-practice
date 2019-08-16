import camelcase from 'camelcase';

const TICKER_MESSAGE_SCHEMA = [
    'BID',
    'BID_SIZE',
    'ASK',
    'ASK_SIZE',
    'DAILY_CHANGE',
    'DAILY_CHANGE_PERC',
    'LAST_PRICE',
    'VOLUME',
    'HIGH',
    'LOW',
];

export const tickerResponseMessage = (message) => {
    const [channelId, rawData] = message;
    const data = TICKER_MESSAGE_SCHEMA
      .map((key) => camelcase(key))
      .reduce((prev, cur, idx) => {
          prev[cur] = rawData[idx];
          return prev;
      }, {});
    return {
        channelId,
        data,
    };
}