from rest_framework import generics
from rest_framework.exceptions import NotFound

from .models import Note
from .serializer import NoteSerializer


class Notes(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_queryset(self):
        user = self.request.user
        qs = Note.objects.filter(user=user).order_by('-updated')
        return qs


class NoteCreate(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteGetUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'id'

    def get_queryset(self):
        note_id = self.kwargs.get('id')
        note = Note.objects.get(id=note_id)
        user = self.request.user
        if note.user == user:
            return super().get_queryset()
        raise NotFound("Not Found")

    def perform_destroy(self, instance):
        super().perform_destroy(instance)