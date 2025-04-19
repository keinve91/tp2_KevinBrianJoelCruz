$(document).ready(function() {

    // --- Funciones Auxiliares ---
    function getInitials(name) {
        if (!name || name.trim() === '' || name.toLowerCase() === 'anónimo') return '??';
        const nameParts = name.trim().split(' ');
        let initials = '';
        if (nameParts.length > 0 && nameParts[0].length > 0) {
            initials += nameParts[0][0];
        }
        if (nameParts.length > 1 && nameParts[nameParts.length - 1].length > 0) {
            initials += nameParts[nameParts.length - 1][0];
        }
        return initials.toUpperCase() || '?';
    }

    function generateCommentId(index) {
         // Genera un ID simple basado en el índice o timestamp
         return `comment-${Date.now()}-${index}`;
    }

    function replaceAvatarWithInitials(commentElement) {
        const $comment = $(commentElement);
        const $avatarContainer = $comment.find('.flex-shrink-0');
        const $existingAvatarDiv = $avatarContainer.find('.avatar-iniciales');

        // Si ya tiene avatar de iniciales, no hacer nada (evita reprocesar)
        if ($existingAvatarDiv.length > 0) return;

        const $img = $avatarContainer.find('img');
        const name = $comment.find('.ms-3 strong').first().text();
        const initials = getInitials(name);
        const isReply = $comment.hasClass('ps-5');
        const avatarSizeClass = isReply ? 'avatar-reply' : 'avatar-main';

        const $initialsAvatar = $('<div></div>')
            .addClass('avatar-iniciales')
            .addClass(avatarSizeClass)
            .text(initials);

        if ($img.length > 0) {
            $img.replaceWith($initialsAvatar);
        } else {
             $avatarContainer.prepend($initialsAvatar);
        }
    }

    // --- Inicialización y Procesamiento Inicial ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    } else {
        console.warn("AOS.js no está cargado.");
    }

    // Mapa para almacenar likes (simulación)
    let likedComments = JSON.parse(localStorage.getItem('likedComments')) || {};

    // Procesar Comentarios Existentes
    $('#commentsSection .comment').each(function(index) {
        const $comment = $(this);
        // 1. Asignar ID único si no tiene
        if (!$comment.attr('id')) {
            $comment.attr('id', generateCommentId(index));
        }
        const commentId = $comment.attr('id');

        // 2. Reemplazar Avatar
        replaceAvatarWithInitials(this);

        // 3. Ajustar HTML de Likes y estado inicial
        const $likeLink = $comment.find('.like-link');
        const $icon = $likeLink.find('i');
        const currentText = $likeLink.text();
        const currentCountMatch = currentText.match(/\((\d+)\)/);
        let currentCount = currentCountMatch ? parseInt(currentCountMatch[1], 10) : 0;

        $likeLink.html(`<i class="far fa-thumbs-up"></i> (<span class="like-count">${currentCount}</span>)`);

        // Aplicar estado "liked" si está en localStorage
        if (likedComments[commentId]) {
             $likeLink.addClass('liked');
             $icon.removeClass('far').addClass('fas'); // Cambia a ícono relleno
        } else {
            $likeLink.removeClass('liked');
            $icon.removeClass('fas').addClass('far'); // Asegura ícono vacío
        }
    });

    // --- Manejadores de Eventos ---

    $('.filter-btn-group .btn-check').on('change', function() {
        let filterValue = $('input[name="blogFilter"]:checked').data('filter');
        let $posts = $('#blogPostsContainer .blog-post');
        if (filterValue === 'all') {
        $posts.fadeIn(300);
        } else {
        $posts.each(function() {
        let $post = $(this);
        let tags = $post.data('tags') ? $post.data('tags').split(' ') : [];
        if (tags.includes(filterValue)) {
        $post.fadeIn(300);
        } else {
        $post.fadeOut(300);
        }
        });
        }
        });
        $('#filterAll').trigger('change');

    // **Evento Click en "Me Gusta" (Likes)**
    $('#commentsSection').on('click', '.like-link', function(e) {
        e.preventDefault();
        const $likeLink = $(this);
        const $comment = $likeLink.closest('.comment');
        const commentId = $comment.attr('id');
        const $countSpan = $likeLink.find('.like-count');
        const $icon = $likeLink.find('i');
        let currentCount = parseInt($countSpan.text(), 10);

        if ($likeLink.hasClass('liked')) {
            // --- Quitar Like ---
            currentCount--;
            $likeLink.removeClass('liked');
            $icon.removeClass('fas').addClass('far'); // Ícono vacío
            delete likedComments[commentId]; // Quitar del mapa
        } else {
            // --- Dar Like ---
            currentCount++;
            $likeLink.addClass('liked');
            $icon.removeClass('far').addClass('fas'); // Ícono relleno
            likedComments[commentId] = true; // Añadir al mapa
        }

        // Actualizar contador visual y guardar en localStorage
        $countSpan.text(currentCount);
        localStorage.setItem('likedComments', JSON.stringify(likedComments));
    });


    // **Evento Click en "Responder"**
    $('#commentsSection').on('click', '.reply-link', function(e) {
        e.preventDefault();
        const $comment = $(this).closest('.comment');
        const commentId = $comment.attr('id');
        const author = $comment.find('strong').first().text();

        // Guardar ID del comentario padre en el input oculto
        $('#replyToCommentId').val(commentId);

        // Mostrar a quién se responde y botón cancelar
        $('#replyingToInfo').text(`Respondiendo a ${author}...`).show();
        $('#cancelReplyBtn').show();

        // Poner @autor en el textarea y enfocar
        $('#commentText').val(`@${author} `).focus();

        // Opcional: Scroll suave hasta el formulario
        $('html, body').animate({
             scrollTop: $("#commentForm").offset().top - 100
        }, 500);
    });

    // **Evento Click en "Cancelar Respuesta"**
    $('#cancelReplyBtn').on('click', function() {
        $('#replyToCommentId').val('');
        $('#replyingToInfo').hide().text('');
        $('#commentText').val('');
        $(this).hide();
    });


    // **Evento Submit del Formulario de Comentarios**
    $('#commentForm').on('submit', function(e) {
        e.preventDefault();
        const $form = $(this);
        const name = $('#commentName').val().trim() || 'Anónimo';
        const text = $('#commentText').val().trim();
        const replyToId = $('#replyToCommentId').val();

        if (text === '') {
            alert('Por favor, escribe un comentario.');
            $('#commentText').focus();
            return;
        }

        const initials = getInitials(name);
        const newCommentId = generateCommentId('new');
        let isReply = !!replyToId;
        let avatarSizeClass = isReply ? 'avatar-reply' : 'avatar-main';
        let indentationClass = isReply ? 'ps-5' : '';

        // HTML del nuevo comentario (adaptado para ser respuesta o no)
        const newCommentHtml = `
            <div id="${newCommentId}" class="d-flex mb-4 comment ${indentationClass}" style="display: none;" data-aos="fade-left">
                <div class="flex-shrink-0">
                    <div class="avatar-iniciales ${avatarSizeClass}">${initials}</div>
                </div>
                <div class="ms-3 flex-grow-1">
                    <div class="comment-bubble">
                        <strong>${$('<div/>').text(name).html()}</strong> <small class="text-muted">- Ahora mismo</small>
                        <p class="mt-1 mb-2">${$('<div/>').text(text).html()}</p>
                        <div class="comment-actions">
                            <a href="#" class="reply-link small text-primary">Responder</a>
                            <a href="#" class="like-link small text-muted ms-2">
                                <i class="far fa-thumbs-up"></i> (<span class="like-count">0</span>)
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;

        const $newComment = $(newCommentHtml);

        // Insertar el comentario
        if (isReply) {
            // Insertar después del comentario padre
            $('#' + replyToId).after($newComment);
        } else {
            // Insertar al final de la sección principal
            $('#commentsSection').append($newComment);
        }

        // Refrescar AOS y mostrar
        if (typeof AOS !== 'undefined') {
            AOS.refreshHard();
        }
        $newComment.fadeIn(500);

        // Limpiar formulario y estado de respuesta
        $form[0].reset(); // Método más robusto para limpiar el form
        $('#replyToCommentId').val('');
        $('#replyingToInfo').hide().text('');
        $('#cancelReplyBtn').hide();

        alert('Comentario publicado (simulación).');
    });

});