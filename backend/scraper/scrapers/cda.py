from bs4 import BeautifulSoup
import requests
import json
import re

def get_stream_url(video_id: str, full_url = False) -> tuple[str,bool] | None:
    if not full_url:
        pattern = re.compile(r'^[a-z0-9]{8,}$')
        id_check = pattern.findall(video_id)
        if len(id_check) == 0: return None

    res: requests.Response
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
    headers = {'User-Agent': user_agent}
    get_url = video_id if full_url else f"https://ebd.cda.pl/620x395/{video_id}"

    res = requests.get(get_url, headers=headers)

    soup = BeautifulSoup(res.text, 'html.parser')
    div = soup.select_one('div[player_data]')

    # check whether the video_id points to a website that doesn't contain the actual video
    if div is None: return None

    raw_player_data = div['player_data']
    player_data = json.loads(raw_player_data) if type(raw_player_data) is str else json.loads(raw_player_data[0])
    highest_format = list(player_data['video']['qualities'].values())[-1]
        
    body = {
        "jsonrpc": "2.0",
        "method": "videoGetLink",
        "params": [
            player_data['video']['id'],
            highest_format,
            player_data['video']['ts'],
            player_data['video']['hash2'],
            {}
        ], 
        "id": 1
    }

    headers['Content-Type'] = 'application/json'
    res1 = requests.post("https://www.cda.pl/", data=json.dumps(body), headers=headers)
    data = json.loads(res1.text)
    return (data['result']['resp'],True)

def search_videos(query):
    res: requests.Response

    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
    headers = {'User-Agent': user_agent}
    res = requests.get(f'https://www.cda.pl/info/{query}', headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')

    links = list()
    videos_clips = soup.select('.video-clip')
    for video_clip in videos_clips:
        premium_tag = video_clip.select_one('.flag-video-premium')
        if premium_tag is not None:
            continue

        title_tag = video_clip.select_one('.link-title-visit')
        if title_tag is None:
            continue
        title = title_tag.get_text() 

        link_tag = video_clip.select_one('.video-clip-link')
        if link_tag is None:
            continue

        link = link_tag['href']
        if type(link) is not str:
            continue

        cover_tag = video_clip.select_one('.video-clip-image')
        if cover_tag is None:
            continue

        cover = cover_tag['src']

        pattern = re.compile(r'video\/(\w+)')
        id = pattern.findall(link)

        links.append({ 
            'link': id[0], 
            'title': title, 
            'cover': cover 
        })

    return links
