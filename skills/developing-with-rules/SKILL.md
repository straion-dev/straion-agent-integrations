---
name: developing-with-rules
description: |
  Guides users through rules-first feature implementation from idea to production code. Validates specs, tasks, and implementation against project rules at every step. Use when building features, implementing specs, creating implementation plans, breaking down specs into tasks, or when user says "help me build", "implement this", "add feature", "plan this", "break down this spec", "create tasks", or wants rules compliance.
---

# Developing with Rules

## Core Philosophy

- **Rules First**: Build features that meet documented rules
- **Systematic Validation**: Validate at every level to catch issues early
- **Guided Process**: Clear structure while remaining flexible

## Workflow

### Step 1: Idea → Specification

Transform a rough idea into a clear, lightweight specification.

1. Understand the request — ask clarifying questions when ambiguous
2. Create a lightweight spec covering:
   - Overview, Goals, Scope
   - Key Rules (must-have vs nice-to-have)
   - Acceptance Criteria, Technical Approach
   - Open Questions

### Step 2: Validate Specification

Ensure the spec complies with project rules BEFORE planning.

Run the Straion CLI to find matching rules:

```bash
straion find-rules \
  --title "<spec title>" \
  --body "<full spec content>" \
  --summary "<brief summary>"
```

See [../shared/STRAION_CLI.md](../shared/STRAION_CLI.md) for full
CLI reference.

Analyze compliance for each returned rule:

- ✅ **Compliant**: Proceed
- ⚠️ **Partial**: Note adjustments needed, refine spec
- ❌ **Violations**: Must fix before proceeding — re-validate after fixes

**Gate**: Only proceed when spec has no critical violations.

### Step 3: Plan & Validate Tasks

Break down the validated spec into compliant implementation tasks.

1. Explore the codebase for architecture patterns and conventions
2. Create ordered implementation tasks with acceptance criteria

**VALIDATION GATE: Each task MUST be validated before adding to plan**

3. For each task:

   - Draft task description + acceptance criteria
   - Run `straion find-rules` for this task:
     ```bash
     straion find-rules \
       --title "<task title>" \
       --body "<task description>" \
       --summary "<overall spec summary>"
     ```
   - Review compliance, adjust task if violations found
   - Add validation status: ✅ Compliant / ⚠️ Partial / ❌ Violation

4. Address any violations or gaps across all tasks
5. Present complete, validated plan for user approval

**Do NOT present plan until all tasks pass validation**

6. Wait for user approval before implementing

### Step 4: Implement

Execute the validated tasks while maintaining compliance.

1. Track progress (use todo tracking if available)
2. Implement task by task following descriptions and validation feedback
3. For complex tasks, re-validate against rules as needed
4. Write tests and verify acceptance criteria are met

## Workflow Modes

| Mode          | When                                  | Flow               |
| ------------- | ------------------------------------- | ------------------ |
| Full          | Starting from rough idea              | Step 1 → 2 → 3 → 4 |
| From Spec     | Have existing spec                    | Step 2 → 3 → 4     |
| Validate Only | Just check compliance                 | Step 2 only        |
| Plan Only     | Create validated implementation tasks | Step 3 only        |

## User Interaction

- **Be Conversational**: Explain what you're doing, ask when unclear
- **Be Transparent**: Show validation results, explain violations
- **Be Flexible**: Adapt to existing artifacts, skip unnecessary steps
- **Track Progress**: Use todo tracking for multi-task implementations

## Example

See [references/EXAMPLE.md](references/EXAMPLE.md) for a complete SSO
login implementation walkthrough.

## Reference

- CLI usage: [../shared/STRAION_CLI.md](../shared/STRAION_CLI.md)
- Terminology: [../shared/TERMINOLOGY.md](../shared/TERMINOLOGY.md)
- Error handling: [../shared/ERROR_HANDLING.md](../shared/ERROR_HANDLING.md)

## Success Criteria

✅ User understands what was built and why
✅ Spec and tasks are validated
✅ Critical violations are addressed
✅ Implementation works and passes tests
✅ Solution meets rules

