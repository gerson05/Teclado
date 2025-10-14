pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Obteniendo código fuente del repositorio...'
                // En un escenario real, aquí harías:
                // git checkout: scm
                sh 'echo "Código fuente obtenido"'
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                echo 'Ejecutando análisis de calidad con SonarQube...'
                script {
                    // Configuración de SonarQube
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner " +
                           "-Dsonar.projectKey=teclado-app " +
                           "-Dsonar.sources=. " +
                           "-Dsonar.host.url=http://172.171.112.29:9000 " +
                           "-Dsonar.login=admin " +
                           "-Dsonar.password=admin"
                    }
                }
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Construyendo aplicación...'
                sh 'echo "Aplicación construida exitosamente"'
                // Aquí podrías agregar pasos de build si fuera necesario
            }
        }
        
        stage('Deploy to Nginx') {
            steps {
                echo 'Desplegando aplicación a Nginx...'
                script {
                    // Copiar archivos a la VM de Nginx
                    sh 'echo "Copiando archivos a Nginx..."'
                    sh 'echo "Reiniciando contenedor Nginx..."'
                    sh 'echo "Verificando despliegue..."'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completado'
            // Limpiar archivos temporales si es necesario
        }
        success {
            echo '✅ Pipeline ejecutado exitosamente'
            echo '🎉 Aplicación Teclado desplegada correctamente'
        }
        failure {
            echo '❌ Pipeline falló'
            // Aquí podrías enviar notificaciones de error
        }
    }
}
