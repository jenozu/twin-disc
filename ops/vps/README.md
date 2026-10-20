# Twin Disc RFQ staging — GitHub Actions SSH bridge

This feature is **read-only, staging-only**. It is independent of the Trade Alerts SSH key and does **not** use the `root` account for SSH, grant Docker group membership, expose staging credentials, merge branches or restart apps.

## Architecture

GitHub Actions -> dedicated `twdrfqci` SSH key -> forced command -> allowlisted sudo -> root-owned `twd-rfq-diagnostics` -> isolated `twd-rfq-staging` Compose project. Only `status` and `rfq-check` commands are permitted. Arbitrary shell, changing app files, service restarts, schema migrations and printing customer PII are not supported.

## Step 1: Provision VPS once (human action)

In Hostinger Web Terminal as `root`, clone this feature branch in its own directory, inspect the script, then run it:

```bash
git clone --single-branch --branch feat/twd-rfq-vps-actions https://github.com/jenozu/twin-disc.git /root/projects/twin-disc/vps-ops
cd /root/projects/twin-disc/vps-ops
less ops/vps/setup-readonly-ssh.sh
bash ops/vps/setup-readonly-ssh.sh
```

The script reuses `/root/.config/twd-rfq-staging/staging.env` and your existing backend location but does not change either. It creates a fresh SSH key at `/root/.ssh/twd_rfq_actions_2026`, provisions `twdrfqci`, and limits the key with `restrict,command="..."` in `authorized_keys`. A root-owned sudo command allowlist restricts Docker access to these two diagnostic verbs.

Keep `/root/.ssh/twd_rfq_actions_2026` private. Never commit it or send it to ChatGPT.

## Step 2: Configure 4 GitHub Actions secrets (human action)

Go to the **Twin Disc** repository -> **Settings -> Secrets and variables -> Actions -> New repository secret** and add:

| Secret | Value |
| --- | --- |
| `TWD_VPS_HOST` | `2.25.108.3` |
| `TWD_VPS_USER` | `twdrfqci` |
| `TWD_VPS_SSH_KEY` | Entire private Ed25519 key, including BEGIN/END lines. Display on VPS using `cat /root/.ssh/twd_rfq_actions_2026`. Never share in chat. |
| `TWD_VPS_KNOWN_HOSTS` | The single public SSH host-key line printed by the provisioning script; begins `2.25.108.3 ssh-ed25519 ...`. Verify the fingerprint displayed on VPS. |

Never reuse `TRADE_VPS_SSH_KEY`; leave `jenozu/trade-alerts` unchanged. Never use a password or a personal GitHub access token for SSH.

## Step 3: First test before merge

The workflow is committed **only to a feature branch**. GitHub typically exposes manual `workflow_dispatch` only when a workflow file exists on the default branch. Therefore the first verification is triggered by committing the **single allowlisted request file** `ops/vps/run-request.txt` with the contents `status` or `rfq-check` to `feat/twd-rfq-vps-actions`.

Ask ChatGPT to create that request commit **after** the VPS setup and four GitHub secrets are ready. The read-only `push` workflow will run, validate script syntax, and SSH into the forced command. The GH Actions log contains sanitized service health and numeric inquiry counts, never credentials or customer records.

Later, after explicit owner approval to merge this workflow into `main`, GitHub's Run workflow UI can select `status` or `rfq-check` via `workflow_dispatch`. No app deployment happens through this workflow.

## Safety and revocation

- Restricted account: `twdrfqci`. No Docker group, no interactive shell via this key, no wildcard sudo.
- Fixed target: `2.25.108.3`, authenticated with a pinned SSH host public key. No blind `ssh-keyscan`.
- Fixed staging paths: `/root/projects/twin-disc/rfq-staging/50-Code/site/backend` and `/root/.config/twd-rfq-staging/staging.env`.
- If SSH host key changes, inspect the VPS host key fingerprint and update `TWD_VPS_KNOWN_HOSTS` after verification.
- Revocation: delete the Twin Disc SSH secrets from GitHub, remove the matching forced-command line from `/home/twdrfqci/.ssh/authorized_keys`, and remove `/etc/sudoers.d/twd-rfq-ci` after validating nothing depends on it.
- Do not expose private keys, `staging.env`, full customer records or file attachments in Actions logs.
- Administrator provisioning, lead status updates, database restoration, deployments and production migration will require **separate, explicitly approved, narrowly scoped** operational workflows after this diagnostic bridge has been verified.
