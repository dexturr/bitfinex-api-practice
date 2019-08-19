So this is my little playground project.

I have tried here to connect to both the rest and websocket API's. I am using a CORS chrome extension for ease of development currently, so loading the project *will not work* without one to rewrite headers for you.

I was trying to setup a project as if it was going to be long term. I have created a websocket flow for redux, started creating a test harness for acceptance tests, but need to find a suitable websocket mock, in order to have a good level of acceptance testing. I was also trying to see how far I could get using hooks and no thunks. I have a loading HOC but not many others because of this.

Going forward I intend to plug the tickers into the websocket API make each table row subscribe and unsubscribe to the ticker websocket, which would be a performance boost as I would not be managing any more subscriptions than we on screen. I would also add further tests for the ticker table, mocking out fetch, to verify that different data sets send back from the websocket work properly. I also will evenutally need to use `reselect` to tidy up my reducers.

I am pretty happy with the table performance as it is virualized and the sort function is memoized, so I am not sure what more could be done here in order to optimize better (with the exception of the subscription thing above), though I would be very keen to know if there is something I am missing! Potentially sorting the data in the redux store if multiple panels needed sight of this data.

The whole app needs a bit of a tidy up as this was my personal playground and I didn't really think anyone would see it, but I will tidy it up as I intend to keep working on it.


