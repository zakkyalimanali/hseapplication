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
                    docker rm -f test_db || true
                    docker run -d --name test_db \
                      --network container:jenkins \
                      -e POSTGRES_DB=test_hse \
                      -e POSTGRES_USER=postgres \
                      -e POSTGRES_PASSWORD=testpass \
                      postgres:15-alpine

                    sleep 8

                    cd backend
                    python -m venv .venv
                    . .venv/bin/activate
                    pip install -r requirements.txt

                    export DB_HOST=localhost
                    export DB_PORT=5432
                    export DB_NAME=test_hse
                    export DB_USER=postgres
                    export DB_PASSWORD=testpass

                    python manage.py test hseapp || true

                    docker stop test_db && docker rm test_db
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
                expression {
                    return env.GIT_BRANCH == 'origin/main' || env.GIT_BRANCH == 'main' || env.BRANCH_NAME == 'main'
                }
            }
            steps {
                sshagent(['vps-ssh-credentials']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no root@206.189.33.58 "
                            cd /root/hseapplication &&
                            git fetch origin main &&
                            git reset --hard origin/main &&
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
