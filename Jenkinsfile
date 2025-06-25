pipeline {
  agent any

  environment {
    IMAGE_FRONTEND = 'rishabhraj7/blog-frontend'
    IMAGE_BACKEND  = 'rishabhraj7/blog-backend'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git branch: 'main', url: 'https://github.com/rishabh-raj-777/mern-blog-app.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        bat 'docker-compose build'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-hub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          bat '''
            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            docker push %IMAGE_FRONTEND%
            docker push %IMAGE_BACKEND%
          '''
        }
      }
    }

    stage('Deploy Containers') {
      steps {
        bat '''
          docker-compose down || exit 0
          docker-compose up -d
        '''
      }
    }

    stage('Verify') {
      steps {
        bat 'docker ps'
      }
    }
  }

  post {
    success {
      echo '✅ MERN app deployed successfully!'
    }
    failure {
      echo '❌ Deployment failed.'
    }
  }
}
