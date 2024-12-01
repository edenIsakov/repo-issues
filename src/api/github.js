import axios from 'axios';

const OWNER = 'treeverse';
const REPO = 'lakeFS';

const REPO_GITHUB_URL = `https://api.github.com/repos/${OWNER}/${REPO}`

function getIssues(page = 1, perPage = 10) {
  return axios.get(`${REPO_GITHUB_URL}/issues?page=${page}&per_page=${perPage}`)
}

function getRepo() {
  return axios.get(`${REPO_GITHUB_URL}`)
}

export { getRepo, getIssues };
