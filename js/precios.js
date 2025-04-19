$(document).ready(function() {

    // --- Toggle Mensual/Anual ---
    $('#priceToggle').on('change', function() {
        if ($(this).is(':checked')) {
            // Si está chequeado (ANUAL)
            $('.price-monthly, .details-monthly').hide();
            $('.price-anual, .details-anual').show();
        } else {
            // Si no está chequeado (MENSUAL)
            $('.price-monthly, .details-monthly').show();
            $('.price-anual, .details-anual').hide();
        }
    });

    // --- Hover en Tabla Comparativa ---
    const $table = $('#comparisonTable');
    const $tbodyCells = $table.find('tbody td'); // Solo celdas de datos en tbody

    $tbodyCells.on('mouseenter', function() {
        let $cell = $(this);
        let $row = $cell.closest('tr');
        let colIndex = $cell.index(); // Obtiene el índice de la columna

        // Limpiar highlights anteriores
        $table.find('.highlight-row').removeClass('highlight-row');
        $table.find('.highlight-col').removeClass('highlight-col');

        // Resaltar fila actual
        $row.addClass('highlight-row');

        // Resaltar columna actual (en thead y tbody)
        $table.find('tr').each(function() {
            $(this).children().eq(colIndex).addClass('highlight-col');
        });
    });

    $table.on('mouseleave', function() {
        $table.find('.highlight-row').removeClass('highlight-row');
        $table.find('.highlight-col').removeClass('highlight-col');
    });

});