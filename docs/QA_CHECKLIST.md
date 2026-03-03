# Floor Plan Tool MVP QA Checklist

## Environment
- Run `npm install` in `web` if needed.
- Start app with `npm run dev` from `web`.
- Open `http://localhost:3000/floorplan`.

## Manual Verification Steps
1. **Load page**
   - Confirm the page loads without crashing.
   - Confirm layout has left sidebar, center canvas, and right selection panel.

2. **Dock overlay / fallback**
   - Confirm a background layer attempts to load from `/venues/dock/dock.png`.
   - If image is missing, confirm canvas shows a visible grid fallback background.

3. **Template switching**
   - Click `Banquet`, `Theater`, and `Cocktail` in the template picker.
   - Confirm canvas objects update for each template.

4. **Asset palette add flow**
   - Add each palette item at least once:
     - Round Table
     - Rect Table
     - Chair
     - Stage
     - Bar
     - AV Booth
     - Dance Floor
     - Registration
   - Confirm each added item appears in the canvas near center.

5. **Selection + editing**
   - Click an object on canvas.
   - Confirm right panel shows selected object details.
   - Use nudge arrows (↑ ↓ ← →) and verify object moves by 10px.
   - Use `Rotate +15°` and confirm rotation updates.
   - Use `Delete` and confirm object is removed.

6. **Quality / stability checks**
   - Confirm no blocking console errors in browser devtools.
   - Confirm no TypeScript/ESLint errors from this feature during local lint/build.

## Demo-Ready Pass Criteria
- `/floorplan` is accessible and presentable.
- All three templates render.
- Palette has at least 8 assets and add flow works.
- Select/nudge/rotate/delete interactions work.
- Dock overlay behavior works with fallback.
