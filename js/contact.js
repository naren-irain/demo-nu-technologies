/*
 * Contact Page Scripts
 */

//Contact Form Ajax
jQuery( document ).ready(function( $ )
{
	var formHandler =
	{
		busy			: false,
		reg_email		: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		reg_mobile		: /^[0-9]*(?:\.\d{1,2})?$/,
		form_error		: false,
		validate		: function()
		{

			formHandler.form_error = false;

			if(formHandler.busy)
				return false;

			if($.trim($('#name').val()).length === 0)
			{
				$('.error-name').html('Please Enter Your Name').show();
				$('#name').focus().addClass('hasError');
				formHandler.form_error	= true;
			}


			if($.trim($('#company').val()).length === 0)
			{
				$('.error-company').html('Please Enter company').show();
				$('#company').focus().addClass('hasError');
				formHandler.form_error	= true;
			}

			if($.trim($('#email').val()).length === 0)
			{
				$('.error-email').html('Please Enter Your Email').show();
				$('#email').focus().addClass('hasError');

				formHandler.form_error	= true;
			}
			else if(formHandler.reg_email.test($('#email').val()) === false)
			{
				$('.error-email').html('Please Enter Valid Email').show();
				$('#email').focus().addClass('hasError');

				formHandler.form_error	= true;
			}

			if($.trim($('#ph_number').val()).length === 0)
			{
				$('.error-ph_number').html('Please Enter Your Mobile Number').show();
				$('#ph_number').focus().addClass('hasError');

				formHandler.form_error	= true;
			}

			else if(formHandler.reg_mobile.test($.trim($('#ph_number').val())) === false)
			{
				$('.error-ph_number').html('Please Enter Valid Mobile Number').show();
				$('#ph_number').focus().addClass('hasError');

				formHandler.form_error	= true;
			}

			if($.trim($('#budget').val()).length === 0)
			{
				$('.error-budget').html('Please Enter Your Budget').show();
				$('#budget').focus().addClass('hasError');
				formHandler.form_error	= true;
			}

			if($.trim($('#message').val()).length === 0)
			{
				$('.error-message').html('Please Enter Your Message').show();
				$('#message').focus().addClass('hasError');
				formHandler.form_error	= true;
			}

			$('.hasError').eq(0).focus(); //focus first error flield

			if(formHandler.form_error) {
				setTimeout(function(){
					$('#form_loader').hide();
					$('#form_loader_spinner').removeClass('active');
				}, 400);
				return false;
			}

			formHandler.busy = true;
			$('#error_common').hide();

			$.ajax({
				cache	:	false,
				type	: 'POST',
				url		: contact.url,
				data: {
					action	: 'shutter_ContactForm',
					name	: $('#name').val(),
					email	: $('#email').val(),
					mobile	: $('#ph_number').val(),
					message	: $('#message').val(),
					location: $('#company').val(),
					security: $('#shutter-ajax-nonce' ).val(),
				},

				success:function(data)
				{
					var parse_data	=	JSON.parse(data);

					console.log(parse_data);

					if(parse_data.error == 0) {
						$('#success_msg').html(parse_data.res).show(0).delay(4000).hide(0);
						$('#contact_form')[0].reset();
						$('#form_submit').blur();
					}
					else {
						$('#error_common').html(parse_data.res).show(0);
					}

				},

				error: function(XMLHttpRequest, textStatus, errorThrown)
				{
					$('#error_common').html(errorThrown).show(0);
					console.log(errorThrown);
				},

				complete:function()
				{
					formHandler.busy = false;
					setTimeout(function(){
						$('#form_loader').hide();
						$('#form_loader_spinner').removeClass('active');
					}, 200);
				}
			});

		}
	};

	$('#form_submit').click(function(e)
	{
		e.preventDefault();
		$('#form_loader').show();
		$('#form_loader_spinner').addClass('active');
		formHandler.validate();
	});


	$('.input').on('input', function()
	{
		_elem = $(this).attr('name');

		if($(this).val() == '')
			$(this).removeClass('hasValue');
		else
			$(this).addClass('hasValue');

		if($('.error-'+_elem).text().length !== 0)
		{
			if($(this).val().length !== 0)
			{
				$('.error-'+_elem).hide();
				$(this).removeClass('hasError');
			}
			else
			{
				$('.error-'+_elem).show();
				$(this).addClass('hasError');
			}
		}

	});

	$('.input').on('focus', function()
	{
		$(this).parent().addClass('hasFocus');
	}).on('blur', function(){
		$(this).parent().removeClass('hasFocus');
	});

	$("#name").keyup(function()
	{
		if($(this).val().length > 50)
		{
			$(this).val($(this).val().substr(0, 50));
		}
	});

	$('#ph_number').keypress(function(event)
	{
		if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
		}
	});




});
