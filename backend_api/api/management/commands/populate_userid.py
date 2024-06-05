from django.core.management.base import BaseCommand
from api.models import User
import uuid

class Command(BaseCommand):
    help = 'Populate userid field with unique values'

    def handle(self, *args, **kwargs):
        users = User.objects.all()
        for user in users:
            if not user.userid:  # Only set userid if it is not already set
                user.userid = uuid.uuid4()
                user.save()
        self.stdout.write(self.style.SUCCESS('Successfully populated userid field for all users'))