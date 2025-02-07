import * as Cesium from 'cesium'


export default  class BaseClass {
  viewer: Cesium.Viewer
  scene: Cesium.Scene

  constructor(container: HTMLDivElement, config: Cesium.Viewer.ConstructorOptions) {
    this.viewer = new Cesium.Viewer(container, config)
    this.scene = this.viewer.scene
  }
}

