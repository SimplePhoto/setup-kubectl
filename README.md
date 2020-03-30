# Setup Kubectl
## Install version of kubectl to match version running on cluster

```yaml
- uses: SimplePhoto/setup-kubectl@master
  id: kube-install
```
Refer to the action metadata file for details about all the inputs https://github.com/SimplePhoto/setup-kubectl/blob/master/action.yml

## Building
- `npm run package`
- `git add -A`
- `git commit -m "Your commit message goes here"`
