from django.http import HttpResponse, JsonResponse
from .scrapers import cda, ogladajanime

"""
Platforms:
    1 - CDA
    2 - Ogladajanime
    3 - Zaluknij
"""

def video(request, platform: int, id: str) -> JsonResponse:
    stream_url = str()
    match platform:
        case 1:
            stream_url = cda.get_stream_url(id)
        case 2:
            stream_url = ogladajanime.get_stream_url(id)
        case _:
            stream_url = "error"

    return JsonResponse({
        'streamUrl': stream_url
    })

def search(request, platform: int, query: str) -> HttpResponse:
    videos = str()
    match platform:
        case 1:
            videos = cda.search_videos(query)
        case 2:
            videos = ogladajanime.search_videos(query)
        case _:
            videos = "error"

    return JsonResponse({
        'videos': videos
    })
