define([
	
		'angular'

	], function(angular) {
    'use strict';

    function initAppDirective() {

    	return {

    		restrict : 'E',

    		link : function(scope, el, attrs) {

				var o = $.AdminLTE.options;

			  	//Activate the layout maker
			 	$.AdminLTE.layout.activate();

			 	//Enable sidebar tree view controls
			 	$.AdminLTE.tree('.sidebar');

			  	//Add slimscroll to navbar dropdown
				if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
			    	$(".navbar .menu").slimscroll({
			      		height: "200px",
			      		alwaysVisible: false,
			      		size: "3px"
			    	}).css("width", "100%");
			  	}

			  	//Activate sidebar push menu
			  	if (o.sidebarPushMenu) {
			   		$.AdminLTE.pushMenu(o.sidebarToggleSelector);
			  	}

			  	//Activate Bootstrap tooltip
			  	if (o.enableBSToppltip) {
			    	$(o.BSTooltipSelector).tooltip();
			  	}

			  	//Activate box widget
			  	if (o.enableBoxWidget) {
			   		$.AdminLTE.boxWidget.activate();
			 	}

			 	//Activate fast click
			  	if (o.enableFastclick && typeof FastClick != 'undefined') {
			    	FastClick.attach(document.body);
			  	}

			  	//Activate direct chat widget
			  	if (o.directChat.enable) {
				    $(o.directChat.contactToggleSelector).click(function () {
				     	var box = $(this).parents('.direct-chat').first();
				      	box.toggleClass('direct-chat-contacts-open');
				    });
			  	}

				  /*
				   * INITIALIZE BUTTON TOGGLE
				   * ------------------------
				   */
				$('.btn-group[data-toggle="btn-toggle"]').each(function () {
			    	var group = $(this);
			    	$(this).find(".btn").click(function (e) {
			      		group.find(".btn.active").removeClass("active");
			      		$(this).addClass("active");
			      		e.preventDefault();
			    	});

			  	});

    		}

    	};


    }

    return  initAppDirective;
});