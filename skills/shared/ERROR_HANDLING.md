# Common Error Handling

## Straion CLI Errors

| Error                      | Cause                                                  | Solution                                                              |
| -------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------- |
| command not found: straion | The cli is not installed, neither globally nor locally | Inform the user to install the straion cli either globally or locally |
| Authentication error       | Not logged in                                          | Inform the user that they must run `straion login` on their machine.  |
| Network error              | API unavailable                                        | Check internet connection                                             |

## Workflow Errors

| Situation                   | Action                                              |
| --------------------------- | --------------------------------------------------- |
| Validation fails repeatedly | Check rule definitions, skip validation             |
| Planning fails              | Fall back to manual breakdown, still validate tasks |
| Implementation blocked      | Pause, document blocker, suggest alternatives       |

