pipeline {
    agent any
    environment {
       GIT_REPO          = 'ISIS2603_202610_S2_E4_Aerohobby_Front'
       GIT_CREDENTIAL_ID = 'ms-GitHub-Credentials-for-jenkins'
       SONARQUBE_URL     = 'http://172.24.100.52:8082/sonar-isis2603'
       SONAR_TOKEN       = credentials('sonar-login')
    }
    stages {

       stage('Checkout') {
          steps {
             scmSkip(deleteBuild: true, skipPattern:'.*\\[ci-skip\\].*')
             git branch: 'main',
                credentialsId: env.GIT_CREDENTIAL_ID,
                url: 'https://github.com/Uniandes-isis2603/' + env.GIT_REPO
          }
       }

       stage('GitInspector') {
          steps {
             withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIAL_ID,
                                              passwordVariable: 'GIT_PASSWORD',
                                              usernameVariable: 'GIT_USERNAME')]) {
                sh 'mkdir -p code-analyzer-report'
                sh """ curl --request POST \
                            --url https://code-analyzer.virtual.uniandes.edu.co/analyze \
                            --header "Content-Type: application/json" \
                            --data '{"repo_url":"git@github.com:Uniandes-isis2603/${GIT_REPO}.git","access_token":"${GIT_PASSWORD}"}' \
                       > code-analyzer-report/index.html """
             }
             publishHTML(target: [
                allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true,
                reportDir: 'code-analyzer-report', reportFiles: 'index.html',
                reportName: 'GitInspector'
             ])
          }
       }

       stage('Build') {
          steps {
             script {
                docker.image('nodetools-isis2603:latest').inside('-u root') {
                   sh '''
                      curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                      export NVM_DIR="$HOME/.nvm"
                      [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                      nvm install 22
                      nvm use 22
                      npm ci
                      npm run build
                   '''
                }
             }
          }
       }

       stage('Unit Tests') {
          steps {
             script {
                docker.image('nodetools-isis2603:latest').inside('-u root') {
                   sh '''
                      curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                      export NVM_DIR="$HOME/.nvm"
                      [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                      nvm install 22
                      nvm use 22
                      npm test -- --code-coverage
                   '''
                }
             }
          }
       }

       stage('Static Analysis') {
          steps {
             sh '''
                docker run --rm -u root \
                   -e SONAR_HOST_URL="${SONARQUBE_URL}" \
                   -e SONAR_TOKEN="${SONAR_TOKEN}" \
                   -v "${WORKSPACE}":/usr/src \
                   sonarsource/sonar-scanner-cli
             '''
          }
       }

    }
    post {
       always {
          cleanWs deleteDirs: true
       }
    }
}
