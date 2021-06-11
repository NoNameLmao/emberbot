
function Spiral(len, cent, func) {
	
	if (!func) {
		func = cent;
		cent = getCenter(len);
	}
	
	if (typeof func != 'function') throw(new Error('Your last argument MUST be a function'));
	
	var sorted = spiralLoop(len, Array(), cent, Array());
	
	for (var i = 0; i < sorted.length; i++) {
		var val = func.apply(this, sorted[i][0]);
		if (val) return;
	}
}


function getCenter(len) {
	var center = Array();
	for (var i = 0; i < len.length; i++) {
		center[i] = len[i] / 2;
	}
	return center;
}

function spiralLoop(len, cur, center, arr) {
	if (len.length == cur.length) arr.push([cur, distFromCenter(center, cur)]);
	for (var i = 0; i < len[cur.length]; i++) {
		spiralLoop(len, cur.concat([i]), center, arr);
	}
	if (cur.length == 0) return arr.sort(function(a, b) {
		if (a[1] > b[1]) return 1;
		if (a[1] == b[1]) return 0;
		else return -1;
	});
}

function distFromCenter(center, cur) {
	var total = 0;
	for (var i = 0; i < center.length; i++) {
		var val = center[i] - cur[i];
		total += val*val;
	}
	return Math.sqrt(total);
}

module.exports = Spiral;
