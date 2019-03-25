//Made by Daniel Sierra

(function ( $ ) {
 
    $.fn.selectSP = function( options ) {
 
        //Default values
        var settings = $.extend({
            placeholder         : null,
            DivAlreadyCreated: false,
            data         : null,
            input_IDOption : "0",
            endSentence  : null,
            URLSelectOption_SharepointSource: null,
            filterFunction: null,
            then     : null
        }, options);
 
        var dvName = $(this)[0].id;
        var input_searchinput = 'searchinput_selectSP_'+ dvName;
        var ul_dropdownmenu = 'options_selectSP_'+ dvName;

        return this.each( function() {

            $(this)[0].style.display = 'none';
            $(this)[0].offsetHeight;
            $(this)[0].style.display = '';
            if (settings.data != null) {
                if (settings.DivAlreadyCreated == false){
                    $(this).append('<input id="'+ input_searchinput +'" name="'+ input_searchinput +'" class="form-control col-md-12" spellcheck="false" />');
                    $(this).append('<ul class="dropdown-menu scrollable-menu_' + dvName +'" id="'+ ul_dropdownmenu +'"></ul>');
                } else {
                    $('#options_CustomCombo').empty();
                }

                if (settings.input_IDOption != null) {
                    if (settings.input_IDOption == "0") {
                        if (settings.placeholder != null) {
                            $('#'+input_searchinput).attr('placeholder', settings.placeholder);
                        }
                        $.each(settings.data, function (key, value) {
                            $('#'+ul_dropdownmenu).append('<li role="option" value="' + value.Value + '" class="OptionsClass"><a>' + value.Text + '</a></li>');
                        });
                        if (settings.endSentence != null){
                            $('#'+ul_dropdownmenu).append('<li role="option" style="pointer-events: none; opacity: 0.6;" class="disabled"><a>' + settings.endSentence + '</a></li>');
                        } 
                    } else {
                        var IsAlready = "False";
                        $.each(settings.data, function (key, value) {
                            if (value.Value == settings.input_IDOption) { //Se metera aqui, si justo coincide la opcion elegida con el id de alguno de los registros del bloque de los 20 primeros, sino IsAlready = False, y tendra que buscar la opcion en SP en la siguiente funcion. 
                                $('#'+input_searchinput).attr('data-selectedID', value.Value);
                                $('#'+input_searchinput).val(value.Text);
                                IsAlready = "True";
                            }
                            $('#'+ul_dropdownmenu).append('<li role="option" value="' + value.Value + '" class=OptionsClass"><a>' + value.Text + '</a></li>');
                        });

                        $('.OptionsClass').on('click', function () {
                            var text = $(this).find('a').html();
                            var id = $(this).val();
                            $('#'+input_searchinput).attr('data-selectedID', id);
                            $('#'+input_searchinput).val(text);
                        });

                        $('.OptionsClass').css('width', '100%');
                        $('.OptionsClass').css('background', '#FFFFFF');
                        $('.OptionsClass').css('line-height', '35px');
                        $('.OptionsClass').css('font-size', '14px');
                        $('.OptionsClass').css('padding', '0 10px');
                        $('.OptionsClass').css('cursor', 'pointer');
                        $('.OptionsClass').css('list-style', 'none');
                        $('.OptionsClass').css('position', 'relative');
                        $('.OptionsClass').css('right', '10px');
                        $('.OptionsClass').css('margin', '0 0 4px 0');

                        $('.OptionsClass').hover( 
                            function() {
                                $(this).css("background", "#aaa")
                            }, function() {
                                $(this).css("background", "#FFFFFF");
                            } 
                        );
            
                        if (IsAlready == "False") {
                            if ((settings.URLSelectOption_SharepointSource != null)&&(settings.input_IDOption != null)){
                                $('#'+input_searchinput).attr('disabled', 'disabled');
                                $('#'+input_searchinput).attr('placeholder', 'Cargando... ');
                                $.post(settings.URLSelectOption_SharepointSource, {
                                    IDEmployeeSP: settings.input_IDOption
                                }).done(function (result, textStatus, jqXHR) {
                                    $('#'+ul_dropdownmenu).empty();
                                    $.each(settings.data, function (key, value) {
                                        $('#'+ul_dropdownmenu).append('<li role="option" value="' + value.Value + '" class="OptionsClass"><a>' + value.Text + '</a></li>');
                                    });
                                    $('#'+ul_dropdownmenu).append('<li role="option" value="' + result.Value + '" class="OptionsClass"><a>' + result.Text + '</a></li>');
                                    $('#'+input_searchinput).attr('data-selectedID', result.Value);
                                    $('#'+input_searchinput).val(result.Text);
                                    $('#'+ul_dropdownmenu).append('<li role="option" style="pointer-events: none; opacity: 0.6;" class="disabled"><a>' + settings.endSentence + '</a></li>');
                                    $('#'+input_searchinput).removeAttr("disabled");
                                    $('#'+input_searchinput).attr('placeholder', settings.placeholder);


                                    $('.OptionsClass').on('click', function () {
                                        var text = $(this).find('a').html();
                                        var id = $(this).val();
                                        $('#'+input_searchinput).attr('data-selectedID', id);
                                        $('#'+input_searchinput).val(text);
                                    });

                                    $('.OptionsClass').css('width', '100%');
                                    $('.OptionsClass').css('background', '#FFFFFF');
                                    $('.OptionsClass').css('line-height', '35px');
                                    $('.OptionsClass').css('font-size', '14px');
                                    $('.OptionsClass').css('padding', '0 10px');
                                    $('.OptionsClass').css('cursor', 'pointer');
                                    $('.OptionsClass').css('list-style', 'none');
                                    $('.OptionsClass').css('position', 'relative');
                                    $('.OptionsClass').css('right', '10px');
                                    $('.OptionsClass').css('margin', '0 0 4px 0');

                                    $('.OptionsClass').hover( 
                                        function() {
                                            $(this).css("background", "#aaa")
                                        }, function() {
                                            $(this).css("background", "#FFFFFF");
                                        } 
                                    );

                                }).fail(function (jqXHR, textStatus, errorThrown) {
                                    console.log("Se ha producido un error intentando seleccionar la persona de la presente Entrevista")
                                }).always(function () {
                                });
                            }

                        } else {
                            if (settings.endSentence != null){
                                $('#'+ul_dropdownmenu).append('<li role="option" style="pointer-events: none; opacity: 0.6;" class="disabled"><a>' + settings.endSentence + '</a></li>');
                            }
                        }
                    }
                } 

                if (settings.DivAlreadyCreated == false) {
                    var trigger = $('#'+input_searchinput);
                    var list = $('#'+ul_dropdownmenu);
            
                    trigger.click(function () {
                        trigger.toggleClass('active');
                        list.slideToggle(200);
                    });
            
                    list.on('click', function () {
                        trigger.click();
                    });
    
                    $('#'+input_searchinput).keypress(function (event) {
                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if (keycode == '13') {
                            if (settings.filterFunction != null){
                                if ( $.isFunction( settings.filterFunction ) ) {
                                    settings.filterFunction.call( this );
                                }
                            }
                        }
                    });
                }

                $('#'+ul_dropdownmenu +' > li').on('click', function () {
                    var text = $(this).find('a').html();
                    var id = $(this).val();
                    $('#'+input_searchinput).attr('data-selectedID', id);
                    $('#'+input_searchinput).val(text);
                });
        
                if (IsAlready == "True") {
                    if (settings.input_IDOption != "0") {
                        var Year = $('#Year').val();
                        if (settings.then != null){
                            if ( $.isFunction( settings.then ) ) {
                                settings.then.call( this );
                            }
                        }
                    
                    }
                }

                $('#'+input_searchinput).css('width', '100%');
                $('#'+input_searchinput).css('background', '#FFFFFF');
                $('#'+input_searchinput).css('color', '#20262E');
                $('#'+input_searchinput).css('line-height', '35px');
                $('#'+input_searchinput).css('font-size', '14px');
                $('#'+input_searchinput).css('padding', '0 10px');
                $('#'+input_searchinput).css('cursor', 'pointer');
                $('#'+input_searchinput).css('position', 'relative');
                $('#'+input_searchinput).css('margin-left', '0px');
                $('#'+input_searchinput).css('right', '10px');

                $('#'+ul_dropdownmenu).css('display', 'none');
                $('#'+ul_dropdownmenu).css('position', 'absolute');
                $('#'+ul_dropdownmenu).css('margin', '0');
                $('#'+ul_dropdownmenu).css('background', '#FFFFFF');
                $('#'+ul_dropdownmenu).css('width', '96%');
                $('#'+ul_dropdownmenu).css('left', '3px');

                $('#'+ul_dropdownmenu +' > li').css('width', '100%');
                $('#'+ul_dropdownmenu +' > li').css('background', '#FFFFFF');
                $('#'+ul_dropdownmenu +' > li').css('line-height', '35px');
                $('#'+ul_dropdownmenu +' > li').css('font-size', '14px');
                $('#'+ul_dropdownmenu +' > li').css('padding', '0 10px');
                $('#'+ul_dropdownmenu +' > li').css('cursor', 'pointer');
                $('#'+ul_dropdownmenu +' > li').css('list-style', 'none');
                $('#'+ul_dropdownmenu +' > li').css('position', 'relative');
                $('#'+ul_dropdownmenu +' > li').css('right', '10px');
                $('#'+ul_dropdownmenu +' > li').css('margin', '0 0 4px 0');

                $('#'+ul_dropdownmenu +' > li').hover( 
                    function() {
                        $(this).css("background", "#aaa")
                    }, function() {
                        $(this).css("background", "#FFFFFF");
                    } 
                );

                $('.scrollable-menu_' + dvName).css('height', 'auto');
                $('.scrollable-menu_' + dvName).css('max-height', '200px');
                $('.scrollable-menu_' + dvName).css('overflow-x', 'hidden');

                $('.disabled').css('pointer-events', 'none');
                $('.disabled').css('opacity', '0.6');
            }
        });
    };
}( jQuery ));
