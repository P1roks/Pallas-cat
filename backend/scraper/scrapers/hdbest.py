from bs4 import BeautifulSoup
import json
import requests

HEADERS = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
        'Referer': 'https://hdbest.net'
}


def get_stream_url(url) -> tuple[str,bool] | None:
    res = requests.get(f"https://hdbest.net/{url}")

    soup = BeautifulSoup(res.text,"html.parser")
    source = soup.select_one("iframe")

    if source is None:
        return source

    return str(source['src']),False

def search_videos(query):
    url = f"https://hdbest.net/?s={query}"
    res = requests.get(url,headers=HEADERS)
    
    soup = BeautifulSoup(res.text,"html.parser")
    clips = soup.select("article a")
    if len(clips) == 0: return None

    links = list()
    for clip in clips:
        link  = "".join(clip['href']).split("/")[-1]
        title = clip.select_one('header span')
        if title is not None:
            title = title.get_text()

        cover = clip.select_one('.post-thumbnail img')
        if cover is not None:
            cover = "https://" + str(cover['data-src'][2:])

        time = None
        time_tag = clip.select_one('.duration')
        if time_tag is not None:
            time = time_tag.get_text()

        quality = None
        quality_tag = clip.select_one('.hd-video')
        if quality_tag is not None:
            quality = quality_tag.get_text()

        links.append({
            'link': link,
            'title': title,
            'cover': cover,
            'time': time,
            'quality': quality
        })

    return links
