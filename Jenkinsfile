pipeline {
agent any

```
environment {
    FRONTEND_IMAGE = "rishabhraj7/mern-blog-frontend"
    BACKEND_IMAGE  = "rishabhraj7/mern-blog-backend"
    IMAGE_TAG      = "${BUILD_NUMBER}"
}

stages {

    stage('Checkout Code') {
        steps {
            checkout scm
        }
    }

    stage('Install Backend Dependencies') {
        steps {
            dir('backend') {
                bat 'npm install'
            }
        }
    }

    stage('Install Frontend Dependencies') {
        steps {
            dir('frontend') {
                bat 'npm install'
            }
        }
    }

    stage('Build Frontend') {
        steps {
            dir('frontend') {
                bat 'npm run build'
            }
        }
    }

    stage('Docker Login') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {

                bat '''
                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                '''
            }
        }
    }

    stage('Build Backend Image') {
        steps {
            dir('backend') {
                bat '''
                docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% .
                docker tag %BACKEND_IMAGE%:%IMAGE_TAG% %BACKEND_IMAGE%:latest
                '''
            }
        }
    }

    stage('Build Frontend Image') {
        steps {
            dir('frontend') {
                bat '''
                docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% .
                docker tag %FRONTEND_IMAGE%:%IMAGE_TAG% %FRONTEND_IMAGE%:latest
                '''
            }
        }
    }

    stage('Push Backend Image') {
        steps {
            bat '''
            docker push %BACKEND_IMAGE%:%IMAGE_TAG%
            docker push %BACKEND_IMAGE%:latest
            '''
        }
    }

    stage('Push Frontend Image') {
        steps {
            bat '''
            docker push %FRONTEND_IMAGE%:%IMAGE_TAG%
            docker push %FRONTEND_IMAGE%:latest
            '''
        }
    }

    stage('Docker Logout') {
        steps {
            bat 'docker logout'
        }
    }
}

post {
    success {
        echo 'Pipeline completed successfully.'
    }

    failure {
        echo 'Pipeline failed.'
    }

    always {
        cleanWs()
    }
}
```

}