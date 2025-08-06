# JavaScript 3D Scatter Chart

![JavaScript 3D Scatter Chart](3dScatter-darkGold.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

-   Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
-   Open the project folder in a terminal:

          npm install              # fetches dependencies
          npm start                # builds an application and starts the development server

-   The application is available at _http://localhost:8080_ in your browser, webpack-dev-server provides hot reload functionality.


## Description

_Also known as a Scatter Graph, Scatter Series, Point Graph, Scatter diagram or Scattergram_

This example shows a simple 3D Point Graph with points drawn using 3D PointSeries for a visual representation of the data points 'markers'. The point graph is a type of chart or mathematical diagram drawn on a Cartesian coordinate system and represents the relationship between two variables.

This type of series does not contain the visual representation of lines for the connection of data points but only data 'markers'.

The chart can be created with few simple lines of code:

```javascript
// Create a new ChartXY.
const chart3D = lightningChart().Chart3D()

// Add a line series using default X, Y and Z axes.
const series = chart3D.addPointSeries()
```

The series accepts points in format `{ x: number, y: number, z:number }`. Any number of points can be added with a single call.

```javascript
// Single point.
series.add({ x: 50, y: 60, z: 40 })

// Multiple points at once.
series.add([
    { x: 55, y: 60, z: 40 },
    { x: 60, y: 62, z: 40 },
    { x: 65, y: 65, z: 50 },
])
```


## API Links

* [3D chart]
* [3D point series]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [LightningChart][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact sales@lightningchart.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@lightningchart.com.

[0]: https://github.com/Arction/
[1]: https://lightningchart.com/lightningchart-js-api-documentation/
[2]: https://lightningchart.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://lightningchart.com/support-services/

© LightningChart Ltd 2009-2022. All rights reserved.


[3D chart]: https://lightningchart.com/js-charts/api-documentation/v8.0.0/classes/Chart3D.html
[3D point series]: https://lightningchart.com/js-charts/api-documentation/v8.0.0/classes/PointSeries3D.html

