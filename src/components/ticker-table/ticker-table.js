import React, { useEffect, useState } from 'react';
import camelcase from 'camelcase';
import Table from '../table/table';
import Loading from '../loading/loading';

const tradingPairSchema =  [
    'SYMBOL',
    'BID', 
    'BID_SIZE', 
    'ASK', 
    'ASK_SIZE', 
    'DAILY_CHANGE', 
    'DAILY_CHANGE_PERC', 
    'LAST_PRICE', 
    'VOLUME', 
    'HIGH', 
    'LOW'
]

const fundingCurrencySchema = [  
    'SYMBOL',
    'FRR', 
    'BID', 
    'BID_SIZE', 
    'BID_PERIOD',
    'ASK', 
    'ASK_SIZE',
    'ASK_PERIOD',
    'DAILY_CHANGE',
    'DAILY_CHANGE_PERC', 
    'LAST_PRICE',
    'VOLUME',
    'HIGH', 
    'LOW',
    '_PLACEHOLDER',
    '_PLACEHOLDER',
    'FRR_AMOUNT_AVAILABLE'
]

const schemaToObjectMaker = (schema) => (data) => schema
            .map((key) => camelcase(key))
            .reduce((prev, cur, idx) => {
                prev[cur] = data[idx];
                return prev;
            }, {});

const fundingCurencySchemaMapper = schemaToObjectMaker(fundingCurrencySchema);
const tradingPairSchemaMapper = schemaToObjectMaker(tradingPairSchema);

export default (props) => {
    const [ loading, setLoading ] = useState(true);
    const [ rows, setRows ] = useState([]);
    const headers = {
        'Name': 'symbol',
        'Last': 'lastPrice',
        '24hr': 'dailyChange',
        'Volume': 'volume',
    };
    useEffect(() => {
        const fetchTickers = async () => {
            const result = await fetch('https://api-pub.bitfinex.com/v2/tickers?symbols=ALL');
            // Ensure result is ok ect...
            const data = await result.json();
            const tickers = data.map(tickerData => {
                const mapper = tickerData.length === fundingCurrencySchema.length 
                    ? fundingCurencySchemaMapper
                    : tradingPairSchemaMapper;
                return mapper(tickerData);
            });
            setRows(tickers);
            setLoading(false);
        }
        fetchTickers();
    }, []);
    return loading ? <Loading /> : <Table rows={rows} headers={headers} />
}