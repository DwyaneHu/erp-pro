
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'jqprint'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$;
	    
	    var beanTemplate = $("#beanTemplate").html();
	    
	    showGrid({
		 	id: "showForm",
		 	url: reqBasePath + "erpcommon001",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
		 	template: beanTemplate,
		 	ajaxSendAfter:function(json){
		 		var str = '无';
		 		var defaultNumber = json.bean.defaultNumber;
		        if(!isNull(json.bean.linkNumber)){
		        	str = '<a lay-event="details" class="notice-title-click">' + json.bean.linkNumber + '</a>';
		        	defaultNumber += '<span class="state-new">[转]</span>';
			        if(json.bean.status == 2){
			        	defaultNumber += '<span class="state-up"> [正常]</span>';
			        }else{
			        	defaultNumber += '<span class="state-down"> [预警]</span>';
			        }
		        }
		        $("#linkNumber").html(str);
		        $("#defaultNumber").html(defaultNumber);
		 		form.render();
		 	}
		});
		
		//打印
		$("body").on("click", "#jprint", function(e){
			$("#showForm").jqprint({
				title: sysMessageMainMation.mationTitle,
				debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
				importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
				printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
				operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
			});
		});
	    
	});
});