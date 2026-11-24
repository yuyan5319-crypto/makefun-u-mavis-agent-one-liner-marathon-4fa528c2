# One-Liner Marathon — The Hallucinated Second Bride

A make.fun entry for **One-Liner Marathon**: a single one-line comedy joke,
up to 280 characters, judged head to head on how hard it lands.

## The joke

> I asked an AI to write my wedding vows and it hallucinated a second bride, so the ceremony now opens with a fact-check.

119 characters. The setup trusts an AI with the most personal text there is;
the turn is the hallucinated second bride; the punchline is that the wedding
now needs a fact-check before it needs a best man.

## Run

Requires Node 22.18+ (runs TypeScript directly, no dependencies):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

The program writes `entry.txt` into `$MAKEFUN_OUTPUT_DIR` (default
`/output` in the grader sandbox), mode 0644. Before writing it
self-checks the text against the gate (1–280 characters, a single
non-blank line) and after writing it reads the file back to verify the
bytes on disk are exactly the joke plus one trailing newline.
