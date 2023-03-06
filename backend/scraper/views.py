from types import ModuleType
from django.core.exceptions import BadRequest
from django.http import HttpResponse, JsonResponse
from .scrapers import cda, ogladajanime, hdbest
from django.core.cache import cache

"""
Platforms:
    1 - CDA
    2 - Ogladajanime
    3 - hdbest
"""

"""
    Since python's polymorphisim is defacto non existant
    this seems better that making stateless classes
    correct me if I'm wrong tho

    scraper module has to have search_videos and get_stream_url functions defined
"""

def cache_get_video(scraper: ModuleType,id:str) -> tuple[str,bool] | None:
    cache_str = f'v{scraper.__name__}{id}'
    cached = cache.get(cache_str)
    if cached is not None:
        return cached

    res = scraper.get_stream_url(id)
    cache.set(cache_str,res)
    return res

def cache_get_search(scraper: ModuleType,query:str) -> tuple[str,bool] | None:
    cache_str = f's{scraper.__name__}{query}'
    cached = cache.get(cache_str)
    if cached is not None:
        return cached

    res = scraper.search_videos(query)
    cache.set(cache_str,res)
    return res

def get_scraper(platform: int) -> ModuleType:
    match platform:
        case 1:
            return cda
        case 2:
            return ogladajanime
        case 3:
            return hdbest
        case _:
            raise BadRequest("Invalid scraper!")

def video(request, platform: int, id: str) -> JsonResponse:
    mod = get_scraper(platform)

    res = cache_get_video(mod,id)
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
    mod = get_scraper(platform)

    videos = cache_get_search(mod,query)

    return JsonResponse({
            "videos": videos,
    })

