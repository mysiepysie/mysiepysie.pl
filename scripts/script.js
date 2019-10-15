const sharp = require( 'sharp' );
const path = require( 'path' );
const fs = require( 'fs' );

const imageRegExp = RegExp( '\.(jpg|jpeg|png)$', 'i' );
const postsDir = path.join( __dirname, '..', 'source', '_posts' );
const galleryDir = path.join( 'source', 'galeria' );

hexo.extend.filter.register("after_generate", () => {
	resizePosts();
	resizeGallery();
} );

function resizePosts() {
	const files = fs.readdirSync( postsDir );

	for( let file of files ) {
		if( imageRegExp.test(file) ) {
			hexo.route.set( path.join( 'images', 'posts', 'small', file ), () => resize( path.join( postsDir, file ), 380, 260 ) );
			hexo.route.set( path.join( 'images', 'posts', file ), () => resize( path.join( postsDir, file ), 860, 330 ) );
		}
	}
}

function resizeGallery() {
	const mainFolder = fs.readdirSync( path.join( 'source', 'galeria' ), { withFileTypes: true } );

	for( let gallery of mainFolder ) {
		if( gallery.isDirectory() ) {
			const images = fs.readdirSync( path.join( 'source', 'galeria', gallery.name ) );

			for( let image of images ) {
				if( imageRegExp.test( image ) ) {
					hexo.route.set( path.join( 'galeria', gallery.name, 'small', image ), () =>
						resize( path.join( galleryDir, gallery.name, image ), 210, 210 ) 
					);

					hexo.route.set( path.join( 'galeria', gallery.name, image ), () =>
						resizeInside( path.join( galleryDir, gallery.name, image ), 1024, 1024 ) 
					);					
				};
			}
		};
	}
}

function resize( filePath, width, height ) {
	return sharp( filePath )
		.rotate()
		.resize( {
			width,
			height,
			fit: sharp.fit.cover,
			position: sharp.strategy.entropy
		} )
		.withMetadata( { orientation: 1 } )
		.toBuffer()
		.catch( err => console.error( err ) );
}

function resizeInside( filePath, width, height ) {
	return sharp( filePath )
		.rotate()
		.resize( {
			width,
			height,
			fit: sharp.fit.inside,
		} )
		.withMetadata( { orientation: 1 } )
		.toBuffer()
		.catch( err => console.error( err ) );
}
