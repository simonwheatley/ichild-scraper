var scrap = require('scrap');

var minders = [];

scrap('http://www.ichild.co.uk/listings/search/postcode/M218AT/distance/10/date/1388912400/limit/5/page/', function(err, $) {
// scrap('http://local.wordpress.dev/search.html', function(err, $) {
	var i = 0;
	$( '[id$=_member]>div:first-child' ).each( function() {
		i++;
		// console.log( i + ": " + $( this ).html() ); 
		var minder = {};
		minder.name = $( this ).find( 'h2' ).first().text();
		minder.membership = $( this ).find( 'h4' ).text();
		minder.url = 'http://www.ichild.co.uk' + $( this ).find( 'a' ).attr( 'href' );
		// /directory/childcare/registered_childminders/manchester/M21/clairelmackie/
		minder.postcode = $( this ).find( 'a' ).attr( 'href' ).match( /\/[a-z]+\/[a-z]+\/[a-z\_]+\/[a-z]+\/([a-z]+[0-9]+)\//i )[1];
		minder.distance = $( this ).parent().find( 'div.grid_3 h4' ).text().match( /(\d+\.\d+ miles)/i )[1];
		minder.vacancy = "No";
		if ( $( this ).parent().find( 'div.grid_3 .vacancy' ).length )
			minder.vacancy = "Yes";
		scrap(minder.url, function(err, $) {
			// console.log(  );
			$( '#view_listing h3:contains("Childcare Offered")' ).siblings( 'ul' ).find( 'li' ).each( function() {
				minder[ $( this ).find( 'h4' ).text() ] = 'No';
				if ( $( this ).find( '.checkbox_ticked' ) )
					minder[ $( this ).find( 'h4' ).text() ] = 'Yes';
			} );
			$( '#view_listing .details ul li' ).each( function() {
				minder[ $( this ).find( 'h6' ).text() ] = 'No';
				if ( $( this ).find( '.checkbox_ticked' ) )
					minder[ $( this ).find( 'h6' ).text() ] = 'Yes';
			} );
			minder.fees_statement = $( '.home_section_title:contains("&pound;")' ).text().replace( '\n', '' ).replace( '\r', '' ).replace( /\s+/g, ' ' ).trim();
			$( 'strong:contains("Current vacancies:")' ).parent().find( 'div,span' )
			minder.current_baby_vacancies = $( 'span[style*="#FF809F"]' ).first().text().match( /(\d+)/i )[1];
			// if ( $( 'span[style*="#FF809F"]' ) )
			console.log( JSON.stringify( minder ) + ',' );
		});
		minders.push( minder );
	} );
});
