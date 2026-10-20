#!/usr/bin/env bash
# Called only by an authorized_keys forced-command rule.
set -Eeuo pipefail
export PATH=/usr/bin:/bin
case "${SSH_ORIGINAL_COMMAND:-}" in
  status|rfq-check)
    exec /usr/bin/sudo -n /usr/local/sbin/twd-rfq-diagnostics "${SSH_ORIGINAL_COMMAND}"
    ;;
  *)
    echo "Access denied: unsupported Twin Disc staging command" >&2
    exit 126
    ;;
esac
