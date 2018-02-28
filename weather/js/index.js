jQuery(document).ready(function() {
	$('input[type="button"]').click(function(event) {
		//var $city=encodeURI($('input[type=text]').val());
		//使用get方法传递数据时需要将url中的中文字符转码
		getData();
	});
	function getData(city) {
		//var $city=encodeURI("广州");
		$.ajax({
			// url: 'http://v.juhe.cn/weather/index?format=2&cityname='+city+'&key=beb359c7aac59c79296f29456f64cd73',
			// dataType: "jsonp",
			// type:"get",
			url: 'http://v.juhe.cn/weather/index',
			dataType: "jsonp",
			type:"post",
			data: {
				"format":2,
				"cityname": $('input[type=text]').val(),
				"key": 'beb359c7aac59c79296f29456f64cd73',
			}
			//data: {param1: 'value1'},		发送到服务器的数据
		})
		.done(function(data) {
			var today=data.result.today;
			$('p').eq(0).html(`当前温度：${today.temperature}`);
			$('p').eq(1).html(`当前风向：${today.wind}`);
			$('p').eq(2).html(`当前天气：${today.weather}`);
			$('p').eq(3).html(`当前城市：${today.city}`);
			$('p').eq(4).html(`更新时间：${today.date_y}`);

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}
	
});