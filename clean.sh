#!/bin/bash
# 터미널에서 사용 전 설정 필수설정 사항
# chmod 744 ./clean.sh
############################################################
# Help                                                     #
############################################################
LIME_YELLOW=$(tput setaf 190)

Help()
{
  # Display Help
  echo "npm 의존성 제거 후 install"
  echo "clean.sh 사용법"
  echo
  echo "Syntax: clean.sh [-h|-b]"
  echo "options:"
  echo "-h     Print this Help."
  echo "-b     npm 의존성 제거 후 install 후 새로 빌드함"
  echo
}

function clean()
{
  printf "\n${LIME_YELLOW}Clean\n"
  npm cache clean -f
  rm -rf ./package-lock.json
  rm -rf ./node_modules
  rm -rf ./build
  npm i
}

while getopts ":hb" option; do
  case $option in
    h) # display Help
      Help
      exit;;
    b) # Enter a name
      clean
      printf "\n${LIME_YELLOW}Build\n"
      npm run build
      exit;;
    \?) # Invalid option
      echo "Error: Invalid option"
      exit;;
  esac
done

clean



