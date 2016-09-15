module.exports = function(grunt) {
    grunt.initConfig({
        sshconfig: {
            "deploy_box": {
                host: 'ec2-54-191-204-32.us-west-2.compute.amazonaws.com',
                username: 'ubuntu',
                privateKey: grunt.file.read('voteatx.pem')
            }
        },
        sftp: {
            deploy: {
                files: {
                    "./": grunt.file.expand(['src/**/*', '!src/node_modules/**/*'])
                },
                options: {
                    path: '/var/www/voteatx-svc2',
                    showProgress: true,
                    createDirectories: true,
                    config: 'deploy_box'
                }
            }
        },
        sshexec: {
            npm_install: {
                command: 'cd /var/www/voteatx-svc2/src && npm install',
                options: {
                    config: 'deploy_box'
                }
            },
            start: {
                command: 'NODE_ENV=production /home/ubuntu/.nvm/versions/node/v6.5.0/bin/forever' +
                ' start -a -p /home/ubuntu/' +
                ' --pidFile=/home/ubuntu/voteatx-svc2.pid' +
                ' -o /home/ubuntu/voteatx-svc2.log' +
                ' -e /home/ubuntu/voteatx-svc2.err' +
                ' -c /home/ubuntu/.nvm/versions/node/v6.5.0/bin/node' +
                ' --workingDir=/var/www/voteatx-svc2/src' +
                ' --uid "voteatx-svc2"' +
                ' --sourceDir=/var/www/voteatx-svc2/src app.js --prod',
                options: {
                    config: 'deploy_box'
                }
            },
            stop: {
                command: '/home/ubuntu/.nvm/versions/node/v6.5.0/bin/forever stop voteatx-svc2',
                options: {
                    config: 'deploy_box',
                    ignoreErrors: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-ssh');
    grunt.registerTask('deploy', ['sshexec:stop', 'sftp:deploy', 'sshexec:npm_install', 'sshexec:start']);
    grunt.registerTask('restart', ['sshexec:stop', 'sshexec:start']);
};
