#!/bin/sh
reponame="$1"
GITHUBUSER=$(git config github.user)



if [ "$reponame" = "" ]; then
read -p "Enter Github Repository Name: " reponame
fi
mkdir ./$reponame
cd $reponame
curl -u $2:$3 https://api.github.com/user/repos -d "{\"name\":\"$reponame\"}"

git init
echo "ADD README CONTENT" > README.md
git add README.md
git commit -m "Starting Out"
git remote add origin git@github.com:$2/$reponame.git
git push -u origin master
