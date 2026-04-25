pipeline {
agent any

environment {
    DOCKERHUB = "eknathpokharkar"
    IMAGE_TAG = "v${BUILD_NUMBER}"
}

stages {

    stage('Clone Code') {
        steps {
            git branch: 'main', url: 'https://github.com/eknathpo/capstoneproject.git'
        }
    }

    stage('Build Docker Images') {
        steps {
            sh '''
            docker build -t $DOCKERHUB/frontend:$IMAGE_TAG ./frontend
            docker build -t $DOCKERHUB/product:$IMAGE_TAG ./product-service
            docker build -t $DOCKERHUB/order:$IMAGE_TAG ./order-service
            docker build -t $DOCKERHUB/inventory:$IMAGE_TAG ./inventory-service
            '''
        }
    }

    stage('Push Images') {
        steps {
            withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                sh '''
                echo $PASS | docker login -u $USER --password-stdin
                docker push $DOCKERHUB/frontend:$IMAGE_TAG
                docker push $DOCKERHUB/product:$IMAGE_TAG
                docker push $DOCKERHUB/order:$IMAGE_TAG
                docker push $DOCKERHUB/inventory:$IMAGE_TAG
                '''
            }
        }
    }

    stage('Deploy to Kubernetes') {
        steps {
            sh 'kubectl apply -f k8s/'
        }
    }
}

}

