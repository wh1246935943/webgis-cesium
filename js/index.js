let infoBoxXY = {};

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTFmODBlNS1kMDBjLTQxMDktYmJiNi0yYTQ5YmIyZDI5MDQiLCJpZCI6MTEyODY4LCJpYXQiOjE2NjcwNTM3MzR9.uAXnM4bVfiIeISP0Jko7GK9fKEUFmxh6A2ATK6mUGyc'

var viewer = new Cesium.Viewer('cesiumContainer', {
	infoBox: false,
});

viewer.scene.globe.depthTestAgainstTerrain = true;

// 加载倾斜摄影
var tileset = new Cesium.Cesium3DTileset({
	//相对路径，我这里是放的根目录
	url: 'http://localhost:9003/model/tV3r5phCS/tileset.json',
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

tileset.readyPromise.then(tileset => {
	console.log(tileset)
	// //
	let surface = Cesium.Cartesian3.fromRadians(0, 0, 0);
	// //模型改变的位置
	let offset = Cesium.Cartesian3.fromRadians(0, 0, 565);
	// //定义模型的改变状态
	let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());

	tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)

	viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(1, -0.2, tileset.boundingSphere.radius * 1.0));

}).catch(function (error) {
	console.log(error);
});

var canvas = viewer.scene.canvas;
var handler = new Cesium.ScreenSpaceEventHandler(canvas);
//点击事件
handler.setInputAction(function (movement) {
	//根据返回的位置信息 获取添加的实体 pickedLabel
	let pickedLabel = viewer.scene.pick(movement.position);
	var ray = viewer.camera.getPickRay(movement.position);
	var position = viewer.scene.globe.pick(ray, viewer.scene);

	updateInfoBox(pickedLabel ? movement.position : null, position);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


function updateInfoBox(p, P3D) {
	const cesiumContainer = document.getElementById('cesiumContainer');
	const boxs = document.getElementsByClassName('gismodel-info-box');

	if (boxs.length > 0) {
		Array.from(boxs).forEach((item) => {
			cesiumContainer.removeChild(item)
		});
		infoBoxXY = {}
	};
	if (!p) return;

	cesiumContainer.style.position = 'relative';
	const box = document.createElement('div');
	box.style.width = '200px';
	box.style.height = '100px';
	box.style.background = '#0000008f';
	box.style.borderRadius = '0 20px 20px';
	box.style.position = 'absolute';
	box.style.color = '#ffffff';
	box.style.padding = '10px';
	box.style.top = `${p.y}px`;
	box.style.left = `${p.x}px`;
	box.innerText = '你好 cesium!!!';
	box.classList.add('gismodel-info-box');
	infoBoxXY = P3D
	const close = document.createElement('span');
	close.classList.add('gisInfo-box-close');
	close.innerText = '×';
	close.onclick = () => {
		updateInfoBox()
	};
	box.appendChild(close);
	cesiumContainer.appendChild(box);
};


viewer.scene.postRender.addEventListener(function (e) {

	if (!infoBoxXY.x) return;

	var winpos = viewer.scene.cartesianToCanvasCoordinates(infoBoxXY);

	const boxs = document.getElementsByClassName('gismodel-info-box')[0];

	boxs.style.left = winpos.x + 'px';
	boxs.style.top = winpos.y + 'px';
});