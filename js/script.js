/*
* Copyright by Alexander Afanasyev
* E-mail: blackbirdeagle@mail.ru
* Skype: al_sidorenko1
* */

function isEmailValid(emailAdress) {
	var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
		return EMAIL_REGEXP.test(emailAdress)
}

$(document).ready(function() {
    var owl = $("#reviews__slider");
    owl.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            570: {
                items: 1
            },
            600: {
                items: 1
            },
            991: {
                items: 1
            }
        },
        margin: 0,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        touchDrag: true,
        dots: false,
        autoWidth: false,
        nav: false,
        navText: ['<img src = "images/prev.png" alt = ""/>', '<img src = "images/next.png" alt = ""/>'],
    });


    $('.review__next').click(function () {
        owl.trigger('next.owl.carousel');
    });

    $('.review__prev').click(function () {
        owl.trigger('prev.owl.carousel');
    });

    owl.on('changed.owl.carousel', function (event) {
        var in_owl = event.item.index;
        if(in_owl == 0) {
            $('.reviews__nav a.review__prev').addClass('disabled');
        }
        if(in_owl == event.item.count - 1){
            $('.reviews__nav a.review__next').addClass('disabled');
        }
        if(in_owl > 0 && in_owl < event.item.count - 1){
            $('.reviews__nav a').removeClass('disabled');
        }
    });
});

jQuery(function(){
    jQuery(".phone").mask("+7(999) 999-9999");
});

$('.cell__item').hover(
    function(){
        $(this).find('.cell__item__sostav').fadeIn(300);
    },
    function(){
        $(this).find('.cell__item__sostav').fadeOut(300);
    }
);

$('.show__menu').click(function(){
    $('.float__menu').animate({left: 0}, 300);
});

$('.hide__menu').click(function(){
    $('.float__menu').animate({left: -120}, 300);
});

$('[popup-target]').click(function(e) {
    var el = $(this);
    var target = el.attr('popup-target');

    $('.overlay').fadeIn(200, function(){
        $('.popup.'+target).fadeIn(200);
        var top = document.documentElement.clientHeight / 2 - $('.popup.'+target).height() / 2 + $(window).scrollTop();
        var left = $('body').width() / 2 - $('.popup.'+target).width() / 2;
        left = left - 40;
        $('.popup.'+target).css('top', top).css('left', left);
    })


    return false;
});

$('.overlay, .close1').click(function(e) {
    var popup = $('.popup:visible');
    popup.fadeOut(200, function(){
        $('.overlay').fadeOut(200);
    });
    return false;
});

function keyExit(e){
    if(e.keyCode == 27){

        var popup = $('.popup:visible');
        popup.fadeOut(200, function(){
            $('.overlay').fadeOut(200);
        });
    }
}

addEventListener("keydown", keyExit);

$(function(){
    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});

$('.float__menu ul li a').click(function(){
    $('.float__menu').animate({left: -125}, 300);
});

$('.addr__item__name__show-map').click(function(){
    var map = $(this).attr('map');
    $('.map').hide();
    $('#' + map).show();
});

$('.get__presentation').click(function(){
	var email = $('.presentation form input[type = "text"]').val();
	var flag = 0;
	
	$('.presentation form input[type = "text"]').css({"border":"none"});
	
	if(email == ''){
		$('.presentation form input[type = "text"]').css({"border":"1px solid red"});
		flag = 1;
	}
	
	if(email != '' || !isEmailValid(email)){
		$('.presentation form input[type = "text"]').css({"border":"1px solid red"});
		flag == 1;
	}
	
	if(flag == 0){
		$.post('/send.php', {EMAIL: email}, function(data){
			alert('Письмо с презентацией отправлено на указанный вами E-mail!');
		});
	}
});