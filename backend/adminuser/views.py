from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from users.models import UserAccount, MentorProfile
from . serializers import UserDetailSerializers, MentorDetailSerialzer, MentorProfileSerializer


class UserDetailView(generics.ListAPIView):
    queryset = UserAccount.objects.filter(role='student')
    serializer_class = UserDetailSerializers


class ToggleUserStatusView(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserDetailSerializers
    
    def patch(self, request, *args, **kwargs):
        try:
            user = self.get_object()
            user.is_verified = not user.is_verified
            user.save()
            return Response(self.get_serializer(user).data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MentorDetailView(generics.ListAPIView):
    queryset = UserAccount.objects.filter(role='mentor')
    serializer_class = MentorDetailSerialzer

class ToggleMentorStatusView(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = MentorDetailSerialzer

    def patch(self, request, *args, **kwargs):
        try:
            mentor = self.get_object()
            mentor.is_verified = not mentor.is_verified
            mentor.save()
            return Response(self.get_serializer(mentor).data)
        except Exception as e:
            print(f"Error while toggling user status: {e}")
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ToggleMentorApprovalView(APIView):

    def patch(self, request, pk, *args, **kwargs):
        try:
            # Fetch the MentorProfile instance using the `pk`
            mentor = MentorProfile.objects.get(pk=pk)
            
            # Toggle the approval status
            mentor.approved = not mentor.approved
            mentor.save()

            # Serialize and return the updated mentor data
            serializer = MentorProfileSerializer(mentor)
            return Response(serializer.data, status=status.HTTP_200_OK)
            print(serializer.errors)
        
        except MentorProfile.DoesNotExist:
            return Response({'error': 'Mentor not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            print(f"Error while toggling mentor approval: {e}")
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
