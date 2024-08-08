pipeline {
	agent any
	stages {
		stage("Clean up"){
			steps {	
				deleteDir()
			}
		}
		stage("Clone Repo"){
			steps {	
				sh "git clone https://github.com/funkyG13/car-sharing-api.git"
			}
		}
		stage("Build"){
			steps {	
				dir("car-sharing-api/backend/carsharingapi") {
					sh "mvn clean install"
				}
			}
		}
	}
}

