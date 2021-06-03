import * as core from '@actions/core'

import { sendBuildNotification, sendReleaseNotesNotification } from './slack';

async function run(): Promise<void> {
  try {
    const template = core.getInput('template', { required: true }).toLowerCase();

    switch (template) {
        case 'build_status': {
            const status = core.getInput('status', { required: true }).toLowerCase();
            await sendBuildNotification(status)
            break;
        }
        case 'release_notes': {
            await sendReleaseNotesNotification()
            break;
        }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
