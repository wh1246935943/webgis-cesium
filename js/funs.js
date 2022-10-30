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