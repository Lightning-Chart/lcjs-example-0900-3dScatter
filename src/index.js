/*
 * LightningChartJS example that showcases PointSeries in a 3D Chart.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Import xydata
const xydata = require('@lightningchart/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, SolidFill, ColorRGBA, PointStyle3D, Themes } = lcjs

// Extract required parts from xyData.
const { createWaterDropDataGenerator } = xydata

// Initiate chart
const chart3D = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .Chart3D({
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    const smallView = Math.min(window.innerWidth, window.innerHeight) < 500
    if (!window.__lcjsDebugOverlay) {
        window.__lcjsDebugOverlay = document.createElement('div')
        window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
        if (document.body) document.body.appendChild(window.__lcjsDebugOverlay)
        setInterval(() => {
            if (!window.__lcjsDebugOverlay.parentNode && document.body) document.body.appendChild(window.__lcjsDebugOverlay)
            window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + (Math.min(window.innerWidth, window.innerHeight) < 500)
        }, 500)
    }
    return t && smallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
    })
    .setTitle('3D Scatter Chart')

// Set Axis titles
chart3D.getDefaultAxisX().setTitle('Axis X')
chart3D.getDefaultAxisY().setTitle('Axis Y')
chart3D.getDefaultAxisZ().setTitle('Axis Z')

// Create Point Series for rendering max Y coords.
const pointSeriesMaxCoords = chart3D.addPointSeries().setName('Max coords')
pointSeriesMaxCoords.setPointStyle(
    new PointStyle3D.Triangulated({
        fillStyle: pointSeriesMaxCoords.getPointStyle().getFillStyle(),
        size: 10,
        shape: 'sphere',
    }),
)

// Create another Point Series for rendering other Y coords than Max.
const pointSeriesOtherCoords = chart3D.addPointSeries({ automaticColorIndex: 2 }).setName('Below Max')
pointSeriesOtherCoords.setPointStyle(
    new PointStyle3D.Triangulated({
        fillStyle: pointSeriesOtherCoords.getPointStyle().getFillStyle(),
        size: 5,
        shape: 'cube',
    }),
)

// Generate heatmap data for depicting amount of scattered points along the XZ plane.
let totalPointsAmount = 0
const rows = 40
const columns = 60
createWaterDropDataGenerator()
    .setRows(rows)
    .setColumns(columns)
    .generate()
    .then((data) => {
        // 'data' is a number Matrix number[][], that can be read as data[row][column].
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                const value = data[row][column]
                // Generate 'value' amount of points along this XZ coordinate,
                // with the Y coordinate range based on 'value'.
                const pointsAmount = Math.ceil(value / 100)
                const yMin = 0
                const yMax = value
                for (let iPoint = 0; iPoint < pointsAmount; iPoint++) {
                    const y = yMin + Math.random() * (yMax - yMin)
                    pointSeriesOtherCoords.add({ x: row, z: column, y })
                    totalPointsAmount++
                }
                pointSeriesMaxCoords.add({ x: row, z: column, y: yMax })
                totalPointsAmount++
            }
        }

        chart3D.setTitle(chart3D.getTitle() + ` (${totalPointsAmount} data points)`)
        // Set explicit Y Axis interval.
        chart3D.getDefaultAxisY().setInterval({ start: 0, end: 150, animate: 2000 })
    })
