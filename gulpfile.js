var gulp = require('gulp');
var exec = require('child_process').exec;
var fs = require('fs');
var os = require('os');

gulp.task('setup', function(callback) {
    var username = process.env.PARTICLE_USERNAME;
    var accessToken = process.env.PARTICLE_ACCESSTOKEN;
    var createdInBuild = process.env.BUILD_BUILDNUMBER;
    
    var particleConfiguration = {
      username: username,
      access_token: accessToken,
      created_in_build: createdInBuild
    };
    
    var particleConfigurationFileContents = JSON.stringify(
        particleConfiguration,
        null,
        '\t'
        );
    
    fs.mkdir(os.homedir() + '/.particle', function () {
        fs.writeFile(os.homedir() + '/.particle/particle.config.json', particleConfigurationFileContents, function (err) {
            callback(err);
        });
    });
});

gulp.task('compile', ['setup'], function (callback) {

});

gulp.task('default', ['compile']);