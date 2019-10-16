const child_process = require( 'child_process' );
const fs = require( 'fs' );
const path = require( 'path' );

const whiteList = [ '.git', 'CNAME' ];

if ( !fs.existsSync( 'public' ) || !fs.existsSync( path.join( 'public', '.git' ) ) ) {
	execute( 'rm -rf public' );
	execute( 'git clone git@github.com:mysiepysie/mysiepysie.github.io.git public' );
}

execute( 'git fetch', 'public' );
execute( 'git checkout master', 'public' );

for( let file of fs.readdirSync( 'public' ) ) {
	if( !whiteList.includes( file ) ) {
		execute( `rm -rf ${ file }`, 'public' );
	}
}

execute( 'hexo generate' );

execute( 'git add .', 'public' );
execute( `git commit -m "${ getCommitName() }"`, 'public' );
execute( `git push origin master`, 'public' );

execute( 'git checkout master' );
execute( 'git git pull origin master' );
execute( 'git add .' );
execute( `git commit -m "${ getCommitName() }"` );
execute( `git push origin master` );

function execute( command, cwd = '.' ) {
	console.log( `${ cwd }> ${ command }` );
	child_process.execSync( command, { cwd } );
}

function getCommitName() {
	const date = new Date();

	return `Deploy: ${ date.getDate() }.${ date.getMonth() }.${ date.getFullYear() } ` +
		`${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`;
}
