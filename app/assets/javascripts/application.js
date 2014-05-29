// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){

	$('.signup').click(function(){

		var $meal = $(this),
			$day = $meal.closest('.day') ;

		$.ajax({
			url: '/signups',
			type: 'post',
			data: {
				meal: $meal.data('meal'),
				day: $day.data('day'),
				name: $.cookie('name')
			},
			success: function(){
				$meal.closest('div').prepend('<p class="text-success">You signed up!</p>') ;
			}
		})

	});

	$('#user_edit').submit(function(ev){

		ev.preventDefault() ;

		$.cookie('name', $('#name').val(), {path: '/'}) ;

		window.location.href = '/' ;

	}) ;
	
}) ;