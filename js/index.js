$(document).ready(function () {
    /*****************ANIMACION PARA EL HERO************************/
        $('.hero-title, .hero-subtitle, .btn-hero').hide();
    
        $('.hero-title, .hero-subtitle').fadeIn(800);
        $('.btn-hero').slideDown(1500);
    
    });
    
    $(document).ready(function () {
        $('.card').hover(
            function () {
                // Mouse entra
                $(this).stop().animate({
                    marginTop: "-5px",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
                }, 200);
            },
            function () {
                // Mouse sale
                $(this).stop().animate({
                    marginTop: "0px",
                    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.05)"
                }, 200);
            }
        );
    });
    $('.card').hover(
        function () {
            $(this).stop().animate({ marginTop: "-5px" }, 200);
            $(this).css("box-shadow", "0 10px 20px rgba(0, 0, 0, 0.2)");
        },
        function () {
            $(this).stop().animate({ marginTop: "0px" }, 200);
            $(this).css("box-shadow", "0 5px 10px rgba(0, 0, 0, 0.05)");
        }
    );
    $(document).ready(function () {
        function animarContador(id, velocidad) {
            const $elemento = $(id);
            const objetivo = parseInt($elemento.data('target'));
            let contador = 0;
            const incremento = Math.ceil(objetivo / velocidad); 
    
            const intervalo = setInterval(() => {
                contador += incremento;
                if (contador >= objetivo) {
                    contador = objetivo;
                    clearInterval(intervalo);
                }
                $elemento.text(contador);
            }, 30);
        }
    
        animarContador('#contador-socios', 50); // Más bajo = más lento, más alto = más rápido
    });
    

    