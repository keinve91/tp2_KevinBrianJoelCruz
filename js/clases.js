$(document).ready(function () {
    $('.filtro-btn').on('click', function () {
      const filtro = $(this).data('filtro');

      if (filtro === 'todos') {
        $('#galeria-clases .col').fadeIn();
      } else {
        $('#galeria-clases .col').hide().filter(function () {
          return $(this).data('salon') === filtro;
        }).fadeIn();
      }
    });

    $('.zoom-card').hover(
      function () {
        $(this).find('img').css('transform', 'scale(1.1)');
        $(this).find('.overlay').css('opacity', '1');
      },
      function () {
        $(this).find('img').css('transform', 'scale(1)');
        $(this).find('.overlay').css('opacity', '0');
      }
    );
  });
