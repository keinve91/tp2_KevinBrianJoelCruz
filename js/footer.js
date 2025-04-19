    
    $(document).ready(function () {
        // Validación Bootstrap 5
        const form = $('#footer form');
        const emailInput = $('#email-newsletter');
    
        form.on('submit', function (e) {
            e.preventDefault();
    
            // Si el formulario no es válido según HTML5
            if (!this.checkValidity()) {
                form.addClass('was-validated');
                return;
            }
    
            // Mostrar spinner en el botón
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.text();
            submitBtn
                .html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...')
                .prop('disabled', true);
    
            // Simular envío (ejemplo: 2 segundos)
            setTimeout(() => {
                // Volver al estado original
                submitBtn.html(originalText).prop('disabled', false);
    
                // Limpiar formulario y validación
                form[0].reset();
                form.removeClass('was-validated');
    
                // Alerta o notificación de éxito (podés reemplazar con Toast si querés)
                alert('¡Gracias por suscribirte! 📬');
            }, 2000);
        });
    });