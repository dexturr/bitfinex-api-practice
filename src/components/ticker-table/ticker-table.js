import React, { useEffect, useState } from 'react';
import camelcase from 'camelcase';

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
            console.log(tickers);
            setLoading(false);
        }
        fetchTickers();
    });
    return loading ? 'Loading' : (
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">24hr</th>
            <th scope="col">Vol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    )
}