/**
 * 添加用户凭证
 * 该凭证来自用户的cseium账户的开发者中心
 */
// Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTFmODBlNS1kMDBjLTQxMDktYmJiNi0yYTQ5YmIyZDI5MDQiLCJpZCI6MTEyODY4LCJpYXQiOjE2NjcwNTM3MzR9.uAXnM4bVfiIeISP0Jko7GK9fKEUFmxh6A2ATK6mUGyc'
// /**
// * 生成视图容器对象
// */
// var viewer = new Cesium.Viewer(
// 	'cesiumContainer',
// 	{
// 		// baseLayerPicker: false, // 禁用底图选择器
//     // imageryProvider: false, // 禁用默认底图
//     // skyBox: false, // 禁用天空盒
//     // skyAtmosphere: false // 禁用大气效果
// 	}
// );
function createImageryLayer(params = {}) {
	const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
		tileMatrixSetID: 'GoogleCRS84Quad',
		service: 'WMTS',
		layer: '',
		style: '',
		version: '1.0.0',
		request: 'GetTile',
		format: 'image/png',
		tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
		tilingScheme: new Cesium.GeographicTilingScheme(),
		...params
	});
	return new Cesium.ImageryLayer(imageryProvider);
};
/**
 * 创建wmts图层并添加到场景
 */
const wmtsLayer = createImageryLayer({ url: 'http://172.16.20.50:7010/sj_raster/v6/wmts/image/system/10030401/0?ak=mf72ff9295c740ec0f37e61433e8a3ad8d' })
viewer.scene.imageryLayers.add(wmtsLayer);
/**
 * 通过瓦片的行列计算瓦片的位置坐标,
 * 这里的位置单位为弧度
 */
const tilerow = 5036, tilecol = 26368;
const tilingScheme = new Cesium.GeographicTilingScheme();
const rectangle = tilingScheme.tileXYToRectangle(tilecol, tilerow, 14);
/**
 * 将弧度转换为经纬度
 * 获取瓦片中心点的经纬度
 */
var centerLon = Cesium.Math.toDegrees(Cesium.Rectangle.center(rectangle).longitude);
var centerLat = Cesium.Math.toDegrees(Cesium.Rectangle.center(rectangle).latitude);
/**
 * 将相机视图移动到瓦片的中心位置
 */
function flyToTile() {
	viewer.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(
			centerLon,
			centerLat,
			30000
		),
	});
}
