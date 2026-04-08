# Example: SSO Login Support

User: "I want to add SSO login support"

Claude: "I'll guide you through SSO with rule validation at every step."

[Asks clarifying questions about providers, existing auth, rules]

Claude: "Creating spec for SSO login support..."
[Creates spec]

Claude: "Validating spec against rules..."
[Runs straion find-rules CLI]

Claude: "Validation found REQ-234 requires MFA for enterprise SSO. Adding to spec."
[Updates spec, re-validates]

Claude: "Spec compliant! Breaking down into tasks..."
[Creates implementation plan with validated tasks]
[Presents plan for user approval]

User: [Approves plan]

Claude: "Plan approved! Implementing..."
[Implements with progress tracking]

