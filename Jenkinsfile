pipeline {
    agent any

    tools {
        nodejs "NodeJS 22.21.1"
    }

    environment {
        BASE_URL = "https://www.saucedemo.com"
        TYPE = "ui"
        USER = credentials('SAUCEDEMO_CRED_DEV')
        PASSWORD = credentials('SAUCEDEMO_CRED_DEV')
    }

    stages {
        stage('Install Electron') {
            steps {
                sh '''
                apt-get update && apt-get install -y \
                libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 \
                libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1
                '''
            }
        }

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