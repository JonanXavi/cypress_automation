pipeline {
    agent any

    tools {
        nodejs "NodeJS 22.21.1"
    }

    stages {
        stage('Install system libraries') {
            steps {
                sh '''
                apt-get update -y
                apt-get install -y \
                    xvfb \
                    libgtk2.0-0 \
                    libgtk-3-0 \
                    libgbm-dev \
                    libnotify-dev \
                    libnss3 \
                    libxss1 \
                    libasound2 \
                    libxtst6 \
                    xauth \
                    libx11-xcb1 \
                    libdrm2 \
                    libxcomposite1 \
                    libxdamage1 \
                    libxrandr2 \
                    libxkbcommon0 \
                    libglib2.0-0 \
                    libpango-1.0-0 \
                    libcairo2
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'xvfb-run -a npm run test:ui-dev'
            }
        }
    }
}