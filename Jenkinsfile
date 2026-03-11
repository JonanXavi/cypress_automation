pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    environment {
        ENV_NAME = "dev"
        TYPE = "ui"

        BASE_URL = credentials('BASE_URL_DEV')
        USER = credentials('USER_DEV')
        PASSWORD = credentials('PASSWORD_DEV')

        GIT_TOKEN = credentials('GITHUB_TOKEN')
        REPO_URL = "github.com/JonanXavi/cypress_automation.git"

        DOCKER_IMAGE = "cypress-automation:latest"
    }

    stages {
        stage('Build Test Environment') {
            steps {
                bat 'docker build --pull -t %DOCKER_IMAGE% .'
            }
        }

        stage('Execute Cypress UI Tests') {
            steps {
                withCredentials([
                    string(credentialsId: 'BASE_URL_DEV', variable: 'BASE_URL'),
                    string(credentialsId: 'USER_DEV', variable: 'USER'),
                    string(credentialsId: 'PASSWORD_DEV', variable: 'PASSWORD')
                ]) {
                    bat '''
                    docker run --rm ^
                    -v %WORKSPACE%\\allure-results:/app/allure-results ^
                    -v %WORKSPACE%\\allure-report:/app/allure-report ^
                    -v %WORKSPACE%\\cypress\\screenshots:/app/cypress/screenshots ^
                    -v %WORKSPACE%\\cypress\\videos:/app/cypress/videos ^
                    -e BASE_URL=%BASE_URL% ^
                    -e TYPE=%TYPE% ^
                    -e USER=%USER% ^
                    -e PASSWORD=%PASSWORD% ^
                    %DOCKER_IMAGE% npm run test:ui-dev
                    '''
                }
            }
        }

        stage('Generate Allure Test Report') {
            steps {
                bat '''
                docker run --rm ^
                -v %WORKSPACE%\\allure-results:/app/allure-results ^
                -v %WORKSPACE%\\allure-report:/app/allure-report ^
                %DOCKER_IMAGE% npm run test:report
                '''
            }
        }

        stage('Publish Report to GitHub Pages') {
            steps {
                bat '''
                git config user.email "jenkins@ci.com"
                git config user.name "jenkins"

                git worktree add allure-gh-pages gh-pages || git worktree add allure-gh-pages -b gh-pages

                rmdir /S /Q allure-gh-pages\\* 2>nul

                xcopy allure-report\\* allure-gh-pages /E /I /Y

                cd allure-gh-pages
                git add .
                git commit -m "Allure Report - Build #%BUILD_NUMBER% - %DATE% %TIME%" || echo No changes to commit
                git push https://%GIT_TOKEN%@%REPO_URL% gh-pages
                '''
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                results: [[path: 'allure-results']]
            ])

            archiveArtifacts artifacts: 'cypress/screenshots/**,cypress/videos/**,allure-report/**', allowEmptyArchive: true
            cleanWs()
        }

        success {
            echo '✅ UI tests passed'
        }

        failure {
            echo '❌ UI tests failed'
        }
    }
}