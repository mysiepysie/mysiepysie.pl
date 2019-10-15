const fs = require( 'fs' );
const path = require( 'path' );
const YAML = require( 'yaml' );
const moment = require( 'moment' );

const indexFilePath = path.join( 'source', 'galeria', 'index.md' );
const imageRegExp = RegExp( '\.(jpg|jpeg|png)$', 'i' );

let { frontMatter, doc } = load( indexFilePath );

frontMatter = update( frontMatter );

save( indexFilePath, frontMatter, doc );

console.log( 'Done! With no errors!' );

function load( filePath ) {
	const indexFile = fs.readFileSync( filePath, 'utf8' );
	let lines = indexFile.split(/\r?\n/);

	if( !isFrontMatterSeparator( lines[ 0 ] ) ) {
		throw 'The first line should be the beginning of the front-matter!';
	}

	lines.shift();

	const frontMatterEnds = lines.findIndex( isFrontMatterSeparator );

	const frontMatter = lines.slice( 0, frontMatterEnds ).join( '\n' );
	const doc = lines.slice( frontMatterEnds + 1 ).join( '\n' );

	return { frontMatter: YAML.parse( frontMatter ), doc };
}

function isFrontMatterSeparator( string ) {
	return string.trim() == '---';
}

function update( frontMatter ) {
	if( !frontMatter.gallery ) {
		frontMatter.gallery = {};
	}

	const mainFolder = fs.readdirSync( path.join( 'source', 'galeria' ), { withFileTypes: true } );

	for( let dirent of mainFolder ) {
		if( dirent.isDirectory() ) {
			const galleryFolderName = dirent.name;
			const galleryData = frontMatter.gallery[ galleryFolderName ] || {};

			frontMatter.gallery[ galleryFolderName ] = updateGallery( galleryData, galleryFolderName );
		};
	}

	return frontMatter;
}

function updateGallery( data, folderName ) {
	if( !data.name ) {
		data.name = folderName;
	}

	if( !data.date ) {
		data.date = moment().format("YYYY-MM-DD HH:mm:ss");
	}

	if( !data.images ) {
		data.images = [];
	}
	
	data.images = updateImages( data.images, Array.from( getImages( folderName ) ) );

	return data;
}

function * getImages( folderName ) {
	const dir = fs.readdirSync( path.join( 'source', 'galeria', folderName ) );

	for( let fileName of dir ) {
		if( imageRegExp.test( fileName ) ) {
			yield normalise( fileName );
		};
	}
}

function normalise( fileName ) {
	return fileName
		.replace( /\s/g, '-' )
		.replace( /[^\w-\._]/g, '' );
}

function updateImages( dataImages, folderImages ) {
	for( let folderImage of folderImages ) {
		if( !dataImages.includes( folderImage ) ) {
			dataImages.push( folderImage );
		}
	}

	return dataImages.filter( dataImage => {
		return folderImages.includes( dataImage );
	} );
}

function save( indexFilePath, frontMatter, doc ) {
	let data = '---\n';
	data += YAML.stringify( frontMatter );
	data += '---\n';
	data += doc;

	fs.writeFileSync( indexFilePath, data );
}
