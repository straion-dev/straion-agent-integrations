#!/usr/bin/env node
/**
 * SessionEnd hook: forwards Claude Code session-end event to the Straion CLI.
 * Reads SessionEnd hook input from stdin (session_id, transcript_path, reason)
 * and calls: straion trajectory collect --agent <agent_id> --session <id>
 * The CLI handles all trajectory output (e.g. writes to ~/.straion/trajectories).
 */

const { execFileSync } = require('child_process');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input || '{}');
    const { transcript_path: transcriptPath, session_id: sessionId } = data;
    if (typeof sessionId !== 'string' || typeof transcriptPath !== 'string') {
      process.exit(0);
    }

    execFileSync(
      'straion',
      [
        'trajectory',
        'collect',
        '--agent',
        'claude-code',
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

  process.exit(0);
});
