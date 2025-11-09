pipeline {
    agent any

    tools {
        nodejs "NodeJS 22.21.1"
    }

    environment {
        TERM = "xterm-256color"
        BASE_URL = "https://www.saucedemo.com"
        TYPE = "ui"
        USER = credentials('SAUCEDEMO_CRED_DEV')
        PASSWORD = credentials('SAUCEDEMO_CRED_DEV')
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run UI tests') {
            steps {
                sh '''
                Xvfb :99 -screen 0 1280x1024x24 &
                export DISPLAY=:99

                xvfb-run --auto-servernum npm run test:ui-dev
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}