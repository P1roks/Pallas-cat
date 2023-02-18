from bs4 import BeautifulSoup
import requests
import json

def get_stream_url(video_id):
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
    headers = {'User-Agent': user_agent}

    res = requests.get(f"https://ebd.cda.pl/620x395/{video_id}", headers=headers)

    soup = BeautifulSoup(res.text, 'html.parser')
    div = soup.select('div[player_data]')
    playerData = json.loads(div[0]['player_data'])
    highestFormat = list(playerData['video']['qualities'].values())[-1]
        
    body = {
        "jsonrpc": "2.0",
        "method": "videoGetLink",
        "params": [
            playerData['video']['id'],
            highestFormat,
            playerData['video']['ts'],
            playerData['video']['hash2'],
            {}
        ], 
        "id": 1
    }

    headers['Content-Type'] = 'application/json'
    res1 = requests.post("https://www.cda.pl/", data=json.dumps(body), headers=headers)
    x = json.loads(res1.text)
    return x['result']['resp']

def search_videos(query):
    return None