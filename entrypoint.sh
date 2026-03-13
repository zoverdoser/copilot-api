#!/bin/sh
if [ "$1" = "--auth" ]; then
  # Run auth command
  exec bun run dist/main.js auth
else
  # Default command
  # Pass --key from API_KEY env var if set
  if [ -n "$API_KEY" ]; then
    exec bun run dist/main.js start -g "$GH_TOKEN" --key "$API_KEY" "$@"
  else
    exec bun run dist/main.js start -g "$GH_TOKEN" "$@"
  fi
fi

