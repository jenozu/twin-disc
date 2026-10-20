#!/usr/bin/env bash
# One-time provisioning on the Hostinger VPS as root.
# Run ONLY after reviewing this file from a known, pinned Git commit.
set -Eeuo pipefail
umask 077
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[[ "${EUID}" -eq 0 ]] || { echo "Run this setup as root" >&2; exit 1; }
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ACCOUNT=twdrfqci
KEY=/root/.ssh/twd_rfq_actions_2026
COMMAND=/usr/local/sbin/twd-rfq-ssh-entry

for tool in ssh-keygen visudo sudo useradd install; do
  command -v "$tool" >/dev/null || { echo "Required tool missing: $tool" >&2; exit 2; }
done
[[ -f /root/.config/twd-rfq-staging/staging.env ]] || { echo "Staging env not found; stopping." >&2; exit 3; }
[[ -f "$SCRIPT_DIR/twd-rfq-diagnostics.sh" && -f "$SCRIPT_DIR/twd-rfq-ssh-entry.sh" ]] || { echo "Missing companion scripts" >&2; exit 4; }

if ! id "$ACCOUNT" >/dev/null 2>&1; then
  /usr/sbin/useradd --create-home --user-group --shell /bin/bash "$ACCOUNT"
fi
/usr/bin/passwd -l "$ACCOUNT" >/dev/null 2>&1 || true
install -d -o "$ACCOUNT" -g "$ACCOUNT" -m 700 "/home/$ACCOUNT/.ssh"
install -d -m 700 /root/.ssh

if [[ ! -f "$KEY" && ! -f "$KEY.pub" ]]; then
  ssh-keygen -q -t ed25519 -N '' -C 'twd-rfq-staging-github-actions' -f "$KEY"
fi
[[ -f "$KEY" && -f "$KEY.pub" ]] || { echo "Incomplete existing keypair; stop and investigate (no overwrite)." >&2; exit 5; }
chmod 600 "$KEY"

install -o root -g root -m 0755 "$SCRIPT_DIR/twd-rfq-diagnostics.sh" /usr/local/sbin/twd-rfq-diagnostics
install -o root -g root -m 0755 "$SCRIPT_DIR/twd-rfq-ssh-entry.sh" "$COMMAND"

SUDOERS=/etc/sudoers.d/twd-rfq-ci
TMP="$(mktemp /etc/sudoers.d/.twd-rfq-ci.XXXXXXXX)"
trap 'rm -f "$TMP"' EXIT
printf '%s\n' \
  "$ACCOUNT ALL=(root) NOPASSWD: /usr/local/sbin/twd-rfq-diagnostics status, /usr/local/sbin/twd-rfq-diagnostics rfq-check" > "$TMP"
chmod 0440 "$TMP"
visudo -cf "$TMP" >/dev/null
mv -f "$TMP" "$SUDOERS"
trap - EXIT

PUB="$(cat "$KEY.pub")"
PUB_BODY="$(awk '{print $2}' "$KEY.pub")"
AUTH="/home/$ACCOUNT/.ssh/authorized_keys"
touch "$AUTH"
RULE="restrict,command=\"$COMMAND\" $PUB"
if ! grep -Fxq "$RULE" "$AUTH"; then
  if grep -Fq "$PUB_BODY" "$AUTH"; then
    echo "Key already authorized with different privileges. Stop and review authorized_keys." >&2
    exit 6
  fi
  printf '%s\n' "$RULE" >> "$AUTH"
fi
chown "$ACCOUNT:$ACCOUNT" "$AUTH"
chmod 600 "$AUTH"

/bin/bash -n /usr/local/sbin/twd-rfq-diagnostics "$COMMAND"
echo "Restricted Twin Disc SSH runner provisioned."
echo "ACCOUNT=$ACCOUNT"
echo "PRIVATE_KEY_FILE=$KEY (do NOT share in chat)"
echo "GitHub TWD_VPS_KNOWN_HOSTS value (public host key; confirm VPS IP):"
awk '{print "2.25.108.3 "$1" "$2}' /etc/ssh/ssh_host_ed25519_key.pub
echo "VPS SSH host key fingerprint:"
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
echo "Permitted remote commands: status, rfq-check"
echo "No generic shell, Docker group, sudo shell, deployment or other-project access granted."
