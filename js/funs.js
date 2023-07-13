function changeHeight(height) {
	const h = Number(height);
	if (isNaN(h)) {
		return;
	};

	const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
	const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
	const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, h);
	const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());

	tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
};

/**
 * 获取相机状态
 */
function getCameraState() {
	const { position, heading, pitch, roll } = viewer.camera;
	const cameraPosition = position.clone();
	
	var ellipsoid = viewer.scene.globe.ellipsoid;
	var cartographic = ellipsoid.cartesianToCartographic(cameraPosition);
	var lon = Cesium.Math.toDegrees(cartographic.longitude);
	var lat = Cesium.Math.toDegrees(cartographic.latitude);
	var height = cartographic.height;
	return {position: position.clone(), heading, pitch, roll, lon, lat, height }
};