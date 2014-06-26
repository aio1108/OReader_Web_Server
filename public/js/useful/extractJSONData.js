function extractDispatch(target)
{
	var action = $(target).find('#infoStorage').attr('attr1');
	
	if(action=="business_indicator.xml")
	{
		parsing_business_indicator(target,action);
	}
	else if(action=="agricultural_trade.xml")
	{
		parsing_agricultural_trade(target,action);
	}
	else if(action=="stock_publish.xml")
	{
		parsing_stock_publish(target,action);
	}
	else if(action=="air_pollution.xml")
	{
		parsing_air_pollution(target,action);
	}
}

function parsing_business_indicator(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var defaultViewType = $(target).find('#infoStorage').attr('attr2'); 
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 $.get(getDataURL, function(data) {
		 
		// 表格
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr><th>date</th><th>領先指標綜合指數</th><th>領先指標不含趨勢指數</th><th>同時指標綜合指數</th><th>同時指標不含趨勢指數</th><th>落後指標綜合指數</th><th>落後指標不含趨勢指數</th></tr></thead><tbody>";
		  
		 
		 for ( var o in data.data.root.records[0] ) {
			 //alert(o);
			 //names.push( o ); // the property name
		 }
		 
		 $.each(data.data.root.records, function (index, value) {
	    		appendStr=appendStr+"<tr><td>"+value.date+"</td><td>"+value.leadGeneralIndicator+"</td><td>"+value.leadGeneralIndicatorWithoutTrend+"</td><td>"+value.sameGeneralIndicator+"</td><td>"+value.sameGeneralIndicatorWithoutTrend+"</td><td>"+value.behindGeneralIndicator+"</td><td>"+value.behindGeneralIndicatorWithoutTrend+"</td></tr>"
	     });
		appendStr=appendStr+"</tbody></table>"; 
		
		$('body').append(appendStr);
		
		$('body table').last().dataTable({
		     "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
	});
	$(appendTarget).find('.modal-body').append("<div id='tableViewContainer' ></div>");
	$(appendTarget).find('.modal-body').find('#tableViewContainer').append($("#"+modal_id+"_wrapper"));
	
	
	//Highcharts
	
	//解析data
	var d=[];
	var l=[];
	var lw=[];
	var s=[];
	var sw=[];
	var b=[];
	var bw=[];
	var countIndex=0;
	$.each(data.data.root.records, function (index, value) {
		
		if(value.leadGeneralIndicator!=null)
		{
	    		d.push(countIndex);
	    		countIndex++;
	    		l.push(parseFloat(value.leadGeneralIndicator));
	    		lw.push(parseFloat(value.leadGeneralIndicatorWithoutTrend));
	    		s.push(parseFloat(value.sameGeneralIndicator));
	    		sw.push(parseFloat(value.sameGeneralIndicatorWithoutTrend));
	    	 	b.push(parseFloat(value.behindGeneralIndicator));
	    	 	bw.push(parseFloat(value.behindGeneralIndicatorWithoutTrend));	
		}
	    	//appendStr=appendStr+"<tr><td>"+value.date+"</td><td>"+value.leadGeneralIndicator+"</td><td>"+value.leadGeneralIndicatorWithoutTrend+"</td><td>"+value.sameGeneralIndicator+"</td><td>"+value.sameGeneralIndicatorWithoutTrend+"</td><td>"+value.behindGeneralIndicator+"</td><td>"+value.behindGeneralIndicatorWithoutTrend+"</td></tr>"
		    });
	 
	 	
	 	
	$(appendTarget).find('.modal-body').append("<div id='chartViewContainer' style='height: 400px; width:auto;'></div>");
	$('#chartViewContainer').highcharts({
	         title: {
	             text: '',
	             x: -20 //center
	         },
		          chart: {
	             zoomType: 'x',
	             spacingRight: 20
	         },
	         subtitle: {
	             text: '',
	             x: -20
	         },
	         xAxis: {
	         	maxZoom: 14 //, // fourteen days
	             //categories: d
	         },
	         yAxis: {
	             title: {
	                 text: ''
	             },
	             plotLines: [{
	                 value: 0,
	                 width: 1,
	                 color: '#808080'
	             }]
	         },
	         tooltip: {
	             valueSuffix: ''
	         },
	         legend: {
	             layout: 'vertical',
	             align: 'right',
	             verticalAlign: 'middle',
	             borderWidth: 0
	         },
	         series: [{
	             name: '領先指標綜合指數',
	             data: l
	         }, {
	             name: '領先指標不含趨勢指數',
	             data: lw
	         }, {
	             name: '同時指標綜合指數',
	             data: s
	         }, {
	             name: '同時指標不含趨勢指數',
	             data: sw
	         }, {
	             name: '落後指標綜合指數',
	             data: b
	         }, {
	             name: '落後指標不含趨勢指數',
	             data: bw
	         }]
	     });
	 	
			
		$(appendTarget).find('.modal-body').append("<div style='background:#000;' id='function_Bar'><span>檢視：<a name='tableChange'>表格</a> ｜ <a name='chartChange'>圖</a> ｜ <a name='mapChange'>地圖</a></span>&#12288;&#12288;<span>資料格式：<a href=''>JSON</a> ｜ <a href=''>XML</a> ｜ <a href=''>CSV</a></span>&#12288;&#12288;<span>分享：<a href=''>Facebook</a> ｜ <a href=''>Google+</a> ｜ <a href=''>Plurk</a> ｜ <a href=''>Twitter</a></span>&#12288;&#12288;<span><a href=''>最愛</a></span></div>");
		
		//切換defaultViewType
		
		if(defaultViewType=="chart")
		{
			$('a[name=chartChange]').click();
		}
		else if(defaultViewType=="map")
		{
			$('a[name=mapChange]').click();
		}
		else if(defaultViewType=="table")
		{
			$('a[name=tableChange]').click();
		}
	});
}


function parsing_agricultural_trade(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var defaultViewType = $(target).find('#infoStorage').attr('attr2'); 
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 for ( var o in data.records[0] ) {
			 th_html=th_html+"<th>"+o+"</th>";
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.records, function (index, value) {
			 var td_html="";
			 for (var i=0;i<names.length;i++) {
				 td_html=td_html+"<td>"+value[names[i]]+"</td>";
			 }
	    	 //appendStr=appendStr+"<tr><td>"+value[names[0]]+"</td><td>"+value[names[1]]+"</td><td>"+value[names[2]]+"</td><td>"+value[names[3]]+"</td><td>"+value[names[4]]+"</td><td>"+value[names[5]]+"</td><td>"+value[names[6]]+"</td><td>"+value[names[6]]+"</td><td>"+value[names[7]]+"</td><td>"+value[names[8]]+"</td></tr>";
			 appendStr=appendStr+"<tr>"+td_html+"</tr>";
	     });
		appendStr=appendStr+"</tbody></table>"; 
		$('body').append(appendStr);
		
		$('body table').last().dataTable({
		     "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
		});
		$(appendTarget).find('.modal-body').append("<div id='tableViewContainer' ></div>");
		$(appendTarget).find('.modal-body').find('#tableViewContainer').append($("#"+modal_id+"_wrapper"));
		
		
		
		
		$(appendTarget).find('.modal-body').append("<div style='background:#000;' id='function_Bar'><span>檢視：<a name='tableChange'>表格</a> ｜ <a name='chartChange'>圖</a> ｜ <a name='mapChange'>地圖</a></span>&#12288;&#12288;<span>資料格式：<a href=''>JSON</a> ｜ <a href=''>XML</a> ｜ <a href=''>CSV</a></span>&#12288;&#12288;<span>分享：<a href=''>Facebook</a> ｜ <a href=''>Google+</a> ｜ <a href=''>Plurk</a> ｜ <a href=''>Twitter</a></span>&#12288;&#12288;<span><a href=''>最愛</a></span></div>");
		
		//切換defaultViewType
		
		if(defaultViewType=="chart")
		{
			$('a[name=chartChange]').click();
		}
		else if(defaultViewType=="map")
		{
			$('a[name=mapChange]').click();
		}
		else if(defaultViewType=="table")
		{
			$('a[name=tableChange]').click();
		}

	});

}

function parsing_stock_publish(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var defaultViewType = $(target).find('#infoStorage').attr('attr2'); 
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 for ( var o in data.records[0] ) {
			 th_html=th_html+"<th>"+o+"</th>";
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.records, function (index, value) {
			 var td_html="";
			 for (var i=0;i<names.length;i++) {
				 td_html=td_html+"<td>"+value[names[i]]+"</td>";
			 }
	    	 //appendStr=appendStr+"<tr><td>"+value[names[0]]+"</td><td>"+value[names[1]]+"</td><td>"+value[names[2]]+"</td><td>"+value[names[3]]+"</td><td>"+value[names[4]]+"</td><td>"+value[names[5]]+"</td><td>"+value[names[6]]+"</td><td>"+value[names[6]]+"</td><td>"+value[names[7]]+"</td><td>"+value[names[8]]+"</td></tr>";
			 appendStr=appendStr+"<tr>"+td_html+"</tr>";
	     });
		appendStr=appendStr+"</tbody></table>"; 
		$('body').append(appendStr);
		
		$('body table').last().dataTable({
		     "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
		});
		$(appendTarget).find('.modal-body').append("<div id='tableViewContainer' ></div>");
		$(appendTarget).find('.modal-body').find('#tableViewContainer').append($("#"+modal_id+"_wrapper"));
		
		
		
		
		$(appendTarget).find('.modal-body').append("<div style='background:#000;' id='function_Bar'><span>檢視：<a name='tableChange'>表格</a> ｜ <a name='chartChange'>圖</a> ｜ <a name='mapChange'>地圖</a></span>&#12288;&#12288;<span>資料格式：<a href=''>JSON</a> ｜ <a href=''>XML</a> ｜ <a href=''>CSV</a></span>&#12288;&#12288;<span>分享：<a href=''>Facebook</a> ｜ <a href=''>Google+</a> ｜ <a href=''>Plurk</a> ｜ <a href=''>Twitter</a></span>&#12288;&#12288;<span><a href=''>最愛</a></span></div>");
		
		//太寬 調整CSS
		
		$(appendTarget).find('#tableViewContainer').css({
			width:'950',
            height:'auto', 
            'overflow-y': 'auto',
           'max-height':'100%'});
		
		//切換defaultViewType
		
		if(defaultViewType=="chart")
		{
			$('a[name=chartChange]').click();
		}
		else if(defaultViewType=="map")
		{
			$('a[name=mapChange]').click();
		}
		else if(defaultViewType=="table")
		{
			$('a[name=tableChange]').click();
		}

	});

}
function parsing_air_pollution(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var defaultViewType = $(target).find('#infoStorage').attr('attr2'); 
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 for ( var o in data.records[0] ) {
			 th_html=th_html+"<th>"+o+"</th>";
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.records, function (index, value) {
			 var td_html="";
			 for (var i=0;i<names.length;i++) {
				 td_html=td_html+"<td>"+value[names[i]]+"</td>";
			 }
	    	 //appendStr=appendStr+"<tr><td>"+value[names[0]]+"</td><td>"+value[names[1]]+"</td><td>"+value[names[2]]+"</td><td>"+value[names[3]]+"</td><td>"+value[names[4]]+"</td><td>"+value[names[5]]+"</td><td>"+value[names[6]]+"</td><td>"+value[names[6]]+"</td><td>"+value[names[7]]+"</td><td>"+value[names[8]]+"</td></tr>";
			 appendStr=appendStr+"<tr>"+td_html+"</tr>";
	     });
		appendStr=appendStr+"</tbody></table>"; 
		$('body').append(appendStr);
		
		$('body table').last().dataTable({
		     "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
		});
		$(appendTarget).find('.modal-body').append("<div id='tableViewContainer' ></div>");
		$(appendTarget).find('.modal-body').find('#tableViewContainer').append($("#"+modal_id+"_wrapper"));
		
		
		
		
		$(appendTarget).find('.modal-body').append("<div style='background:#000;' id='function_Bar'><span>檢視：<a name='tableChange'>表格</a> ｜ <a name='chartChange'>圖</a> ｜ <a name='mapChange'>地圖</a></span>&#12288;&#12288;<span>資料格式：<a href=''>JSON</a> ｜ <a href=''>XML</a> ｜ <a href=''>CSV</a></span>&#12288;&#12288;<span>分享：<a href=''>Facebook</a> ｜ <a href=''>Google+</a> ｜ <a href=''>Plurk</a> ｜ <a href=''>Twitter</a></span>&#12288;&#12288;<span><a href=''>最愛</a></span></div>");
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		//切換defaultViewType
		
		if(defaultViewType=="chart")
		{
			$('a[name=chartChange]').click();
		}
		else if(defaultViewType=="map")
		{
			$('a[name=mapChange]').click();
		}
		else if(defaultViewType=="table")
		{
			$('a[name=tableChange]').click();
		}

	});

}