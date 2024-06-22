const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');
const core = require('@actions/core');

const GITHUB_TOKEN = 'votre_github_token'; // Remplacez par un token valide

const context = {
  repo: {
    owner: 'sha-zha',
    repo: 'time-tracking-worflow'
  },
  payload: {
    issue: {
      number: 1, // Remplacez par le numéro de l'issue à tester
      body: null
    },
    label: {
      name: 'in progress'
    }
  }
};

try {
  console.log('Event received:', JSON.stringify(context.payload, null, 2));
  const issue = context.payload.issue;
  const label = context.payload.label.name;

  console.log('Issue:', issue);
  console.log('Label:', label);

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const now = new Date().toISOString();
  console.log('Current time:', now);

  let updatedBody = '';

  if (label === 'in progress') {
    updatedBody = issue.body + `\nStart Date: ${now}`;
    octokit.issues.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
      body: updatedBody
    }).then(response => {
      console.log('Issue updated successfully:', response.data.html_url);
    }).catch(error => {
      console.error('Error updating issue:', error);
    });
  }
} catch (error) {
  console.error('Error in script:', error);
}
