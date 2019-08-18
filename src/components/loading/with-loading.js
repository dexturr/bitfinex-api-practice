import React from 'react';
import Loading from './loading';

export default (Component) => (props) => {
    const { loading } = props;
    return loading ? <Loading /> : <Component {...props} />;
}