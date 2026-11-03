"""Playback regression checks. Run with python3 tests/video_playback.py."""
import asyncio
from playwright.async_api import async_playwright


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        for width, height in [(1280, 1800), (390, 844)]:
            page = await browser.new_page(viewport={"width": width, "height": height})
            await page.goto("http://localhost:8080", wait_until="networkidle")
            videos = page.locator("video")
            assert await videos.count() > 0
            for index in range(await videos.count()):
                video = videos.nth(index)
                await page.wait_for_timeout(1000)
                assert await video.evaluate("v => !v.autoplay && v.paused && v.currentTime === 0")
                poster = await video.get_attribute("poster")
                assert poster
                assert (await page.request.get(poster)).ok
                container = video.locator("..")
                play = container.get_by_role("button", name="Play", exact=True)
                assert await play.is_visible()
                await play.click()
                await page.wait_for_function("document.querySelector('video').currentTime > 0")
                assert await video.evaluate("v => !v.paused")
                await container.get_by_role("button", name="Pause", exact=True).click()
                assert await video.evaluate("v => v.paused")
                paused_time = await video.evaluate("v => v.currentTime")
                await page.wait_for_timeout(500)
                assert await video.evaluate("v => v.currentTime") == paused_time
                await page.reload(wait_until="networkidle")
                assert await page.locator("video").nth(index).evaluate("v => v.paused && v.currentTime === 0")
            print(f"PASS: visitor-initiated video playback at {width}×{height}")
            await page.close()
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())