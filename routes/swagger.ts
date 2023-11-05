import { eventHandler } from 'h3'

// https://github.com/swagger-api/swagger-ui

function html (str, ...args): string {
  return String.raw(str, ...args)
}

// Served as /_nitro/swagger
export default eventHandler(() => {
  const title = 'API Template'

  const CDN_BASE = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@^4'

  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${title}" />
        <title>${title}</title>
        <link rel="stylesheet" href="${CDN_BASE}/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="${CDN_BASE}/swagger-ui-bundle.js" crossorigin></script>
        <script
          src="${CDN_BASE}/swagger-ui-standalone-preset.js"
          crossorigin
        ></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url:  '/api/openapi.json',

              dom_id: "#swagger-ui",
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset,
              ],
              layout2: "StandaloneLayout",
            });
          };
        </script>
      </body>
    </html> `
})
