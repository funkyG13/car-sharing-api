pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://192.168.1.59:9000'
        SONARQUBE_TOKEN = 'sqp_ec8d16d461e469ec2fb48a779279b059ec156195'
        ZAP_URL = 'http://localhost:8090'
        ZAP_API_KEY = 'bp5fargka4kg3cjc9hk1hpm8uo'
    }
    stages {
        stage("Clean up") {
            steps {
                deleteDir()
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
