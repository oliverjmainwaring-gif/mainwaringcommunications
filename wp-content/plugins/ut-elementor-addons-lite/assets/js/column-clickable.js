(function($) {

  $( document ).on( 'click', 'body:not(.elementor-editor-active) .column-clickable', function(e) {
    var wrapper = $( this ),
    url = wrapper.data( 'column-clickable' );

    if ( url ) {
      if ( $( e.target ).filter( 'a, a *, .no-link, .no-link *' ).length ) {
        return true;
      }
      window.open( url, wrapper.data( 'column-clickable-blank' ) );
      return false;
    }
  });

})(jQuery);