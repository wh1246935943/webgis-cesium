let infoBoxXY = {};

  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTFmODBlNS1kMDBjLTQxMDktYmJiNi0yYTQ5YmIyZDI5MDQiLCJpZCI6MTEyODY4LCJpYXQiOjE2NjcwNTM3MzR9.uAXnM4bVfiIeISP0Jko7GK9fKEUFmxh6A2ATK6mUGyc'
  var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
  });

  // 加载倾斜摄影
  var tileset = new Cesium.Cesium3DTileset({
    //相对路径，我这里是放的根目录
    url: 'http://localhost:9003/model/tXeKt0vKE/tileset.json',
    preferLeaves: true,
    //【重要】内存建议显存大小的50%左右，内存分配变小有利于倾斜摄影数据回收，提升性能体验
    maximumMemoryUsage: 1500,
    cullWithChildrenBounds: true,
    skipLevelOfDetail: true
  });

  // 添加到球体上
  var tileset = viewer.scene.primitives.add(tileset);

  //定位过去
  viewer.zoomTo(tileset);
