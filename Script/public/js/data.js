
var runcount = 0;
BOOMR.subscribe('before_beacon', function(o) {
	var html = "", t_name, t_other, others = [];



	if(!o.t_other) o.t_other = "";

	for(var k in o) {
		if(!k.match(/^(t_done|t_other|bw|lat|bw_err|lat_err|u|r2?)$/)) {
			if(k.match(/^t_/)) {
				o.t_other += "," + k + "|" + o[k];
			}
			else {
				others.push(k + " = " + o[k]);
			}
		}
	}

	if(o.t_done) { html += "This page took " + o.t_done + " ms to load<br>"; }
	if(o.t_other) {
		t_other = o.t_other.replace(/^,/, '').replace(/\|/g, ' = ').split(',');
		html += "Other timers measured: <br>";
		for(var i=0; i<t_other.length; i++) {
			html += "&nbsp;&nbsp;&nbsp;" + t_other[i] + " ms<br>";
		}
	}
	if(o.bw) { html += "Your bandwidth to this server is " + parseInt(o.bw*8/1024/1024) + "mbps (&#x00b1;" + parseInt(o.bw_err*100/o.bw) + "%)<br>"; }
	if(o.lat) { html += "Your latency to this server is " + parseInt(o.lat) +"ms " + "(&#x00b1;" + o.lat_err + "ms)<br>"; }

	
	document.getElementById('bandwidthh').innerHTML = "<td class='tablekey'>Bandwidth</td><td class='tableval' id='bandwidthval'><strong>" + parseInt(o.bw*8/1024/1024) + "mbps "
	document.getElementById('loadtime').innerHTML = "<td class='tablekey'>Page Load</td><td class='tableval' id='loadtimeval'><strong>" + o.t_done + "ms</strong></td>"
	document.getElementById('latency').innerHTML = "<td class='tablekey'>Connection Latency</td><td class='tableval' id='latencyval'><strong>" + parseInt(o.lat) +"ms "


if(runcount ==0){	

var json = [];
var obj = {};
$('#requestinfo').find('tr').each(function(){
        $td = $(this).find('td'),
        key = $td.eq(0).text().trim(),
        val = $td.eq(1).find('strong').text().trim();
    obj[key] = val;
     
});


$('#GeoResults').find('tr').each(function(){
        $td = $(this).find('td'),
        key = $td.eq(0).text().trim(),
        val = $td.eq(1).find('strong').text().trim();
    obj[key] = val;
     
});


$('#serverinfo').find('tr').each(function(){
        $td = $(this).find('td'),
        key = $td.eq(0).text().trim(),
        val = $td.eq(1).find('strong').text().trim();
    obj[key] = val;
     
});


$('#latencyinfo').find('tr').each(function(){
        $td = $(this).find('td'),
        key = $td.eq(0).text().trim(),
        val = $td.eq(1).find('strong').text().trim();
    obj[key] = val; 
     
});

var socket = io(':3003');

    socket.emit('finalanswer', JSON.stringify(obj));

runcount = 1;
}


	

	if(others.length) {
		r.innerHTML += "Other parameters:<br>";

		for(var i=0; i<others.length; i++) {
			var t = document.createTextNode(others[i]);
			r.innerHTML += "&nbsp;&nbsp;&nbsp;";
			r.appendChild(t);
			r.innerHTML += "<br>";

		}
	} 
}); 



