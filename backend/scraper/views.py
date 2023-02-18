from django.http import HttpResponse, JsonResponse
from .scrapers import cda

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
            stream_url = "ogladajanime"
        case _:
            stream_url = "error"

    return JsonResponse({
        'streamUrl': stream_url
    })

def search(request, platform: int, query: str) -> HttpResponse:
    return HttpResponse(404)
