var request = require('request')
var github = require('github-api')
var fs = require('fs')

var i = 1
var r = 0

var options = {
    json: true,
    headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env['GHTOKEN']
    }
}
// set this for your project and labels
var labelPrefix = 'proj'
var labels = ['projone', 'projtwo']
var repos = ['repoone', 'repotwo']
// cool

var relevant = []

requestIssues(i, repos[r])

function getIssues(error, response, body) {
  if (error) console.log(error)
  if (r === repos.length) {
    console.log("Done with all, writing file")
    return writeIssues()
  }
  if (body.length === 0) {
    console.log("Done, moving on to " + repos[r])
    return nextRepo()
  }
  var issues = body
  issues.forEach(function(issue) {
    issue.parentrepo = repos[r]
    issue.pr = false
    if (issue.pull_request) issue.pr = true

    var labels = issue.labels
    labels.forEach(function(label) {
      if (label.name === labelPrefix) {
        return relevant.push(issue)
      }
    })
  })
  i++
  requestIssues(i, repos[r])
}

function nextRepo() {
  i = 1
  r++
  requestIssues(i, repos[r])
}

function requestIssues(pageNum, repo) {
  var base = 'https://api.github.com/repos/github/'
  var query = '/issues?page='
  var limit = '&per_page=100'
  options.url = base + repo + query + pageNum + limit
  request(options, getIssues)
}


function writeIssues() {
  console.log("Found " + relevant.length + " matching issues")
  fs.writeFileSync('issues.json', JSON.stringify(relevant, null, ' '))
  buildForSite()
}

function buildForSite() {
  var issues = JSON.parse(fs.readFileSync('issues.json').toString())
  var content = {}
  content.rows = issues
  fs.writeFileSync('hbs-issues.js', "var issues = " + JSON.stringify(content, null, ' '))
}
