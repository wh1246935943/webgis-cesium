/**
 * 记录当前弹出来的信息弹框所对应的空间坐标
 * 用于拖拽界面后，查找其对应的视图坐标
 * 视图做标为该控件坐标所处的视图位置到视图容器的左上角的屏幕坐标，以像素为单位
 */
var infoBoxXYZ = {};
/**
 * 添加用户凭证
 * 该凭证来自用户的cseium账户的开发者中心
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTFmODBlNS1kMDBjLTQxMDktYmJiNi0yYTQ5YmIyZDI5MDQiLCJpZCI6MTEyODY4LCJpYXQiOjE2NjcwNTM3MzR9.uAXnM4bVfiIeISP0Jko7GK9fKEUFmxh6A2ATK6mUGyc'
/**
 * 生成视图容器对象
 */
var viewer = new Cesium.Viewer('cesiumContainer', {
	infoBox: false,
});
// 开启深度检测
viewer.scene.globe.depthTestAgainstTerrain = true;
/**
 * 加载倾斜摄影
 * 也就是加载模型
 * 如果模型时osgb格式，亲将其转换成3Dtileset.json格式，
 * 可以使用CesiumLab工具转换，具体方式可百度查阅
 */
var tileset = new Cesium.Cesium3DTileset({
	//相对路径，我这里是放的根目录
	url: 'http://localhost:9003/model/tV3r5phCS/tileset.json',
	preferLeaves: true,
	maximumMemoryUsage: 1500,
	cullWithChildrenBounds: true,
	skipLevelOfDetail: true
});
/**
 * 将模型添加到场景中
 * 这里也就是地球中
 */
viewer.scene.primitives.add(tileset);
/**
 * 视图定位到当前模型
 */
viewer.zoomTo(tileset);
/**
 * 调整模型高度，使其贴合地面
 */
tileset.readyPromise.then(tileset => {
	changeHeight(16)
}).catch(function (error) {});
/**
 * 拿到场景的渲染的容器
 */
var canvas = viewer.scene.canvas;
var handler = new Cesium.ScreenSpaceEventHandler(canvas);
/**
 * 鼠标左键设置点击事件
 * 当点击webgis视图时弹出当前坐标的弹框
 */
handler.setInputAction(function (movement) {
	//根据返回的位置信息 获取添加的实体 pickedLabel
	let pickedLabel = viewer.scene.pick(movement.position);
	var ray = viewer.camera.getPickRay(movement.position);
	var position = viewer.scene.globe.pick(ray, viewer.scene);

	updateInfoBox(pickedLabel ? movement.position : null, position);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
/**
 * 监听场景重新渲染的回调，这里用来实时更新信息弹框的位置
 */
viewer.scene.postRender.addEventListener(function (e) {

	if (!infoBoxXYZ.x) return;

	const winpos = viewer.scene.cartesianToCanvasCoordinates(infoBoxXYZ);
	const boxs = document.getElementsByClassName('gismodel-info-box')[0];

	boxs.style.left = winpos.x + 'px';
	boxs.style.top = winpos.y + 'px';
});