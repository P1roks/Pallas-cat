from django.http import HttpResponse, JsonResponse
from .scrapers import cda, ogladajanime, hdbest
from django.core.cache import cache

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
            res = cache.get(f'vcda{id}') or cda.get_stream_url(id)
        case 2:
            res = cache.get(f'vogladaja{id}') or ogladajanime.get_stream_url(id)
        case 3:
            res = cache.get(f'vhdbest{id}') or hdbest.get_stream_url(id)
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
            videos = cache.get(f'cda{query}') or cda.search_videos(query)
        case 2:
            videos = cache.get(f'ogladaja{query}') or ogladajanime.search_videos(query)
        case 3:
            videos = cache.get(f'hdbest{query}') or hdbest.search_videos(query)
        case _:
            videos = "error"

    return JsonResponse({
            "videos": videos,
    })
