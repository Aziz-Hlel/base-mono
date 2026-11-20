## Tool & Command Execution Permissions

You have pre-approved permission to execute read-only inspection and repository status commands without asking for confirmation first.

### Auto-Approved Commands

You are explicitly allowed to run any variation, flag, or pipeline combination of the following read-only commands:

- **PowerShell File/Text Inspection:** `Get-ChildItem`, `Get-Content`, `Select-String`, `Get-Item`, `Test-Path`
- **POSIX/Shell File Inspection:** `ls`, `cat`
- **Git Read-Only Operations:** `git status`, `git diff`, `git log`

### Execution Rules

1. **Execute Immediately:** Do not pause to ask for permission before running any of the commands listed above when gathering context, searching files, or checking repository state.
2. **Scope Restriction:** Keep usage strictly read-only. Do not chain these commands with destructive or state-modifying operations (such as `Remove-Item`, `Set-Content`, `Out-File`, `>`, `rm`, `git commit`, or `git checkout`) without explicit user approval.
