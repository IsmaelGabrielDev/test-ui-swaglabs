pipeline {
    agent any

    stages {
        stage('Clonando git e instalando dependencias') {
            steps {
                git branch: 'main', url: 'https://github.com/IsmaelGabrielDev/test-ui-swaglabs.git'
                bat 'npm install'
            }
        }
        stage('Testando aplicação') {
            steps {
                bat '''set NO_COLOR=1
npm run cy:run'''
            }
        }
    }
}