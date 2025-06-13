# @mj-kiwi/podcast-index-api

A TypeScript client for the [Podcast Index API](https://podcastindex-org.github.io/docs-api/).

## Features

- Full TypeScript support with comprehensive type definitions
- Promise-based API client
- Automatic authentication handling
- Complete implementation of all major API endpoints
- Robust test coverage

## Installation

```bash
# Using npm
npm install @mj-kiwi/podcast-index-api

# Using yarn
yarn add @mj-kiwi/podcast-index-api

# Using pnpm
pnpm add @mj-kiwi/podcast-index-api
```

## Authentication

To use the API, you'll need to register for API credentials at [api.podcastindex.org](https://api.podcastindex.org/). Once you have your API key and secret, you can initialize the client:

```typescript
import { PodcastIndexClient } from '@mj-kiwi/podcast-index-api';

const client = new PodcastIndexClient({
  authKey: 'your-auth-key',
  secretKey: 'your-secret-key',
  // Optional configuration
  userAgent: 'YourApp/1.0',  // Default: PodcastIndexTS/1.0
  baseUrl: 'https://api.podcastindex.org/api/1.0'  // Default URL
});
```

## Usage Examples

### Search for Podcasts

```typescript
// Search podcasts by term
const searchResults = await client.searchPodcasts({ 
  q: 'tech news',
  clean: true,
  max: 20
});

// Search podcasts by title
const titleResults = await client.searchPodcastsByTitle({ 
  q: 'daily tech news' 
});

// Search episodes by person
const personResults = await client.searchEpisodesByPerson({ 
  q: 'Adam Curry' 
});
```

### Get Podcast Information

```typescript
// Get podcast by feed ID
const podcast = await client.getPodcastByFeedId({ id: 920666 });

// Get podcast by feed URL
const podcastByUrl = await client.getPodcastByFeedUrl({ 
  url: 'https://feeds.example.com/podcast.xml' 
});

// Get podcast by iTunes ID
const podcastByItunes = await client.getPodcastByItunesId({ id: 1441923632 });

// Get podcast by GUID
const podcastByGuid = await client.getPodcastByGuid({ 
  guid: '917393e3-1b1e-5cef-ace4-edaa54e1f810' 
});
```

### Get Episode Information

```typescript
// Get episodes by feed ID
const episodes = await client.getEpisodesByFeedId({ 
  id: 920666,
  max: 10,
  fulltext: true
});

// Get recent episodes
const recentEpisodes = await client.getRecentEpisodes({ max: 20 });

// Get episodes by GUID
const episodeByGuid = await client.getEpisodesByGuid({
  guid: 'episode-guid',
  feedid: 920666
});
```

### Value for Value Information

```typescript
// Get value info by feed ID
const valueInfo = await client.getValueByFeedId({ id: 920666 });

// Get value info by feed URL
const valueByUrl = await client.getValueByFeedUrl({ 
  url: 'https://feeds.example.com/podcast.xml' 
});
```

### Get Stats and Categories

```typescript
// Get current stats
const stats = await client.getStats();

// Get categories list
const categories = await client.getCategories();
```

## API Documentation

### Search Endpoints

| Method                     | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `searchPodcasts()`         | Search podcasts by term in title, author or owner |
| `searchPodcastsByTitle()`  | Search podcasts by title only                     |
| `searchEpisodesByPerson()` | Search episodes mentioning a person               |

### Podcast Endpoints

| Method                   | Description                   |
| ------------------------ | ----------------------------- |
| `getPodcastByFeedId()`   | Get podcast info by feed ID   |
| `getPodcastByFeedUrl()`  | Get podcast info by feed URL  |
| `getPodcastByGuid()`     | Get podcast info by GUID      |
| `getPodcastByItunesId()` | Get podcast info by iTunes ID |
| `getPodcastsByMedium()`  | Get podcasts by medium type   |

### Episode Endpoints

| Method                    | Description               |
| ------------------------- | ------------------------- |
| `getEpisodesByFeedId()`   | Get episodes by feed ID   |
| `getEpisodesByFeedUrl()`  | Get episodes by feed URL  |
| `getEpisodesByGuid()`     | Get episodes by GUID      |
| `getEpisodesByItunesId()` | Get episodes by iTunes ID |
| `getRecentEpisodes()`     | Get recent episodes       |

### Value Endpoints

| Method                | Description                |
| --------------------- | -------------------------- |
| `getValueByFeedId()`  | Get value info by feed ID  |
| `getValueByFeedUrl()` | Get value info by feed URL |

### Other Endpoints

| Method            | Description                    |
| ----------------- | ------------------------------ |
| `getStats()`      | Get current index statistics   |
| `getCategories()` | Get list of podcast categories |

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build type declarations
pnpm build:types
```

### Testing

The project uses Vitest for testing. Tests are located in the `test/` directory.

```bash
# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
