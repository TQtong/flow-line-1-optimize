import * as Cesium from 'cesium'

import CesiumClass from './class/CesiumClass'

import jsonData from './line.json'

import FlowLineAppearance from './FlowLineAppearance'

export const init = (container: HTMLDivElement) => {
  const cesiumClass = new CesiumClass(container)

  cesiumClass.createWorldTerrain()
  cesiumClass.showFramesPerSecond()

  cesiumClass.viewer.scene.globe.depthTestAgainstTerrain = true

  const positions: number[][] = []

  jsonData.features.forEach((feature) => {
    feature.geometry.coordinates.forEach((coordinate) => {
      positions.push(coordinate)
    })
  })

  // const lineGeometry = new Cesium.PolylineGeometry({
  //   positions: Cesium.Cartesian3.fromDegreesArray(positions.flat()),
  //   width: 5,
  // })

  // const lineInstance = new Cesium.GeometryInstance({
  //   geometry: lineGeometry,
  // })

  // const linePrimitive = new Cesium.Primitive({
  //   geometryInstances: lineInstance,
  //   appearance: new FlowLineAppearance(0.0001),
  // })

    const lineGeometry = new Cesium.GroundPolylineGeometry({
    positions: Cesium.Cartesian3.fromDegreesArray(positions.flat()),
    width: 5,
  })

  const lineInstance = new Cesium.GeometryInstance({
    geometry: lineGeometry,
  })

  const linePrimitive = new Cesium.GroundPolylinePrimitive({
    geometryInstances: lineInstance,
    appearance: new FlowLineAppearance(0.0001),
  })

  cesiumClass.viewer.scene.primitives.add(linePrimitive)

  cesiumClass.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.78690170709499, 32.71153210422544, 1000000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
  })
}
