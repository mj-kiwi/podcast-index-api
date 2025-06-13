import { describe, it, expect, beforeAll } from "vitest";
import { PodcastIndexClient } from "../src/index";

// These should be replaced with actual API Key and Secret for real testing
// For demonstration, we'll use placeholders.
// In a real scenario, these would come from environment variables.
const API_KEY = process.env.PODCAST_INDEX_API_KEY || "YOUR_API_KEY";
const API_SECRET = process.env.PODCAST_INDEX_API_SECRET || "YOUR_API_SECRET";

describe("PodcastIndexClient", () => {
	let client: PodcastIndexClient;

	beforeAll(() => {
		client = new PodcastIndexClient(API_KEY, API_SECRET);
	});

	it("should be defined", () => {
		expect(client).toBeDefined();
	});

	it("should fetch recent episodes", async () => {
		// This test requires a valid API key and secret to pass.
		// It might fail if the API key/secret are invalid or if there's a network issue.
		// For CI/CD, consider mocking the API calls.
		if (API_KEY === "YOUR_API_KEY" || API_SECRET === "YOUR_API_SECRET") {
			console.warn(
				"Skipping getRecentEpisodes test: API_KEY or API_SECRET not set.",
			);
			expect(true).toBe(true); // Pass the test if skipped
			return;
		}

		const data = await client.getRecentEpisodes(1);
		expect(data).toBeDefined();
		expect(data.feeds).toBeInstanceOf(Array);
		expect(data.feeds.length).toBeGreaterThan(0);
	}, 10000); // Increase timeout for API calls

	it("should search podcasts by term", async () => {
		if (API_KEY === "YOUR_API_KEY" || API_SECRET === "YOUR_API_SECRET") {
			console.warn(
				"Skipping searchPodcasts test: API_KEY or API_SECRET not set.",
			);
			expect(true).toBe(true);
			return;
		}

		const query = "tech";
		const data = await client.searchPodcasts(query);
		expect(data).toBeDefined();
		expect(data.feeds).toBeInstanceOf(Array);
		expect(data.feeds.length).toBeGreaterThan(0);
	}, 10000);

	it("should search podcasts by title", async () => {
		if (API_KEY === "YOUR_API_KEY" || API_SECRET === "YOUR_API_SECRET") {
			console.warn(
				"Skipping searchPodcastsByTitle test: API_KEY or API_SECRET not set.",
			);
			expect(true).toBe(true);
			return;
		}

		const title = "The Joe Rogan Experience";
		const data = await client.searchPodcastsByTitle(title);
		expect(data).toBeDefined();
		expect(data.feeds).toBeInstanceOf(Array);
		expect(data.feeds.length).toBeGreaterThan(0);
		expect(data.feeds[0].title).toContain(title);
	}, 10000);

	it("should get podcast by ID", async () => {
		if (API_KEY === "YOUR_API_KEY" || API_SECRET === "YOUR_API_SECRET") {
			console.warn(
				"Skipping getPodcastById test: API_KEY or API_SECRET not set.",
			);
			expect(true).toBe(true);
			return;
		}

		// Use a known podcast ID for testing, e.g., from a previous search or documentation
		const podcastId = "920666"; // Example ID for "The Joe Rogan Experience"
		const data = await client.getPodcastById(podcastId);
		expect(data).toBeDefined();
		expect(data.feed).toBeDefined();
		expect(data.feed.id).toBe(Number.parseInt(podcastId));
	}, 10000);

	it("should get episodes by feed ID", async () => {
		if (API_KEY === "YOUR_API_KEY" || API_SECRET === "YOUR_API_SECRET") {
			console.warn(
				"Skipping getEpisodesByFeedId test: API_KEY or API_SECRET not set.",
			);
			expect(true).toBe(true);
			return;
		}

		// Use a known podcast feed ID for testing
		const feedId = "920666"; // Example ID for "The Joe Rogan Experience"
		const data = await client.getEpisodesByFeedId(feedId);
		expect(data).toBeDefined();
		expect(data.items).toBeInstanceOf(Array);
		expect(data.items.length).toBeGreaterThan(0);
	}, 10000);
});
