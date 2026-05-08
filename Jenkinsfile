pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Tests') {
            steps {
                sh '''
                    cd backend
                    python -m venv .venv
                    . .venv/bin/activate
                    pip install -r requirements.txt
                    python manage.py test hseapp
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy to VPS') {
            when {
                branch 'main'
            }
            steps {
                sshagent(['vps-ssh-credentials']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no root@206.189.33.58 "
                            cd /root/hseapplication &&
                            git pull origin main &&
                            docker compose down &&
                            docker compose up -d --build
                        "
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Deployed successfully!'
        }
    }
}
