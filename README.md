![AirAPI Logo](docs/logo.png)

# AirAPI

Hobby API to for aviation-related data.

The data is sourced from [OurAirports](https://ourairports.com/data/) and comes with no guarantee of accuracy or fitness for use.

Built using [Nitro](https://nitro.unjs.io/), [TRPC OpenAPI](https://github.com/jlalmes/trpc-openapi) and [Prisma](https://www.prisma.io/).

API Documentation is available at `/swagger`.

More endpoints and data will be added over time.

## Development

Look at the [Nitro documentation](https://nitro.unjs.io/) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

### Development Server

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nitro.unjs.io/deploy) for more information.
