pipeline {
  agent any

  environment {
    IMAGE_FRONTEND = 'rishabhraj7/blog-frontend'
    IMAGE_BACKEND  = 'rishabhraj7/blog-backend'
    REPO_URL       = 'https://github.com/rishabh-raj-777/mern-blog-app.git'
    VM_USER        = 'rishabh123'
    VM_IP          = '10.10.1.50'
    APP_DIR        = '/home/rishabh123/apps/mern-blog-app'
  }

  stages {
    stage('Clone Repository (Local)') {
      steps {
        git branch: 'feature/jenkins', url: "${REPO_URL}"
      }
    }

    stage('Inject Mongo URI (Local)') {
      steps {
        withCredentials([string(credentialsId: 'mongo-uri', variable: 'MONGO_URI')]) {
          sh '''
            mkdir -p backend
            echo MONGO_URI=$MONGO_URI > backend/.env
          '''
        }
      }
    }

    stage('Build Docker Images (Local)') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Push to Docker Hub (Local)') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-hub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_FRONTEND
            docker push $IMAGE_BACKEND
          '''
        }
      }
    }

    stage('Test SSH Connection to VM') {
      steps {
        sshagent(['proxmox-ssh']) {
          sh '''
            ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP \
              "echo ✅ SSH connection successful && hostname && whoami"
          '''
        }
      }
    }

    stage('Deploy to Proxmox VM') {
      steps {
        withCredentials([string(credentialsId: 'mongo-uri', variable: 'MONGO_URI')]) {
          sshagent(['proxmox-ssh']) {
            sh '''
              ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP '
                cd $APP_DIR &&
                git pull origin main &&
                echo MONGO_URI=$MONGO_URI > backend/.env &&
                docker-compose down || true &&
                docker-compose pull &&
                docker-compose up -d
              '
            '''
          }
        }
      }
    }

    stage('Verify Deployment on VM') {
      steps {
        sshagent(['proxmox-ssh']) {
          sh '''
            ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP \
              "docker ps"
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ MERN blog app deployed successfully to Proxmox VM!'
    }
    failure {
      echo '❌ Deployment failed. Check build logs and SSH connectivity.'
    }
  }
}
