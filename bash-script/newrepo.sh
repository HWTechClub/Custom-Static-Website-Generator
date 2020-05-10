#!/bin/sh
reponame="$1"
if [ "$reponame" = "" ]; then
read -p "Enter Github Repository Name: " reponame
fi
mkdir ./$reponame
cd $reponame
curl -u USERNAME https://api.github.com/user/repos -d "{\"name\":\"$reponame\"}"
git init
echo "ADD README CONTENT" > README.md
git add README.md
git commit -m "Starting Out"
git remote add origin git@github.com:USERNAME/$reponame.git
git push -u origin master
