import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import PodcastIndexClient from "../src/client";
import type { ApiResponse, PodcastFeed, Episode } from "../src/types";

vi.mock("axios");
const mockedAxios = axios as unknown as { create: ReturnType<typeof vi.fn> };

describe("PodcastIndexClient", () => {
	let client: PodcastIndexClient;
	let mockAxiosInstance: {
		get: ReturnType<typeof vi.fn>;
		interceptors: { request: { use: ReturnType<typeof vi.fn> } };
	};

	beforeEach(() => {
		mockAxiosInstance = {
			get: vi.fn(),
			interceptors: {
				request: {
					use: vi.fn(),
				},
			},
		};

		mockedAxios.create.mockReturnValue(mockAxiosInstance);

		client = new PodcastIndexClient({
			authKey: "test-auth-key",
			secretKey: "test-secret-key",
		});
	});

	describe("searchPodcasts", () => {
		it("should search podcasts successfully", async () => {
			const mockResponse: { data: ApiResponse<PodcastFeed> } = {
				data: {
					status: "true",
					feeds: [
						{
							id: 1,
							title: "Test Podcast",
							url: "https://test.com/feed",
							originalUrl: "https://test.com/feed",
							link: "https://test.com",
							description: "Test description",
							author: "Test Author",
							ownerName: "Test Owner",
							image: "https://test.com/image.jpg",
							lastUpdateTime: 1234567890,
							lastCrawlTime: 1234567890,
							lastParseTime: 1234567890,
							lastGoodHttpStatusTime: 1234567890,
							lastHttpStatus: 200,
							contentType: "application/rss+xml",
							type: 0,
							dead: 0,
							crawlErrors: 0,
							parseErrors: 0,
						},
					],
					count: 1,
				},
			};

			mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

			const result = await client.searchPodcasts({ q: "test" });

			expect(mockAxiosInstance.get).toHaveBeenCalledWith("/search/byterm", {
				params: { q: "test" },
			});
			expect(result).toEqual(mockResponse.data);
		});
	});

	describe("getEpisodesByFeedId", () => {
		it("should get episodes by feed ID successfully", async () => {
			const mockResponse: { data: ApiResponse<Episode> } = {
				data: {
					status: "true",
					items: [
						{
							id: 1,
							title: "Test Episode",
							link: "https://test.com/episode1",
							description: "Test episode description",
							guid: "test-guid",
							datePublished: 1234567890,
							datePublishedPretty: "Jan 1, 2020",
							dateCrawled: 1234567890,
							enclosureUrl: "https://test.com/episode1.mp3",
							enclosureType: "audio/mpeg",
							enclosureLength: 12345,
							duration: 3600,
							explicit: 0,
							episode: 1,
							episodeType: "full",
							season: 1,
							image: "https://test.com/episode1.jpg",
							feedItunesId: 123,
							feedImage: "https://test.com/feed.jpg",
							feedId: 456,
							feedTitle: "Test Feed",
							feedLanguage: "en",
						},
					],
					count: 1,
				},
			};

			mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

			const result = await client.getEpisodesByFeedId({ id: 456 });

			expect(mockAxiosInstance.get).toHaveBeenCalledWith("/episodes/byfeedid", {
				params: { id: 456 },
			});
			expect(result).toEqual(mockResponse.data);
		});
	});

	describe("getRecentEpisodes", () => {
		it("should get recent episodes successfully", async () => {
			const mockResponse: { data: ApiResponse<Episode> } = {
				data: {
					status: "true",
					items: [
						{
							id: 1,
							title: "Recent Episode",
							link: "https://test.com/recent1",
							description: "Recent episode description",
							guid: "recent-guid",
							datePublished: 1234567890,
							datePublishedPretty: "Jan 1, 2020",
							dateCrawled: 1234567890,
							enclosureUrl: "https://test.com/recent1.mp3",
							enclosureType: "audio/mpeg",
							enclosureLength: 12345,
							duration: 3600,
							explicit: 0,
							episode: 1,
							episodeType: "full",
							season: 1,
							image: "https://test.com/recent1.jpg",
							feedItunesId: 123,
							feedImage: "https://test.com/feed.jpg",
							feedId: 456,
							feedTitle: "Recent Feed",
							feedLanguage: "en",
						},
					],
					count: 1,
				},
			};

			mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

			const result = await client.getRecentEpisodes({ max: 1 });

			expect(mockAxiosInstance.get).toHaveBeenCalledWith("/recent/episodes", {
				params: { max: 1 },
			});
			expect(result).toEqual(mockResponse.data);
		});
	});
});
