# Straion CLI Reference

## Find Rules

Validate code, specs, or tasks against project rules.

### Command

```bash
straion find-rules \
  --title "<title>" \
  --body "<body>" \
  --summary "<summary>"
```

### Parameters

| Parameter   | Required | Description                     |
| ----------- | -------- | ------------------------------- |
| `--title`   | No       | Title of what's being validated |
| `--body`    | No       | Detailed content to validate    |
| `--summary` | No       | Broader context / plan summary  |

### Example

```bash
straion find-rules \
  --title "Add user authentication" \
  --body "Implement JWT-based auth with login, logout, token refresh" \
  --summary "Building user management dashboard"
```

### Output

Plain text, grouped by collection:

```
Found 3 matching rule(s):

Collection name: Security Standards
Rules:
- All API endpoints must implement JWT authentication [IN_SCOPE] Reason: Task directly implements authentication
- Tokens must be rotated every 24 hours [UNCERTAIN] Reason: Token refresh is mentioned but rotation policy unclear
```

Each rule includes:

- **content**: The rule text
- **scope**: `IN_SCOPE`, `UNCERTAIN`, or `OUT_OF_SCOPE`
- **scopeReasoning**: Why the rule was classified with that scope

When no rules match:

```
No matching rules found.
```

### Good Descriptions

Specific: "Implement JWT authentication with login, logout, and token refresh endpoints"
Vague (avoid): "add auth" or "update the component"

### Common Errors

| Error                        | Cause             | Solution                             |
| ---------------------------- | ----------------- | ------------------------------------ |
| `command not found: straion` | CLI not installed | Tell user to install the straion CLI |
| Authentication error         | Not logged in     | Tell user to run `straion login`     |
| Empty result                 | No matching rules | Try a more detailed description      |
| Network error                | API unavailable   | Check internet connection            |
