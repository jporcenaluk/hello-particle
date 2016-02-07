var gulp = require('gulp');
var exec = require('child_process').exec;
var fs = require('fs');
var homedir = require('os-homedir');

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
    
    fs.mkdir(homedir() + '/.particle', function () {
        fs.writeFile(homedir() + '/.particle/particle.config.json', particleConfigurationFileContents, function (err) {
            callback(err);
        });
    });
});

gulp.task('compile', ['setup'], function (callback) {
    exec('node_modules/.bin/particle compile photon firmware.ino', function(err) {
        callback(err);
    });
});

gulp.task('default', ['compile']);