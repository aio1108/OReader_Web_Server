window["_GOOG_TRANS_EXT_VER"] = "1";

var serverURL="http://127.0.0.1:8080/hyAPPServer/";
	
	
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
		
		$(document).on("click", "a[data-toggle=modal]", function(e) {
			e.preventDefault();
			 var triggerA=$(this);
			 var appendTarget=$(triggerA).attr('data-target');
			 if($.trim($(appendTarget).find('.modal-body').html())=="")
			 {
			parsing_air_pollution(triggerA,"air_pollution.xml");
			 }
			
		});
		
		//搜尋
	$(document).on("click", "#btnSearch", function() {
		//alert("搜尋");
		var searchURL=serverURL+"metaDS?";
		var searchParam="";
		if($("#data_description").val()!="")
		{
			searchParam=searchParam+"&key="+encodeURI($("#data_description").val());
		}
		if($("#category").val()!="-1")
		{
			searchParam=searchParam+"&category="+$("#category").val();
		}
		searchURL=searchURL+searchParam;
		//alert(searchURL);
		$.getJSON(searchURL, function(data){
			$("#freewall").empty();
 		    $.each(data, function (index, value) {
 		    	fillWall(index,value);
 		    });
 		});
		
		$("#searchBlock").attr("class","collapse");//關閉
		
    });

	var nua = navigator.userAgent
	var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
	if (isAndroid) {
	  $('select.form-control').removeClass('form-control').css('width', '100%')
	}

	$(document).on( "click", "a[name=mapChange]", function() {
		var parentModal=$(this).parents('.modal-body:first');
		$(parentModal).find('div[id*=ViewContainer]').hide();
		$('#mapViewContainer').show('slow');
	});
	$(document).on( "click", "a[name=tableChange]", function() {
		var parentModal=$(this).parents('.modal-body:first');
		$(parentModal).find('div[id*=ViewContainer]').hide();
		$('#tableViewContainer').show('slow');
	});
	$(document).on( "click", "a[name=chartChange]", function() {
		var parentModal=$(this).parents('.modal-body:first');
		$(parentModal).find('div[id*=ViewContainer]').hide();
		$('#chartViewContainer').show('slow');
	});

	
	
	
	
	
	
	//old
	
	$('#example').dataTable();
	 
	 $('.carousel-indicators li').click(function(e){
		    var goTo = $(this).data('slide-to');
		    if(goTo==2)
		    {
		    	setTimeout("$(window).resize();", 100);	
		    }
		    
	});
	 
	 
	 $('a[data-slide=next]').click(function() {
		//alert($('.active').attr('data-slide-to'));
		if($('.active').attr('data-slide-to')==1)
		{
			setTimeout("$(window).resize();", 100);	 
		}
		else if($('.active').attr('data-slide-to')==2)
		{
			$('#view_map2').append("<iframe name='googleTarget' src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7280.7860252832625!2d120.646655!3d24.161016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5Y-w5Lit5biC6LGQ5Y6f5Y2A6LGQ5p2x6Lev5Y-w5Lit5biC5pS_5bqc6K2m5a-f5bGA!5e0!3m2!1szh-TW!2stw!4v1400837263334' width='100%' height='400' frameborder='0' style='border:0'></iframe>");
		}
		
	 });
	 $('a[data-slide=prev]').click(function() {
		//alert($('.active').attr('data-slide-to'));
		if($('.active').attr('data-slide-to')==0)
		{
			$('#view_map2').append("<iframe name='googleTarget' src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7280.7860252832625!2d120.646655!3d24.161016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5Y-w5Lit5biC6LGQ5Y6f5Y2A6LGQ5p2x6Lev5Y-w5Lit5biC5pS_5bqc6K2m5a-f5bGA!5e0!3m2!1szh-TW!2stw!4v1400837263334' width='100%' height='400' frameborder='0' style='border:0'></iframe>"); 
		}
		else if($('.active').attr('data-slide-to')==3)
		{
			setTimeout("$(window).resize();", 100);	 
		}
	});
	 
	});
	function fillWall(index,value)
	{
			//參數
    	var _id=value._id;
    	var name=value.name;
    	var frequency=value.frequency;
    	var department=value.department;
    	var wallImg="";
    	var action=value.action;//ex: business_indicator.xml
    	var getDataURL=serverURL+"hyAppDS?_action="+action;
    	setTimeout("$(window).resize();", 100);
    	
    	//準備freewall內容
    	$('body').append("<div class='modal fade' id='"+_id+"' tabindex='0' role='dialog' aria-labelledby='loginBlockLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h4 class='modal-title' id='myModalLabel'>"+name+"</h4></div><div class='modal-body'></div></div></div></div>")
    	
    	//準備freewall
    	if(value.defaultViewType._id=="chart")
    	{
    		wallImg="img/view/chart.png";
    	}
    	else if(value.defaultViewType._id=="map")
    	{
    		wallImg="img/view/map.png";
    	}
    	else if(value.defaultViewType._id=="table")
    	{
    		wallImg="img/view/table.png";
    	}
    	var wall_html="<div class='brick'><a href='#' data-toggle='modal' data-target='#"+_id+"'><img src='"+wallImg+"' width='100%'><div class='info'>";
    	wall_html=wall_html+"<h3>"+name+"</h3>";
    	wall_html=wall_html+"<h5>更新頻率："+frequency+"/次</h5><br/>提供機關："+department+"</h5>";
    	wall_html=wall_html+"<br/><br/><div id='infoStorage' attr1='"+action+"' attr2='"+value.defaultViewType._id+"' ></div><div class='read-more'>觀看詳細資料...</div></div></a></div>";
    	
    	
    	$("#freewall").append(wall_html);
	}
