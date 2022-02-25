@Library('ceiba-jenkins-library') _
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
				sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:williams.ReservaViviendasFront.gutierrez',
        sonarName:'''"ADN-ReservaViviendasFront(williams.gutierrez)"''',
        sonarPathProperties:'./sonar-project.properties')
			}
   }

  }

}