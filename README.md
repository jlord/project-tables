# HI!

This makes a website with tables showing the PRs and Issues associated with a project (through it's label on GitHub).

### How

**A Script and the GitHub API**

A script (`index.js`) uses the GitHub API and goes through **x repos** looking for **x labels** (provided by two arrays within `index.js`). It then writes a file of all the issues/prs that mactched: `issues.json`. Then it writes the data as a variable in a .js file, `hbs-issues.js`, so that I can include it in the HTML file.

**Sheetsee and HTML/CSS**

The `index.html` file includes the `hbs-issues.js` file so that I can feed all the data into sheetsee.js (SHEETSEE!) and generate the tables.

### Build

**Get Tokenized**

You're going to need generate a token and have access to GHE. Go to github.com, click Account Settings -> Applications. Click Generate new token. Copy that token and add it your `.profile` like so:

```BASH
# get to the root
$ cd
# list files
$ ls -a
# do you have .profile or .bash_profile?
$ atom .profile
# or
$ atom .bash_profile
```

On its own line, add the token variable and save the file:

`export GHTOKEN='RANDOMNUMBERSANDLETTERS'`

**Build and Deploy**

```BASH
# clone the repo
$ git clone https://ghe.io/jlord/project-tables.git
# go there!
$ cd project-tables
# install the modules needed
$ npm install
# build and deploy FTW
$ npm run build
$ npm run deploy
# open it
$ open index.html
```

Tada!

**Once You're Set Up**

You'll only need to:

```BASH
$ npm run build
$ npm run deploy
```
