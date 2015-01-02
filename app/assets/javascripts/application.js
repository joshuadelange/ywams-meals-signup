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

    $('#user_edit').submit(function(ev){

        ev.preventDefault() ;

        $.cookie('name', $('#name').val(), {path: '/'}) ;

        window.location.href = '/' ;

    }) ;

    $(document).on('click', '.remove-signup', function(e){
        $(e.target).closest('.row').remove();
    });

    $(document).on('click', '.new-signup', function(){

        var age = $(this).data('age'),
            dayOfTheWeek = $(this).closest('form').data('day-of-the-week'),
            meal = $(this).closest('form').data('meal'),
            initialBillTo = (dayOfTheWeek == 4 && meal === 'dinner') ? 'Leadership Team' : $.cookie('name'),
            randomNumber = Math.ceil(Math.random() * 1000),
            html = '<div class="row">' +

                '<input name="signups[' + randomNumber + '][age]" type="hidden" value="' + age + '">' +

                '<div class="col-sm-6">' +
                    '<strong>' + age.charAt(0).toUpperCase() + age.slice(1) + '</strong>' +
                '</div>' +

                '<div class="col-sm-3 text-muted"><label>Send bill to <input class="bill_to" name="signups[' + randomNumber + '][bill_to]" type="text" value="' + initialBillTo + '"></label></div>' +

                '<div class="col-sm-2 text-muted"><label><input class="is_guest" name="signups[' + randomNumber + '][is_guest]" type="checkbox"> Is guest?</label></div>' +

                '<div class="col-sm-1"><a href="javascript://" class="btn btn-default btn-xs remove-signup">Remove</a></div>' +

            '</div>';

        $('.signups .no-signups').remove();
        $('.signups').append(html);

    });

    $(document).on('click', '.is_guest', function(){
        var dayOfTheWeek = $(this).closest('form').data('day-of-the-week'),
            meal = $(this).closest('form').data('meal'),
            $billTo = $(this).closest('.row').find('.bill_to'),
            enabled = $(this).is(':checked');
            
        if(dayOfTheWeek === 4 && meal === 'dinner'){
            if(enabled){
                $billTo.val($.cookie('name'));
            }
            else {
                $billTo.val('Leadership Team');
            }
        }
    });

}) ;