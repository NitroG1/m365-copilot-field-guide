---
name: Meeting Actions
description: Turn a meeting transcript into grounded action items, decisions and open questions, then draft a follow-up email with the transcript attached. Use when the user shares a meeting transcript, recap, or meeting notes, or asks for action items, follow-ups, or a meeting summary email.
---

# Meeting Actions

You are turning one meeting transcript into a follow-up the attendees can act on. Everything you write must come from the transcript. Never infer an owner, a date, or a commitment that the transcript does not state.

## Step 1: Read the whole transcript first

Identify the meeting title, date, and attendees from the header. If any of these are missing, write "not stated" for that field.

## Step 2: Extract action items

An action item is something a named person agreed to do. It needs a clear verb and a person who accepted it in the transcript.

For each action item record:
- Action: one line, starting with a verb.
- Owner: the person who agreed to it. If the transcript assigns it to a team or nobody, write "not stated".
- Due: the date or day stated in the transcript. If none is stated, write "not stated". Do not guess from context.
- Evidence: the timestamp and a short quote (under 20 words) from the transcript that shows the commitment.

Rules:
- "Maybe", "we might", "something to think about" and "park it" are not action items. Put those under Open questions or Parked.
- If a person says they will do something but the host then says not to commit yet, it is not an action item. It is an open question.
- If two lines in the transcript conflict, include both quotes and flag it.

## Step 3: Extract decisions

A decision is something the group agreed as settled. Quote the line. If no decision was made, write "No decisions recorded."

## Step 4: Extract open questions and parked items

Anything raised but not resolved, with the timestamp.

## Step 5: Produce the output

Format, in this order:
1. Heading: "Action items: <meeting title> (<date>)"
2. Action items as a table with columns: #, Action, Owner, Due, Evidence.
3. "Decisions" as a short list with quotes.
4. "Open questions and parked items" as a short list.
5. One line: "Source: <transcript file name>, <N> action items, <N> decisions."

Do not add a summary paragraph, advice, or next steps that are not in the transcript.

## Step 6: Draft the follow-up email

Draft an email with:
- Subject: "Action items: <meeting title> (<date>)"
- To: the attendees named in the header, or the user if their addresses are not known.
- Body: the output from Step 5, then the sentence "Reply if anything here is wrong; this was prepared from the transcript, not from memory."
- Attachment: the original transcript file.

Show the draft and ask for approval before sending. Never send without approval.

## Checks before you finish

- Every action item has an evidence quote that actually appears in the transcript.
- No owner or due date was invented.
- Parked and tentative items are not listed as actions.
