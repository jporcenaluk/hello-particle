var gulp = require('gulp');
var exec = require('child_process').exec;
var fs = require('fs');
var homedir = require('os-homedir');
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
    
    fs.mkdir(homedir() + '/.particle', function () {
        fs.writeFile(homedir() + '/.particle/particle.config.json', particleConfigurationFileContents, function (err) {
            callback(err);
        });
    });
});

gulp.task('compile', ['setup'], function (callback) {
    if (os.type() == 'Windows_NT') {
        var command = 'node_modules\\.bin\\particle.cmd';
    } else {
        var command = 'node_modules/.bin/particle';
    }
    
    exec(command + ' compile photon firmware.ino --saveTo firmware.bin', function(err) {
        callback(err);
    });
});

gulp.task('flash', ['setup'], function(callback) {
    if (os.type() == 'Windows_NT') {
        var command = 'node_modules\\.bin\\particle.cmd';
    } else {
        var command = 'node_modules/.bin/particle';
    }
    
    exec(command + ' flash demo firmware.bin', function(err, stdout, stderr) {
        console.log(stderr);
        callback(err);
    });     
});

gulp.task('default', ['compile']);