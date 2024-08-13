pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://localhost:9000' 
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
                    withSonarQubeEnv('MySonarQubeServer') { 
                        sh "mvn sonar:sonar \
                            -Dsonar.projectKey=Car-Sharing-Api \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.token=sqp_3ad0e67f22af5bc353b40a70e90a3f4bfebb9683"
                    }
                }
            }
        }
    }
}
