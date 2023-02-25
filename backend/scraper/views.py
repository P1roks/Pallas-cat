from django.http import HttpResponse, JsonResponse
from .scrapers import cda, ogladajanime, hdbest

"""
Platforms:
    1 - CDA
    2 - Ogladajanime
    3 - Zaluknij
"""

def video(request, platform: int, id: str) -> JsonResponse:
    res: tuple[str,bool] | None
    match platform:
        case 1:
            res = cda.get_stream_url(id)
        case 2:
            res = ogladajanime.get_stream_url(id)
        case 3:
            res = hdbest.get_stream_url(id)
        case _:
            res = ("err",False)

    if res is not None:
        stream_url, embeddable = res
        return JsonResponse({
            'streamUrl': stream_url, 'embeddable': embeddable
        })
    else:
        return JsonResponse({
            'streamUrl': None, 'embeddable': None
        })

def search(request, platform: int, query: str) -> HttpResponse:
    videos = str()
    match platform:
        case 1:
            videos = cda.search_videos(query)
        case 2:
            videos = ogladajanime.search_videos(query)
        case 3:
            videos = hdbest.search_videos(query)
        case _:
            videos = "error"

    return JsonResponse({
            "videos": videos,
    })
