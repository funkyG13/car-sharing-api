pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://localhost:9000' 
        SONARQUBE_TOKEN = credentials('sonar-token')
    }
    stages {
        stage("Clean up") {
            steps {
                deleteDir()
            }
        }
        stage("Clone Repo") {
            steps {
                sh "git clone https://github.com/funkyG13/car-sharing-api.git"
            }
        }
        stage("Build") {
            steps {
                dir("car-sharing-api/backend/carsharingapi") {
                    sh "mvn clean install"
                }
            }
        }
        stage("SonarQube Analysis") {
            steps {
                dir("car-sharing-api/backend/carsharingapi") {
                    withSonarQubeEnv('MySonarQubeServer') { // Name of the SonarQube server in Jenkins config
                        sh "mvn sonar:sonar \
                            -Dsonar.projectKey=car-sharing-api \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.login=${SONARQUBE_TOKEN}"
                    }
                }
            }
        }
    }
    post {
        always {
            junit '**/target/surefire-reports/*.xml' // If there are test results
            cleanWs() // Clean workspace after the build
        }
    }
}
