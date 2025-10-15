pipeline {
  agent any

  environment {
    SONAR_HOST_URL = 'http://localhost:9000' 
    SONAR_TOKEN = credentials('SONAR_TOKEN')      
    DEPLOY_USER = credentials('nginx-deploy-user') 
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('SonarQube analysis') {
      steps {
        echo '🔍 Ejecutando análisis de SonarQube...'
        sh '''
          sonar-scanner \
            -Dsonar.projectKey=teclado \
            -Dsonar.projectName=Teclado \
            -Dsonar.sources=. \
            -Dsonar.host.url="${SONAR_HOST_URL}" \
            -Dsonar.login="${SONAR_TOKEN}"
        '''
      }
    }
<<<<<<< HEAD

    stage('Build') {
      steps {
        echo '🔧 Build (placeholder)'
        sh 'echo \"Construyendo...\"'
      }
    }

    stage('Deploy to nginx (via SSH)') {
      steps {
        echo '🚀 Desplegando en servidor Nginx remoto...'
        script {
          // Opción A: usar credencial SSH (recomendada)
          // - Añade una credencial tipo \"SSH Username with private key\" en Jenkins (id: nginx-ssh)
          // - Luego usa ssh-agent para ejecutar el scp/ssh seguros
          sshagent (credentials: ['nginx-ssh']) {
            sh '''
              git archive --format=tar.gz -o teclado_site.tar.gz HEAD
              scp -o StrictHostKeyChecking=no teclado_site.tar.gz adminuser@20.168.193.87:/tmp/teclado_site.tar.gz
              ssh -o StrictHostKeyChecking=no adminuser@20.168.193.87 \\
                "sudo rm -rf /var/www/html/* && sudo tar xzf /tmp/teclado_site.tar.gz -C /var/www/html && sudo chown -R www-data:www-data /var/www/html && sudo systemctl reload nginx"
              rm -f teclado_site.tar.gz
            '''
          }
        }
      }
    }
  }

  post {
    success { echo '✅ Pipeline completed successfully.' }
    failure { echo '❌ Pipeline failed.' }
  }
}
=======
}

>>>>>>> 04b985094e136763bfd253a700b464deb8081f8c
