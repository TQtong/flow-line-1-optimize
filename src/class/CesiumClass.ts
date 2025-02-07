import * as Cesium from 'cesium'

import BaseClass from './BaseClass'

export default class CesiumClass extends BaseClass {

  private static defaultConfig = {
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    clockViewModel: new Cesium.ClockViewModel(new Cesium.Clock()), //用于控制当前时间的时钟对象
    selectedImageryProviderViewModel: undefined, //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    // imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    selectedTerrainProviderViewModel: undefined, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
    // terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), //可供BaseLayerPicker选择的地形图层ProviderViewModel数组
    fullscreenElement: document.body, //全屏时渲染的HTML元素,
    useDefaultRenderLoop: true, //如果需要控制渲染循环，则设为true
    targetFrameRate: undefined, //使用默认render loop时的帧率
    showRenderLoopErrors: false, //如果设为true，将在一个HTML面板中显示错误信息
    automaticallyTrackDataSourceClocks: true, //自动追踪最近添加的数据源的时钟设置
    contextOptions: {
      // 支持html2cavas截图
      webgl: {
        preserveDrawingBuffer: true // 设置为 true 来启用
      }
    },
    sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
    mapProjection: new Cesium.WebMercatorProjection(), //地图投影体系
    dataSources: new Cesium.DataSourceCollection()
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //     url: "http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&L={z}&Z={z}&Y={y}&X={x}",
    //     credit: new Cesium.Credit("高德地图服务"),
    //     subdomains: ["webrd01", "webrd02", "webrd03", "webrd04"],
    //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //     maximumLevel: 18
    // }),
    // terrainProvider: new Cesium.EllipsoidTerrainProvider(),//地形图层提供者，仅baseLayerPicker设为false有意义
    // skyBox: new Cesium.SkyBox({
    //     sources: {
    //         positiveX: 'Cesium-1.7.1/Skybox/px.jpg',
    //         negativeX: 'Cesium-1.7.1/Skybox/mx.jpg',
    //         positiveY: 'Cesium-1.7.1/Skybox/py.jpg',
    //         negativeY: 'Cesium-1.7.1/Skybox/my.jpg',
    //         positiveZ: 'Cesium-1.7.1/Skybox/pz.jpg',
    //         negativeZ: 'Cesium-1.7.1/Skybox/mz.jpg'
    //     }
    // }),//用于渲染星空的SkyBox对象
  }

  constructor(container: HTMLDivElement, config: Cesium.Viewer.ConstructorOptions = CesiumClass.defaultConfig) {
    super(container, config)

    this.viewer.cesiumWidget.creditContainer.remove() // 去除版权信息
  }

  public createWorldTerrain() {
    Cesium.createWorldTerrainAsync().then((terrainProvider) => {
      this.viewer.terrainProvider = terrainProvider
    })
  }

  public showFramesPerSecond() {
    this.scene.debugShowFramesPerSecond = true
  }

  public removeDefaultImageryProvider() {
    const viewer = this.viewer
    viewer.imageryLayers.remove(viewer.imageryLayers.get(0)); // 去除默认影像图层
  }

  public removeDefaultTerrainProvider() {
    const viewer = this.viewer
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider() // 去除默认地形图层
  }
}