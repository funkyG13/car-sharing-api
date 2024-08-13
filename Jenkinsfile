pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://192.168.1.13:9000' 
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
        stage("SonarQube Analysis Backend") {
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
		  stage("SonarQube Analysis - Frontend") {
            steps {
                dir("car-sharing-api/frontend") {
                    withSonarQubeEnv('MySonarQubeServer') {
                        sh "npx sonar-scanner \
                            -Dsonar.projectKey=Car-Sharing-Api-Frontend \
                            -Dsonar.sources=/src \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.login=${SONARQUBE_TOKEN}"
                    }
                }
            }
        }
    }
	  post {
        always {
            cleanWs()
        }
    }
}
