/**
 * main.js
 *
 * The main javascript file which defines the application namespace and global
 * function. This file is including after the vendor scripts but prior to other
 * custom javascript files.
 */


/**
 * Define the global namespace
 */
var app = app || {};
app.flattr = app.flattr || {};


/**
 * The ready event, fires when DOM is ready loaded
 */
$(document).ready(function() {
  
  //get podcasts
  app.flattr.getPodcasts();
  
});

/**
 * Get results from search keyword 
 */
app.flattr.getPodcasts = function() {
  
  $('#js-search-submit').click(function(e) {  
    
    //not trigger default event
    e.preventDefault();
    
    var searchkeyword = $('#js-search-input').val();
    var pitem, heading;
    
    $.ajax({
      url: 'https://itunes.apple.com/search?term=' + searchkeyword + '&entity=podcast', 
      success: function(result) {
        
        //parse json
        var obj = $.parseJSON(result);
        
        // check if result have matches
        if(obj.resultCount > 0) {
        
          // clear list
          $( '.podcasts-container' ).empty();
          
          // remove message if allready exist
          $('.search-input-wrapper label').detach();
          
          // create heading
          heading =  '<h1 class="podcasts-result__heading">';
          heading += '<span>' + 'You searched for ' + '"' + searchkeyword.toUpperCase() + '"' + '</span>';
          heading += '<span>here is your result</span>';
          heading += '</h1>'; 
          
          // add to DOM
          $( '.podcasts-container' ).prepend( heading );
          
          //go through the results
          for (var i in obj.results) {
            
            // create podcast item
            pitem =  '<article class="podcast-item">';
            pitem += '<div class="nowrap">';
            pitem += '<figure class="artwork artwork--white artwork--small">';
            pitem += '<div class="artwork__image-wrapper">';
            pitem += '<div class="artwork__image"><img src="'+ obj.results[i].artworkUrl100 +'"/></div>';
            pitem += '</div>';
            pitem += '</figure>'; // close figure
            pitem += '<p class="podcast-item__genre">';
            pitem += '<span class="genre">Genre</span>';
            pitem += '<span class="genre__name">' + obj.results[i].primaryGenreName + '</span>';
            pitem += '</p>';
            pitem += '</div>'; // close nowrap
            pitem += '<h2 class="podcast-item__title">';
            pitem += '<a target="_blank" href="' + obj.results[i].trackViewUrl + '">' + obj.results[i].trackName + '</a>';
            pitem += '</h2>';
            pitem += '<ul class="podcast-item__tags">';
            pitem += '<li><span>Release date</span>' + obj.results[i].releaseDate.substring(0,10) + '</li>';
            pitem += '<li><span>County</span>' + obj.results[i].country + '</li>';
            pitem += '<li><span>Price</span>' + obj.results[i].trackPrice + ' ' + obj.results[i].currency + '</li>';
            pitem += '</ul>';
            pitem += '<button type="button" onclick="app.flattr.sendPodcastToFlattr(\'' + obj.results[i].trackViewUrl + '\');" class="send-to-flattr">Send to flattr</button>';
            pitem += '</article>';
            $( '.podcasts-container' ).append( pitem );
          }
        
        } else {
          
          // clear list
          $( '.podcasts-container' ).empty();
          
          // remove message if allready exist
          $('.search-input-wrapper label').detach();
          
          // show message if the user has not entered a search word
          $('.search-input-wrapper').prepend('<label><span>No hits were found.</span><span>Please enter a different search term.</span></label>');
        } 
        
    }});
  });
}


/**
 * Send podcast to flattr
 */
app.flattr.sendPodcastToFlattr = function(trackViewUrl) {
  
  jQuery.ajax ({
    url:  'https://api.flattr.com/rest/v2/flattr/bulk',
    type: 'POST',
    data: JSON.stringify({url:trackViewUrl}),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function() {
      console.log('success');
    },
    error: function(request, status, error) {
      // if error show message
      app.flattr.showErrorModal(status);
    }
  });
};


/**
 * Show error modal
 */
app.flattr.showErrorModal = function(status) {
  
  var modal, status = status;
  
  // create modal
  modal =  '<div id="error-modal" class="modal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content">';
  modal += '<div class="modal-header">';
  modal += '<h5 class="modal-title">' + status.toUpperCase() + '</h5>';
  modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  modal += '</div>';
  modal += '<div class="modal-body"><p>Sorry something goes wrong with sending podcast to flattr.</p><p>Please try again later.</p></div>';
  modal += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>';
  modal += '</div></div></div>';
  
  // first remove existing modal
  $('.modal').detach();
  
  // append modal
  $('body').prepend(modal);
  
  // show modal
  $('#error-modal').modal('show');
}

/**
 * Shows the loading spinner
 */
app.flattr.showLoadingSpinner = function() {
  $('.loading-spinner').show();
};


/**
 * Hides the loading spinner
 */
app.flattr.hideLoadingSpinner = function() {
  $('.loading-spinner').hide();
};


/**
 * Set cookie function
 */
app.flattr.setCookie = function(name, value, days) {

  // cookie expired date
  var expires;

  //if days is set
  if(days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  }else {
    expires = '';
  }

  //set cookie to document
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';

};


/**
 * Read cookie function
 */
app.flattr.readCookie = function(name) {
  var nameEQ = encodeURIComponent(name);
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};
