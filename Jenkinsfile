pipeline {
    agent {
        kubernetes {
            yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: node
            image: node:16.13.1-alpine
            command:
            - cat
            tty: true
          - name: cli
            image: amazon/aws-cli
            command:
            - cat
            tty: true
          - name: docker
            image: docker:19.03.1-dind
            securityContext:
                privileged: true     
         '''
        }
    }
    stages {
            stage('prep') {
                steps {
                git url: 'https://github.com/Cypher6600/french-toast-weekly-report-2.git', branch: 'master'
                }
            }
            stage('node') {
            steps {
                    container('node') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
            stage('cli login') {
                steps {
                    container('cli') {
                    sh 'aws ecr get-login-password --region us-west-2 > password.txt'
                    //sh 'aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 529396670287.dkr.ecr.us-west-2.amazonaws.com'
                    }
                }
            }
            stage('build docker image') {
                steps{
                    container('docker') {
                        sh 'docker login --username AWS --password-stdin < password.txt 529396670287.dkr.ecr.us-west-2.amazonaws.com'
                        sh 'docker build -t front_end .'
                        sh 'docker tag front_end:latest 529396670287.dkr.ecr.us-west-2.amazonaws.com/front_end:latest'
                        sh 'docker push 529396670287.dkr.ecr.us-west-2.amazonaws.com/front_end:latest'
                       }
                    }
                }
            
    }
}
