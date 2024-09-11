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
		stage("ZAP Scan") {
            steps {
                script {
                    // Start ZAP in daemon mode
                    sh "zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.key=${ZAP_API_KEY} &"
                    sleep(time: 10, unit: 'SECONDS') // Wait for ZAP to start
                    
                    // Run ZAP Baseline Scan
                    sh """
                    zap-baseline.py -t http:// https://antelope-accurate-bluejay.ngrok-free.app/ \
                                    -r zap_report.html \
                                    -g gen.conf \
                                    -d
                    """
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
