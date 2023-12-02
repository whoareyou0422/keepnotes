from rest_framework import serializers

from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='api:my_note',
        lookup_field='id'
    )
    class Meta:
        model = Note
        fields = ['id', 'user', 'body', 'updated', 'created', 'url']

    def get_user(self, obj):
        request = self.context.get('request')
        user = request.user
        return user.id