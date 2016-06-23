var assetsDir = 'assets/',
    libDir = 'lib/',
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        DEBUG: true,
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/,
        lazy: true
    });

// Combine dependencies
gulp.task('script-dependencies', ['bower'], function() {
    return gulp.src(plugins.mainBowerFiles({ filter: /\b\.js/ }))
        .pipe(plugins.concat('scripts.js'))
        .pipe(plugins.order(['jquery.js', '*']))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ extname: '.min.js' }))
        .pipe(gulp.dest(libDir))
        .on('end', function() {
            return console.log('Scripts completed')
        });
});

gulp.task('styles-dependencies', ['bower'], function() {
    return gulp.src(plugins.mainBowerFiles({ filter: /\b\.css/ }))
        .pipe(plugins.concatCss('styles.css'))
        .pipe(plugins.order(['bootstrap.css', '*']))
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({ extname: '.min.css' }))
        .pipe(gulp.dest(libDir))
        .on('end', function() {
            return console.log('Styles completed')
        });
});

gulp.task('fonts', ['bower'], function() {
    return gulp.src(plugins.mainBowerFiles({ filter: /\.(eot|svg|ttf|woff|woff2|json)$/i }))
        .pipe(gulp.dest('fonts'))
})

gulp.task('default', ['bower', 'script-dependencies', 'styles-dependencies', 'fonts'], function() {
    return console.log('done');
});

// Run bower
gulp.task('bower', function() {
    return plugins.bower()
        .pipe(gulp.dest(assetsDir));
});
