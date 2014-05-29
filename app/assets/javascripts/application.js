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

	$(document).on('click', '.signup', function(){

		console.log($(this)) ;

		var $button = $(this),
			$meal = $button.closest('.meal'),
			$day = $button.closest('.day') ;

		$.ajax({
			url: '/signups',
			type: 'post',
			data: {
				meal: $meal.data('meal'),
				day: $day.data('day'),
				name: $.cookie('name')
			},
			success: function(r){

				$button.html('Sign up another person') ;

				if($meal.find('.cancel').length === 0){
					$meal.append('<button class="cancel btn btn-default">Cancel</button>') ;
				}

				var $signedUpLabel = $button.closest('div').find('.signed-up') ;

				if($signedUpLabel.length === 0) {
					$button.before('<p class="text-success signed-up">Signed up</p>') ;
				}

				if(r.number_of_signups_for_this_person_at_this_meal_on_this_day > 1) {
					$signedUpLabel.html('Signed up for ' + r.number_of_signups_for_this_person_at_this_meal_on_this_day +' people') ;
				}
				else {
					$signedUpLabel.html('Signed up') ;
				}

			}
		})

	});

	$(document).on('click', '.cancel', function(){

		var $button = $(this),
			$meal = $button.closest('.meal'),
			$day = $button.closest('.day');

		$.ajax({
			url: '/signups/1',
			type: 'delete',
			data: {
				meal: $meal.data('meal'),
				day: $day.data('day'),
				name: $.cookie('name')
			},
			success: function(r){

				var $signedUpLabel = $button.closest('div').find('.signed-up') ;

				if(r.number_of_signups_for_this_person_at_this_meal_on_this_day > 1) {
					$signedUpLabel.html('Signed up for ' + r.number_of_signups_for_this_person_at_this_meal_on_this_day +' people') ;
				}
				else {
					$signedUpLabel.html('Signed up') ;
				}

				if(r.number_of_signups_for_this_person_at_this_meal_on_this_day == 0){
					$signedUpLabel.remove();
					$day.find('.signup').html('Sign up') ;
					$button.remove();
				}

			}
		})

	});

	$('#user_edit').submit(function(ev){

		ev.preventDefault() ;

		$.cookie('name', $('#name').val(), {path: '/'}) ;

		window.location.href = '/' ;

	}) ;
	
}) ;