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

  post{
    always {
        echo 'This will always run'
    }
    success {
        echo 'This will run only if successful'
    }
    failure {
        echo 'This will run only if failed'
        mail (to: 'williams.gutierrez@ceiba.com.co',
        subject: "Failed Pipeline:${currentBuild.fullDisplayName}",
        body: "Something is wrong with ${env.BUILD_URL}")
    }
    unstable {
        echo 'This will run only if the run was marked as unstable'
    }
    changed {
        echo 'This will run only if the state of the Pipeline has changed'
        echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }

}