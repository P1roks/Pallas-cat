from django.http import HttpResponse, JsonResponse
from .scrapers import cda

def video(request, platfrom, id):
    stream_url = ""
    match platfrom:
        case "cda":
            stream_url = cda.get_stream_url(id)
        case "ogladajanime":
            stream_url = "ogladajanime"
        case _:
            stream_url = "error"

    return JsonResponse({
        'streamUrl': stream_url
    })