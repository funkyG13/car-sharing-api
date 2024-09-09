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
                        sh "mvn sonar:sonar \
                            -Dsonar.projectKey=Car-Sharing-Api \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.token=${SONARQUBE_TOKEN}"
                    }
                }
            }
        }
        stage('Dynamic Analysis') {
            steps {
                script {
                    // Run nmap inside the docker container with appropriate network settings
                    docker.image('instrumentisto/nmap').inside('--network host') {
                        // Use only the hostname for nmap
                        sh 'nmap -sV -p- antelope-accurate-bluejay.ngrok-free.app'
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
