var app = {
    init : function() {
        this.initFeedbacksSlider();
        this.checkCopyDate();
        this.scrollTo();
        this.checkVisibility();
        this.popUp();
        this.forms();
    },
    validateForm : function(form) {
        var emailField = form.find($('input[name="email"]'));
        var emailValid = emailField.val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if (emailValid) {
            //app.formRequest(form);
            emailField.val('');
        }
    },
    initFeedbacksSlider : function() {
        feedbacksSlider = $('.feedbacks-slider');
        if (feedbacksSlider.length){
            feedbacksSlider.owlCarousel({
                singleItem: true,
                autoHeight: true,
                lazyLoad : true,
                itemsCustom: false,
                mouseDrag: false,
                slideSpeed: 500,
                transitionStyle: 'backSlide'
            });
        }
    },
    checkCopyDate : function() {
        var initialYear = 2015;
        var currentYear = new Date().getFullYear();
        if (currentYear > initialYear ) {
            $('.copy').html('&copy; ' + initialYear + " - "+ currentYear);
        }
    },
    scrollTo : function() {
        var defaultAnchorOffset = 0;
        var scrollButton = $('.scroll-btn');

        scrollButton.click(function(e){
            e.preventDefault();
            var headerHeight = $('#header').outerHeight();

            var anchor = $(this).attr('href');
            var anchorOffset = $(anchor).offset().top;

            if (!anchorOffset){
                anchorOffset = defaultAnchorOffset;
            } else {
                $('html,body').animate({
                    scrollTop: anchorOffset - headerHeight
                }, 500);
            }
        });
    },
    checkVisibility : function() {
        $('section:in-viewport').addClass('active');
        $('.backgrounded:in-viewport').addClass('active');
    },
    popUp : function() {
        var openPopUpTrigger = $('.popup-open');
        var closePopUpTriggr = $('.popup-close');
        var popUp = $('#popup');
        var popUpContent = popUp.find('.content');

        openPopUpTrigger.click(function(){
            var url = $(this).data('url');
            openPopUp(url);
        });

        $(popUp).on('click', closePopUpTriggr, function(e){
            closePopUp();
        });

        function closePopUp(){
            popUpContent.removeClass('loaded');
            popUp.removeClass('active');
            console.log($(this));
        }

        function openPopUp(url) {
            url = '/popup/' + url + '.html';

            $.ajax({
                type: 'POST',
                url: url,
                dataType: "html",
                beforeSend: function() {
                    popUp.addClass('active');
                    popUpContent.addClass('loading active');
                },
                success: function(data) {
                    popUpContent.html(data);
                    popUpContent.addClass('loaded');
                    popUpContent.removeClass('active');
                },
                error: function(xhr, status, error) {
                    popUpContent.removeClass('loading active');
                }
            });
        }
    },
    forms : function() {
        $('input[type="submit"]').click(function(e){
            var form = $(this).closest('form');

            e.preventDefault();
            formRequest(form);
        });

        function formRequest(form){
            var url = "forms.php";

            form.addClass('active');

            $.ajax({
                type: 'POST',
                url: url,
                data: form.serialize(),
                complete: function() {
                    setTimeout(function(){
                        form.parent().addClass('active');
                    },3000);
                },
                success: function(data) {
                    console.log(data);
                    setTimeout(function(){
                        form[0].reset();
                        form.parent().removeClass('active');
                        form.removeClass('active');
                    },6000);
                }
            });
        }

        formValidate();
        function formValidate(){
            var element = $('input');
            element.blur(function(){
                if ($(this).is(":invalid")){
                    $(this).closest('.form-row').addClass('validation-error');
                } else {
                    $(this).closest('.form-row').addClass('validation-passed');
                }
            });
        }
    },
    checkCopyDate : function() {
        var initialYear = 2015;
        var copyTitle = document.title;
        var currentYear = new Date().getFullYear();
        if (currentYear > initialYear ) {
            $('#footer').find($('.copy')).html("&copy;&nbsp;" + initialYear + " - " + currentYear + "&nbsp;" + copyTitle);
        } else {
            $('#footer').find($('.copy')).html("&copy;&nbsp;" + initialYear + "&nbsp;" + copyTitle);
        }
    }
}
jQuery(function($){
    app.init();
    $(window).scroll(function(){
        app.checkVisibility();
    });
});