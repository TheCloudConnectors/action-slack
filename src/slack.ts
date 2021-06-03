const { IncomingWebhook } = require('@slack/webhook');
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { basename } from 'path'

const {
    SLACK_WEBHOOK,
    SLACK_CHANNEL,
    GITHUB_REPOSITORY,
    GITHUB_REF,
    GITHUB_SERVER_URL,
    GITHUB_RUN_ID,
    GITHUB_WORKSPACE
} = process.env

function getSlackStatusColor(status: string): string {
	switch (status) {
	case "success":
		return "#4dc89a"
	case "failure":
		return "#fc4758"
	default:
		return "#bdbdbd"
	}
}

export async function sendBuildNotification(status: string) {
    const webhook = new IncomingWebhook(SLACK_WEBHOOK);
    await webhook.send({
        text: `*Build status for ${basename(GITHUB_REPOSITORY || '')} (${GITHUB_REF})*`,
        channel: SLACK_CHANNEL,
        username: 'Release Bot',
        icon_emoji: ':package:',
        attachments: [{
            text: `Build ${status}. <${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}|(details)>`,
            color: getSlackStatusColor(status)
        }]
    })
}

export async function sendReleaseNotesNotification() {
    const webhook = new IncomingWebhook(SLACK_WEBHOOK);
    const version = load(readFileSync(`${GITHUB_WORKSPACE}/.version`, 'utf-8')) as any

    await webhook.send({
        text: `*New release for ${basename(GITHUB_REPOSITORY || '')} (${GITHUB_REF})*`,
        channel: SLACK_CHANNEL,
        username: 'Release Bot',
        icon_emoji: ':package:',
        attachments: [{
            text: version?.changes?.slack,
            color: '#0063a4'
        }]
    })
}