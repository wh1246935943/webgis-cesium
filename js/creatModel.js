function updateInfoBox(p, P3D) {
	const cesiumContainer = document.getElementById('cesiumContainer');
	const boxs = document.getElementsByClassName('gismodel-info-box');

	if (boxs.length > 0) {
		Array.from(boxs).forEach((item) => {
			cesiumContainer.removeChild(item)
		});
		infoBoxXYZ = {}
	};
	if (!p) return;

	cesiumContainer.style.position = 'relative';
	const box = document.createElement('div');
	box.style.top = `${p.y}px`;
	box.style.left = `${p.x}px`;
	box.innerText = '你好 cesium!!!';
	box.classList.add('gismodel-info-box');
	
	infoBoxXYZ = P3D
	const close = document.createElement('span');
	close.classList.add('gisInfo-box-close');
	close.innerText = '×';
	close.onclick = () => {
		updateInfoBox()
	};
	box.appendChild(close);
	cesiumContainer.appendChild(box);
};