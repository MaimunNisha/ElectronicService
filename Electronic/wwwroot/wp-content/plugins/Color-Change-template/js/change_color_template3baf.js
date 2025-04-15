var track=0;
jQuery(document).ready(function ($) {

		function SetColor(color){

			if(typeof(color)!='undefined' && color!='' && color !== null){
				var head  = document.getElementsByTagName('head')[0];
				var link  = document.createElement('link');
				link.rel  = 'stylesheet';
				link.id  = 'stylesheetclass';
				link.type = 'text/css';
				link.href = colorswatch_object.color_url+'color-'+color+'.css' ;
				link.media = 'all';
				head.appendChild(link);
				track=track+1;
			
			}
		}

		function clearColor(){
			$('body').removeClass('color-green color-blue color-violet color-red color-orange color-turquoise color-yellow')
		}
		//$('body').prepend('<div class="tt-colorswatch"><div class="tt-colorswatch-options"><a href="#" data-color="" class="colorswatch1 active js-swatch-color"></a><a href="#" class="colorswatch2 js-swatch-color" data-color="1"></a><a href="#" class="colorswatch3 js-swatch-color" data-color="2"></a><a href="#" class="colorswatch4 js-swatch-color" data-color="3"></a><a href="#" class="colorswatch5 js-swatch-color" data-color="4"></a><a href="#" class="colorswatch6 js-swatch-color" data-color="5"></a><a href="#" class="colorswatch7 js-swatch-color" data-color="6"></a><a href="#" class="colorswatch8 js-swatch-color" data-color="7"></a></div><div class="tt-colorswatch-btn js-colorswatch"><img src="'+colorswatch_object.colorswatchimg+'" alt=""></div></div>')

		var html_color_swatch = '<div class="colorswatch">';
	 
		html_color_swatch +='<div class="colorswatch-btn btn js-colorswatch">';
		html_color_swatch +='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 19.291 19.292" style="enable-background:new 0 0 19.291 19.292;" xml:space="preserve">';
		html_color_swatch +='<g>';
		html_color_swatch +='<path d="M7.621,10.267c-0.367,0.404-0.457,0.694-0.938,1.454c0.311,0.217,0.908,0.718,1.322,1.581   c0.827-0.475,1.213-0.547,1.651-0.916c2.862-2.41,9.87-11.049,9.629-11.299C19.032,0.822,10.141,7.503,7.621,10.267z M5.857,12.392   c-1.243-0.22-2.47,0.566-3.289,2.53c-0.82,1.964-2.284,2.75-2.568,2.702c1.528,0.553,6.188,1.967,7.346-3.416   C6.854,12.917,5.857,12.392,5.857,12.392z" fill="#FFFFFF" />';
		html_color_swatch +='</g>';
		html_color_swatch +='</svg>';
		html_color_swatch +='</div>';
		html_color_swatch +='<div class="colorswatch-inside">';
		html_color_swatch +='	<a href="#" class="colorswatch1 active js-swatch-color"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch2 js-swatch-color" data-color="1"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch3 js-swatch-color" data-color="2"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch4 js-swatch-color" data-color="3"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch5 js-swatch-color" data-color="4"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch6 js-swatch-color" data-color="5"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch6 js-swatch-color" data-color="6"></a>';
		html_color_swatch +='	<a href="#" class="colorswatch6 js-swatch-color" data-color="7"></a>';
		html_color_swatch +='</div>';
		html_color_swatch +='</div>';
		$('body').prepend(html_color_swatch);

		//console.log(html_color_swatch);

		var $cookievar=readCookie('template');
		if(typeof($cookievar)!='undefined' && $cookievar!=''&&  $cookievar !== null){
			 SetColor($cookievar);
		}
 

		$(document).on('click','.js-colorswatch', function(e){
			$(this).closest('.colorswatch').toggleClass('opened');
			return false;
		});
		$(document).on('click','.js-swatch-color', function(e){
			e.preventDefault()
			$('.js-swatch-color').removeClass('active')
			$(this).addClass('active')
			if(track>0)
				setTimeout(function(){ $("#stylesheetclass").first().remove(); }, 500);

			if($(this).data('color')!=''){

				SetColor($(this).data('color'));
				createCookie('template',$(this).data('color'),1);
			}else{
				track=0;
				$("#stylesheetclass").remove();
			}
			
		})
	})
	

	
	function createCookie(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
