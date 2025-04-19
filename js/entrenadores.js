  $(document).ready(function () {
    $('.card-container').on('mouseenter', function () {
      let $bars = $(this).find('.progress-bar');
      $bars.each(function () {
        let value = $(this).closest('.progress').attr('aria-valuenow');
        $(this).css("width", "0%");
        $(this).stop(true, false).animate({ width: value + "%" }, 1000);
      });
    });

    $('.card-container').on('mouseleave', function () {
      let $bars = $(this).find('.progress-bar');
      $bars.stop(true, false).animate({ width: "0%" }, 500);
    });
  });
