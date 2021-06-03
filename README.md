# Github Action : Send Slack Message

## Develop 

Install the dependencies  
```bash
$ npm install
```

## Publish

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Tag new version and publish release
```bash
git ci -am "v1"
git tag -a -m "Release notes" v1
git push --follow-tags
```