#!/usr/bin/env node
/**
 * Copilot sessionEnd hook: forwards session end to Straion trajectory collection.
 * Input (stdin JSON): { sessionId, timestamp, cwd, reason }
 * Transcript path is resolved as: ~/.copilot/session-state/<sessionId>/events.jsonl
 * Output: ignored by Copilot (no return value processed).
 */

const { execFileSync } = require('child_process');
const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(input || '{}');
  } catch {
    process.exit(0);
  }

  try {
    const sessionId = typeof data.sessionId === 'string' ? data.sessionId.trim() : '';

    if (!sessionId) {
      process.exit(0);
    }

    const home = process.env['HOME'] || process.env['USERPROFILE'] || '';
    const transcriptPath = path.join(home, '.copilot', 'session-state', sessionId, 'events.jsonl');

    execFileSync(
      'straion',
      [
        'trajectory',
        'collect',
        '--agent',
        'github-copilot',
        '--session',
        sessionId,
        '--transcript-path',
        transcriptPath,
      ],
      { stdio: 'inherit' },
    );
  } catch {
    // Non-fatal: avoid breaking session end
  }

  process.exit(0);
});
