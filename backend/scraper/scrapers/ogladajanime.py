from . import cda
from bs4 import BeautifulSoup
import json
import requests

def get_stream_url(url) -> str | None:
    outer_res = requests.get(f"https://ogladajanime.pl/anime/{url}")

    soup = BeautifulSoup(outer_res.text,"html.parser")
    episode_id = soup.select("#changePlayerButton")[0]['value']

    episode_url = f"https://ogladajanime.pl/command_manager.php?action=get_player_list&id={episode_id}"
    headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
            'Referer': 'https://ogladajanime.pl'
    }

    src_res = requests.post(episode_url,headers=headers)
    data = json.loads(json.loads(src_res.text)["data"])
    # This scrape goes depper!
    if 'ebd.cda' in data['url']:
        return cda.get_stream_url(data["url"],full_url=True)
    else:
        #TODO
        return data['url']


def search_videos(query):
    url = f"https://ogladajanime.pl/search/name/{query}"
    res = requests.get(url)
    
    soup = BeautifulSoup(res.text,"html.parser")
    animes = soup.select("#anime_main > div")
    if len(animes) == 0: return None

    links = list()
    for anime in animes:
        title_link = anime.select_one(".card-title a")
        cover = anime.select_one("figure img")
        if title_link is None or cover is None:
            continue
        link_arr = title_link['href']
        link = "".join(link_arr).split("/")[-1]
        title = title_link.get_text().strip()
        cover = cover['data-src']
        links.append({'link': link,'title': title,'cover': cover})

    return json.dumps(links)
