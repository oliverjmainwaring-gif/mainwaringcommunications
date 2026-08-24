jQuery(document).ready(function ($) {

    $('.ut-mark-default').on('click', function() {
        var isChecked = $(this).prop('checked');
        var post_id = $(this).data('post-id');
        var type = $(this).data('type');
        var $this = $(this);

        if (type === 'header') {
            $('.ut-mark-default[data-type="header"]').not(this).prop('checked', false);
        } else if (type === 'footer') {
            $('.ut-mark-default[data-type="footer"]').not(this).prop('checked', false);
        }

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'utal_save_mark_default_status',
                post_id: post_id,
                type: type,
                is_checked: isChecked ? 'yes' : 'no',
                _wpnonce: admin.nonce
            },
            beforeSend: function() {
                $this.closest('.column-mark-default').find('.ut-setting-default').show();
            },
            success: function(response) {
                $this.closest('.column-mark-default').find('.ut-setting-default').hide();
                location.reload();
                if (type === 'header') {
                    $('#ut_template').val(response.post_id).trigger('change');
                } else if (type === 'footer') {
                    $('#ut_template_footer').val(response.post_id).trigger('change'); 
                }
            }
        });
    });

/**
* Handle change event for 'display-on' select field.
* Load autocomplete options based on the selected post type.
*/
    $("body").on("change", ".display-on", function(e) {
        var $this = $(this), 
        postType = $(this).val(),
        data = {
            action: "ut_hf_load_autocomplate",
            token: admin.nonce,
            post_type: postType
        };

        $.ajax({
            type: "POST",
            url: admin.url,
            data: data,
            beforeSend: function() {
                $("#ut_hf_setting").addClass("loading");
            },
            success: function(response) {
                $("#ut_hf_setting").removeClass("loading");
                $this.parents(".condition-group").find(".child-item").html(response);
            }
        });
    });

/**
* Handle change event for 'no-display-on' select field.
* Load exclude autocomplete options based on the selected post type.
*/
    $("body").on("change", ".no-display-on", function(e) {
        var $this = $(this),
        postType = $this.val(),
        data = {
            action: "ut_hf_ex_auto",
            _ajax_nonce: admin.nonce,
            post_type: postType
        };

        $.ajax({
            type: "POST",
            url: admin.url,
            data: data,
            beforeSend: function() {
                $("#ut_hf_setting").addClass("loading");
            },
            success: function(response) {
                $("#ut_hf_setting").removeClass("loading");
                $this.parents(".condition-group").find(".child-item").html(response);
            }
        });
    });

/**
* Handle keyup event for 'ut--hf-post-name' input.
* Load and display autocomplete results based on the search keyword and post type.
*/
    $("body").on("keyup", ".ut--hf-post-name", function() {
        var $this = $(this),
        $inputItemWrapper = $this.parents(".input-item-wrapper"),
        postType = $inputItemWrapper.find(".ut-post-type").val(),
        searchKeyword = $this.val(),
        data = {
            action: "ut_hf_post_admin",
            _ajax_nonce: admin.nonce,
            post_type: postType,
            key: searchKeyword
        };

        $.ajax({
            type: "GET",
            url: admin.url,
            data: data,
            beforeSend: function() {
                $("#ut_hf_setting").addClass("loading");
            },
            success: function(response) {
                $("#ut_hf_setting").removeClass("loading");
                $inputItemWrapper.find(".ut-data").html(response);
            }
        });
    });

/**
* Handle click event for selecting posts in the "Display On" section.
* Updates the selected posts, hides the "Select All" option, and adds selected posts to the input field.
*/
    $("body").on("click", ".display--on .post-item", function() {
        var selectedPosts = $("input[name=ut_post]").val();
        var selectAllPosts = $(".display--on .ut-select-all-post");
        var selectPostSection = selectAllPosts.parents(".ut-section-select-post");
        if (!selectAllPosts.hasClass("hidden")) {
            selectAllPosts.addClass("hidden");
        }
        selectedPosts = selectedPosts && selectedPosts !== "all" ? selectedPosts.split(",") : [];
        if (!selectPostSection.hasClass("has-option")) {
            selectPostSection.addClass("has-option");
        }
        var postId = $(this).attr("data-item");
        var postTitle = $(this).html();
        if (!selectedPosts.includes(postId)) {
            selectedPosts.push(postId);
            var postTag = '<span class="ut-auto-complete-key"><span class="ut-title">' + postTitle + '</span><span class="btn-ut-auto-complete-delete ion-close" data-item="' + postId + '">×</span>';
            $(".ut--hf-post-name").before(postTag);
        }
        $("input[name=ut_post]").val(selectedPosts);
        $(".ut--hf-post-name").val("");
        $(".ut-data").html("");
    });

/**
* Handle click event for selecting posts in the "Do Not Display On" section.
* Updates the excluded posts, hides the "Select All" option, and adds excluded posts to the input field.
*/
    $("body").on("click", ".not-display .post-item", function() {
        var excludedPosts = $("input[name=ut_ex_post]").val();
        var selectAllPosts = $(".not-display .ut-select-all-post");
        var selectPostSection = selectAllPosts.parents(".ut-section-select-post");
        if (!selectAllPosts.hasClass("hidden")) {
            selectAllPosts.addClass("hidden");
        }
        excludedPosts = excludedPosts && excludedPosts !== "all" ? excludedPosts.split(",") : [];
        if (!selectPostSection.hasClass("has-option")) {
            selectPostSection.addClass("has-option");
        }
        var postId = $(this).attr("data-item");
        var postTitle = $(this).html();
        if (!excludedPosts.includes(postId)) {
            excludedPosts.push(postId);
            var postTag = '<span class="ut-auto-complete-key"><span class="ut-title">' + postTitle + '</span><span class="btn-ut-auto-complete-delete ion-close" data-item="' + postId + '">×</span>';
            $(".ut--hf-post-name").before(postTag);
        }
        $("input[name=ut_ex_post]").val(excludedPosts);
        $(".ut--hf-post-name").val("");
        $(".ut-data").html("");
    });

/**
* Handles the click event on the auto-complete field, focusing on the input field.
*/
    $('body').on('click', '.ut-auto-complete-field', function (event) {
        var inputField = $(this).find('.ut--hf-post-name');
        inputField.focus();
    });

/**
* Handles the click event on the delete button within the auto-complete field.
* Removes a selected post from the input and updates the display accordingly.
*/
    $('body').on('click', '.btn-ut-auto-complete-delete', function (event) {
        var postId = $(this).attr('data-item');
        var selectedPosts = $('input[name=ut_post]').val();
        var sectionRenderPost = $('.ut-section-render--post');
        var sectionSelectPost = sectionRenderPost.parents('.ut-section-select-post');
        var conditionGroup = sectionSelectPost.parents('.condition-group');
        if (selectedPosts) {
            selectedPosts = selectedPosts && 'all' != selectedPosts ? (selectedPosts = selectedPosts.replace(',' + postId, '')).replace(postId, '') : [];
        } else {
            selectedPosts = 'all';
        }
        if ('' == selectedPosts) {
            sectionRenderPost.addClass('hidden');
            sectionSelectPost.removeClass('render--post').addClass('select-all');
            sectionSelectPost.removeClass('has-option');
            sectionRenderPost.siblings('.ut-select-all-post').removeClass('hidden');
            $('.ut-data').html('');
        }
        if (conditionGroup.hasClass('not-display')) {
            $('input[name=ut_ex_post]').val(selectedPosts);
        } else {
            $('input[name=ut_post]').val(selectedPosts);
        }
        $(this).parents('.ut-auto-complete-key').remove();
    });

/**
* Toggles the visibility of the post selection options when the "Select All" section is clicked.
* Switches between the "select-all" and "render--post" classes to show or hide the post selection options.
*/
    $('body').on('click', '.ut-select-all-post', function (event) {
        var sectionSelectPost = $(this).parents('.ut-section-select-post');
        var sectionRenderPost = sectionSelectPost.find('.ut-section-render--post');
        if (sectionRenderPost.hasClass('hidden')) {
            sectionRenderPost.removeClass('hidden');
            sectionSelectPost.removeClass('select-all').addClass('render--post');
        } else {
            sectionRenderPost.addClass('hidden');
            sectionSelectPost.removeClass('render--post').addClass('select-all');
        }
    });

/**
* Clears any content in the "ut-data" and input field with class "ut--hf-post-name" upon a click event on the body.
*/
    $('body').on('click', function (event) {
        $('.ut-data').html('');
        $('.ut--hf-post-name').val('');
    });

/**
* Handles a change event on the element with ID "container." It sends an AJAX request to fetch additional content based on the selected value, and updates the page accordingly.
*/
    $('#container').on('change', function(event) {
        var selectField = $(this);
        var selectedValue = $(this).val();
        var requestData = {
            action: 'ut_hf_type',
            _ajax_nonce: admin.nonce,
            type: selectedValue
        };
        selectField.parents('.input-wrapper').siblings('.input-wrapper').remove();
        if (selectField.parents('.input-wrapper').siblings('.input-wrapper').length === 0) {
            $.ajax({
                type: 'GET',
                url: admin.url,
                data: requestData,
                beforeSend: function(xhr) {
                    $('#ut_hf_setting').addClass('loading');
                },
                success: function(response) {
                    $('#ut_hf_setting').removeClass('loading');
                    $('.form-meta-footer').append(response);
                }
            });
        }
    });

/**
* Handles the change event on the element with ID "ut-template-type." When the selection changes, it displays a hidden row with class "ut-template-row-condition."
*/
    $("#ut-template-type").on("change", function() {
        var $this = $(this);
        var val = $this.val();
        var $conditionRow = $this.parents(".ut-template-first-row").siblings(".ut-template-row-condition");
        $conditionRow.css("display", "block");
    });

/**
* Variables to select submit button, loading button, and close button in the UI.
*/
    var $submitBtn = $("#ut-new-template__form__submit");
    var $loadingBtn = $("#ut-new-template__form__submit");
    var $closeBtn = $(".ut-templates-modal__header__close--normal");

/**
* Handles a click event on the submit button. Prevents the default form submission, sends a GET request to create a new post using form data, and opens the Elementor editor for the created post in a new tab. Finally, it reloads the page after 3 seconds.
*/
    $submitBtn.on("click", function(event) {
        event.preventDefault();
        var formData = new FormData($("#ut-new-template__form")[0]);
        formData.append('action', 'ut_create_post');
        formData.append('_ajax_nonce', admin.nonce); 

        $.ajax({
            type: "POST",
            url: admin.url,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $loadingBtn.addClass("loading");
            },
            success: function (response) { 
                $loadingBtn.removeClass("loading");
                var postUrl = response.url;
                var elementorUrl = postUrl + '&action=elementor';
                window.open(elementorUrl, '_blank');
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });

/**
* Event listener for a click on the "Add New Template" button in the WordPress admin.
* It displays the new template modal, resets the form, and sets its initial state.
*/
    $(".post-type-ut_hf_builder").on("click", ".page-title-action", function(event) {
        event.preventDefault();
        $("#ut-new-template-modal").addClass("show");
        $('#ut-new-template__form')[0].reset();
        $('#ut-new-template-modal .ut-header-logo-title').text('New Template');
        $('.ut-button-primary').hide();
        $('#ut-new-template__form__submit').show();
        $('#ut-edit-elementor').hide();

        var selectedOption = $('#ut-display-type').val();
        if (selectedOption === 'all' || selectedOption === 'blog' || selectedOption === 'archive' || selectedOption === 'search' || selectedOption === 'not_found' || selectedOption === 'woocommerce') {
            $('.display-main-on').hide();
        } else {
            $('.display-main-on').show();
        }
    });

/**
* Event listener for closing the new template modal.
* When the close button is clicked, it removes the "show" class to hide the modal.
*/
    $closeBtn.on("click", function(event) {
        event.preventDefault();
        $("#ut-new-template-modal").removeClass("show");
        $('#featured-image-preview').hide();
    });

/**
* Event listener for editing a template when a row title or edit link is clicked.
* It retrieves template data via AJAX, populates the form, and allows editing.
*/
    $('body.post-type-ut_hf_builder').on('click', '.row-actions [class*="edit"] a, a.row-title', function(event) {
        event.preventDefault();

        var postId = $(this).closest('tr').attr('id').replace('post-', ''),
        tableRow = $(this).closest('tr'),
        editWithElementorLink = tableRow.find('.edit_with_elementor a').attr('href');

        $.ajax({
            url: ajaxurl,
            type: 'post',
            dataType: 'json', 
            data: {
                action: 'utal_template_builder',
                _action: 'edit',
                post_id: postId,
                _wpnonce: admin.nonce
            },
            beforeSend: function() {
            // Show loading indicator if needed
            },
            success: function(response) {
                if (!response.success) {
                    alert('Error: ' + (response.data || 'Unknown error'));
                    return;
                }

                var data = response.data; 

                $('#ut-new-template-modal').addClass('show');
                $('#ut-new-template__form__post-title').val(data.ut_post_title);
                $('#ut-template-type').val(data.ut_type);
                $('#ut-display-type').val(data.ut_display);

                if (data.ut_featured_image) { 
                    $('#featured-image-preview').attr('src', data.ut_featured_image).show();
                }

                if (data.ut_display == 'page') {
                    $('.display-main-on').html(data.ut_dropdown).show();
                } else {
                    $('.display-main-on').html('').hide();
                }

                $('#ut-new-template__form__submit').hide();

                var templateLink = $('<a>', {
                    href: editWithElementorLink,
                    class: 'ut-edit-elementor-link',
                    id: 'ut-edit-elementor',
                    target: '_blank',
                    text: 'Edit template'
                });

                $('.ut-edit-elementor').html(templateLink);
                $('.ut-save-changes').html('<button id="ut-new-template__form__save" class="ut-button ut-button-primary">Save changes</button>');

                $('#ut-new-template-modal .ut-header-logo-title').text('Edit Template');

                $('#ut-new-template__form__save').on('click', function() {
                    var ut_featured_image = $('#upload-image')[0].files[0];
                    var formData = new FormData($("#ut-new-template__form")[0]);

                    formData.append('action', 'utal_save_content');
                    formData.append('post_id', postId);
                    formData.append('ut_type', $('#ut-template-type').val());
                    formData.append('ut_display', $('#ut-display-type').val());
                    formData.append('ut_post_title', $('#ut-new-template__form__post-title').val());
                    formData.append('ut_post_id', $('input[name=ut_post]').val());
                    formData.append('ut_featured_image', ut_featured_image);
                    formData.append('_wpnonce', admin.nonce);

                    $.ajax({
                        url: ajaxurl,
                        type: 'post',
                        data: formData,
                        processData: false,
                        contentType: false,
                        beforeSend: function() {
                            $('#ut-new-template__form__save').addClass("loading");
                            $('#featured-image-preview').css('opacity','0.5');
                        },
                        success: function() {
                            $('#ut-new-template-modal .ut-header-logo-title').text('New Template');
                        location.reload(); // simpler than setting href and reload
                    }
                });
                });
            }
        });
    });


/**
* Event listener for closing an element with the class "ion-close."
* Checks the number of elements with the class "ut-auto-complete-key."
* If there are no such elements, it updates the content of "span.ut-select-all" to "Select."
*/
    $("body").on("click", ".ion-close", function(e) {
        var numberOfElements = $('.ut-auto-complete-key').length;
        if(numberOfElements == '0'){
            $('span.ut-select-all').html('Select');
        }
    });

/*
   Check if the 'src' attribute of the element with the ID 'featured-image-preview' is empty.
   If empty, hide the element using jQuery's 'hide()' method.
*/
    var featuredImage = $('#featured-image-preview');
    if (featuredImage.attr('src') === '') {
        featuredImage.hide();
    }

/*
   Event listener for clicking on the featured image link in a table cell
*/
    $(document).on("click", "td.featured-image.column-featured-image a", function (e) {
        e.preventDefault();
        var image = $(this).attr('data-image');
        $('.ut_popup_featured_image').html(image);
        $('.ut_popup_featured_image_main_wrapper').addClass('ut_active_image');
        $('body').addClass('ut_active_imageoverlay');
    });

/*
   Event listener for clicking on the displayed featured image overlay
*/
    $('.ut_popup_featured_image_close_btn').click(function() {
        $('.ut_popup_featured_image_main_wrapper').removeClass('ut_active_image');
        $('body').removeClass('ut_active_imageoverlay');
    });

    const $ut_featured_image = $('.ut_popup_featured_image_wrapper');
    $(document).mouseup(e => {
        if (!$ut_featured_image.is(e.target) &&
            $ut_featured_image.has(e.target).length === 0) 
        {
            $('.ut_popup_featured_image_main_wrapper').removeClass('ut_active_image');
            $('body').removeClass('ut_active_imageoverlay');
        }
    });

});
