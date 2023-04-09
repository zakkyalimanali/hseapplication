from rest_framework import serializers
from .models import Staff , Incident, Account
# from .models import Staff

class StaffSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
    

class IncidentSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(IncidentSeriallizer, self).to_representation(instance)
        rep['name'] = instance.raised_by.name
        return rep

class AccountSeriallizer(serializers.ModelSerializer):
    class Meta: 
        model = Account
        fields = "__all__"