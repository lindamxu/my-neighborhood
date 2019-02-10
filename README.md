
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Project Overview
## Objective
This project fulfills the last project for Udacity's Front End Nanodegree program which incorporates creating an React-based app about a chosen neighborhood and interfacing with APIs. The project was bootstrapped using create-react-app and uses the Google Maps API as well as the Foursquare API.

## Functionality
This app is a tourism app for the city of Chicago. I am using the Foursquare API to source their top recommendations and the details of each recommendation while using the Google Maps API to render the map and location markers. There are two main views: list view and map view. The two can be toggled with the hamburger menu that sits on the left of the filter box. The filter box takes in text input to filter the Foursquare recommended attractions by the name of the attraction.

NOTE: I've currently limited the recommendation results to be <b>5</b> due to how easy it is for the Foursquare API to reach the quota of the personal account. When daily quotas refresh at midnight UTC, I will increase up to 30 results.

## Responsiveness

While desktop and iPad interfaces see the list view as a sliding sidebar that splits the map view, mobile interfaces only sees the map or list view at one time, thus functioning more like a tab bar.  

# Installation

## Developer mode
1. Download this project to your local drive using the command: `git clone https://github.com/lindamxu/my-neighborhood.git`
2. Install project dependencies: `npm install` or `yarn install`
3. Start the development server, which should be http://localhost:3000/: `npm start`

## Service Worker
1. Run the following in your project directory: `npm run build`
2. Then run `npm install -g serve`
3. Deploy via the build folder: `serve -s build`

# Resources

1. [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)
2. [Google API Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)
3. [Foursquare API](https://developer.foursquare.com/docs)
4. [ARIA Guidelines](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
5. [Create React App](https://github.com/facebook/create-react-app)
