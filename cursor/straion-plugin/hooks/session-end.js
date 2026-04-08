#!/usr/bin/env node
/**
 * Cursor sessionEnd hook: forwards session end to Straion trajectory collection.
 * Input (stdin JSON) includes sessionEnd fields plus the common hook envelope
 * Fire-and-forget: failures are non-fatal so Cursor can always end the session.
 *
 */

import { execFileSync } from 'child_process';

function writeEmptyOutput() {
  process.stdout.write('{}\n');
}

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
    writeEmptyOutput();
    process.exit(0);
  }

  try {
    const sessionId =
      typeof data.session_id === 'string' && data.session_id
        ? data.session_id
        : typeof data.conversation_id === 'string' && data.conversation_id
          ? data.conversation_id
          : null;
    const transcriptPath =
      typeof data.transcript_path === 'string' && data.transcript_path.trim()
        ? data.transcript_path.trim()
        : null;

    if (!sessionId || !transcriptPath) {
      writeEmptyOutput();
      process.exit(0);
    }

    execFileSync(
      'straion',
      [
        'trajectory',
        'collect',
        '--agent',
        'cursor',
        '--session',
        sessionId,
        '--transcript-path',
        transcriptPath,
      ],
      {
        stdio: 'inherit',
      },
    );
  } catch {
    // Non-fatal: avoid breaking session end
  }

  writeEmptyOutput();
  process.exit(0);
});
