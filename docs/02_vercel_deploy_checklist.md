# Vercel Deploy Checklist (Deploy Lead)

Owner: Brad (Vercel / Deploy Lead)  
Goal: Reliable GitHub -> Vercel deploys with PR preview links for the team.

## 0) One-time project setup

1. In Vercel, click **Add New... -> Project**.
2. Import repo: `Johnnyflame4/miami-hackathon`.
3. Set **Root Directory** to `web`.
4. Confirm framework is **Next.js** (auto-detected).
5. Keep build settings default:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output: `.next` (auto)
6. Deploy once to create the project.

## 1) Git + environment settings

In **Project Settings -> Git**:
- Production Branch = `main`
- Preview Deployments = enabled
- Auto-deploy = enabled

In **Project Settings -> Environment Variables**:
- Add required variables for each environment you need (`Production`, `Preview`, `Development`), for example:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (only if backend/server code needs it)
- Save and trigger redeploy if prompted.

## 2) Verification checks (for 11:30a deliverables)

### A) "Vercel project connected"
- In Vercel project dashboard, confirm repo and branch info appear under Git settings.
- Confirm deploy history shows commits coming from GitHub.

### B) "main deploy succeeds"
- Merge/push to `main`.
- In Deployments tab, verify latest **Production** deployment is green.
- Open production URL and confirm app loads.

### C) "PRs create preview deploys"
- Open a test PR from any branch.
- Confirm Vercel posts a preview deployment URL on the PR.
- Open preview URL and confirm app loads.
- Ensure PR checklist in `.github/pull_request_template.md` is completed (including preview URL).

## 3) Fast troubleshooting

- Build fails immediately:
  - Reconfirm **Root Directory = `web`**.
  - Re-run local check:
    - `cd web`
    - `npm install`
    - `npm run build`
- Preview deploy missing on PR:
  - Verify repo integration and Preview Deployments are enabled in Vercel Git settings.
  - Ensure PR is against a tracked repo branch.
- App loads but data is broken:
  - Check env vars exist in the correct Vercel environment scope.
  - Redeploy after env var updates.

## 4) Backup plan

If Vercel Git integration is unstable close to deadline:
1. From local repo root, run `cd web`.
2. Install Vercel CLI (`npm i -g vercel`) and login.
3. Run `vercel --prod` for manual production deployment.
4. Post resulting live URL in team chat as temporary fallback.

## 5) Handoff message template

"Deploy status @ 11:30a:
- Vercel project connected: ✅/❌
- `main` production deploy: ✅/❌ (URL: ...)
- PR preview deploys: ✅/❌ (Example preview: ...)
- Notes/blockers: ..."
