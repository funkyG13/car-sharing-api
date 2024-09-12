pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://192.168.1.59:9000'
        SONARQUBE_TOKEN = 'sqp_ec8d16d461e469ec2fb48a779279b059ec156195'
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
                    sh "mvn clean package"
                }
            }
        }
        stage("SonarQube Analysis Backend") {
            steps {
                dir("car-sharing-api/backend/carsharingapi") {
                    withSonarQubeEnv('MySonarQubeServer') { 
                        sh "mvn sonar:scanner \
                            -Dsonar.projectKey=Car-Sharing-Api \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.token=${SONARQUBE_TOKEN}"
                    }
                }
            }
        }
		stage("SonarQube Analysis Backend - Create sonar report") {
            steps {
                dir("car-sharing-api/backend/carsharingapi") {
                    withSonarQubeEnv('MySonarQubeServer') { 
                        sh "mvn sonar:sonar \
                            -Dsonar.projectKey=Car-Sharing-Api \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.token=${SONARQUBE_TOKEN}"
                    }
                }
            }
        }
        stage("ZAP Scan") {
            steps {
                script {
                    docker.image('ghcr.io/zaproxy/zaproxy:stable').inside('-v /c/Users/Mike/ZAP/work:/zap/wrk --network host') {
                        sh """
                        zap-baseline.py -t https://antelope-accurate-bluejay.ngrok-free.app/ \
                                        -r zap_report.html \
                                        -g gen.conf \
                                        -d
                        """
                    }
                }
            }
        }
    }
	  post {
        always {
            cleanWs()
        }
        success {
            archiveArtifacts artifacts: 'zap_report.html', allowEmptyArchive: true
        }
    }
}
