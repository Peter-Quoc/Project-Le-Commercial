

$(document).ready(function() {
    $(document).foundation();

    function after_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('form#footer-form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

    function after_contact_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('form#contact-form').hide();
            $('#contact_success_message').show();
            $('#contact_error_message').hide();
        }
        else
        {
            $('#contact_error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#contact_error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#contact_success_message').hide();
            $('#contact_error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

    $('#footer-form').submit(function(e)
      {
        e.preventDefault();
        console.log("Form submitted");
        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: './assets/php/handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });
      
      $('#contact-form').submit(function(e)
      {
        e.preventDefault();
        console.log("Form submitted");
        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: '../assets/php/contact-form-handler.php',
                data: $form.serialize(),
                success: after_contact_form_submitted,
                dataType: 'json' 
            });        
        
      });	
});
