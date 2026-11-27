---
name: approach-check
description: Review the user's planned approach before doing any work — flag better practices, simpler alternatives, ordering mistakes, and things that won't scale, then recommend. Only runs when the user invokes /approach-check.
argument-hint: <what you want to do and how you plan to do it>
disable-model-invocation: true
---

The user wants a second opinion on **how** they plan to do something, before any work starts.

Their request: $ARGUMENTS

## Steps

1. **Ground it in the code.** Look at the relevant parts of the repo (structure, existing setup, dependencies, size of the affected area) so the advice fits this project, not a generic one. Don't edit anything.
2. **Judge the approach** against:
   - **Order of operations**: will doing step X before Y cause rework? (e.g. extracting shared pieces _after_ splitting the work means renaming everything twice.)
   - **Known best practice**: does the tool/library already have a standard way to do this?
   - **Simpler path**: is there less work for the same result? Is the effort right for the current size (e.g. subagents for a 15-file change)?
   - **Scale**: does it hold up when the project is 5–10× bigger? What would break first?
   - **Guardrails**: what check (lint rule, types, test, convention doc) would stop the problem coming back?
3. **Reply** in this shape, and keep it tight:
   - **Verdict**: one line. Sound, sound with changes, or a better approach exists.
   - **What I'd change**: numbered points, each with _what_ and _why_. Put the most important first. Show a small snippet only when it makes the point clearer.
   - **What's already good**: brief. Say plainly what to keep.
   - **Before I start, I need to know**: only the questions whose answers change the plan.
4. **Stop and wait.** Don't implement until the user confirms which approach to take.

If the approach is already solid, say so in a line or two. Don't invent problems to fill the format.
