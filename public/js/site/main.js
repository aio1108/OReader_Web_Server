	var lat;
	var lng;
	var loginSuccess=false;
	var metaDataAId=[];
	var subscribesId=[];
	var nowActiveType="ALL";
	var first_linkIn=false;
	navigator.geolocation.getCurrentPosition(function (pos) {
	    lat = pos.coords.latitude;  //取得經度
	    lng = pos.coords.longitude; //取得緯度

	    
	});

  	
  	$(document).ready(function() {
		if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
			  var msViewportStyle = document.createElement('style')
			  msViewportStyle.appendChild(
				document.createTextNode(
				  '@-ms-viewport{width:auto!important}'
				)
			  )
			  document.querySelector('head').appendChild(msViewportStyle)
		}
		//alert(auth);
		//alert(body.auth);
		
		
 		
 		$.getJSON(serverURL+"categoryDS", function(data){
 			$('#category').append("<option value='-1'>請選擇</option>");
 		    $.each(data, function (index, value) {
 		    	var option_html="<option value="+value._id+">"+value.name+"</option>";
 		    	$('#category').append(option_html);
 		    });
 		});
 		$(document).on("click", "a[data-toggle=modal]", function(e) {
 			e.preventDefault();
 			 var triggerA=$(this);
 			 var appendTarget=$(triggerA).attr('data-target');
 			 var defaultViewType = $(triggerA).find('#infoStorage').attr('attr2');
 			 if($.trim($(appendTarget).find('.modal-body').html())=="")
 			 {
				extractDispatch(triggerA);
				//parsing_agricultural_trade(triggerA,"agricultural_trade.xml")
				//parsing_stock_publish(triggerA,"stock_publish.xml");
				//parsing_air_pollution(triggerA,"air_pollution.xml");
 			 }
 			 else
 			 {
 				//可再拆出來獨立function
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
 						$(triggerA).find('#infoStorage').attr('attr4',subscribesId[i]);
 					}
 				 }
 			 }
 			
 		});
 		//登入
 		
 		
 		
 		//搜尋
		$(document).on("click", "#btnSearch", function() {
			
			//loading gif
			$("#freewall").empty()
			$("#freewall").prepend("<div id='searchAjaxLoad' align='middle'><img src='../img/loading.gif' style='margin-top:150px ;width:64px; height:64px;' alt=''></div>");
			
			var searchURL=serverURL+"metaDS?";
			var searchParam="";
			if($("#data_description").val()!="")
			{
				searchParam=searchParam+"&key="+encodeURI($("#data_description").val());
			}
			if($("#category").val()!="-1"&&$("#category").val()!=null)
			{
				searchParam=searchParam+"&category="+$("#category").val();
			}
			searchURL=searchURL+searchParam;
			$.getJSON(searchURL, function(data){
	 		    $.each(data, function (index, value) {
	 		    	fillWall(index,value,"ALL","","");
	 		    });
	 		   setTimeout("$(window).resize();", 500);
	 		   
	 		   if(first_linkIn)
	 		   {
	 			  $('a[data-toggle=modal]:first',$('#freewall')).click();
	 			  first_linkIn=false;
	 		   }
	 		});
			
			$("#searchBlock").attr("class","collapse");//關閉
			
	    });
 		

		var nua = navigator.userAgent
		var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
		if (isAndroid) {
		  $('select.form-control').removeClass('form-control').css('width', '100%')
		}

		$(document).on( "click", "a[id=icon_view_map]", function() {
			//if(!$(this).hasClass("noViewSepia"))
			//{
				var parentModal=$(this).parents('.modal-body:first');
				$(parentModal).find('div[id*=ViewContainer]').hide();
				$(parentModal).find('div[id*=ViewContainer]').attr('active',"");
				$(parentModal).find('#mapViewContainer').show('slow');
				$(parentModal).find('#mapViewContainer').attr('active',"active");
			//}
		});
		$(document).on( "click", "a[id=icon_view_table]", function() {
			//if(!$(this).hasClass("noViewSepia"))
			//{
				var parentModal=$(this).parents('.modal-body:first');
				$(parentModal).find('div[id*=ViewContainer]').hide();
				$(parentModal).find('div[id*=ViewContainer]').attr('active',"");
				$(parentModal).find('#tableViewContainer').show('slow');
				$(parentModal).find('#tableViewContainer').attr('active',"active");
			//}
		});
		$(document).on( "click", "a[id=icon_view_chart]", function() {
			//if(!$(this).hasClass("noViewSepia"))
			//{
				var parentModal=$(this).parents('.modal-body:first');
				$(parentModal).find('div[id*=ViewContainer]').hide();
				$(parentModal).find('div[id*=ViewContainer]').attr('active',"");
				$(parentModal).find('#chartViewContainer').show('slow');
				$(parentModal).find('#chartViewContainer').attr('active',"active");
			//}
		});
		//點Logo圖 預先搜尋
		$(document).on( "click", "a[name=logoImg]", function() {
	 		$('#btnSearch').click();
		});
		//登入
		$(document).on( "click", "input[name=userlogin]", function() {
			setTimeout("validate();", 500);
			//return;
		});
		$(document).on( "click", "#userLogInButtom", function() {
			
			if(loginSuccess)
			{
				loginSuccessEvent();
			}
			
		});
		$(document).on( "click", "#icon_favorite", function() {
			if(!loginSuccess)
			{
				alert("請先登入後再進行訂閱");
			}
			else
			{
				var metaDataId=$(this).parents('div:last').attr("id");
				var changeTarget=$(this);
				var defaultViewType = $("a[data-target=#"+metaDataId+"]").find('#infoStorage').attr('attr2'); //之後得抓預設的
				
				//alert($("#"+metaDataId).find('div[active=active]').attr('id'));
				var activeViewId=$("#"+metaDataId).find('div[active=active]').attr('id');
				var preferType="table";//預先用table
				var noticeType="表格";//提示使用者文字
				if(activeViewId=="chartViewContainer")
				{
					preferType=defaultViewType;
					if(preferType=="line_chart")
					{
						noticeType="線圖";
					}
					else if(preferType=="bar_chart")
					{
						noticeType="長條圖";
					}
					else if(preferType=="map_chart")
					{
						noticeType="地圖";
					}
				}
				else if(activeViewId=="tableViewContainer")
				{
					preferType="table";
					noticeType="表格";
				}
				else if(activeViewId=="mapViewContainer")
				{
					preferType="map";
					noticeType="google地圖";
				}
				
				//alert(preferType);
				
				var addSubURL=serverURL+"subscribe/add?id="+checkUserId+"&metaId="+metaDataId+"&preferType="+preferType;
				if(window.confirm("是否以'"+noticeType+"'形式,新增訂閱"))
				{
					$.getJSON(addSubURL, function(data){
						if(data.success)
						{
							alert("新增訂閱成功");
							$(changeTarget).attr("id","icon_favorite_g");
						}
						else
						{
							alert("新增訂閱失敗");
						}
			 		});
				}	
			}

		});
		
		//取消訂閱
		//http://127.0.0.1:8081/hyAPPServer/subscribe/remove?id=opendatanews1@gmail.com&subscribeId=53bfdefd3004f5b83bffa954
		$(document).on( "click", "#icon_favorite_g", function() {
			var metaDataId=$(this).parents('div:last').attr("id");
			var changeTarget=$(this);
 			var subscribeId = $("a[data-target=#"+metaDataId+"]").find('#infoStorage').attr('attr4');
			var cancelSubURL=serverURL+"subscribe/remove?id="+checkUserId+"&subscribeId="+subscribeId;
			if(window.confirm("此資料訂閱中，選擇'確定'會進行取消訂閱，是否繼續?"))
			{
				$.getJSON(cancelSubURL, function(data){
					if(data.success)
					{
						alert("取消訂閱成功");
						$(changeTarget).attr("id","icon_favorite");
						//$("a[data-target=#"+metaDataId+"]").remove();
					}
					else
					{
						alert("取消訂閱失敗");
					}
		 		});
			}
			
		});
		
 		//預先搜尋
 		//$('#btnSearch').click();
		//預先搜尋
		var key = getUrlVars()["key"];
		var linked = getUrlVars()["linked"];
		if(key!=null&&key!="")
		{
			if(key.substring(key.length-1, key.length)=="#")
			{
				key=key.substring(0,key.length-1);
			}
			//alert();
			$('#data_description').val(decodeURIComponent(key));
			$('#btnSearch').click();	
		}
		if(linked=="Y")
		{
			first_linkIn=true;
		}
		
		
		//分享到facebook
		$(document).on( "click", "#icon_social_facebook", function() {
			var searchKey=$.trim($(this).parents('.modal-content:first').find('#myModalLabel').html());
			var shareURL="http://"+location.host+"/?key="+searchKey+"&linked=Y";
			//alert(shareURL);
			//alert(location.href);
			//http://127.0.0.1:8081/hyAPPServer/metaDS?&key=%E6%99%AF%E6%B0%A3%E6%8C%87%E6%A8%99
			
			window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(shareURL), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');	
		});
		//分享到plurk
		$(document).on( "click", "#icon_social_plurk", function() {
			var searchKey=$.trim($(this).parents('.modal-content:first').find('#myModalLabel').html());
			var shareURL="http://"+location.host+"/?key="+searchKey+"&linked=Y"+ " ("+searchKey+")";
			//alert(shareURL);
		
			window.open('http://www.plurk.com/?qualifier=shares&status='+encodeURIComponent(shareURL));
		});
		//分享到Twitter
		$(document).on( "click", "#icon_social_twitter", function() {
			var searchKey=$.trim($(this).parents('.modal-content:first').find('#myModalLabel').html());
			var shareURL=searchKey+" http://"+location.host+"/?key="+searchKey+"&linked=Y";
			//alert(shareURL);
		
			window.open('http://twitter.com/home/?status='+encodeURIComponent(shareURL), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		});
		//分享到google+
		$(document).on( "click", "#icon_social_google", function() {
			var searchKey=$.trim($(this).parents('.modal-content:first').find('#myModalLabel').html());
			var shareURL=" http://"+location.host+"/?key="+searchKey+"&linked=Y";
			//alert(shareURL);
		
			window.open("https://plus.google.com/share?url="+encodeURIComponent(shareURL), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		});
		
		//old
		
		$('#example').dataTable();
		
		 //$('#chartViewContainer').resize();
		 $(window).resize(function() {
			 	//alert("22");
			    //height = chart.height;
			    //width = $("#chartViewContainer").width();
			    //chart.setSize(width, height, doAnimation = true);
		});
		 
		 
		 
  	});
 	function fillWall(index,value,type,subscribeId,preferViewTypeId)
 	{
 			//參數
	    	var _id=value._id;
	    	var name=value.name;
	    	var frequency=value.frequency;
	    	var department=value.department;
	    	var wallImg="";
	    	var attr2Val="";//訂閱者預先想呈現或預先呈現
	    	var action=value.action;//ex: business_indicator.xml
	    	var getDataURL=serverURL+"hyAppDS?_action="+action;
	    	nowActiveType=type;
	    	
	    	if(type=="subscribes")
	    	{
	    		metaDataAId.push(_id);
	    		subscribesId.push(subscribeId);
	    		attr2Val=preferViewTypeId;
	    		//alert(subscribeId);
	    	}
	    	else
	    	{
	    		attr2Val=value.defaultViewType._id;
	    	}
	    	
	    	//準備freewall內容
	    	$('body').append("<div class='modal fade' id='"+_id+"' tabindex='0' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h4 class='modal-title' id='myModalLabel'>"+name+"</h4></div><div class='modal-body'></div></div></div></div>")

	    	
	    	//準備freewall
	    	if(attr2Val=="line_chart")
	    	{
	    		wallImg="img/view/chart.png";
	    	}
	    	else if(attr2Val=="bar_chart")
	    	{
	    		wallImg="img/view/bar_chart.png";
	    	}
	    	else if(attr2Val=="map_chart")
	    	{
	    		wallImg="img/view/map_chart.jpg";
	    	}
	    	else if(attr2Val=="map")
	    	{
	    		wallImg="img/view/map.png";
	    	}
	    	else if(attr2Val=="table")
	    	{
	    		wallImg="img/view/table.png";
	    	}
	    	
	    	var viewTypesStr="";
	    	$.each(value.viewTypes, function (index_vt, value_vt) {
	    		viewTypesStr+=value_vt._id+",";
	    		//alert(value_vt.name);
	    	});
	    	viewTypesStr=viewTypesStr.substring(0, viewTypesStr.length-1);
	    	
	    	//thName
	    	var tableTHName="";
	    	$.each(value.fields, function (index_f, value_f) {
	    		//alert(value_dvt._id);
	    		tableTHName+=value_f.name+",";
	    	});
	    	tableTHName=tableTHName.substring(0, tableTHName.length-1);
	    	// attr1:定義xml名稱
	    	// attr2:適用的解析模式
	    	// attr3:預設的解析模式
	    	// attr4:訂閱的ID
	    	//var wall_html="<div class='brick'><a href='"+getDataURL+"' data-toggle='modal' data-target='#"+_id+"'><img src='"+wallImg+"' width='100%'><div class='info'>";
	    	var wall_html="<div class='brick'><a href='#' data-toggle='modal' data-target='#"+_id+"'><img src='"+wallImg+"' width='100%'><div class='info'>";
	    	wall_html=wall_html+"<h3>"+name+"</h3>";
	    	wall_html=wall_html+"<h5>更新頻率："+frequency+"/次<br/>提供機關："+department+"</h5>";
	    	wall_html=wall_html+"<div id='infoStorage' attr1='"+action+"' attr2='"+attr2Val+"' attr3='"+viewTypesStr+"' attr4='"+subscribeId+"' attrTableTHName='"+ tableTHName +"' ></div><div class='read-more'>觀看詳細資料...</div></div></a></div>";
	    	
	    	$("#freewall").append(wall_html);
	    
	    	$.each(value.defaultViewType, function (index_dvt, value_dvt) {
	    		//alert(value_dvt._id);
	    		//alert(value_dvt.name);
	    	});
	    	$('#searchAjaxLoad').remove();
 	}
 	function validate()
 	{
 		//$.get(validateURL, function(data){
			//alert(validateURL);
			if($('#userid').val()!=checkUserId||$('#userpwd').val()!=checkPassword)
			{
				alert("無此帳號或密碼錯誤!");
			}
			else
			{
				alert("登入成功");
				//無法在開啟
				$('#userLogInButtom').attr("data-target","");
				$("#loginBlock").modal('toggle');
				loginSuccess= true;
			}	
			
			if(loginSuccess)
			{
				loginSuccessEvent();
			}
 		//});
 	}
 	function loginSuccessEvent(mail_id)
 	{
		//取得收藏
		//loading gif
 		loginSuccess=true;
		$("#freewall").empty();
		$("#freewall").prepend("<div id='searchAjaxLoad' align='middle'><img src='../img/loading.gif' style='margin-top:150px ;width:64px; height:64px;' alt=''></div>");
		//alert($('#userid').val());
 		//var mail_id="opendatanews1@gmail.com";
 	
 		var favoriteURL=serverURL+"userDS?id="+mail_id;//pretend 登入成功 預先取得 收藏內容呈現再freeWall
 		
 		$.getJSON(favoriteURL, function(data){

			if(data.subscribes!=null)
			{
			
				$.each(data.subscribes, function (index2, value2) {
	 		    	
					var subscribeId=value2._id;
	 		    	var preferViewTypeId=value2.preferViewType._id;
	 		    	var preferViewTypeName=value2.preferViewType.name;
	 	 		    
	 		    	$.each(value2, function (attr, value) {
	 		    		//參數
	 		    		if(attr=="metaData")
	 		    		{
		 			    	fillWall(attr,value,"subscribes",subscribeId,preferViewTypeId);
	 		    		}
	 	 		    });
	 		    	setTimeout("$(window).resize();", 500);
	 		    });	
			}


 		});
 	}