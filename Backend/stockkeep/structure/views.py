
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from users.permissions import HasPermission
from .models import Structure
from .serializers import StructureSerializer
from consommateur.serializers import BonDeCommandeInterneSerializer
from consommateur.models import BonDeCommandeInterne


class ListCreateStructure(generics.ListCreateAPIView):
    queryset = Structure.objects.all()
    serializer_class = StructureSerializer
    
class RetrieveUpdateDeleteStructure(generics.RetrieveUpdateDestroyAPIView):
    queryset = Structure.objects.all()
    serializer_class = StructureSerializer

#verification if this role has user related with it
    def destroy(self, request, *args, **kwargs):
            instance = self.get_object()

            print(instance)
            
            # Check if the instance has any related objects
            if instance.consommateurs.exists():
                # Customize this message according to your requirements
                error_message = "Cannot delete this object because it has related objects."
                raise ValidationError(error_message)

            return super().destroy(request, *args, **kwargs)


class BonDeCommandeInterneByResponsibleView(generics.ListAPIView): 
    serializer_class = BonDeCommandeInterneSerializer 
 
    def get_queryset(self): 
        responsible_id = self.kwargs['responsible_id'] 
        # Find all structures managed by the given responsible_id 
        structures = Structure.objects.filter(responsible__id=responsible_id) 
        # Filter BonDeCommandeInterne based on the structures' ids 
        return BonDeCommandeInterne.objects.filter(user_id__consommateur__structure__in=structures)