pipeline {
  agent {
    label 'Slave_Induccion'
  }

  stages {
     
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }  

    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout scm
      }
    }

    stage('esLint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Test coverage') {
      steps {
        sh 'ng test --codeCoverage'
      }
    }

   stage('Build') {
      steps {
        sh 'npm run build'
      }
    }  

    stage('Static Code Analysis') {
      steps{
        echo '------------>Análisis de código estático<------------'
        withSonarQubeEnv('Sonar') {
          sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner"
        }

      }
   }

  }

}