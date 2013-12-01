var scrap = require('scrap');

scrap('http://www.ichild.co.uk/listings/search/postcode/M218AT/distance/10/date/1388912400/limit/5/page/', function(err, $) {
// scrap('http://local.wordpress.dev/search.html', function(err, $) {
	var minders = [];
	var i = 0;
	$( '[id$=_member]>div:first-child' ).each( function() {
		i++;
		if ( i > 2 )
			return;
		console.log( i + ": " + $( this ).html() ); 
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
			// console.log( $( '#view_listing' ).html() );
		});
		console.log( minder );
	} );
	console.log( "Finished " + i );
});
