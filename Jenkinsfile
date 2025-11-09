pipeline {
    agent {
        docker {
            image 'cypress/included:14.5.0'
        }
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
                sh 'npm run test:ui-dev'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}