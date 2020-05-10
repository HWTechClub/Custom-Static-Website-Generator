# Team Collaboration challenge - 1

This will be a group activity challenge. You will be assigned all those who are interested and build a mini product in under 6 hours. The challenge will be actual problems that tech clubs face and you fix them to improve yours and your fellow members' experience.  

This project will be either GPL or AGPL license which means it’s an open source project that means the source code and application can be distributed for free.

## Create a whatsapp bot that creates a static webpage for you :
Your task is to ensure that a user can create a website from whatsapp. We will make all websites static to ensure that we can add future features such as deploying the websites to a server or IPFS. We will use a static website generator called hugo. 

Each team interested must have a minimum of 5 developers 

### Bot Developer : 
Your task is to design a bot that reads input and sends the according information to the API and displays the responded result. 
Repo : 
https://github.com/Tech-club/whatsapp-web.js/

Language :
Node js

Commands :
Show Templates 
- Returns link of all templates 
Create website <template-name>
 - returns the all commands available for that template 
 - returns unique id
 deploy id 
 - returns link 
remove id 
 - return message website removed

### Backend dev : 
Your task is to design the basic backend that reads and writes data to files , to the database and call the deployment api

File Structure:

````
- Templates 
   - Theme1 
   - Theme2
- ids
   - id1
     - Theme1 
   - id2 
     - Theme2
````

### Deployment dev : 
When the backend dev calls deploy must run the following bash script. 

if it's a new repo
```bash
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

```
Exisisting Repo
```bash
#!/bin/sh
git add README.md
git commit -m "Starting Out"
git push -u origin master
```

Code to deploy and get the site running
```bash
#!/bin/sh

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public upstream/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

#echo "Pushing to github"
#git push --all

```

### Database Designer and Integrator:

Your task is to design the database structure and also provide the queries for them.
You can even collaborate with the backend dev and use models.

Your database must accommodate for:
- Template name
- Locations where to add content (Might require 1 to many for RDBMS) 
- Demo link

- Id 
- Theme information (Derived from Template name and locations to add content) 

Queries it must accommodate for 
1. Adding a new theme
2. Deleting a new theme 
3. Showing theme name and theme link 
4. Deleting id 

### Hugo module creator:
Required to use existing hugo themes and configure it in such a way that it runs on github pages

Help the:
- Database designer and backend dev in giving information about each hugo theme used and ensure that all hugo themes are deployed using the same command.








