pipeline {
    agent { label 'h02-102' }
    environment {
      FULL_IMAGE_NAME = 'reg.hahaho.dev/tdc/garden-fe'
      CI = 'false'
    }
    stages {
        stage('Example') {
          steps {
            withCredentials([usernamePassword(credentialsId: 'harbor', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          // sh 'cf login some.awesome.url -u $USERNAME -p $PASSWORD'
            sh 'echo -n $PASSWORD | docker login -u $USERNAME --password-stdin reg.hahaho.dev'
            }
            sh '''
                echo $FULL_IMAGE_NAME
                docker build --pull --cache-from $FULL_IMAGE_NAME:latest --tag $FULL_IMAGE_NAME:latest .
               '''
            sh 'docker push $FULL_IMAGE_NAME --all-tags'

            sshagent(credentials : ['h02115']) {
              sh 'ssh hahaho@10.111.2.115 "pwd"'   
              sh 'ssh hahaho@10.111.2.115 "docker-compose -f /home/hahaho/tdc/garden-uth/docker-compose.yml pull"' 
              sh 'ssh hahaho@10.111.2.115 "docker-compose -f /home/hahaho/tdc/garden-uth/docker-compose.yml up -d --build"'  
             
             
            }
          }
        }
    }
}
