        $(document).ready(function () {
            function validateField($field) {
                if ($field[0].checkValidity()) {
                    $field.removeClass('is-invalid').addClass('is-valid');
                } else {
                    $field.removeClass('is-valid').addClass('is-invalid');
                }
            }

            // Validación en tiempo real
            $('#advancedContactForm input, #advancedContactForm textarea').on('input change', function () {
                validateField($(this));
            });

            $('#advancedContactForm').on('submit', function (e) {
                e.preventDefault();
                let isValid = true;

                $(this).find('input, textarea').each(function () {
                    validateField($(this));
                    if (!this.checkValidity()) isValid = false;
                });

                if (isValid) {
                    $('#spinner').fadeIn();

                    setTimeout(function () {
                        $('#spinner').fadeOut();

                        const modal = new bootstrap.Modal(document.getElementById('successModal'));
                        modal.show();

                        $('#advancedContactForm')[0].reset();
                        $('#advancedContactForm input, #advancedContactForm textarea').removeClass('is-valid is-invalid');
                    }, 1500); // Simula envío
                }
            });
        });