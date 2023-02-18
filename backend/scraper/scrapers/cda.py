from bs4 import BeautifulSoup
import requests
import json

def get_stream_url(video_id: str) -> str | None:
    if len(video_id) < 9: return None

    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
    headers = {'User-Agent': user_agent}
    res = requests.get(f"https://ebd.cda.pl/620x395/{video_id}", headers=headers)

    soup = BeautifulSoup(res.text, 'html.parser')
    div = soup.select('div[player_data]')

    # check whether the video_id points to a website that doesn't contain the actual video
    if len(div) == 0: return None

    raw_player_data = div[0]['player_data']
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
    return data['result']['resp']

def search_videos(query):
    return None