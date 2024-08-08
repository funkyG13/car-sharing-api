pipeline {
	agent any
	stages {
		stage("Clean up"){
			steps {	
				deleteDir()
			}
		}
		stage("Build"){
			steps {	
				dir("car-sharing-api") {
					sh "mvn clean install"
				}
			}
		}
	}
}

