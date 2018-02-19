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
  
  $('#js-search-submit').click(function() {  
    var searchkeyword = $('#js-search-input').val();
    var dom;
    $.ajax({
      url: 'https://itunes.apple.com/search?term=' + searchkeyword + '&entity=podcast', 
      success: function(result) {
        var obj = $.parseJSON(result);
        console.log(obj.resultCount);
        
        // clear list
        $( '.podcasts-container' ).empty();
        
        //go through the results
        for (var i in obj.results) {
          
          // create podcast item
          dom =  '<h1 class="podcasts-result__count">';
          dom += '<span>You searched for ' + searchkeyword + '</br>here is your result</span>';
          dom += '</h1>';
          dom += '<div class="podcast-result-item col-sm"><div class="row">';
          dom += '<div class="podcast-image col-sm-4"><img src="'+ obj.results[i].artworkUrl100 +'"/></div>';
          dom += '<div class="podcast-meta-data col-sm-8">';
          dom += '<div class="podcast-meta-data-upper">' + obj.results[i].kind + '</div>';
          dom += '<div class="podcast-meta-data-title">' + obj.results[i].trackName + '</div>';
          dom += '</div>'; //close podcast-meta-data
          dom += '<div class="podcast-offer">';
          dom += '<button type="button" onclick="app.flattr.sendPodcastToFlattr(\'' + obj.results[i].trackViewUrl + '\');" class="btn btn-secondary btn-block send-to-flattr">Send to flattr</button>';
          dom += '</div>'; //close podcast-offer
          dom += '</div></div>'; // close podcast-result-item 
          $( '.podcasts-container' ).append( dom );
        }
    }});
  });
}


/**
 * Send podcast to flattr
 */
app.flattr.sendPodcastToFlattr = function(trackViewUrl) {
  
  jQuery.ajax ({
    url: 'https://api.flattr.com/rest/v2/flattr/bulk',
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
