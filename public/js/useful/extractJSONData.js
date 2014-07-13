function extractDispatch(target)
{
	var action = $(target).find('#infoStorage').attr('attr1');
	var appendTarget=$(target).attr('data-target');
	
	$(appendTarget).find('.modal-body').append("<div id='imgAjaxLoad' align='middle'><img src='../img/ajax-loader.gif' alt='ajaxLoad'></div>");
	
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
	else if(action=="credit_card.xml")
	{
		parsing_credit_card(target,action);
	}
	else if(action=="gdp_year_indicator.xml")
	{
		parsing_gdp_year_indicator(target,action);
	}
	else if(action=="gdp_quarter_indicator.xml")
	{
		parsing_gdp_quarter_indicator(target,action);
	}
	else if(action=="health_food.xml")
	{
		parsing_health_food(target,action);
	}
	else if(action=="ultra_violet.xml")
	{
		parsing_ultra_violet(target,action);
	}
	else if(action=="drama_info.xml")
	{
		parsing_drama_info(target,action);
	}
}

function afterLoadingResult (target)
{
	var appendTarget=$(target).attr('data-target');
	var defaultViewType = $(target).find('#infoStorage').attr('attr2');
	var viewTypeStr = $(target).find('#infoStorage').attr('attr3');
	
	//functionBar
	//$(appendTarget).find('.modal-body').append("<div style='background:#000;' id='function_Bar'><span>檢視：<a name='tableChange'>表格</a> ｜ <a name='chartChange'>圖</a> ｜ <a name='mapChange'>地圖</a></span>&#12288;&#12288;<span>資料格式：<a href=''>JSON</a> ｜ <a href=''>XML</a> ｜ <a href=''>CSV</a></span>&#12288;&#12288;<span>分享：<a href=''>Facebook</a> ｜ <a href=''>Google+</a> ｜ <a href=''>Plurk</a> ｜ <a href=''>Twitter</a></span>&#12288;&#12288;<span><a href=''>最愛</a></span></div>");
	//$(appendTarget).find('.modal-body').append("<div id='function_Bar' >檢視:<a id='icon_view_table' alt='表格' name='tableChange' class='noViewSepia' ></a><a id='icon_view_chart' alt='圖' name='chartChange' class='noViewSepia' ></a><a id='icon_view_map' alt='地圖' name='mapChange' class='noViewSepia'></a>資料格式:<a id='icon_data_json' alt='JSON'></a><a id='icon_data_xml' alt='XML'></a><a id='icon_data_csv' alt='CSV'></a>分享:<a id='icon_social_facebook' alt='Facebook'></a><a id='icon_social_google' alt='Google+'></a><a id='icon_social_plurk' alt='Plurk'></a><a id='icon_social_twitter' alt='Twitter'></a>最愛:<a id='icon_favorite' alt='最愛'></a></div>");
	$(appendTarget).find('.modal-body').append("<div id='function_Bar' >檢視:<a id='icon_view_table_g' alt='表格' name='tableChange' ></a><a id='icon_view_chart_g' alt='圖' name='chartChange' ></a><a id='icon_view_map_g' alt='地圖' name='mapChange' ></a>資料格式:<a id='icon_data_json' alt='JSON'></a><a id='icon_data_xml' alt='XML'></a><a id='icon_data_csv' alt='CSV'></a>分享:<a id='icon_social_facebook' alt='Facebook'></a><a id='icon_social_google' alt='Google+'></a><a id='icon_social_plurk' alt='Plurk'></a><a id='icon_social_twitter' alt='Twitter'></a>最愛:<a id='icon_favorite' alt='最愛'></a></div>");
	
	
	//將非顯示樣式的圖示反灰
	var viewTypeArray=viewTypeStr.split(",");
	
	for(var i=0;i<viewTypeArray.length;i++)
	{
		if(viewTypeArray[i]=="table")
		{
			//$(appendTarget).find('a[name=tableChange]').removeClass("noViewSepia");
			$(appendTarget).find('a[name=tableChange]').attr("id",'icon_view_table');
		}
		else if(viewTypeArray[i]=="line_chart"||viewTypeArray[i]=="bar_chart"||viewTypeArray[i]=="map_chart")
		{
			//$(appendTarget).find('a[name=chartChange]').removeClass("noViewSepia");
			$(appendTarget).find('a[name=chartChange]').attr("id",'icon_view_chart');
		}
		else if(viewTypeArray[i]=="map")
		{
			//$(appendTarget).find('a[name=mapChange]').removeClass("noViewSepia");
			$(appendTarget).find('a[name=mapChange]').attr("id",'icon_view_map');
		}
		
	}
	
	//移除gif
	$(appendTarget).find('.modal-body').find('#imgAjaxLoad').remove();
	
	//切換defaultViewType
	if(defaultViewType=="line_chart"||defaultViewType=="bar_chart"||defaultViewType=="map_chart")
	{
		$(appendTarget).find('a[id=icon_view_chart]').click();
	}
	else if(defaultViewType=="map")
	{
		$(appendTarget).find('a[id=icon_view_map]').click();
		$(appendTarget).find('.modal-body').find('#function_Bar').before($(appendTarget).find('#mapViewContainer'));
		$(appendTarget).find('.modal-body').find('#mapViewContainer').show();
	}
	else if(defaultViewType=="table")
	{
		$(appendTarget).find('a[id=icon_view_table]').click();
	}
	
	//訂閱過反灰
	//alert(appendTarget.substr(1,appendTarget.length));
	var compareStr=appendTarget.substr(1,appendTarget.length);
	
	 for (var i=0;i<metaDataAId.length;i++) {
		if(compareStr==metaDataAId[i])//bingo gray
		{
			//alert("bingo");
			$('#icon_favorite',appendTarget).attr("id","icon_favorite_g");
			$(target).find('#infoStorage').attr('attr4',subscribesId[i]);
		}
	 }
	
	
}



function parsing_business_indicator(target,action)
{
	//alert($(triggerA).attr('data-target'));
	
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.data.root.records[0] ) {
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.data.root.records, function (index, value) {
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
	$(appendTarget).find('.modal-body').find('#chartViewContainer').highcharts({
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
		
		
		afterLoadingResult(target);
		
	});
}


function parsing_agricultural_trade(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.records[0] ) {
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
		
		afterLoadingResult(target);
	});

}

function parsing_stock_publish(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.records[0] ) {
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
		
		
		//太寬 調整CSS
		
		$(appendTarget).find('#tableViewContainer').css({
            height:'auto', 
            'overflow-y': 'auto',
           'max-height':'100%'});

		afterLoadingResult(target);
	});

}
var serverURL="http://127.0.0.1:8081/hyAPPServer/";
var validateURL=serverURL+"metaDS?&category=validate";
var checkUserId="opendatanews1@gmail.com";
var checkPassword="58efea";
function parsing_air_pollution(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.records[0] ) {
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
		
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		
		
		//Highcharts
		
		//解析data
		var tw_pt=[];//屏東縣
		var ptTotal=0;
		var tw_tn=[];//台南市
		var tnTotal=0;
		var tw_il=[];//宜蘭縣
		var ilTotal=0;
		var tw_ch=[];//嘉義(縣市)
		var chTotal=0;
		var tw_tt=[];//台東縣
		var ttTotal=0;
		var tw_ph=[];//澎湖縣
		var phTotal=0;
		var tw_cm=[];//金門縣
		var cmTotal=0;
		var tw_ty=[];//桃園縣
		var tyTotal=0;
		var tw_tw=[];//台北市
		var twTotal=0;
		var tw_ml=[];//苗栗縣
		var mlTotal=0;
		var tw_cg=[];//彰化縣
		var cgTotal=0;
		var tw_hl=[];//花蓮縣
		var hlTotal=0;
		var tw_nt=[];//南投縣
		var ntTotal=0;
		var tw_th=[];//台中市
		var thTotal=0;
		var tw_kh=[];//高雄市
		var khTotal=0;
		var tw_yl=[];//雲林縣
		var ylTotal=0;
		var tw_tp=[];//新北市
		var tpTotal=0;
		var tw_hh=[];//新竹市
		var hhTotal=0;
		var tw_cl=[];//基隆
		var clTotal=0;
		$.each(data.records, function (index, value) {
			
			if(value.PSI!=null)
			{
				if(value.county=="屏東縣")
				{
					tw_pt.push(parseInt(value.PSI));
				}
				else if(value.county=="臺南市")
				{
					tw_tn.push(parseInt(value.PSI));
				}
				else if(value.county=="宜蘭縣")
				{
					tw_il.push(parseInt(value.PSI));
				}
				else if(value.county=="嘉義市")
				{
					tw_ch.push(parseInt(value.PSI));
				}
				else if(value.county=="臺東縣")
				{
					tw_tt.push(parseInt(value.PSI));
				}
				else if(value.county=="澎湖縣")
				{
					tw_ph.push(parseInt(value.PSI));
				}
				else if(value.county=="金門縣")
				{
					tw_cm.push(parseInt(value.PSI));
				}
				else if(value.county=="桃園縣")
				{
					tw_ty.push(parseInt(value.PSI));
				}
				else if(value.county=="臺北市")
				{
					tw_tw.push(parseInt(value.PSI));
				}
				else if(value.county=="苗栗縣")
				{
					tw_ml.push(parseInt(value.PSI));
				}
				else if(value.county=="彰化縣")
				{
					tw_cg.push(parseInt(value.PSI));
				}
				else if(value.county=="花蓮縣")
				{
					tw_hl.push(parseInt(value.PSI));
				}
				else if(value.county=="南投縣")
				{
					tw_nt.push(parseInt(value.PSI));
				}
				else if(value.county=="臺中市")
				{
					tw_th.push(parseInt(value.PSI));
				}
				else if(value.county=="高雄市")
				{
					tw_kh.push(parseInt(value.PSI));
				}
				else if(value.county=="雲林縣")
				{
					tw_yl.push(parseInt(value.PSI));
				}
				else if(value.county=="新北市")
				{
					tw_tp.push(parseInt(value.PSI));
				}
				else if(value.county=="新竹市")
				{
					tw_hh.push(parseInt(value.PSI));
				}
				else if(value.county=="彰化縣")
				{
					tw_cg.push(parseInt(value.PSI));
				}
				else if(value.county=="基隆市")
				{
					tw_cl.push(parseInt(value.PSI));
				}
			}
		    	//appendStr=appendStr+"<tr><td>"+value.date+"</td><td>"+value.leadGeneralIndicator+"</td><td>"+value.leadGeneralIndicatorWithoutTrend+"</td><td>"+value.sameGeneralIndicator+"</td><td>"+value.sameGeneralIndicatorWithoutTrend+"</td><td>"+value.behindGeneralIndicator+"</td><td>"+value.behindGeneralIndicatorWithoutTrend+"</td></tr>"
		});
		
		for(var i in tw_pt)
		{
			ptTotal+=tw_pt[i];
		}
		for(var i in tw_tn)
		{
			tnTotal+=tw_tn[i];
		}
		for(var i in tw_il)
		{
			ilTotal+=tw_il[i];
		}
		for(var i in tw_ch)
		{
			chTotal+=tw_ch[i];
		}
		for(var i in tw_tt)
		{
			ttTotal+=tw_tt[i];
		}
		for(var i in tw_ph)
		{
			phTotal+=tw_ph[i];
		}
		for(var i in tw_cm)
		{
			cmTotal+=tw_cm[i];
		}
		for(var i in tw_ty)
		{
			tyTotal+=tw_ty[i];
		}
		for(var i in tw_tw)
		{
			twTotal+=tw_tw[i];
		}
		for(var i in tw_ml)
		{
			mlTotal+=tw_ml[i];
		}
		for(var i in tw_cg)
		{
			cgTotal+=tw_cg[i];
		}
		for(var i in tw_hl)
		{
			hlTotal+=tw_hl[i];
		}
		for(var i in tw_nt)
		{
			ntTotal+=tw_nt[i];
		}
		for(var i in tw_th)
		{
			thTotal+=tw_th[i];
		}
		for(var i in tw_kh)
		{
			khTotal+=tw_kh[i];
		}
		for(var i in tw_yl)
		{
			ylTotal+=tw_yl[i];
		}
		for(var i in tw_tp)
		{
			tpTotal+=tw_tp[i];
		}
		for(var i in tw_hh)
		{
			hhTotal+=tw_hh[i];
		}
		for(var i in tw_cl)
		{
			clTotal+=tw_cl[i];
		}
		//special for map
		$(appendTarget).find('.modal-body').append("<div id='chartViewContainer' style='height: 400px; width:auto;'></div>");
		$(appendTarget).find('.modal-body').find('#chartViewContainer').attr('style','height: 500px;min-width: 310px;max-width: 800px;margin: 0 auto;');
		$(appendTarget).find('.modal-body').find('#chartViewContainer').find("g text").attr("style","font-size:11px;font-weight:bold;color:white;-hc-text-stroke:3px rgba(0,0,0,0.5);fill:white;");
		
		
		//$(appendTarget).find('.modal-body').find('#chartViewContainer')
		
		
		//highchartmaps
		// Prepare demo data
        var data = [{ 'hc-key': 'tw-pt', value: formatFloat(ptTotal/tw_pt.length,2) },
            { 'hc-key': 'tw-tn', value: formatFloat(tnTotal/tw_tn.length,2) },
            { 'hc-key': 'tw-il', value: formatFloat(ilTotal/tw_il.length,2) },
            { 'hc-key': 'tw-ch', value: formatFloat(chTotal/tw_ch.length,2) },
            { 'hc-key': 'tw-tt', value: formatFloat(ttTotal/tw_tt.length,2) },
            { 'hc-key': 'tw-ph', value: formatFloat(phTotal/tw_ph.length,2) },
            { 'hc-key': 'tw-cm', value: formatFloat(cmTotal/tw_cm.length,2) },
            { 'hc-key': 'tw-ty', value: formatFloat(tyTotal/tw_ty.length,2) },
            { 'hc-key': 'tw-tw', value: formatFloat(twTotal/tw_tw.length,2) },
            { 'hc-key': 'tw-ch', value: formatFloat(chTotal/tw_ch.length,2) },
            { 'hc-key': 'tw-ml', value: formatFloat(mlTotal/tw_ml.length,2) },
            { 'hc-key': 'tw-ty', value: formatFloat(tyTotal/tw_ty.length,2) },
            { 'hc-key': 'tw-cg', value: formatFloat(cgTotal/tw_cg.length,2) },
            { 'hc-key': 'tw-hl', value: formatFloat(hlTotal/tw_hl.length,2) },
            { 'hc-key': 'tw-nt', value: formatFloat(ntTotal/tw_nt.length,2) },
            { 'hc-key': 'tw-th', value: formatFloat(thTotal/tw_th.length,2) },
            { 'hc-key': 'tw-kh', value: formatFloat(khTotal/tw_kh.length,2) },
            { 'hc-key': 'tw-yl', value: formatFloat(ylTotal/tw_yl.length,2) },
            { 'hc-key': 'tw-tp', value: formatFloat(tpTotal/tw_tp.length,2) },
            { 'hc-key': 'tw-hh', value: formatFloat(hhTotal/tw_hh.length,2) },
            { 'hc-key': 'tw-hh', value: formatFloat(hhTotal/tw_hh.length,2) },
            { 'hc-key': 'tw-cl', value: formatFloat(clTotal/tw_cl.length,2) }];

            
        // Initiate the chart
        $(appendTarget).find('.modal-body').find('#chartViewContainer').highcharts('Map', {
            
            title : {
                text : '空氣品質即時污染指標'
            },

            //subtitle : {
            //    text : 'Source map: <a href="http://code.highcharts.com/mapdata/countries/tw/tw-all.js">countries/tw/tw-all</a>'
            //},

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0
            },

            series : [{
                data : data,
                mapData: Highcharts.maps['countries/tw/tw-all'],
                joinBy: 'hc-key',
                name: '空氣污染指標',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]
        });
		
		afterLoadingResult(target);
	});

}

function parsing_credit_card(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.records[0] ) {
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
	
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		afterLoadingResult(target);
	});

}
function parsing_gdp_year_indicator(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.data.root.records[0] ) {
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.data.root.records, function (index, value) {
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
		
		//太寬 調整CSS
		/*
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		*/
		
		
		//Highcharts
		
		//解析data
		var d=[];
		var gdp=[];
		$.each(data.data.root.records, function (index, value) {
			
			if(value.GDP!=null)
			{
		    	d.push(value.date);
		    	gdp.push(parseInt(value.GDP.replace(/\,/g,'')));
			}
		    	//appendStr=appendStr+"<tr><td>"+value.date+"</td><td>"+value.leadGeneralIndicator+"</td><td>"+value.leadGeneralIndicatorWithoutTrend+"</td><td>"+value.sameGeneralIndicator+"</td><td>"+value.sameGeneralIndicatorWithoutTrend+"</td><td>"+value.behindGeneralIndicator+"</td><td>"+value.behindGeneralIndicatorWithoutTrend+"</td></tr>"
		});
		 
		 	
		 	
		$(appendTarget).find('.modal-body').append("<div id='chartViewContainer' style='height: 400px; width:auto;'></div>");
		$(appendTarget).find('.modal-body').find('#chartViewContainer').highcharts({
	            chart: {
	                type: 'column'
	            },
	            title: {
	                text: 'GDP in Taiwan per year'
	            },
	            xAxis: {
	                categories: d,
	                labels: {
	                    rotation: -45,
	                    align: 'right',
	                    style: {
	                        fontSize: '13px',
	                        fontFamily: 'Verdana, sans-serif'
	                    }
	                }
	            },
	            yAxis: {
	                min: 0,
	                title: {
	                    text: 'GDP (millions)'
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            tooltip: {
	                pointFormat: 'GDP in Taiwan: <b>{point.y:.1f} millions</b>',
	            },
	            series: [{
	                name: 'GDP',
	                data: gdp,
	                dataLabels: {
	                    enabled: true,
	                    rotation: -90,
	                    color: '#FFFFFF',
	                    align: 'right',
	                    x: 4,
	                    y: 10,
	                    style: {
	                        fontSize: '13px',
	                        fontFamily: 'Verdana, sans-serif',
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }]
	    });
		
		 
		 
		afterLoadingResult(target);
	});

}

function parsing_gdp_quarter_indicator(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.data.root.records[0] ) {
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.data.root.records, function (index, value) {
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
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		
		
		//Highcharts
		
		//解析data
		var d=[];
		var gdp=[];
		$.each(data.data.root.records, function (index, value) {
			
			if(value.GDP!=null)
			{
		    	d.push(value.date);
		    	gdp.push(parseInt(value.GDP.replace(/\,/g,'')));
			}
		    	//appendStr=appendStr+"<tr><td>"+value.date+"</td><td>"+value.leadGeneralIndicator+"</td><td>"+value.leadGeneralIndicatorWithoutTrend+"</td><td>"+value.sameGeneralIndicator+"</td><td>"+value.sameGeneralIndicatorWithoutTrend+"</td><td>"+value.behindGeneralIndicator+"</td><td>"+value.behindGeneralIndicatorWithoutTrend+"</td></tr>"
		});
		 
		 	
		 	
		$(appendTarget).find('.modal-body').append("<div id='chartViewContainer' style='height: 400px; width:auto;'></div>");
		$(appendTarget).find('.modal-body').find('#chartViewContainer').highcharts({
	            chart: {
	                type: 'column'
	            },
	            title: {
	                text: 'GDP in Taiwan quarterly'
	            },
	            xAxis: {
	                categories: d,
	                labels: {
	                    rotation: -45,
	                    align: 'right',
	                    style: {
	                        fontSize: '10px',
	                        fontFamily: 'Verdana, sans-serif'
	                    }
	                },
	                tickInterval:4
	            },
	            yAxis: {
	                min: 0,
	                title: {
	                    text: 'GDP (millions)'
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            tooltip: {
	                pointFormat: 'GDP in Taiwan: <b>{point.y:.1f} millions</b>',
	            },
	            series: [{
	                name: 'GDP',
	                data: gdp,
	                dataLabels: {
	                    enabled: true,
	                    rotation: -90,
	                    color: '#FFFFFF',
	                    align: 'right',
	                    x: 4,
	                    y: 10,
	                    style: {
	                        fontSize: '13px',
	                        fontFamily: 'Verdana, sans-serif',
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }]
	    });
		
		 
		 
		afterLoadingResult(target);
	});

}


function parsing_health_food(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.data.root.records[0] ) {
			 names.push(o); // the property name
		 }
		 var appendStr="";
		 appendStr=appendStr+"<table id='"+modal_id+"' class='display' cellspacing='0' width='100%'><thead><tr>"+th_html+"</thead><tbody>";
		 $.each(data.data.root.records, function (index, value) {
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
	
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		afterLoadingResult(target);
	});

}
function parsing_ultra_violet(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.records[0] ) {
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
	
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		
		afterLoadingResult(target);
	});

}
function parsing_drama_info(target,action)
{
	//alert($(triggerA).attr('data-target'));
	 var triggerA=$(target);
	 var appendTarget=$(target).attr('data-target');
	 var tableTHName = $(target).find('#infoStorage').attr('attrTableTHName');
	 var thName=tableTHName.split(',');
	 var getDataURL=serverURL+"hyAppDS?_action="+action;
	 var modal_id = $(triggerA).attr('data-target');
	 modal_id=modal_id.substring(1, modal_id.length);
	 //alert(modal_id);
	 $.get(getDataURL, function(data) {
		// 表格
		 
		 var th_html="";
		 var names=[];
		 
		 for ( var o in thName ) {
			 th_html=th_html+"<th>"+thName[o]+"</th>";
		 }
		 for ( var o in data.records[0] ) {
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
	
		
		//太寬 調整CSS
		
		$(appendTarget).find('.modal-dialog').css({
			width:'auto',
            height:'auto', 
         //   'overflow-y': 'auto',
           'max-height':'100%'});
		
		
		
		//map
		
		$(appendTarget).append("<div id='mapViewContainer' style='height: 666px; width:auto;display:none;'></div>");

		var latlng = new google.maps.LatLng(lat,lng);  //台灣座標
			var myOptions = {
			    zoom: 10,    //地圖縮放比例，數字越大，路越大
			    center: latlng,  //地圖的中心座標
			    mapTypeId: google.maps.MapTypeId.ROADMAP  //地圖型態，可參考 這裡
			};
		
		map = new google.maps.Map(document.getElementById("mapViewContainer"), myOptions);
		
		 $.each(data.records, function (index, value) {
			 if(value.latitude!=null)
			 {
				 
				 var myLatlng = new google.maps.LatLng(value.latitude,value.longitude); 
					
					
					
				var marker = new google.maps.Marker({
				    position: myLatlng,    //Marker的座標
				    map: map,    //map物件，以這篇文章的例子，就是上面那個map物件
				    title: value.location    //當滑鼠移至Marker上時，要顯示的Title文字
				});
				
				//3. 在Marker click時，顯示InfoWindow
				
				google.maps.event.addListener(marker, 'click', function() {
				    infowindow.open(map, marker);
				});	
				
				//4. 新增InfoWindow
				var infowindow = new google.maps.InfoWindow();    //初始一個物件
				var htmlContent="<div>活動名稱:"+value.title+"</div>";
				htmlContent+="<div>時間開始時間:"+value.time+"</div>";
				if(value.endtime!=null)
				{
					htmlContent+="<div>活動截止時間:"+value.endtime+"</div>";
				}
				htmlContent+="<div>地點:"+value.location+"</div>";
				htmlContent+="<div>地點名稱:"+value.locationName+"</div>";
				htmlContent+="<div>是否售票:"+value.onSales+"</div>";
				htmlContent+="<div>票價:"+value.price+"</div>";
				infowindow.setContent(htmlContent);    //InfoWindow的內容，可用Html語法
				infowindow.setPosition(myLatlng);    //座標
				 
				 
				 
			 }
	     });
	
		
		afterLoadingResult(target);

	});

}

function formatFloat(num, pos)
{
  var size = Math.pow(10, pos);
  return Math.round(num * size) / size;
}
