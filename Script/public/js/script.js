var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);

 var headers_ip = req.getResponseHeader("IP");
 $("#p2").html("<td class='tablekey'>IP</td><td class='tableval'><strong>" + headers_ip +"</strong></td>");

         var time = req.getResponseHeader("time");
 $("#time").html("<td class='tablekey'>Time</td><td class='tableval'><strong>" + time.substr(0, 20) + "</strong></td>");
 var reqtime = req.getResponseHeader("reqtime");
  var rtt = req.getResponseHeader("roundtrip");
 $("#rtt").html("<td class='tablekey'>Round Trip Time</td><td class='tableval'><strong>" + rtt/1000 + " ms</strong></td>");
   var cndwnd = req.getResponseHeader("cndwnd");

      var startTime = new Date().getTime();
var img = new Image();
img.onload = function() { 
    var loadtime = new Date().getTime() - startTime;
    var bandwidth = Math.round((1305/(loadtime*.001))/1024)
    $("#bandwidth").html("<td class='tablekey'>Throughput</td><td class='tableval'><strong>" + bandwidth + " mbps </strong></td>");

     

};




        $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
            var table_body = "";
            $.each(data, function(k, v) {

                $('#'+k).html("<td class='tablekey'>"+k+"</td><td class='tableval'><strong>" + v + "</strong></td>");
            });

        });


BOOMR.init({
    beacon_url: "public/images/boom.jpg",
    BW: {
    base_url: "public/images/",
    block_beacon: true
  },
      });

