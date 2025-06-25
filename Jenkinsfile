pipeline {
  agent any

  environment {
    IMAGE_FRONTEND = 'rishabhraj7/blog-frontend'
    IMAGE_BACKEND  = 'rishabhraj7/blog-backend'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/rishabh-raj-777/mern-blog-app.git'
      }
    }

    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          sh 'docker build -t $IMAGE_FRONTEND:latest .'
        }
      }
    }

    stage('Build Backend Image') {
      steps {
        dir('backend') {
          sh 'docker build -t $IMAGE_BACKEND:latest .'
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_FRONTEND:latest
            docker push $IMAGE_BACKEND:latest
          '''
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d --build'
      }
    }
  }
}
