"use strict";

const path = require("path");
const fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const toolCache = require("@actions/tool-cache");
const core = require("@actions/core");
const kubectlToolName = 'kubectl';

async function downloadKubectl(version) {
  let downloadURL = `https://storage.googleapis.com/kubernetes-release/release/${version}/bin/linux/amd64/kubectl`;
  let cachedToolpath = toolCache.find(kubectlToolName, version);
  if (!cachedToolpath) {
    let kubectlDownloadPath = await toolCache.downloadTool(downloadURL);
    cachedToolpath = await toolCache.cacheFile(kubectlDownloadPath, kubectlToolName, kubectlToolName, version);
  }
  let kubectlPath = path.join(cachedToolpath, kubectlToolName);
  fs.chmodSync(kubectlPath, '777');
  return kubectlPath;
}

async function run() {
  let version = core.getInput('version', { 'required': true });
  let cachedPath = await downloadKubectl(version);
  console.log(`Kubectl tool version: '${version}' has been cached at ${cachedPath}`);
  core.setOutput('kubectl-path', cachedPath);
}

run().catch(core.setFailed);
