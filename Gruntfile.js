module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        uglify: {
            options: {
                sourceMap: false
            },
            build: {
                files: {
                    'dist/SpeechToTextJs.min.js': ['src/SpeechToTextJs.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, flatten: true, src: 'src/SpeechToTextJs.js', dest: 'dist/', filter: 'isFile' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('build', ['uglify', 'copy']);

};
