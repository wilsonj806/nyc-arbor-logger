# NYC Arbor Logger
## Overview
This is a data visualization app that display tree census data and some other things. This is the **front-end** of a full-stack app that fetches and displays data that has been processed by the corresponding Python/ Flask backend. It'll run on React and D3 with React Context, and Hooks to handle global app state(Redux is probably overkill).

## Requirements
The app should show the data that it fetched from the backend as graphs.In addition, we need to be able to navigate between the different charts that we can generate and show. Pretty straight-forwards requirements, making mock-ups is kind of overkill since the way the user navigates through the app is fairly simple.

## Local Setup
You'll need to clone the backend associated with this app, here's the [Github repository](https://github.com/wilsonj806/nyc-tree-data-fetcher) for it. Once you set up the repo on your local environment, you can set up the front-end by cloning this repository:
```
  git clone https://github.com/wilsonj806/nyc-arbor-logger.git
```
In addition, you'll need Node.js(and npm which comes included) to run and install whatever dependencies this app has.

Once you have the above done, change into the cloned repo's directory and run `npm i`.

Then run the below to start the app and enjoy!
```
  npm run start
```