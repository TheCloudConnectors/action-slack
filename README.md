# Github Action : Send Slack Message

## Develop 

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

## Publish

```bash
yarn package
git ci -am "v1"
git tag -a -m "Release notes" v1
git push --follow-tags
```