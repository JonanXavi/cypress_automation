pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    environment {
        TYPE = "ui"

        BASE_URL = credentials('BASE_URL_DEV')
        USER = credentials('USER_DEV')
        PASSWORD = credentials('PASSWORD_DEV')

        GIT_TOKEN = credentials('GITHUB_TOKEN')
        REPO_URL = "github.com/JonanXavi/cypress_automation.git"
    }

    stages {
        stage('Build Test Environment') {
            steps {
                bat 'docker compose build --pull'
            }
        }

        stage('Execute Cypress UI Tests') {
            steps {
                bat '''
                echo BASE_URL=%BASE_URL% > .env.dev
                echo TYPE=%TYPE% >> .env.dev
                echo USER=%USER% >> .env.dev
                echo PASSWORD=%PASSWORD% >> .env.dev

                docker compose run --rm tests
                '''
            }
        }

        stage('Generate Allure Test Report') {
            steps {
                bat 'docker compose run --rm report'
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