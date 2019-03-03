# -*- coding: utf-8 -*-
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls import include, url

urlpatterns = [
    url(r'^block_scheme/', include('test_site.block_scheme.urls')),
    url(r'^binary_com/', include('test_site.binary_com.urls')),
    url(r'^excelka/', include('test_site.excelka.urls', namespace='excelka')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
